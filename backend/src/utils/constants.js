/**
 * Database Utilities and Constants
 */

/**
 * User Roles with Clear Distinctions:
 * 
 * ADMIN: System Administrator
 * - Full access to all features across the system
 * - Can manage users, roles, permissions, and system settings
 * - Can access and generate reports, analytics, and advanced features
 * - Can approve/deny all system-level requests
 * 
 * TEACHER: Academic/Educational Staff
 * - Access to student academic records, grades, and attendance
 * - Can manage curriculum, class schedules, and academic activities
 * - Can assign and mark grades, track student progress
 * - Cannot access payroll, HR management, or financial operations
 * - Cannot manage system settings or user accounts
 * 
 * STAFF: Administrative/Operational Staff
 * - Access to HR management, payroll, and employee records
 * - Can manage inventory, assets, suppliers, and procurement
 * - Can handle financial operations (fees, invoices, payments)
 * - Limited access to academic information
 * - Cannot make system-level administrative changes
 * - Cannot manage other admin users
 * 
 * PARENT: Parent/Guardian (Limited Access)
 * - Read-only access to their child's academic information
 * - Can view grades, attendance, and fees
 * - Can communicate with teachers through parent portal
 * - Cannot access any administrative, payroll, or employee data
 * 
 * STUDENT: Student (Limited Access)
 * - Read-only access to personal academic information
 * - Can view personal grades and class schedule
 * - Can access library catalog
 * - Cannot access other students' information or administrative data
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STAFF: 'staff',
  PARENT: 'parent',
  STUDENT: 'student',
};

export const DEPARTMENTS = {
  HR: 'HR',
  FINANCE: 'Finance',
  OPERATIONS: 'Operations',
  IT: 'IT',
  ACADEMIC: 'Academic',
  ADMIN: 'Admin',
};

export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late',
  LEAVE: 'Leave',
};

export const FEE_STATUS = {
  PENDING: 'Pending',
  PAID: 'Paid',
  OVERDUE: 'Overdue',
  CANCELLED: 'Cancelled',
};

export const FEE_TYPES = {
  TUITION: 'Tuition',
  SPORTS: 'Sports',
  TRANSPORT: 'Transport',
  HOSTEL: 'Hostel',
  OTHER: 'Other',
};

export const COMPLAINT_STATUS = {
  OPEN: 'Open',
  UNDER_REVIEW: 'Under Review',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

export const COMPLAINT_CATEGORY = {
  ACADEMIC: 'Academic',
  FACILITY: 'Facility',
  STAFF: 'Staff',
  TRANSPORT: 'Transport',
  FOOD: 'Food',
  OTHER: 'Other',
};

export const INVENTORY_STATUS = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock',
};

export const ASSET_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DAMAGED: 'Damaged',
  UNDER_REPAIR: 'Under Repair',
};

export const EMPLOYMENT_TYPE = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
};

export const PAYROLL_STATUS = {
  DRAFT: 'Draft',
  APPROVED: 'Approved',
  PAID: 'Paid',
};

export const NOTIFICATION_TYPE = {
  INFO: 'Info',
  WARNING: 'Warning',
  SUCCESS: 'Success',
  ERROR: 'Error',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

export const PAYMENT_METHODS = {
  CASH: 'Cash',
  BANK_TRANSFER: 'Bank Transfer',
  CHECK: 'Check',
  CARD: 'Card',
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'EGP') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US');
};

/**
 * Calculate age from date of birth
 */
export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
 * Generate unique ID
 */
export const generateUniqueId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};
