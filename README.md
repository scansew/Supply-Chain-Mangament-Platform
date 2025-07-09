# Scan & Sew App

A modern supply chain pipeline tracking and admin application for managing work orders, users, companies, and materials. Built with React, Vite, and AWS Amplify, this app streamlines operations for manufacturing and logistics workflows.

## Features

- **Work Order Management**: Create, view, update, and track work orders with status and counter features.
- **User & Company Management**: Add, update, and assign users to companies with role-based access.
- **Material & Inventory Tracking**: Manage materials, components, and inventory items.
- **File Upload/Download**: Upload and download files related to work orders and users.
- **Authentication & Authorization**: Secure login, user roles, and company-based access control.
- **GraphQL API**: Uses AWS AppSync and DynamoDB for scalable, real-time data access.
- **Custom Resolvers**: Includes custom DynamoDB resolvers for advanced queries and counters.
- **S3 Storage**: File storage with optional transfer acceleration.
- **Admin Dashboard**: Visual dashboard for tracking orders, users, and company metrics.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/)
- [AWS Amplify CLI](https://docs.amplify.aws/cli/)
- AWS account with appropriate permissions

### Installation

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd scansewapp
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure Amplify**
   ```sh
   amplify configure
   amplify pull
   ```
   - Follow the prompts to set up your AWS profile and pull backend resources.

4. **Run the development server**
   ```sh
   npm run dev
   ```
   - The app will be available at `http://localhost:5173` (default Vite port).

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

## Common Commands
- `npm install` — Install dependencies
- `npm run dev` — Start the development server
- `amplify configure` — Set up AWS Amplify CLI
- `amplify pull` — Pull backend environment from AWS

## License
This project is proprietary and intended for internal use.
