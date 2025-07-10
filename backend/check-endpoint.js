const http = require('http');
const { URL } = require('url');

const TEST_URL = 'http://localhost:4001/graphql';

console.log(`Testing connection to ${TEST_URL}...`);

const options = new URL(TEST_URL);
options.method = 'POST';
options.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log('HEADERS:', JSON.stringify(res.headers, null, 2));
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      console.log('RESPONSE BODY:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch (e) {
      console.log('RAW RESPONSE:');
      console.log(data);
    }
  });
});

req.on('error', (e) => {
  console.error('REQUEST ERROR:', e);
});

// Send a simple GraphQL introspection query
const query = JSON.stringify({
  query: '{ __schema { types { name } }' 
});

console.log('Sending request with body:', query);
req.write(query);
req.end();
