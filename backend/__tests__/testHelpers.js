const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const execAsync = promisify(exec);
const prisma = new PrismaClient();

// Using port 4000 to match the Docker container's port mapping
const API_URL = 'http://localhost:4000/graphql';
const TEST_DB_PATH = path.join(__dirname, '../prisma/test.db');

let serverProcess = null;
let serverIsReady = false;

/**
 * Reset the test database
 */
async function resetTestDatabase() {
  console.log('Resetting test database...');
  
  // Delete test database if it exists
  if (fs.existsSync(TEST_DB_PATH)) {
    try {
      fs.unlinkSync(TEST_DB_PATH);
      console.log('✅ Test database deleted');
    } catch (error) {
      console.error('Error deleting test database:', error);
      throw error;
    }
  }

  // Run migrations
  try {
    console.log('Running database migrations...');
    await execAsync('npx prisma migrate deploy');
    console.log('✅ Database migrations applied');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}

/**
 * Check if the server is ready
 */
const isServerReady = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ __schema { types { name } }' })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Start the test server
 */
async function startServer() {
  if (isServerReady) {
    console.log('Server is already running');
    return;
  }

  try {
    await resetTestDatabase();
    
    console.log('Starting test server...');
    
    // Start the server in a child process
    const serverPath = path.join(__dirname, '../index.js');
    console.log(`Starting server from: ${serverPath}`);
    serverProcess = spawn('node', [serverPath], {
      env: {
        ...process.env,
        NODE_ENV: 'test',
        PORT: '4001',
        JWT_SECRET: 'test-secret',
        DATABASE_URL: `file:${TEST_DB_PATH}`,
        DEBUG: 'prisma:*',
        DEBUG_COLORS: 'true'
      },
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false
    });

    // Log server output
    serverProcess.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) console.log(`[Server] ${output}`);
    });

    serverProcess.stderr.on('data', (data) => {
      const error = data.toString().trim();
      if (error) console.error(`[Server Error] ${error}`);
    });

    // Handle process exit
    serverProcess.on('exit', (code) => {
      console.log(`Server process exited with code ${code}`);
      isServerReady = false;
    });

    // Wait for server to be ready
    console.log('Waiting for server to be ready...');
    const maxAttempts = 30;
    const checkInterval = 1000; // 1 second
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`Checking server status (attempt ${attempt}/${maxAttempts})...`);
      
      if (await isServerReady()) {
        isServerReady = true;
        console.log('✅ Test server is ready');
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, checkInterval));
    }
    
    throw new Error('Server did not become ready in time');
    
  } catch (error) {
    console.error('Failed to start test server:', error);
    await stopServer();
    throw error;
  }
}

/**
 * Stop the test server
 */
async function stopServer() {
  if (!serverProcess) {
    console.log('No server process to stop');
    return Promise.resolve();
  }
  
  console.log('Stopping test server...');
  
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.log('Force killing server process...');
      if (serverProcess) {
        process.kill(-serverProcess.pid, 'SIGKILL');
      }
      serverProcess = null;
      isServerReady = false;
      resolve();
    }, 5000);
    
    serverProcess.once('exit', () => {
      clearTimeout(timeout);
      console.log('✅ Test server stopped gracefully');
      serverProcess = null;
      isServerReady = false;
      resolve();
    });
    
    serverProcess.kill('SIGTERM');
  });
}

// Handle process termination
const cleanup = async () => {
  try {
    await stopServer();
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup().then(() => process.exit(0));
});
process.on('SIGTERM', () => {
  cleanup().then(() => process.exit(0));
});

// Ensure cleanup on unhandled rejections
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  cleanup().then(() => process.exit(1));
});

module.exports = {
  startServer,
  stopServer,
  resetTestDatabase,
  API_URL,
  isServerReady
};
