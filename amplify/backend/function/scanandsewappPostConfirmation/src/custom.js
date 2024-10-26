const { request, gql } = require("graphql-request");
const https = require("https");

const graphqlEndpoint = process.env.API_SCANANDSEWAPP_GRAPHQLAPIENDPOINTOUTPUT;
const apiKey = process.env.API_SCANANDSEWAPP_GRAPHQLAPIKEYOUTPUT;

const customFetch = (url, options) => {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () =>
        resolve({ status: res.statusCode, text: () => Promise.resolve(data) })
      );
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
};

exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const createUserMutation = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        username
        email
        family_name
        given_name
      }
    }
  `;

  const variables = {
    input: {
      username: event.userName,
      email: event.request.userAttributes.email,
      family_name: event.request.userAttributes.family_name,
      given_name: event.request.userAttributes.given_name,
    },
  };

  try {
    const result = await request({
      url: graphqlEndpoint,
      document: createUserMutation,
      variables: variables,
      requestHeaders: {
        "x-api-key": apiKey,
      },
      fetch: customFetch,
    });

    return event;
  } catch (error) {
    console.error("Error creating user in AppSync:", error);
    throw error;
  }
};
