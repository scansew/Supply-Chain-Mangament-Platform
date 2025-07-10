const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

describe('Authentication', () => {
  // Use consistent test user data
  const testUser = {
    email: `test-${uuidv4()}@example.com`,
    password: 'testPassword123!',
    username: `testuser${Math.floor(Math.random() * 10000)}`,
  };

  let authToken = null;

  // Helper function to make GraphQL requests
  async function makeGraphQLRequest(query, variables = {}) {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables })
    });

    const text = await response.text();
    let data;
    
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      console.error('Response text:', text);
      throw new Error(`Invalid JSON response: ${text.substring(0, 200)}...`);
    }

    if (!response.ok) {
      console.error('Request failed with status:', response.status);
      console.error('Response:', data);
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(`GraphQL Error: ${JSON.stringify(data.errors, null, 2)}`);
    }

    return data.data;
  }

  test('should register a new user', async () => {
    console.log('Starting registration test...');
    console.log('Test user:', testUser);
    
    const registerMutation = `
      mutation Register($input: SignUpInput!) {
        register(input: $input) {
          id
          email
          username
          role
        }
      }
    `;

    const variables = {
      input: {
        email: testUser.email,
        password: testUser.password,
        username: testUser.username,
        role: 'USER',
      },
    };

    console.log('Sending registration request...');
    
    try {
      const result = await makeGraphQLRequest(registerMutation, variables);
      console.log('Registration successful, result:', JSON.stringify(result, null, 2));
      
      // Verify the response structure
      expect(result).toHaveProperty('register');
      expect(result.register).toHaveProperty('id');
      expect(result.register.email).toBe(testUser.email);
      expect(result.register.username).toBe(testUser.username);
      
    } catch (error) {
      console.error('Registration test failed:', error);
      throw error;
    }
  });

  test('should login with valid credentials', async () => {
    const loginMutation = `
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

    const variables = {
      email: testUser.email,
      password: testUser.password,
    };

    const result = await graphqlRequest(loginMutation, variables);
    expect(result.login).toHaveProperty('token');
    expect(result.login.user).toHaveProperty('id');
    expect(result.login.user.email).toBe(testUser.email);
    
    // Store the token for subsequent tests
    authToken = result.login.token;
  });

  test('should get current user with valid token', async () => {
    expect(authToken).toBeTruthy();
    
    const meQuery = `
      query Me {
        me {
          id
          email
          username
          role
        }
      }
    `;

    const result = await graphqlRequest(meQuery, {}, authToken);
    expect(result.me).toHaveProperty('id');
    expect(result.me.email).toBe(testUser.email);
  });

  test('should not allow access with invalid token', async () => {
    const meQuery = `
      query Me {
        me {
          id
        }
      }
    `;

    await expect(graphqlRequest(meQuery, {}, 'invalid-token'))
      .rejects
      .toThrow();
  });

  test('should not allow login with invalid credentials', async () => {
    const loginMutation = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `;

    const variables = {
      email: testUser.email,
      password: 'wrongpassword',
    };

    await expect(graphqlRequest(loginMutation, variables))
      .rejects
      .toThrow();
  });
});
