// Set test environment variables
process.env.NODE_ENV = 'test';
// Using port 4000 to match the Docker container's port mapping
process.env.PORT = '4000';
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'file:./test.db';

// Global test configuration - using port 4000 to match Docker container
global.API_URL = 'http://localhost:4000/graphql';

// Import required modules
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Import test helpers
const { startServer, stopServer } = require('./testHelpers');

// Initialize Prisma client for test database operations
const prisma = new PrismaClient();

// Helper function to make GraphQL requests
global.graphqlRequest = async (query, variables = {}, token = null) => {
  try {
    const response = await fetch(global.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({ query, variables })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }
    
    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      const error = new Error(`GraphQL Error: ${JSON.stringify(result.errors, null, 2)}`);
      error.errors = result.errors;
      throw error;
    }
    
    return result.data;
  } catch (error) {
    console.error('Error in graphqlRequest:', error);
    throw error;
  }
};

// Start server before all tests
beforeAll(async () => {
  console.log('Starting test environment setup...');
  await startServer();
  console.log('Test environment setup completed');
}, 30000); // 30 second timeout for server startup

// Stop server after all tests
afterAll(async () => {
  console.log('Cleaning up test environment...');
  await stopServer();
  console.log('Test environment cleanup completed');
});

// Add a simple test to verify the test setup
test('Test environment is properly set up', () => {
  console.log('Running test environment verification');
  expect(true).toBe(true);
});
