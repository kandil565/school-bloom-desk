import { ApiError } from '../utils/ApiResponse.js';

/**
 * Role-Based Access Control Middleware
 * 
 * Clearly defines role distinctions:
 * 
 * ADMIN: System Administrator
 * - Full access to all features and modules
 * - Can manage all users, roles, and permissions
 * - Can access reports, analytics, and system settings
 * - Can approve/deny requests from other roles
 * 
 * TEACHER: Academic Staff
 * - Access to student records and academic information
 * - Can view and manage grades, attendance, curriculum
 * - Can manage class schedules and academic activities
 * - Limited access to administrative functions
 * - Cannot access payroll, HR, or financial data
 * 
 * STAFF / Administrative Staff
 * - Access to operational and administrative features
 * - Can manage HR, payroll, inventory, and assets
 * - Can handle financial operations (fees, payments)
 * - Can manage suppliers and procurement
 * - Limited access to academic data
 * - Cannot make system-level changes
 * 
 * PARENT: Parent/Guardian
 * - Read-only access to child's academic information
 * - Can view grades, attendance, fees
 * - Can communicate with teachers through portal
 * - Cannot access any administrative features
 * 
 * STUDENT: Student
 * - Read-only access to personal academic information
 * - Can view grades and schedule
 * - Can access library catalog
 * - Cannot access administrative or other students' data
 */

// Define role permissions
export const ROLE_PERMISSIONS = {
  admin: {
    name: 'System Administrator',
    description: 'Full system access and control',
    modules: [
      'dashboard', 'students', 'employees', 'attendance', 'payroll',
      'fees', 'inventory', 'assets', 'grades', 'library', 'events',
      'complaints', 'notifications', 'curriculum', 'parent_portal',
      'transportation', 'workshops', 'suppliers', 'reports', 'analytics',
      'settings', 'archive'
    ],
    functions: [
      'create', 'read', 'update', 'delete', 'approve', 'configure'
    ]
  },
  teacher: {
    name: 'Teacher/Academic Staff',
    description: 'Academic and educational access',
    modules: [
      'students', 'attendance', 'grades', 'curriculum', 'library',
      'events', 'complaints', 'notifications', 'parent_portal'
    ],
    functions: [
      'create', 'read', 'update'
    ]
  },
  staff: {
    name: 'Administrative Staff',
    description: 'Operational and administrative access',
    modules: [
      'employees', 'attendance', 'payroll', 'fees', 'inventory',
      'assets', 'library', 'transportation', 'workshops', 'suppliers',
      'events', 'notifications', 'canteen', 'complaints', 'reports'
    ],
    functions: [
      'create', 'read', 'update'
    ]
  },
  parent: {
    name: 'Parent/Guardian',
    description: 'Limited read-only access to child information',
    modules: [
      'students', 'notifications', 'parent_portal'
    ],
    functions: [
      'read'
    ]
  },
  student: {
    name: 'Student',
    description: 'Limited read-only access to personal information',
    modules: [
      'students', 'library', 'notifications'
    ],
    functions: [
      'read'
    ]
  }
};

/**
 * Middleware to check if user has required role
 * Usage: app.get('/admin-only', checkRole('admin'), controller)
 */
export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json(
        new ApiError(
          403,
          `Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${userRole}`
        )
      );
    }

    // Attach role permissions to request
    req.rolePermissions = ROLE_PERMISSIONS[userRole];
    next();
  };
};

/**
 * Middleware to check if user has access to a specific module
 * Usage: app.get('/some-module', checkModuleAccess('students'), controller)
 */
export const checkModuleAccess = (moduleName) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const userRole = req.user.role;
    const permissions = ROLE_PERMISSIONS[userRole];

    if (!permissions || !permissions.modules.includes(moduleName)) {
      return res.status(403).json(
        new ApiError(
          403,
          `Access denied to module: ${moduleName}. Your role: ${userRole} does not have permission.`
        )
      );
    }

    next();
  };
};

/**
 * Middleware to check if user can perform a specific function
 * Usage: app.post('/students', checkFunctionAccess('create'), controller)
 */
export const checkFunctionAccess = (functionName) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const userRole = req.user.role;
    const permissions = ROLE_PERMISSIONS[userRole];

    if (!permissions || !permissions.functions.includes(functionName)) {
      return res.status(403).json(
        new ApiError(
          403,
          `Permission denied. Your role: ${userRole} cannot perform: ${functionName}`
        )
      );
    }

    next();
  };
};

/**
 * Middleware to enforce admin-only access
 * Usage: app.get('/admin-panel', requireAdmin, controller)
 */
export const requireAdmin = checkRole('admin');

/**
 * Middleware to enforce teacher access
 * Usage: app.get('/grades', requireTeacher, controller)
 */
export const requireTeacher = checkRole('teacher', 'admin');

/**
 * Middleware to enforce staff access
 * Usage: app.get('/payroll', requireStaff, controller)
 */
export const requireStaff = checkRole('staff', 'admin');

/**
 * Get role display name
 */
export const getRoleDisplayName = (role) => {
  return ROLE_PERMISSIONS[role]?.name || role;
};

/**
 * Get role description
 */
export const getRoleDescription = (role) => {
  return ROLE_PERMISSIONS[role]?.description || 'Unknown role';
};

/**
 * Check if role has module access
 */
export const hasModuleAccess = (role, moduleName) => {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions && permissions.modules.includes(moduleName);
};

/**
 * Check if role can perform function
 */
export const canPerformFunction = (role, functionName) => {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions && permissions.functions.includes(functionName);
};

export default {
  checkRole,
  checkModuleAccess,
  checkFunctionAccess,
  requireAdmin,
  requireTeacher,
  requireStaff,
  getRoleDisplayName,
  getRoleDescription,
  hasModuleAccess,
  canPerformFunction,
  ROLE_PERMISSIONS
};
