
# Required Package.json Script Updates

Add these scripts to your package.json file:

```json
{
  "scripts": {
    "test:api": "jest tests/api --testTimeout=10000",
    "test:e2e": "playwright test",
    "test:performance": "artillery run tests/performance/load-test.yml",
    "test:all": "npm run test && npm run test:api && npm run test:e2e",
    "quality:metrics": "node scripts/quality-metrics.js",
    "quality:report": "npm run quality:metrics && cat quality-metrics.json"
  }
}
```

## Additional Dev Dependencies Needed

The following packages should be installed as dev dependencies:

- `jest` - For unit and API testing
- `@types/jest` - TypeScript support for Jest
- `artillery` - For performance testing  
- `@playwright/test` - For E2E testing
- `supertest` - For API testing
- `@types/supertest` - TypeScript support for Supertest

## Environment Variables

Create a `.env.test` file for test configuration:

```
DATABASE_URL=postgresql://test:test@localhost:5432/ambient_test
JWT_SECRET=test-secret-key
API_BASE_URL=http://localhost:3000
```
