const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

const { v4: uuidv4 } = require('uuid');

describe('File Upload', () => {
  let authToken = null;
  let testFilePath = null;
  let testFileId = null;

  // Setup: Login before tests
  beforeAll(async () => {
    // Use admin credentials for testing file uploads
    const loginMutation = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

    const variables = {
      email: 'admin@scansew.com',
      password: 'admin123'
    };

    try {
      const result = await graphqlRequest(loginMutation, variables);
      authToken = result.login.token;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  });

  // Cleanup: Remove test file after tests
  afterAll(() => {
    if (testFilePath && fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test('should upload a file successfully', async () => {
    // Create a test file
    testFilePath = path.join(__dirname, `test-upload-${Date.now()}.txt`);
    const fileContent = 'This is a test file for upload';
    fs.writeFileSync(testFilePath, fileContent);

    // Create form data
    const form = new FormData();
    form.append('operations', JSON.stringify({
      query: `
        mutation UploadFile($file: Upload!) {
          uploadFile(file: $file) {
            id
            filename
            mimetype
            size
            url
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

    form.append('0', fs.createReadStream(testFilePath), {
      filename: 'test-upload.txt',
      contentType: 'text/plain'
    });

    // Make the request
    const response = await fetch(global.API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        ...form.getHeaders()
      },
      body: form
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('File upload error:', result.errors);
      throw new Error(result.errors[0].message);
    }

    const { uploadFile } = result.data;
    
    // Store file ID for later tests
    testFileId = uploadFile.id;

    // Assertions
    expect(uploadFile).toHaveProperty('id');
    expect(uploadFile.filename).toBe('test-upload.txt');
    expect(uploadFile.mimetype).toBe('text/plain');
    expect(uploadFile.size).toBe(Buffer.byteLength(fileContent));
    expect(uploadFile.url).toBeTruthy();
  });

  test('should get file by ID', async () => {
    expect(testFileId).toBeTruthy();
    
    const query = `
      query GetFile($id: ID!) {
        file(id: $id) {
          id
          filename
          mimetype
          size
        }
      }
    `;

    const variables = {
      id: testFileId
    };

    const result = await graphqlRequest(query, variables, authToken);
    
    expect(result.file).toBeDefined();
    expect(result.file.id).toBe(testFileId);
    expect(result.file.filename).toBe('test-upload.txt');
  });

  test('should list all files', async () => {
    const query = `
      query Files {
        files {
          id
          filename
          mimetype
          size
        }
      }
    `;

    const result = await graphqlRequest(query, {}, authToken);
    
    expect(Array.isArray(result.files)).toBe(true);
    expect(result.files.length).toBeGreaterThan(0);
    
    // Verify our test file is in the list
    const testFile = result.files.find(file => file.id === testFileId);
    expect(testFile).toBeDefined();
    expect(testFile.filename).toBe('test-upload.txt');
  });
});
