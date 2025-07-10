const fetch = require('node-fetch');

// Enable detailed logging
process.env.DEBUG = 'jest,test,server';

// Helper function to log detailed information
function logDebug(message, data = undefined) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  if (data !== undefined) {
    console.log(JSON.stringify(data, null, 2));
  }
}

describe('Smoke Test', () => {
  beforeAll(() => {
    logDebug('Starting smoke tests');
    logDebug('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      API_URL: global.API_URL,
      DATABASE_URL: process.env.DATABASE_URL
    });
  });

  test('GraphQL endpoint should be accessible', async () => {
    logDebug('Starting GraphQL endpoint test');
    
    const query = `
      query IntrospectionQuery {
        __schema {
          types {
            name
            kind
          }
        }
      }
    `;
    
    logDebug('Using GraphQL query:', { query });

    try {
      console.log(`Testing GraphQL endpoint at ${global.API_URL}...`);
      
      // Test GraphQL introspection query
      const response = await fetch(global.API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      
      const status = response.status;
      console.log('Response status:', status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${status}`);
      }
      
      const text = await response.text();
      console.log('Response text length:', text.length);
      
      // Parse response and validate schema
      let responseData;
      try {
        responseData = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        console.error('Response text:', text);
        throw e;
      }
      
      console.log('Response data keys:', Object.keys(responseData));
      
      expect(responseData).toHaveProperty('data.__schema.types');
      expect(Array.isArray(responseData.data.__schema.types)).toBe(true);
      
      const types = responseData.data.__schema.types;
      console.log(`Found ${types.length} GraphQL types`);
      
      // Check for some expected types
      const typeNames = types.map(t => t.name);
      console.log('Available types sample:', typeNames.slice(0, 10), '...');
      
      // Check for required types (be less strict in smoke test)
      const requiredTypes = ['Query', 'Mutation'];
      requiredTypes.forEach(type => {
        expect(typeNames).toContain(type);
      });
      
    } catch (error) {
      console.error('GraphQL endpoint test failed:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response body:', await error.response.text());
      }
      throw error;
    }
  });
});
