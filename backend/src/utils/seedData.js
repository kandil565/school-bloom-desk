import User from '../models/User.js';
import Student from '../models/Student.js';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import Fee from '../models/Fee.js';
import connectDB from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

export const seedDatabase = async () => {
    try {
        console.log('⏳ Connecting to database...');
        // We don't connect here if called from server.js which already connected
        const dbStatus = await connectDB();

        console.log('🧹 Clearing existing data...');
        await User.deleteMany({});
        await Student.deleteMany({});
        await Employee.deleteMany({});
        await Attendance.deleteMany({});
        await Fee.deleteMany({});

        // Create admin user
        console.log('👤 Creating admin user...');
        await User.create({
            name: 'Admin User',
            email: 'admin@school.com',
            password: 'admin123',
            role: 'admin',
            department: 'Admin',
        });

        // Create sample users
        await User.create([
            {
                name: 'Teacher One',
                email: 'teacher1@school.com',
                password: 'teacher123',
                role: 'teacher',
                department: 'Academic',
            },
            {
                name: 'Staff Member',
                email: 'staff@school.com',
                password: 'staff123',
                role: 'staff',
                department: 'Operations',
            },
        ]);

        // Create sample employees
        const employees = await Employee.create([
            {
                employeeId: 'EMP001',
                firstName: 'Ahmad',
                lastName: 'Hassan',
                email: 'ahmad@school.com',
                phone: '01001234567',
                position: 'Principal',
                department: 'Admin',
                employmentType: 'Full-time',
                dateOfJoining: new Date('2020-01-15'),
                salary: 50000,
            },
            {
                employeeId: 'EMP002',
                firstName: 'Fatima',
                lastName: 'Mohammed',
                email: 'fatima@school.com',
                phone: '01001234568',
                position: 'Teacher',
                department: 'Academic',
                employmentType: 'Full-time',
                dateOfJoining: new Date('2021-03-20'),
                salary: 25000,
            },
        ]);

        // Create sample students
        await Student.create([
            {
                rollNumber: 'STU001',
                firstName: 'Mohammed',
                lastName: 'Ali',
                dateOfBirth: new Date('2008-05-15'),
                gender: 'Male',
                email: 'student1@school.com',
                phone: '01001234570',
                grade: '10',
                section: 'A',
                parentName: 'Ali Hassan',
                parentEmail: 'parent1@gmail.com',
                parentPhone: '01001234571',
                admissionDate: new Date('2020-09-01'),
            },
            {
                rollNumber: 'STU002',
                firstName: 'Layla',
                lastName: 'Hassan',
                email: 'student2@school.com',
                phone: '01001234572',
                grade: '10',
                section: 'B',
                parentName: 'Hassan Mohammed',
                parentEmail: 'parent2@gmail.com',
                parentPhone: '01001234573',
                admissionDate: new Date('2020-09-01'),
            },
        ]);

        console.log('✅ Database seeded successfully!');
        return { success: true, message: 'Database seeded successfully' };
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        throw error;
    }
};

// Only run directly if executed as a script
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0)).catch(() => process.exit(1));
}
