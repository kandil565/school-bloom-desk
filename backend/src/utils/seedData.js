import User from '../models/User.js';
import Student from '../models/Student.js';
import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import Fee from '../models/Fee.js';

/**
 * Seed database with sample data
 * Run: node src/utils/seedData.js
 */

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Employee.deleteMany({});
    await Attendance.deleteMany({});
    await Fee.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@school.com',
      password: 'admin123',
      role: 'admin',
      department: 'Admin',
    });

    // Create sample users
    const users = await User.create([
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
      {
        employeeId: 'EMP003',
        firstName: 'Ali',
        lastName: 'Ahmed',
        email: 'ali@school.com',
        phone: '01001234569',
        position: 'Accountant',
        department: 'Finance',
        employmentType: 'Full-time',
        dateOfJoining: new Date('2021-06-10'),
        salary: 20000,
      },
    ]);

    // Create sample students
    const students = await Student.create([
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
        dateOfBirth: new Date('2009-03-20'),
        gender: 'Female',
        email: 'student2@school.com',
        phone: '01001234572',
        grade: '10',
        section: 'B',
        parentName: 'Hassan Mohammed',
        parentEmail: 'parent2@gmail.com',
        parentPhone: '01001234573',
        admissionDate: new Date('2020-09-01'),
      },
      {
        rollNumber: 'STU003',
        firstName: 'Omar',
        lastName: 'Ibrahim',
        dateOfBirth: new Date('2007-07-10'),
        gender: 'Male',
        email: 'student3@school.com',
        phone: '01001234574',
        grade: '11',
        section: 'A',
        parentName: 'Ibrahim Ali',
        parentEmail: 'parent3@gmail.com',
        parentPhone: '01001234575',
        admissionDate: new Date('2019-09-01'),
      },
    ]);

    // Create sample attendance records
    const attendanceRecords = await Attendance.create([
      {
        employeeId: employees[0]._id,
        date: new Date(),
        status: 'Present',
        checkInTime: new Date(),
        checkOutTime: new Date(),
      },
      {
        employeeId: employees[1]._id,
        date: new Date(),
        status: 'Present',
        checkInTime: new Date(),
        checkOutTime: new Date(),
      },
      {
        employeeId: employees[2]._id,
        date: new Date(),
        status: 'Late',
        checkInTime: new Date(),
        checkOutTime: new Date(),
      },
    ]);

    // Create sample fees
    const fees = await Fee.create([
      {
        studentId: students[0]._id,
        academicYear: '2024-2025',
        feeType: 'Tuition',
        amount: 5000,
        dueDate: new Date('2024-02-01'),
        status: 'Paid',
        paymentMethod: 'Bank Transfer',
      },
      {
        studentId: students[1]._id,
        academicYear: '2024-2025',
        feeType: 'Tuition',
        amount: 5000,
        dueDate: new Date('2024-02-01'),
        status: 'Pending',
      },
      {
        studentId: students[2]._id,
        academicYear: '2024-2025',
        feeType: 'Transport',
        amount: 1500,
        dueDate: new Date('2024-01-15'),
        status: 'Overdue',
      },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`✅ Created 1 admin user`);
    console.log(`✅ Created ${users.length} staff users`);
    console.log(`✅ Created ${employees.length} employees`);
    console.log(`✅ Created ${students.length} students`);
    console.log(`✅ Created ${attendanceRecords.length} attendance records`);
    console.log(`✅ Created ${fees.length} fee records`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

export default seedDatabase;
