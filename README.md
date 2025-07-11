# Scan & Sew App

A modern supply chain pipeline tracking and admin application for managing work orders, users, companies, and materials. Built with a modern tech stack including React, Vite, Node.js, and PostgreSQL, this app streamlines operations for manufacturing and logistics workflows.

## Features

### Backend Features
- **GraphQL API**: Built with Apollo Server for efficient data querying
- **File Storage**: Secure file uploads with MinIO (S3-compatible)
- **Authentication**: JWT-based authentication with role-based access control
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Containerization**: Docker-based development and deployment
- **API Documentation**: Comprehensive OpenAPI/Swagger documentation

### Frontend Features
- **React & Vite**: Modern frontend with fast refresh
- **Responsive Design**: Works on desktop and mobile devices
- **User Management**: Create, update, and manage user accounts
- **Work Order Tracking**: Full CRUD operations for work orders
- **File Management**: Upload and manage files with progress tracking

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) (v20 or later)
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (v9 or later)
- [PostgreSQL](https://www.postgresql.org/) (or use the provided Docker setup)

### Installation

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd scansewapp
   ```

2. **Set up environment variables**
   ```sh
   cd backend
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

3. **Start the services**
   ```sh
   docker-compose up -d
   ```
   This will start:
   - PostgreSQL database
   - MinIO file storage
   - Backend API server

4. **Run database migrations**
   ```sh
   npx prisma migrate dev
   ```

5. **Seed the database** (optional)
   ```sh
   npx prisma db seed
   ```

6. **Initialize MinIO Storage**
   Create the required MinIO bucket for file storage:
   ```sh
   npm run init-minio
   ```
   This will create a bucket named `scansew-files` in your MinIO instance.

6. **Create an admin user**
   After starting the services, create an admin user by running the following GraphQL mutation in the GraphQL Playground (http://localhost:4000/graphql):
   
   ```graphql
   mutation {
     signUp(input: { 
       email: "admin@scansew.com", 
       password: "admin123", 
       username: "admin", 
       givenName: "Admin", 
       familyName: "User", 
       role: "sAdmin" 
     }) { 
       token 
       user { 
         id 
         email 
         username 
         given_name 
         family_name 
         role 
       } 
     }
   }
   ```

   This will create an admin user with the following credentials:
   - Email: admin@scansew.com
   - Password: admin123
   - Role: sAdmin (System Administrator)

<!-- 
6. **Start the development server**
   ```sh
   npm run dev
   ``` -->

## Accessing Services

- **GraphQL Playground**: http://localhost:4000/graphql
- **API Documentation**: http://localhost:4000/api-docs
- **MinIO Console**: http://localhost:9001 (default credentials: minioadmin/minioadmin)

## Project Structure

- `src/` — Main React source code
  - `pages/` — App pages (Dashboard, Work Orders, Users, Companies, etc.)
  - `ui-components/` — Reusable UI components and forms
  - `graphql/` — GraphQL queries, mutations, and schema
- `amplify/` — AWS Amplify backend configuration
- `public/` — Static assets

## Amplify & GraphQL Notes
- Uses custom DynamoDB resolvers for features like work order counters and user/company lookups.
- See `README_old.md` for example resolver templates and advanced backend configuration.

## File Upload Guide

The application supports file uploads through GraphQL mutations. Here's a quick example:

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
   ```sh
   cd backend
   node test-file-upload.js
   ```

2. **Using cURL**
   ```sh
   curl -X POST http://localhost:4000/graphql \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -F 'operations={"query": "mutation ($file: Upload!) { singleUpload(file: $file) { id filename url } }"}' \
     -F 'map={"0": ["variables.file"]}' \
     -F '0=@/path/to/your/file.txt'
   ```

## API Documentation

For detailed API documentation, visit:
- Interactive API Docs: http://localhost:4000/api-docs
- GraphQL Schema: http://localhost:4000/graphql

## Development

### Running Tests
```sh
npm test
```

### Database Management
- Generate Prisma client: `npx prisma generate`
- Create migration: `npx prisma migrate dev --name your_migration_name`
- Reset database: `npx prisma migrate reset`

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Testing

### Running Tests

The backend includes a comprehensive test suite built with Jest. To run the tests:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run a specific test file
npx jest __tests__/auth.test.js
```

### Test Structure

- `__tests__/` - Contains all test files
  - `auth.test.js` - Authentication tests (login, registration, token validation)
  - `company.test.js` - Company management tests
  - `file.test.js` - File upload and management tests
  - `smoke.test.js` - Basic API health check tests
  - `testHelpers.js` - Shared test utilities and setup

### Test Environment

- Tests run against a dedicated test database (`test.db`)
- The database is automatically reset before each test run
- Test environment uses a separate port (4001) to avoid conflicts
- JWT tokens are automatically generated for authenticated tests

### Writing Tests

When adding new features, please include corresponding tests. Follow these patterns:

1. **Test Files**: Place test files next to the code they test with `.test.js` extension
2. **Test Structure**: Use `describe` blocks to group related tests and `test` or `it` for individual test cases
3. **Assertions**: Use Jest's built-in assertion library
4. **Mocking**: Use Jest's mocking capabilities for external services

### Test Coverage

To check test coverage:

```bash
# Generate coverage report
npm test -- --coverage

# Open HTML coverage report (after running the above)
open coverage/lcov-report/index.html
```

Aim to maintain high test coverage (80%+). The coverage report will highlight untested code paths.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
