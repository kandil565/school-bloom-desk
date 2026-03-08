# Simple Vercel environment setup script
$vercelAuthPath = "$env:USERPROFILE\.vercel\auth.json"
$token = $null

if (Test-Path $vercelAuthPath) {
    try {
        $authData = Get-Content $vercelAuthPath | ConvertFrom-Json
        $token = $authData.token
    } catch {}
}

if (!$token) {
    Write-Host "Enter your Vercel personal access token from https://vercel.com/account/tokens"
    $token = Read-Host "Token"
}

if (!$token) {
    Write-Host "Token is required"
    exit 1
}

$MONGODB_URI = 'mongodb+srv://kandilstore561_db_user:rH9D4hrwQhpyVI8S@cluster0.jvogcdx.mongodb.net/?appName=Cluster0'
$PROJECT_ID = 'prj_ZWx61dgJWtsQ1E2BXk5awD9ZNaF6'
$TEAM_ID = 'team_4QfG2VfUsRGWDkjb4nTg6lfV'
$PROJECT_SLUG = 'school-bloom-desk-main'

Write-Host "Setting up environment variables..."

$headers = @{
    Authorization = "Bearer $token"
    ContentType = "application/json"
}

# Remove old variable
Write-Host "Removing old MONGODB_URI..."
try {
    $uri = "https://api.vercel.com/v11/projects/$PROJECT_ID/env?key=MONGODB_URI&teamId=$TEAM_ID"
    Invoke-WebRequest -Uri $uri -Method DELETE -Headers $headers -ErrorAction SilentlyContinue | Out-Null
    Write-Host "Old variable removed"
} catch {}

# Add new variable
Write-Host "Adding new MONGODB_URI..."

$body = @{
    key = "MONGODB_URI"
    value = $MONGODB_URI
    type = "encrypted"
    target = @("production")
} | ConvertTo-Json

$uri = "https://api.vercel.com/v11/projects/$PROJECT_ID/env?teamId=$TEAM_ID"
$response = Invoke-WebRequest -Uri $uri -Method POST -Headers $headers -Body $body

if ($response.StatusCode -eq 201 -or $response.StatusCode -eq 200) {
    Write-Host "Environment variable added successfully!"
    Write-Host ""
    Write-Host "Triggering deployment..."
    
    $deployBody = @{ source = "cli" } | ConvertTo-Json
    $deployUri = "https://api.vercel.com/v13/projects/$PROJECT_ID/deployments?teamId=$TEAM_ID"
    
    try {
        $deployResponse = Invoke-WebRequest -Uri $deployUri -Method POST -Headers $headers -Body $deployBody
        Write-Host "Deployment triggered!"
    } catch {}
    
    Write-Host ""
    Write-Host "Waiting for deployment..."
    Start-Sleep -Seconds 30
    
    Write-Host "Running seed data..."
    try {
        $seedUrl = "https://$PROJECT_SLUG.vercel.app/api/seed"
        $seedResponse = Invoke-WebRequest -Uri $seedUrl -TimeoutSec 15
        $content = $seedResponse.Content
        Write-Host "Seed response: $content"
    } catch {}
    
    Write-Host ""
    Write-Host "Setup complete!"
    Write-Host "Login with: admin@school.com / admin123"
} else {
    Write-Host "Failed: $($response.StatusCode)"
    Write-Host $response.Content
}
