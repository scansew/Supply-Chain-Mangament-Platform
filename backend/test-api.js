#!/usr/bin/env node

const http = require('http');

const query = JSON.stringify({
  query: '{ companies { id name address } }'
});

const options = {
  hostname: 'localhost',
  port: 4000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(query)
  }
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.data && json.data.companies) {
        console.log('API is running. Companies:', json.data.companies);
        process.exit(0);
      } else {
        console.error('API responded but no companies data:', data);
        process.exit(1);
      }
    } catch (e) {
      console.error('Failed to parse response:', data);
      process.exit(1);
    }
  });
});

req.on('error', error => {
  console.error('API is not running:', error.message);
  process.exit(1);
});

req.write(query);
req.end();
