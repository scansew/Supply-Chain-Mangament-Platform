/**
 * @file Main application entry point
 * @module index
 * @description Configures and starts the GraphQL server with Express
 * @requires dotenv
 * @requires apollo-server-express
 * @requires express
 * @requires http
 * @requires @prisma/client
 * @requires @graphql-tools/schema
 * @requires graphql-middleware
 * @requires graphql-upload
 * @requires stream/promises
 * @requires ./config/swagger
 */

require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const http = require('http');
const { PrismaClient } = require('@prisma/client');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { getAuthUser } = require('./auth/context');
const { GraphQLUpload } = require('graphql-upload');
const { graphqlUploadExpress } = require('graphql-upload');
const { finished } = require('stream/promises');
const setupSwagger = require('./config/swagger');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Import resolvers
const merge = require('lodash.merge');
const companyResolvers = require('./resolvers/company');
const userResolvers = require('./resolvers/user');
const workOrderResolvers = require('./resolvers/workOrder');
const authResolvers = require('./resolvers/auth');
const fileResolvers = require('./resolvers/file');

// Import type definitions
const typeDefs = [
  require('./typeDefs/company'),
  require('./typeDefs/user'),
  require('./typeDefs/workOrder'),
  require('./typeDefs/root'),
];

// Merge all resolvers
const resolvers = merge(
  {
    Upload: GraphQLUpload,
  },
  companyResolvers,
  userResolvers,
  workOrderResolvers,
  authResolvers,
  fileResolvers
);

/**
 * Express application instance
 * @type {Object}
 * @property {Function} use - Add middleware to the app
 * @property {Function} get - Define a route handler for GET requests
 * @property {Function} post - Define a route handler for POST requests
 * @property {Function} listen - Start the server
 */
const app = express();

// Apply the graphqlUploadExpress middleware for handling file uploads
app.use(graphqlUploadExpress({
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 10,
}));

// Setup Swagger documentation
if (process.env.NODE_ENV !== 'production') {
  setupSwagger(app);
}

// Create GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Apply middleware
const schemaWithMiddleware = applyMiddleware(schema);

// Create Apollo Server
const server = new ApolloServer({
  schema: schemaWithMiddleware,
  uploads: false, // Disable built-in upload handling
  context: async ({ req }) => {
    // Get the user token from the headers
    const { user } = await getAuthUser(req);
    
    // Add the user and Prisma client to the context
    return { 
      prisma,
      user,
    };
  },
  playground: process.env.NODE_ENV !== 'production',
  introspection: true,
  playground: process.env.NODE_ENV !== 'production',
  introspection: true,
});

/**
 * Starts the Apollo Server with Express
 * @async
 * @function startApolloServer
 * @returns {Promise<Object>} Object containing server, app, and httpServer instances
 * @property {Object} server - Apollo Server instance
 * @property {Object} app - Express application instance
 * @property {Object} httpServer - HTTP server instance
 */
async function startApolloServer() {
  await server.start();
  
  // Apply the Apollo Server middleware to Express
  server.applyMiddleware({ 
    app,
    // Enable CORS in development
    cors: process.env.NODE_ENV === 'development' ? {
      origin: ['http://localhost:3000', 'http://localhost:4000'],
      credentials: true
    } : undefined
  });
  
  // Create HTTP server
  const httpServer = http.createServer(app);
  
  // Start the server
  const PORT = process.env.PORT || 4000;
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`🚀 Server ready at ${serverUrl}${server.graphqlPath}`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📚 API Documentation available at ${serverUrl}/api-docs`);
    console.log(`🔍 GraphQL Playground available at ${serverUrl}${server.graphqlPath}`);
  }
  
  return { server, app, httpServer };
}

// Start the server
startApolloServer().catch(error => {
  console.error('Error starting server:', error);
  process.exit(1);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.stop().then(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});
