const { v4: uuidv4 } = require('uuid');

describe('Company Management', () => {
  let authToken = null;
  let testCompanyId = null;
  const testCompanyName = `Test Company ${Math.floor(Math.random() * 10000)}`;

  // Setup: Login before tests
  beforeAll(async () => {
    // Use admin credentials for testing company management
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

  test('should create a new company', async () => {
    const createCompanyMutation = `
      mutation CreateCompany($input: CompanyInput!) {
        createCompany(input: $input) {
          id
          name
          address
          contactEmail
          phone
          createdAt
          updatedAt
        }
      }
    `;

    const variables = {
      input: {
        name: testCompanyName,
        address: '123 Test St, Test City',
        contactEmail: `contact@${testCompanyName.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: '+1234567890',
      }
    };

    const result = await graphqlRequest(createCompanyMutation, variables, authToken);
    
    // Store the company ID for later tests
    testCompanyId = result.createCompany.id;

    // Assertions
    expect(result.createCompany).toHaveProperty('id');
    expect(result.createCompany.name).toBe(testCompanyName);
    expect(result.createCompany.contactEmail).toBe(variables.input.contactEmail);
  });

  test('should get company by ID', async () => {
    expect(testCompanyId).toBeTruthy();
    
    const query = `
      query GetCompany($id: ID!) {
        company(id: $id) {
          id
          name
          contactEmail
          phone
        }
      }
    `;

    const variables = {
      id: testCompanyId
    };

    const result = await graphqlRequest(query, variables, authToken);
    
    expect(result.company).toBeDefined();
    expect(result.company.id).toBe(testCompanyId);
    expect(result.company.name).toBe(testCompanyName);
  });

  test('should update company information', async () => {
    expect(testCompanyId).toBeTruthy();
    
    const updateCompanyMutation = `
      mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
        updateCompany(id: $id, input: $input) {
          id
          name
          address
          contactEmail
          phone
        }
      }
    `;

    const variables = {
      id: testCompanyId,
      input: {
        name: `${testCompanyName} Updated`,
        phone: '+1987654321',
        // Other fields remain the same
      }
    };

    const result = await graphqlRequest(updateCompanyMutation, variables, authToken);
    
    expect(result.updateCompany).toBeDefined();
    expect(result.updateCompany.id).toBe(testCompanyId);
    expect(result.updateCompany.name).toBe(`${testCompanyName} Updated`);
    expect(result.updateCompany.phone).toBe('+1987654321');
  });

  test('should list all companies', async () => {
    const query = `
      query Companies {
        companies {
          id
          name
          contactEmail
          phone
        }
      }
    `;

    const result = await graphqlRequest(query, {}, authToken);
    
    expect(Array.isArray(result.companies)).toBe(true);
    expect(result.companies.length).toBeGreaterThan(0);
    
    // Verify our test company is in the list
    const testCompany = result.companies.find(company => company.id === testCompanyId);
    expect(testCompany).toBeDefined();
    expect(testCompany.name).toBe(`${testCompanyName} Updated`);
  });

  test('should delete a company', async () => {
    expect(testCompanyId).toBeTruthy();
    
    const deleteCompanyMutation = `
      mutation DeleteCompany($id: ID!) {
        deleteCompany(id: $id) {
          id
          name
        }
      }
    `;

    const variables = {
      id: testCompanyId
    };

    const result = await graphqlRequest(deleteCompanyMutation, variables, authToken);
    
    expect(result.deleteCompany).toBeDefined();
    expect(result.deleteCompany.id).toBe(testCompanyId);
    
    // Verify the company was deleted
    const query = `
      query GetCompany($id: ID!) {
        company(id: $id) {
          id
        }
      }
    `;

    await expect(graphqlRequest(query, { id: testCompanyId }, authToken))
      .rejects
      .toThrow();
  });
});
