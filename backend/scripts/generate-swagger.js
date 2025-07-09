/**
 * @file Script to generate Swagger/OpenAPI documentation from JSDoc comments
 * @module scripts/generate-swagger
 */

const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const { version } = require('../package.json');

// Ensure the output directory exists
const outputDir = path.join(__dirname, '../docs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ScanSew API',
      version,
      description: 'API documentation for ScanSew backend services',
      contact: {
        name: 'ScanSew Support',
        email: 'support@scansew.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
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
        },
      },
    },
  },
  apis: [
    './src/**/*.js',
    './src/**/*.ts',
    './routes/*.js',
    './routes/*.ts',
    './utils/*.js',
    './utils/*.ts',
    './resolvers/*.js',
    './resolvers/*.ts',
    './index.js',
  ],
};

// Generate the OpenAPI specification
const openapiSpecification = swaggerJsdoc(options);

// Write the specification to a file
const outputFile = path.join(outputDir, 'openapi.json');
fs.writeFileSync(outputFile, JSON.stringify(openapiSpecification, null, 2));

console.log(`✅ OpenAPI specification generated at: ${outputFile}`);

// Also write a simplified version for easier reading
const simplifiedSpec = {
  ...openapiSpecification,
  paths: Object.keys(openapiSpecification.paths || {}).reduce((acc, path) => {
    acc[path] = Object.keys(openapiSpecification.paths[path]).reduce((methods, method) => {
      const { summary, description, parameters, requestBody, responses } = openapiSpecification.paths[path][method];
      methods[method] = { summary, description, parameters, requestBody, responses };
      return methods;
    }, {});
    return acc;
  }, {}),
};

const simplifiedOutputFile = path.join(outputDir, 'openapi-simplified.json');
fs.writeFileSync(simplifiedOutputFile, JSON.stringify(simplifiedSpec, null, 2));

console.log(`✅ Simplified OpenAPI specification generated at: ${simplifiedOutputFile}`);

module.exports = openapiSpecification;
