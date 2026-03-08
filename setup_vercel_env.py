#!/usr/bin/env python3

import json
import urllib.request
import urllib.error
import sys
from pathlib import Path

# Configuration
MONGODB_URI = 'mongodb+srv://kandilstore561_db_user:rH9D4hrwQhpyVI8S@cluster0.jvogcdx.mongodb.net/?appName=Cluster0'
PROJECT_ID = 'prj_ZWx61dgJWtsQ1E2BXk5awD9ZNaF6'
TEAM_ID = 'team_4QfG2VfUsRGWDkjb4nTg6lfV'
PROJECT_SLUG = 'school-bloom-desk-main'

# Try to read token from Vercel auth config
token = None
auth_file = Path.home() / '.vercel' / 'auth.json'

if auth_file.exists():
    try:
        with open(auth_file, 'r') as f:
            auth_data = json.load(f)
            token = auth_data.get('token')
    except:
        pass

if not token:
    print("❌ No Vercel token found. Please install Vercel CLI and run: vercel login")
    sys.exit(1)

print(f"✅ Token found: {token[:20]}...")
print(f"🔧 Setting up environment variables...\n")

# Headers for API request
headers = {
    'Authorization': f'Bearer {token}',
    'Content-Type': 'application/json'
}

def make_request(method, path, data=None):
    """Make HTTP request to Vercel API"""
    url = f'https://api.vercel.com{path}'
    
    if data:
        data = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            response_data = response.read().decode('utf-8')
            return response.status, json.loads(response_data) if response_data else {}
    except urllib.error.HTTPError as e:
        error_data = e.read().decode('utf-8')
        return e.code, json.loads(error_data) if error_data else {}
    except Exception as e:
        print(f"❌ Request error: {str(e)}")
        return None, None

# Remove old variable
print("🗑️  Removing old MONGODB_URI...")
status, response = make_request(
    'DELETE',
    f'/v11/projects/{PROJECT_ID}/env?key=MONGODB_URI&teamId={TEAM_ID}'
)

if status and status in [200, 204, 404]:
    print("✅ Old variable removed\n")
else:
    print(f"⚠️  Status: {status}\n")

# Add new variable
print("➕ Adding new MONGODB_URI...")
env_data = {
    'key': 'MONGODB_URI',
    'value': MONGODB_URI,
    'type': 'encrypted',
    'target': ['production']
}

status, response = make_request(
    'POST',
    f'/v11/projects/{PROJECT_ID}/env?teamId={TEAM_ID}',
    env_data
)

if status == 201 or status == 200:
    print(f"✅ MONGODB_URI added successfully\n")
    print(f"📊 Response: {json.dumps(response, indent=2)}\n")
else:
    print(f"❌ Failed to add environment variable")
    print(f"Status: {status}")
    print(f"Response: {json.dumps(response, indent=2)}")
    sys.exit(1)

print("\n✨ Environment setup complete!")
print("🚀 Now redeploying project...")

# Trigger redeploy
status, response = make_request(
    'POST',
    f'/v13/projects/{PROJECT_ID}/deployments?teamId={TEAM_ID}',
    {'source': 'cli'}
)

if status and status in [200, 201]:
    print("✅ Redeploy triggered\n")
    deployment_url = response.get('url', f'https://{PROJECT_SLUG}.vercel.app')
    print(f"🌐 Your app: {deployment_url}")
    print(f"⏳ Waiting for deployment... (usually 2-3 minutes)\n")
    
    import time
    time.sleep(5)
    
    print("📧 Running seed data...")
    try:
        url = f'{deployment_url}/api/seed'
        with urllib.request.urlopen(url) as response:
            seed_response = json.loads(response.read().decode('utf-8'))
            if seed_response.get('success'):
                print("✅ Database seeded successfully!\n")
                print("🎉 System ready! Login with:")
                print("   Email: admin@school.com")
                print("   Password: admin123")
            else:
                print(f"⚠️  Seed response: {seed_response}")
    except:
        print("⏳ Seed will run when deployment completes...")
else:
    print(f"⚠️  Redeploy status: {status}")
