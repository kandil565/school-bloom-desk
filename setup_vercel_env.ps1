# Read Vercel auth token
$vercelAuthPath = "$env:USERPROFILE\.vercel\auth.json"
$token = $null

if (Test-Path $vercelAuthPath) {
    $authData = Get-Content $vercelAuthPath | ConvertFrom-Json
    $token = $authData.token
}

if (!$token) {
    Write-Host "⚠️  No Vercel token found automatically"
    Write-Host "Please visit: https://vercel.com/account/tokens"
    Write-Host "Create a new token and paste it:"
    $token = Read-Host "Token"
}

if (!$token) {
    Write-Host "❌ No token provided"
    exit 1
}

# Configuration
$MONGODB_URI = 'mongodb+srv://kandilstore561_db_user:rH9D4hrwQhpyVI8S@cluster0.jvogcdx.mongodb.net/?appName=Cluster0'
$PROJECT_ID = 'prj_ZWx61dgJWtsQ1E2BXk5awD9ZNaF6'
$TEAM_ID = 'team_4QfG2VfUsRGWDkjb4nTg6lfV'
$PROJECT_SLUG = 'school-bloom-desk-main'

Write-Host "✅ Token received (length: $($token.Length))"
Write-Host "🔧 Setting up environment variables...`n"

# Headers
$headers = @{
    'Authorization' = "Bearer $token"
    'Content-Type' = 'application/json'
}

# Remove old variable
Write-Host "🗑️  Removing old MONGODB_URI..."
try {
    $removeUri = "https://api.vercel.com/v11/projects/$PROJECT_ID/env?key=MONGODB_URI&teamId=$TEAM_ID"
    Invoke-WebRequest -Uri $removeUri -Method DELETE -Headers $headers -ErrorAction SilentlyContinue | Out-Null
    Write-Host "✅ Old variable removed`n"
} catch {
    Write-Host "⚠️  (May already be removed)`n"
}

# Add new variable
Write-Host "➕ Adding new MONGODB_URI..."
$envData = @{
    key = 'MONGODB_URI'
    value = $MONGODB_URI
    type = 'encrypted'
    target = @('production')
} | ConvertTo-Json

$addUri = "https://api.vercel.com/v11/projects/$PROJECT_ID/env?teamId=$TEAM_ID"

try {
    $response = Invoke-WebRequest -Uri $addUri -Method POST -Headers $headers -Body $envData
    Write-Host "✅ MONGODB_URI added successfully`n"
    $content = $response.Content | ConvertFrom-Json
    Write-Host "📊 Response:" ($content | ConvertTo-Json -Depth 10)
    Write-Host ""
    
    Write-Host "✨ Environment setup complete!"
    Write-Host "🚀 Now redeploying project..."
    Write-Host ""
    
    # Trigger redeploy
    $deployUri = "https://api.vercel.com/v13/projects/$PROJECT_ID/deployments?teamId=$TEAM_ID"
    $deployData = @{ source = 'cli' } | ConvertTo-Json
    $deployResponse = Invoke-WebRequest -Uri $deployUri -Method POST -Headers $headers -Body $deployData
    
    Write-Host "✅ Redeploy triggered`n"
    Write-Host "🌐 Your app: https://$PROJECT_SLUG.vercel.app"
    Write-Host "⏳ Waiting for deployment to complete (usually 2-3 minutes)...`n"
    
    Write-Host "📧 Running seed data in 30 seconds..."
    Start-Sleep -Seconds 30
    
    try {
        $seedUrl = "https://$PROJECT_SLUG.vercel.app/api/seed"
        $seedResponse = Invoke-WebRequest -Uri $seedUrl -Method GET -TimeoutSec 10
        $seedContent = $seedResponse.Content | ConvertFrom-Json
        
        if ($seedContent.success -or $seedContent.message -like "*seeded*") {
            Write-Host "✅ Database seeded successfully!`n"
            Write-Host "🎉 System ready! Login with:"
            Write-Host "   📧 Email: admin@school.com"
            Write-Host "   🔐 Password: admin123"
        } else {
            Write-Host "⚠️  Check deployment status at: https://vercel.com/$env:VERCEL_ORG_ID/$PROJECT_SLUG"
        }
    } catch {
        Write-Host "⏳ Deployment still in progress..."
        Write-Host "✅ Once complete, visit: https://$PROJECT_SLUG.vercel.app/api/seed"
    }
    
} catch {
    Write-Host "❌ Failed to add environment variable"
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response.Content | ConvertFrom-Json | ConvertTo-Json)"
    exit 1
}
