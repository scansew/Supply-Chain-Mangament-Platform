const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

// Test user credentials
const TEST_EMAIL = 'admin@scansew.com';
const TEST_PASSWORD = 'admin123';
const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

// Helper function to execute GraphQL operations
async function executeGraphQL(query, variables = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  
  if (result.errors) {
    const error = new Error(result.errors[0].message);
    error.errors = result.errors;
    throw error;
  }
  
  return result.data;
}

// Test file upload
async function testFileUpload() {
  try {
    console.log('🚀 Starting file upload test...');

    // 1. Login to get auth token
    console.log('🔑 Logging in...');
    const loginMutation = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            email
          }
        }
      }
    `;

    const loginResult = await executeGraphQL(loginMutation, {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    const token = loginResult.login.token;
    console.log('✅ Logged in successfully');

    // 2. Create a test file
    const testFilePath = path.join(__dirname, 'test-upload.txt');
    fs.writeFileSync(testFilePath, 'This is a test file for upload');
    console.log('📄 Created test file');

    // 3. Upload the file using multipart form data
    console.log('⬆️  Uploading file...');
    
    // For file uploads, we need to use the multipart form data approach
    const form = new FormData();
    form.append('operations', JSON.stringify({
      query: `
        mutation SingleUpload($file: Upload!, $folder: String) {
          singleUpload(file: $file, folder: $folder) {
            id
            filename
            mimetype
            url
            key
            size
          }
        }
      `,
      variables: {
        file: null,
        folder: 'test-uploads',
      },
    }));

    form.append('map', JSON.stringify({ '0': ['variables.file'] }));
    form.append('0', fs.createReadStream(testFilePath));

    const uploadResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders(),
      },
      body: form,
    });

    const uploadResult = await uploadResponse.json();
    
    if (uploadResult.errors) {
      console.error('GraphQL Errors:', JSON.stringify(uploadResult.errors, null, 2));
      throw new Error(uploadResult.errors[0].message);
    }

    const { singleUpload: uploadedFile } = uploadResult.data;
    console.log('✅ File uploaded successfully:', {
      id: uploadedFile.id,
      filename: uploadedFile.filename,
      url: uploadedFile.url,
      size: uploadedFile.size,
    });

    // 4. Get file URL
    console.log('🔗 Getting file URL...');
    const getFileUrlQuery = `
      query GetFileUrl($key: String!) {
        getFileUrl(key: $key)
      }
    `;

    const urlResult = await executeGraphQL(
      getFileUrlQuery,
      { key: uploadedFile.key },
      token
    );

    console.log('✅ File URL:', urlResult.getFileUrl);

    // 5. Clean up - delete the test file
    console.log('🗑️  Cleaning up...');
    const deleteFileMutation = `
      mutation DeleteFile($key: String!) {
        deleteFile(key: $key)
      }
    `;

    await executeGraphQL(
      deleteFileMutation,
      { key: uploadedFile.key },
      token
    );

    console.log('✅ Test file deleted');
    
    // Clean up local test file
    fs.unlinkSync(testFilePath);
    
    console.log('🎉 File upload test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      try {
        const errorBody = await error.response.text();
        console.error('Response body:', errorBody);
      } catch (e) {
        console.error('Could not parse response body:', e);
      }
    }
    process.exit(1);
  }
}

// Run the test
testFileUpload();
