/**
 * Swagger/OpenAPI configuration for ScanSew API documentation
 * @module config/swagger
 */

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../package.json');

// Define the Swagger specification
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ScanSew API Documentation',
    version,
    description: 'Comprehensive API documentation for ScanSew backend services',
    contact: {
      name: 'ScanSew Support',
      email: 'support@scansew.com',
      url: 'https://scansew.com/support',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    termsOfService: 'https://scansew.com/terms',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Development server',
    },
    {
      url: 'https://api.scansew.com',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
    },
    schemas: {
      GraphQLRequest: {
        type: 'object',
        required: ['query'],
        properties: {
          query: {
            type: 'string',
            description: 'The GraphQL query/mutation to execute',
            example: 'query { users { id, email } }',
          },
          variables: {
            type: 'object',
            description: 'Variables for the GraphQL query/mutation',
            example: { userId: '123' },
          },
          operationName: {
            type: 'string',
            description: 'Name of the operation if multiple are present in the query',
          },
        },
      },
      GraphQLResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            description: 'The response data if the request was successful',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                locations: { type: 'array' },
                path: { type: 'array' },
                extensions: { type: 'object' },
              },
            },
            description: 'Any errors that occurred during execution',
          },
        },
      },
    },
  },
  paths: {
    '/graphql': {
      post: {
        summary: 'GraphQL Endpoint',
        description: 'Main GraphQL endpoint for all queries and mutations',
        tags: ['GraphQL'],
        security: [{
          bearerAuth: [],
        }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GraphQLRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful GraphQL response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/GraphQLResponse',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request - Invalid GraphQL query',
          },
          '401': {
            description: 'Unauthorized - Authentication required',
          },
          '500': {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'GraphQL',
      description: 'GraphQL API endpoints',
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    './src/**/*.js',
    './typeDefs/*.js',
    './resolvers/*.js',
  ],
};

// Generate OpenAPI specification
const specs = swaggerJsdoc(options);

// Add GraphQL schema documentation
specs.tags = specs.tags || [];

// Add common response schemas
if (!specs.components) specs.components = {};
if (!specs.components.schemas) specs.components.schemas = {};

// Add GraphQL endpoint documentation
specs.paths = specs.paths || {};
specs.paths['/graphql'] = swaggerDefinition.paths['/graphql'];

/**
 * Set up Swagger UI middleware
 * @param {import('express').Application} app - Express application instance
 */
const setupSwagger = (app) => {
  // Serve Swagger UI with custom options
  const swaggerUiOptions = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'ScanSew API Documentation',
  };
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));
  
  // Serve API docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  
  console.log(`📚 API Documentation available at http://localhost:${process.env.PORT || 4000}/api-docs`);
  console.log(`🔍 GraphQL Playground available at http://localhost:${process.env.PORT || 4000}/graphql`);
};

module.exports = setupSwagger;
