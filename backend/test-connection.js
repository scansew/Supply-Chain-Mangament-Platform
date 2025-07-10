const fetch = require('node-fetch');

async function testConnection() {
  console.log('Testing server connection...');
  
  // Test health endpoint
  try {
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:4000/health');
    const healthText = await healthResponse.text();
    console.log(`Health endpoint status: ${healthResponse.status} ${healthResponse.statusText}`);
    console.log('Response:', healthText);
  } catch (error) {
    console.error('Health endpoint test failed:', error.message);
  }
  
  // Test GraphQL endpoint with introspection
  try {
    console.log('\n2. Testing GraphQL endpoint...');
    const gqlResponse = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '{ __schema { types { name } }'  // Introspection query
      })
    });
    
    console.log(`GraphQL endpoint status: ${gqlResponse.status} ${gqlResponse.statusText}`);
    const gqlText = await gqlResponse.text();
    console.log('Response:', gqlText.substring(0, 200) + (gqlText.length > 200 ? '...' : ''));
    
  } catch (error) {
    console.error('GraphQL endpoint test failed:', error.message);
  }
  
  // Test database connection through a simple query
  try {
    console.log('\n3. Testing database connection...');
    const dbTestQuery = `
      query TestDBConnection {
        companies(first: 1) {
          id
          name
        }
      }
    `;
    
    const dbResponse = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: dbTestQuery })
    });
    
    console.log(`Database test status: ${dbResponse.status} ${dbResponse.statusText}`);
    const dbText = await dbResponse.text();
    console.log('Response:', dbText);
    
  } catch (error) {
    console.error('Database connection test failed:', error.message);
  }
  
  console.log('\nConnection test completed.');
}

// Run the test
testConnection().catch(console.error);
