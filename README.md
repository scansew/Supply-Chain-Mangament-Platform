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

6. **Start the development server**
   ```sh
   npm run dev
   ```

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
