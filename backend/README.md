# ScanSew Backend

A modern Node.js backend for the Scan & Sew application, built with Apollo Server, Prisma, and PostgreSQL. This backend provides a GraphQL API for managing users, companies, work orders, and file storage with robust authentication and authorization.

## ✨ Features

- **GraphQL API** - Built with Apollo Server Express
- **Authentication** - JWT-based with role-based access control
- **File Storage** - Secure file uploads with MinIO (S3-compatible)
- **Database** - PostgreSQL with Prisma ORM for type-safe operations
- **Documentation** - Interactive API documentation with Swagger UI
- **Containerized** - Docker-based development and production environments
- **File Uploads** - Support for single and multiple file uploads
- **Validation** - Request validation using Joi and custom validators
- **Error Handling** - Comprehensive error handling and logging

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ and npm 9+
- PostgreSQL (or use the provided Docker setup)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/scansewapp.git
   cd scansewapp/backend
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

3. **Start services with Docker**
   ```bash
   docker-compose up -d
   ```
   This will start:
   - PostgreSQL database
   - MinIO file storage
   - Backend API server

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Seed the database** (optional)
   ```bash
   npx prisma db seed
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

### Access Services

- **GraphQL Playground**: http://localhost:4000/graphql
- **API Documentation**: http://localhost:4000/api-docs
- **MinIO Console**: http://localhost:9001 (default: minioadmin/minioadmin)

## 📚 Documentation

### API Reference
- [API Documentation](./API_DOCS.md) - Complete API reference with examples
- [Testing Guide](./TESTING.md) - Guidelines for writing and running tests
- [Deployment Guide](./DEPLOYMENT.md) - Instructions for deploying to different environments

### File Uploads

Upload files using the GraphQL API:

```graphql
mutation SingleUpload($file: Upload!, $folder: String) {
  singleUpload(file: $file, folder: $folder) {
    id
    filename
    url
    size
  }
}
```

### Testing File Uploads

1. **Using the test script**
   ```bash
   node test-file-upload.js
   ```

2. **Using cURL**
   ```bash
   curl -X POST http://localhost:4000/graphql \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -F 'operations={"query": "mutation ($file: Upload!) { singleUpload(file: $file) { id filename url } }"}' \
     -F 'map={"0": ["variables.file"]}' \
     -F '0=@/path/to/your/file.txt'
   ```

## 🛠 Development

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker and Docker Compose

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=30d

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/scansew?schema=public"

# MinIO Storage
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=scansew-files
MINIO_CONSOLE_PORT=9001

# API Documentation
API_DOCS_PATH=/api-docs
API_VERSION=1.0.0
```

### Database Management

1. **Run migrations**
   ```bash
   npx prisma migrate dev
   ```

2. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

3. **Reset database** (use with caution)
   ```bash
   npx prisma migrate reset
   ```

### Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 🚀 Deployment

### Production Setup

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start in production mode**
   ```bash
   NODE_ENV=production npm start
   ```

### Docker Deployment

Build and start all services:
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### Health Check

Check the health of the API:
```
GET /health
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Apollo Server for the GraphQL implementation
- Prisma for the database ORM
- MinIO for S3-compatible file storage
- JWT for authentication
