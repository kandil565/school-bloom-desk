#!/usr/bin/env node

import https from 'https';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Vercel API configuration
const MONGODB_URI = 'mongodb+srv://kandilstore561_db_user:rH9D4hrwQhpyVI8S@cluster0.jvogcdx.mongodb.net/?appName=Cluster0';
const PROJECT_ID = 'prj_ZWx61dgJWtsQ1E2BXk5awD9ZNaF6';
const TEAM_ID = 'team_4QfG2VfUsRGWDkjb4nTg6lfV';

// Read the token from Vercel config
const tokenPath = path.join(os.homedir(), '.vercel', 'auth.json');
let token = process.env.VERCEL_TOKEN;

if (!token && fs.existsSync(tokenPath)) {
  try {
    const auth = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    token = auth.token;
  } catch (e) {
    console.error('Could not read Vercel token');
  }
}

if (!token) {
  console.error('❌ No Vercel token found. Please run: vercel login');
  process.exit(1);
}

// Function to make API request
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(body)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body
          });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Main function
async function setupEnvironment() {
  console.log('🔧 Setting up environment variables...\n');

  try {
    // Remove old MONGODB_URI
    console.log('🗑️  Removing old MONGODB_URI...');
    const removeRes = await makeRequest('DELETE', `/v11/projects/${PROJECT_ID}/env?key=MONGODB_URI&teamId=${TEAM_ID}`);
    if (removeRes.status === 200 || removeRes.status === 404) {
      console.log('✅ Old variable removed\n');
    }

    // Add new MONGODB_URI
    console.log('➕ Adding new MONGODB_URI...');
    const envData = {
      key: 'MONGODB_URI',
      value: MONGODB_URI,
      type: 'encrypted',
      target: ['production']
    };

    const addRes = await makeRequest('POST', `/v11/projects/${PROJECT_ID}/env?teamId=${TEAM_ID}`, envData);
    
    if (addRes.status === 201 || addRes.status === 200) {
      console.log('✅ MONGODB_URI added successfully\n');
      console.log('📊 Response:', addRes.data);
      console.log('\n✨ Environment setup complete!');
      console.log('🚀 Redeploying on Vercel...\n');
    } else {
      console.error('❌ Failed to add environment variable:', addRes.data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupEnvironment();
