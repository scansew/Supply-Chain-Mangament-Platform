# Testing Guide

This document provides guidelines and best practices for testing the ScanSew backend.

## Table of Contents
- [Testing Strategy](#testing-strategy)
- [Test Types](#test-types)
- [Test Environment](#test-environment)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Data Management](#test-data-management)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Performance Testing](#performance-testing)
- [Security Testing](#security-testing)
- [Code Coverage](#code-coverage)
- [CI/CD Integration](#cicd-integration)

## Testing Strategy

We follow a testing pyramid approach:

1. **Unit Tests**: Test individual functions and components in isolation
2. **Integration Tests**: Test interactions between components
3. **E2E Tests**: Test complete user flows
4. **Performance Tests**: Ensure the system meets performance requirements
5. **Security Tests**: Identify vulnerabilities

## Test Types

### Unit Tests
- Test individual functions and methods
- Mock external dependencies
- Focus on business logic
- Fast execution

### Integration Tests
- Test API endpoints
- Test database interactions
- Test file uploads and storage
- Test authentication and authorization

### E2E Tests
- Test complete user flows
- Use a test database
- Include authentication flows
- Test error scenarios

## Test Environment

### Prerequisites
- Node.js 16+
- Docker and Docker Compose
- Test database (PostgreSQL)
- Test MinIO instance

### Environment Variables
Create a `.env.test` file:

```env
NODE_ENV=test
DATABASE_URL="postgresql://test:test@localhost:5433/scansew_test?schema=public"
JWT_SECRET=test-secret
JWT_EXPIRES_IN=1h
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=test-access-key
MINIO_SECRET_KEY=test-secret-key
MINIO_BUCKET=scansew-test
MINIO_USE_SSL=false
```

## Running Tests

### Unit Tests
```bash
npm test:unit
```

### Integration Tests
```bash
npm test:integration
```

### E2E Tests
```bash
npm test:e2e
```

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm test -- --watch
```

## Writing Tests

### Test Structure
```typescript
describe('User Service', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    
    userService = new UserService(mockUserRepository);
  });

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.getUserById('1');
      
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundError if user not found', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      await expect(userService.getUserById('999')).rejects.toThrow(NotFoundError);
    });
  });
});
```

### Testing GraphQL Resolvers

```typescript
describe('User Resolvers', () => {
  it('should return user profile', async () => {
    const query = `
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          email
          firstName
          lastName
        }
      }
    `;

    const variables = { id: '1' };
    
    const { data, errors } = await graphqlTestCall(
      schema,
      query,
      null,
      { user: { id: '1', role: 'ADMIN' } }, // context
      variables
    );

    expect(errors).toBeUndefined();
    expect(data.user).toHaveProperty('id', '1');
    expect(data.user).toHaveProperty('email');
  });
});
```

### Testing File Uploads

```typescript
describe('File Upload', () => {
  it('should upload a file', async () => {
    const file = {
      filename: 'test.txt',
      mimetype: 'text/plain',
      createReadStream: () => fs.createReadStream(path.join(__dirname, 'fixtures/test.txt')),
    };

    const result = await fileService.uploadFile({
      file,
      folder: 'test-uploads',
      userId: '1',
    });

    expect(result).toHaveProperty('key');
    expect(result).toHaveProperty('url');
    expect(result.mimetype).toBe('text/plain');
  });
});
```

## Test Data Management

### Fixtures
Store test data in `__tests__/fixtures/`:

```
__tests__/
  fixtures/
    users.json
    companies.json
    work-orders.json
```

### Factories
Use factory functions to create test data:

```typescript
export function createTestUser(overrides = {}) {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'password123',
    role: 'USER',
    ...overrides,
  };
}
```

## Integration Testing

### Database Setup
Use a test database with migrations:

```typescript
beforeAll(async () => {
  // Run migrations on test database
  await execSync('npx prisma migrate deploy');
  
  // Seed test data
  await seedTestData();
});

afterAll(async () => {
  // Clean up test database
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
  await prisma.$disconnect();
});
```

### Testing Authentication

```typescript
describe('Authentication', () => {
  it('should login with valid credentials', async () => {
    const user = await createTestUser({ password: 'password123' });
    
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              user { id email }
            }
          }
        `,
        variables: {
          email: user.email,
          password: 'password123',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.data.login).toHaveProperty('token');
    expect(response.body.data.login.user.email).toBe(user.email);
  });
});
```

## Performance Testing

### Load Testing with k6

```javascript
// tests/load/login.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:4000/graphql';
  const payload = JSON.stringify({
    query: `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: {
      email: 'test@example.com',
      password: 'password123',
    },
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'login successful': (r) => JSON.parse(r.body).data.login.token !== undefined,
  });

  sleep(1);
}
```

## Security Testing

### OWASP ZAP Integration

1. Install OWASP ZAP
2. Run automated scan:
   ```bash
   zap-cli quick-scan -s all -r http://localhost:4000/graphql
   ```

### Dependency Scanning

```bash
# Check for vulnerable dependencies
npm audit

# Or use Snyk
npx snyk test
```

## Code Coverage

Generate coverage report:

```bash
npm test -- --coverage
```

Configure in `jest.config.js`:

```javascript
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:13-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: scansew_test
        ports:
          - 5433:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      minio:
        image: minio/minio:latest
        env:
          MINIO_ROOT_USER: test-access-key
          MINIO_ROOT_PASSWORD: test-secret-key
        ports:
          - 9000:9000
        command: server /data --console-address ":9001"
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        env:
          DATABASE_URL: "postgresql://test:test@localhost:5433/scansew_test?schema=public"
          JWT_SECRET: test-secret
          MINIO_ENDPOINT: localhost
          MINIO_ACCESS_KEY: test-access-key
          MINIO_SECRET_KEY: test-secret-key
          MINIO_BUCKET: scansew-test
        run: npm test -- --coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v1
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          file: ./coverage/lcov.info
          fail_ci_if_error: false
```

## Best Practices

1. **Isolate Tests**: Each test should be independent
2. **Use Mocks**: For external services and slow operations
3. **Test Edge Cases**: Include boundary conditions and error cases
4. **Keep Tests Fast**: Aim for < 1s per test
5. **Use Descriptive Names**: Test names should describe the behavior being tested
6. **Test One Thing**: Each test should verify a single behavior
7. **Clean Up**: Always clean up test data after tests
8. **Use Snapshots**: For complex output verification
9. **Test Security**: Include tests for authentication and authorization
10. **Measure Coverage**: Aim for high test coverage, especially for critical paths
