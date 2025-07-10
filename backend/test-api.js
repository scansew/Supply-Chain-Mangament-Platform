#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const FormData = require('form-data');
const { request } = require('http');

const API_URL = 'http://localhost:4000/graphql';
const ADMIN_CREDENTIALS = {
  email: 'admin@scansew.com',
  password: 'admin123'
};

// Helper function to make GraphQL requests
async function graphqlRequest(query, variables = {}, token = null) {
  const postData = JSON.stringify({
    query,
    variables
  });

  const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.errors) {
            reject(new Error(`GraphQL Error: ${JSON.stringify(result.errors, null, 2)}`));
          } else {
            resolve(result.data);
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${e.message}\nResponse: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

// Test login functionality
async function testLogin() {
  console.log('Testing login...');
  const LOGIN_MUTATION = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
          username
          role
        }
      }
    }
  `;

  try {
    const result = await graphqlRequest(LOGIN_MUTATION, {
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password
    });
    
    const { token, user } = result.login;
    console.log('✅ Login successful!');
    console.log('User:', user);
    console.log('Token:', token.substring(0, 30) + '...');
    return token;
  } catch (error) {
    console.error('❌ Login failed:', error.message);
    throw error;
  }
}

// Test getting current user with token
async function testMeQuery(token) {
  console.log('\nTesting me query...');
  const ME_QUERY = `
    query Me {
      me {
        id
        email
        username
        role
      }
    }
  `;

  try {
    const result = await graphqlRequest(ME_QUERY, {}, token);
    console.log('✅ Me query successful!');
    console.log('Current user:', result.me);
    return result.me;
  } catch (error) {
    console.error('❌ Me query failed:', error.message);
    throw error;
  }
}

// Test getting companies (public endpoint)
async function testCompaniesQuery() {
  try {
    console.log('\nTesting companies query...');
    const query = `
      query {
        companies {
          id
          name
          address
          createdAt
          updatedAt
        }
      }
    `;

    const data = await graphqlRequest(query);
    console.log('Companies query successful');
    console.log('Companies:', JSON.stringify(data.companies, null, 2));
    return true;
  } catch (error) {
    console.error('Companies query failed:', error.message);
    return false;
  }
}

// Test file upload functionality
async function testFileUpload(token) {
  try {
    console.log('\nTesting file upload...');
    
    // Create a test file
    const testFilePath = './test-upload.txt';
    fs.writeFileSync(testFilePath, 'This is a test file for upload');
    console.log('Created test file:', testFilePath);

    // Create form data for file upload
    const form = new FormData();
    form.append('operations', JSON.stringify({
      query: `
        mutation($file: Upload!) {
          singleUpload(file: $file) {
            id
            filename
            mimetype
            url
            size
            createdAt
          }
        }
      `,
      variables: {
        file: null
      }
    }));
    
    form.append('map', JSON.stringify({
      '0': ['variables.file']
    }));
    
    form.append('0', fs.createReadStream(testFilePath));

    // Make the upload request
    const response = await new Promise((resolve, reject) => {
      const req = request({
        hostname: 'localhost',
        port: 4000,
        path: '/graphql',
        method: 'POST',
        headers: {
          ...form.getHeaders(),
          'Authorization': `Bearer ${token}`
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      // Send the form data
      form.pipe(req);
    });

    if (response.errors) {
      throw new Error(`File upload failed: ${JSON.stringify(response.errors, null, 2)}`);
    }

    console.log('File upload successful!');
    console.log('Uploaded file info:', JSON.stringify(response.data.singleUpload, null, 2));
    
    // Clean up test file
    fs.unlinkSync(testFilePath);
    console.log('Cleaned up test file');
    
    return response.data.singleUpload;
  } catch (error) {
    console.error('File upload test failed:', error.message);
    throw error;
  }
}

// Main function to run all tests
async function runTests() {
  try {
    console.log('Starting API tests...');
    
    // Test login
    const token = await testLogin();
    if (!token) {
      console.error('Login test failed, cannot continue with other tests');
      return;
    }
    
    // Test getting current user
    await testMeQuery(token);
    
    // Test public companies query
    await testCompaniesQuery();
    
    // Test file upload
    await testFileUpload(token);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
runTests();
