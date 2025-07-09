# ScanSew Backend API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication-1)
  - [File Operations](#file-operations)
  - [Company Management](#company-management)
  - [User Management](#user-management)
  - [Work Orders](#work-orders)
- [File Storage](#file-storage)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Deployment](#deployment)

## Overview
The ScanSew backend is built with Node.js, Express, Apollo Server, and Prisma. It provides a GraphQL API for the ScanSew application, handling authentication, file storage, and business logic.

## Authentication
Authentication is handled using JWT (JSON Web Tokens). Include the token in the `Authorization` header for authenticated requests:

```
Authorization: Bearer <your_jwt_token>
```

## Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@postgres:5432/scansew?schema=public"

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# MinIO Storage
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=scansew-files
MINIO_USE_SSL=false
```

## API Endpoints

### Authentication

#### Login
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
}
```

### File Operations

#### Single File Upload
```graphql
mutation SingleUpload($file: Upload!, $folder: String) {
  singleUpload(file: $file, folder: $folder) {
    id
    filename
    mimetype
    url
    key
    size
  }
}
```

#### Multiple File Upload
```graphql
mutation MultipleUpload($files: [Upload!]!, $folder: String) {
  multipleUpload(files: $files, folder: $folder) {
    id
    filename
    url
    size
  }
}
```

#### Get File URL
```graphql
query GetFileUrl($key: String!) {
  getFileUrl(key: $key)
}
```

#### Delete File
```graphql
mutation DeleteFile($key: String!) {
  deleteFile(key: $key)
}
```

### Company Management

#### Create Company
```graphql
mutation CreateCompany($data: CompanyCreateInput!) {
  createCompany(data: $data) {
    id
    name
    address
    phone
    email
  }
}
```

### User Management

#### Create User
```graphql
mutation CreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
    email
    firstName
    lastName
    role
  }
}
```

### Work Orders

#### Create Work Order
```graphql
mutation CreateWorkOrder($data: WorkOrderCreateInput!) {
  createWorkOrder(data: $data) {
    id
    title
    description
    status
    priority
    dueDate
  }
}
```

## File Storage
Files are stored in MinIO, an S3-compatible object storage service. The system supports:
- Single and multiple file uploads
- File organization in folders
- Presigned URLs for secure file access
- Automatic cleanup of temporary files

## Error Handling
The API returns standardized error responses with appropriate HTTP status codes. Errors include:
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting
API rate limiting is implemented to prevent abuse. The default limits are:
- 100 requests per minute per IP for unauthenticated requests
- 1000 requests per minute per user for authenticated requests

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see [Environment Variables](#environment-variables))

3. Start the development server:
```bash
npm run dev
```

The GraphQL Playground will be available at `http://localhost:4000/graphql`

## Testing

Run the test suite:
```bash
npm test
```

Run file upload tests:
```bash
node test-file-upload.js
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

3. The API will be available at `http://your-domain.com/graphql`
