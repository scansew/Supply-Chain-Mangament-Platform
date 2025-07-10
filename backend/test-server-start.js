console.log('Current working directory:', process.cwd());
console.log('Loading test helpers...');

// Enable debug logging
process.env.DEBUG = '*';

let testHelpers;
try {
  testHelpers = require('./__tests__/testHelpers');
  console.log('Test helpers loaded successfully');
} catch (error) {
  console.error('Error loading test helpers:', error);
  process.exit(1);
}

// Override console methods to add timestamps
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info
};

function timestamp() {
  return new Date().toISOString();
}

console.log = (...args) => originalConsole.log(`[${timestamp()}]`, ...args);
console.error = (...args) => originalConsole.error(`[${timestamp()}] ERROR:`, ...args);
console.warn = (...args) => originalConsole.warn(`[${timestamp()}] WARN:`, ...args);
console.info = (...args) => originalConsole.info(`[${timestamp()}] INFO:`, ...args);

const { startServer, stopServer } = testHelpers;

async function testServer() {
  console.log('Starting server...');
  try {
    await startServer();
    console.log('Server started successfully!');
    console.log('Press Ctrl+C to stop the server');
    
    // Keep the process running
    process.on('SIGINT', async () => {
      console.log('Stopping server...');
      await stopServer();
      console.log('Server stopped');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

testServer();
