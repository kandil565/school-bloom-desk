# Production Deployment Guide

## Pre-Deployment Checklist

### Security
- [ ] Change JWT_SECRET to a strong random key
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL
- [ ] Add input validation for all endpoints
- [ ] Implement rate limiting
- [ ] Add request size limits
- [ ] Configure CORS properly (specific origins only)
- [ ] Implement API authentication levels
- [ ] Add logging and monitoring
- [ ] Enable database authentication

### Performance
- [ ] Enable caching strategies
- [ ] Optimize database queries
- [ ] Add indexes to frequently queried fields
- [ ] Implement pagination
- [ ] Add response compression
- [ ] Implement async operations
- [ ] Set up load balancing

### Database
- [ ] Backup MongoDB data
- [ ] Enable MongoDB authentication
- [ ] Configure database replication
- [ ] Set up automated backups
- [ ] Test disaster recovery
- [ ] Monitor database performance

---

## Deployment Platforms

### 1. Heroku Deployment

#### Prerequisites
- Heroku account
- Heroku CLI installed
- Git repository

#### Steps

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create school-management-api

# Add MongoDB Atlas (Remote Database)
# Go to heroku dashboard and add MongoDB Atlas addon
# Or manually set DATABASE_URL

# Set environment variables
heroku config:set JWT_SECRET=your_strong_secret_key
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### 2. AWS Deployment

#### Using EC2

1. Launch EC2 instance (Ubuntu 20.04 LTS)
2. Connect via SSH
3. Install Node.js and MongoDB
4. Clone repository
5. Configure environment variables
6. Start application with PM2

```bash
# SSH into instance
ssh -i key.pem ubuntu@instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Clone repo
git clone <your-repo-url>
cd backend
npm install

# Install PM2
sudo npm install -g pm2

# Start with PM2
pm2 start src/server.js --name "school-backend"
pm2 startup
pm2 save

# Setup Nginx as reverse proxy
sudo apt-get install -y nginx
```

### 3. DigitalOcean App Platform

1. Connect GitHub repository
2. Configure deployment settings
3. Add environment variables
4. Deploy

### 4. Docker Deployment

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Build and Run

```bash
# Build image
docker build -t school-management-api .

# Run container
docker run -d \
  --name school-api \
  -p 5000:5000 \
  -e MONGODB_URI=mongodb://mongo:27017/school-management \
  -e JWT_SECRET=your_secret_key \
  --link mongo:mongo \
  school-management-api
```

#### Docker Compose

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongo:27017/school-management
      JWT_SECRET: your_secret_key
      NODE_ENV: production
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Run with: `docker-compose up -d`

---

## Using MongoDB Atlas (Cloud Database)

### Setup

1. Create account at mongodb.com
2. Create cluster
3. Add IP to whitelist
4. Create database user
5. Get connection string

```
mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

6. Update MONGODB_URI in .env

### Backup & Restore

```bash
# Backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/dbname"

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/dbname" dump/
```

---

## Performance Optimization

### Enable Compression

```javascript
import compression from 'compression';
app.use(compression());
```

### Add Caching Headers

```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300');
  next();
});
```

### Database Optimization

```javascript
// Add indexes
userSchema.index({ email: 1 });
studentSchema.index({ rollNumber: 1 });
employeeSchema.index({ employeeId: 1 });
attendanceSchema.index({ employeeId: 1, date: 1 });
```

### API Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Monitoring and Logging

### Using Winston Logger

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}
```

### Using PM2 for Process Management

```bash
# Install PM2
npm install -g pm2

# Create ecosystem.config.js
pm2 ecosystem

# Start
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Logs
pm2 logs
```

### ecosystem.config.js

```javascript
module.exports = {
  apps: [{
    name: 'school-api',
    script: './src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

---

## HTTPS/SSL Setup

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renew
sudo certbot renew --dry-run
```

### Configure Nginx

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Backup Strategy

### MongoDB Backup

```bash
# Daily backup
mongodump --uri "connection-string" --out=/backups/daily-$(date +%Y%m%d)

# Automated with cron
0 2 * * * mongodump --uri "connection-string" --out=/backups/daily-$(date +\%Y\%m\%d)
```

### Database Replication

Configure replica set in MongoDB for high availability.

---

## Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/school
JWT_SECRET=super_secret_key_change_this
JWT_EXPIRE=7d

# Optional
LOG_LEVEL=info
CORS_ORIGIN=https://yourdomain.com
API_VERSION=v1
```

---

## Dependencies for Production

Add to package.json:
- `compression` - Response compression
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `winston` - Logging
- `dotenv` - Environment variables
- `cors` - CORS handling

```bash
npm install compression helmet express-rate-limit winston cors dotenv
```

---

## Monitoring Checklist

- [ ] Server uptime monitoring
- [ ] Database performance monitoring
- [ ] Error rate monitoring
- [ ] API response time monitoring
- [ ] CPU and memory usage
- [ ] Disk space monitoring
- [ ] Network bandwidth monitoring
- [ ] Backup verification

---

## Rollback Plan

1. Keep previous deployment available
2. Use blue-green deployment strategy
3. Test in staging before production
4. Maintain version control
5. Document all changes
6. Have rollback script ready

---

## Post-Deployment

- [ ] Monitor logs for errors
- [ ] Test all API endpoints
- [ ] Verify database backups
- [ ] Check SSL certificate
- [ ] Monitor performance metrics
- [ ] Set up alerts for issues
- [ ] Document deployment details
- [ ] Inform team of changes

---

## Support

For deployment issues, check:
- Server logs
- MongoDB logs
- Nginx/reverse proxy logs
- Application error tracking
