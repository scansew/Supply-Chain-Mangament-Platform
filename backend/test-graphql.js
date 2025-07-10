const fetch = require('node-fetch');

async function testGraphQL() {
  const url = 'http://localhost:4000/graphql';
  const query = `
    query {
      __schema {
        types {
          name
          kind
        }
      }
    }
  `;

  console.log('Sending GraphQL request to:', url);
  console.log('Query:', JSON.stringify(query, null, 2));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify([...response.headers.entries()], null, 2));
    
    const text = await response.text();
    console.log('Response body:', text);
    
    try {
      const json = JSON.parse(text);
      console.log('Parsed JSON response:', JSON.stringify(json, null, 2));
      return json;
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      return { error: 'Invalid JSON response', text };
    }
  } catch (error) {
    console.error('Request failed:', error);
    return { error: error.message };
  }
}

// Run the test
testGraphQL().then(result => {
  console.log('Test completed');
  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    process.exit(1);
  }
}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
