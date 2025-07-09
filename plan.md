# Migration Plan: AWS to Open Source Stack

This plan details the migration of the Scan & Sew App from AWS services (Amplify, AppSync, DynamoDB, Cognito, S3) to an open-source stack using Apollo Server, PostgreSQL with Prisma, Supabase Auth, and MinIO/local storage.

---

## 1. Analyze Current Architecture

- **Frontend:** React (Vite), uses Amplify JS for API, Auth, and Storage.
- **Backend:** AWS AppSync (GraphQL), DynamoDB, Cognito, S3, custom VTL resolvers.
- **Amplify CLI:** For environment/config management.

---

## 2. Set Up New Backend Stack

### a. Initialize Node.js Backend
- Create a new `backend/` directory.
- Set up a Node.js project with Apollo Server.

### b. Set Up PostgreSQL & Prisma
- Install PostgreSQL locally or via Docker.
- Initialize Prisma (`npx prisma init`).
- Design your Prisma schema based on your DynamoDB tables (work orders, users, companies, etc.).
- Run migrations to create tables.

### c. Implement GraphQL Schema
- Translate your AppSync GraphQL schema to Apollo Server.
- Implement resolvers using Prisma for DB access.
- Recreate custom logic from VTL resolvers in JavaScript (e.g., work order counters, byUsername queries).

### d. Set Up Supabase Auth
- Use Supabase Auth (self-hosted or managed) for authentication.
- Integrate JWT validation in Apollo Server context.
- Update user management logic to use Supabase Auth’s API.

### e. File Storage
- Start with local file storage for uploads/downloads.
- Implement file upload/download endpoints in your backend.
- For scalability, add MinIO and use S3-compatible libraries.

---

## 3. Update Frontend

### a. Remove Amplify Dependencies
- Remove all `@aws-amplify/*` packages.
- Remove Amplify configuration and usage (API, Auth, Storage).

### b. GraphQL Client
- Use Apollo Client for GraphQL queries/mutations.
- Update all API calls to use Apollo Client instead of Amplify API.

### c. Authentication
- Use Supabase JS client for login, signup, session management.
- Update protected routes and user context to use Supabase Auth.

### d. File Upload/Download
- Update file upload/download logic to use your new backend endpoints.

---

## 4. Migrate Data

- Export data from DynamoDB (CSV/JSON).
- Write migration scripts to import data into PostgreSQL using Prisma.

---

## 5. Update DevOps/Deployment

- Create a `docker-compose.yml` for local development (Postgres, backend, frontend, MinIO).
- Update environment variables and configs.

---

## 6. Testing & Validation

- Write unit/integration tests for new backend logic.
- Test all user flows: auth, CRUD, file upload, dashboards, etc.

---

## 7. Documentation

- Update README with new setup, environment variables, and usage instructions.

---

## Detailed Mapping Table

| AWS Service/Feature      | New Stack Equivalent                | Migration Notes                                 |
|------------------------- |-------------------------------------|-------------------------------------------------|
| AppSync GraphQL API      | Apollo Server + Prisma              | Reuse schema, rewrite resolvers in JS           |
| DynamoDB                 | PostgreSQL + Prisma                 | Map tables to relational schema                 |
| Cognito                  | Supabase Auth                       | Use Supabase JS client in frontend              |
| S3                       | Local storage / MinIO               | Use multer or similar for uploads               |
| Amplify CLI/Hosting      | Docker Compose, manual config       | Use `.env` files, Docker for local/dev          |
| VTL Resolvers            | JS Resolvers in Apollo Server       | Translate logic to JS, use Prisma for DB access |

---

## Code Reuse Tips

- **GraphQL Schema:** You can mostly reuse your AppSync schema with minor tweaks.
- **Frontend Components:** Most React UI code can be reused; only API/auth/file logic needs updating.
- **Business Logic:** Move custom logic from VTL to JS resolvers.

---

## Next Steps

1. Scaffold backend (Apollo Server + Prisma).
2. Set up PostgreSQL and migrate schema/data.
3. Integrate Supabase Auth.
4. Update frontend to use Apollo Client and Supabase.
5. Implement file storage endpoints.
6. Test and deploy.

---
