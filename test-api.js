#!/usr/bin/env node

/**
 * API Test Suite for School Management System
 * This script tests all main endpoints to verify the system is working
 */

const API_BASE = process.env.API_URL || 'http://localhost:5000/api';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://school-bloom-desk-main.vercel.app';

let authToken = null;
let userId = null;
let testsPassed = 0;
let testsFailed = 0;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

async function test(name, fn) {
  process.stdout.write(`${colors.cyan}Testing: ${name}...${colors.reset} `);
  try {
    await fn();
    console.log(`${colors.green}✓ PASS${colors.reset}`);
    testsPassed++;
  } catch (error) {
    console.log(`${colors.red}✗ FAIL${colors.reset}`);
    console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
    testsFailed++;
  }
}

async function request(method, endpoint, body = null) {
  const url = `${API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (authToken) {
    options.headers.Authorization = `Bearer ${authToken}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${response.status} - ${data.message || 'Request failed'}`);
    }

    return data;
  } catch (error) {
    throw new Error(`${method} ${endpoint}: ${error.message}`);
  }
}

async function runTests() {
  console.log(`\n${colors.bright}${colors.blue}==================================${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}School Management System API Tests${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}==================================${colors.reset}\n`);

  // Test 1: Health Check
  await test('Health Check', async () => {
    const response = await request('GET', '/health');
    if (!response.status) throw new Error('No status in response');
  });

  // Test 2: Login
  await test('User Login', async () => {
    const response = await request('POST', '/auth/login', {
      email: 'admin@school.com',
      password: 'admin123',
    });

    if (!response.data || !response.data.token) {
      throw new Error('No token received');
    }

    authToken = response.data.token;
    userId = response.data.user._id;
  });

  // Test 3: Get Profile
  await test('Get User Profile', async () => {
    const response = await request('GET', '/auth/profile');
    if (!response.data || !response.data.email) {
      throw new Error('No user data in response');
    }
  });

  // Test 4: Get Students
  await test('Get All Students', async () => {
    const response = await request('GET', '/students');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 5: Create Student
  await test('Create New Student', async () => {
    const response = await request('POST', '/students', {
      firstName: 'Test',
      lastName: 'Student',
      dateOfBirth: '2010-01-01',
      email: `student_${Date.now()}@school.com`,
      grade: '10',
      section: 'A',
      parentName: 'Test Parent',
      parentEmail: 'parent@example.com',
    });

    if (!response.data || !response.data._id) {
      throw new Error('No ID in response');
    }
  });

  // Test 6: Get Employees
  await test('Get All Employees', async () => {
    const response = await request('GET', '/employees');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 7: Get Attendance
  await test('Get Attendance Records', async () => {
    const response = await request('GET', '/attendance');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 8: Get Fees
  await test('Get Fee Records', async () => {
    const response = await request('GET', '/fees');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 9: Get Payroll
  await test('Get Payroll Records', async () => {
    const response = await request('GET', '/payroll');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 10: Get Inventory
  await test('Get Inventory Items', async () => {
    const response = await request('GET', '/inventory');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 11: Get Assets
  await test('Get Assets', async () => {
    const response = await request('GET', '/assets');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 12: Get Grades
  await test('Get Grade Records', async () => {
    const response = await request('GET', '/grades');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 13: Get Library
  await test('Get Library Books', async () => {
    const response = await request('GET', '/library');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 14: Get Events
  await test('Get Events', async () => {
    const response = await request('GET', '/events');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 15: Get Complaints
  await test('Get Complaints', async () => {
    const response = await request('GET', '/complaints');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 16: Get Notifications
  await test('Get Notifications', async () => {
    const response = await request('GET', '/notifications');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 17: Get Curriculum
  await test('Get Curriculum', async () => {
    const response = await request('GET', '/curriculum');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 18: Get Transportation
  await test('Get Transportation', async () => {
    const response = await request('GET', '/transportation');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 19: Get Workshops
  await test('Get Workshops', async () => {
    const response = await request('GET', '/workshops');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Test 20: Get Suppliers
  await test('Get Suppliers', async () => {
    const response = await request('GET', '/suppliers');
    if (!Array.isArray(response.data)) {
      throw new Error('Response data is not an array');
    }
  });

  // Print Results
  console.log(`\n${colors.bright}${colors.blue}==================================${colors.reset}`);
  console.log(`${colors.bright}Test Results${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}==================================${colors.reset}`);
  console.log(`${colors.green}✓ Passed: ${testsPassed}${colors.reset}`);
  console.log(`${colors.red}✗ Failed: ${testsFailed}${colors.reset}`);
  console.log(`${colors.yellow}Total: ${testsPassed + testsFailed}${colors.reset}`);

  if (testsFailed === 0) {
    console.log(`\n${colors.bright}${colors.green}✓ All tests passed!${colors.reset}`);
    console.log(`\n${colors.bright}System Status:${colors.reset}`);
    console.log(`  ${colors.green}Frontend: ${FRONTEND_URL}${colors.reset}`);
    console.log(`  ${colors.green}Backend API: ${API_BASE}${colors.reset}`);
    console.log(`  ${colors.green}Auth Token: Valid${colors.reset}`);
  } else {
    console.log(
      `\n${colors.red}✗ Some tests failed. Check the errors above.${colors.reset}`
    );
  }

  console.log(`\n${colors.bright}${colors.blue}==================================${colors.reset}\n`);
}

// Run tests
runTests().catch((error) => {
  console.error(`${colors.red}${error.message}${colors.reset}`);
  process.exit(1);
});
