# Deployment Guide

This guide covers the deployment process for the ScanSew backend to various environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Production Deployment](#production-deployment)
  - [Docker Deployment](#docker-deployment)
  - [Kubernetes Deployment](#kubernetes-deployment)
  - [Serverless Deployment](#serverless-deployment)
- [Scaling](#scaling)
- [Monitoring](#monitoring)
- [Backup & Recovery](#backup--recovery)
- [CI/CD](#cicd)

## Prerequisites

- Docker and Docker Compose
- Node.js 16+ and npm
- PostgreSQL 13+
- MinIO or S3-compatible storage
- Domain name with SSL certificate (recommended)

## Environment Variables

Create a `.env` file in the production environment with the following variables:

```env
# Server
NODE_ENV=production
PORT=4000

# Database
DATABASE_URL="postgresql://user:password@host:5432/scansew_prod?schema=public"

# JWT
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=7d

# MinIO/S3 Storage
MINIO_ENDPOINT=your-minio-endpoint
MINIO_PORT=9000
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET=scansew-files
MINIO_USE_SSL=true

# Optional: Sentry for error tracking
SENTRY_DSN=your-sentry-dsn

# Optional: Logging
LOG_LEVEL=info
```

## Production Deployment

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t scansew-backend:latest .
   ```

2. Create a `docker-compose.prod.yml` file:
   ```yaml
   version: '3.8'
   
   services:
     app:
       image: scansew-backend:latest
       restart: always
       ports:
         - "4000:4000"
       env_file: .env
       depends_on:
         - postgres
         - minio
     
     postgres:
       image: postgres:13-alpine
       restart: always
       environment:
         POSTGRES_USER: ${DB_USER}
         POSTGRES_PASSWORD: ${DB_PASSWORD}
         POSTGRES_DB: ${DB_NAME}
       volumes:
         - postgres_data:/var/lib/postgresql/data
     
     minio:
       image: minio/minio:latest
       restart: always
       command: server /data --console-address ":9001"
       environment:
         MINIO_ROOT_USER: ${MINIO_ACCESS_KEY}
         MINIO_ROOT_PASSWORD: ${MINIO_SECRET_KEY}
       volumes:
         - minio_data:/data
       ports:
         - "9000:9000"
         - "9001:9001"
   
   volumes:
     postgres_data:
     minio_data:
   ```

3. Start the services:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Kubernetes Deployment

1. Create a Kubernetes secret for environment variables:
   ```bash
   kubectl create secret generic scansew-env --from-env-file=.env
   ```

2. Apply the Kubernetes manifests:
   ```bash
   kubectl apply -f k8s/
   ```

### Serverless Deployment (AWS)

1. Install the Serverless Framework:
   ```bash
   npm install -g serverless
   ```

2. Deploy the application:
   ```bash
   serverless deploy
   ```

## Scaling

### Horizontal Scaling
- Use a load balancer (NGINX, AWS ALB) in front of multiple backend instances
- Configure database connection pooling
- Use Redis for session management and caching

### Database Scaling
- Set up read replicas for read-heavy workloads
- Implement database sharding if necessary
- Use connection pooling with PgBouncer

## Monitoring

### Logging
- Use a centralized logging solution (ELK stack, Datadog, etc.)
- Configure log rotation and retention policies

### Metrics
- Monitor CPU, memory, and disk usage
- Set up alerts for error rates and response times
- Use APM tools (New Relic, Datadog APM)

### Health Checks
- Implement `/health` endpoint for load balancer health checks
- Monitor database connection status
- Check external service dependencies

## Backup & Recovery

### Database Backups
- Set up daily automated backups
- Test restore procedures regularly
- Store backups in a different region

### File Storage
- Enable versioning on the S3/MinIO bucket
- Configure cross-region replication
- Set up lifecycle policies for old files

## CI/CD

### GitHub Actions
Example workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_TOKEN }}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          tags: yourusername/scansew-backend:latest
      
      - name: Deploy to production
        run: |
          ssh ${{ secrets.SSH_HOST }} 'cd /path/to/app && \
            docker-compose pull && \
            docker-compose up -d'
```

### Environment Promotion
- Use different branches for different environments (main → staging → production)
- Implement feature flags for gradual rollouts
- Use blue-green deployments for zero-downtime updates
