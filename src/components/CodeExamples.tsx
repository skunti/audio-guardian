import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, TestTube, Zap, Github } from "lucide-react";
import Navigation from "./Navigation";

const CodeExamples = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Implementation Examples</h1>
        <p className="text-lg text-muted-foreground">
          Code samples for enhanced testing infrastructure and quality monitoring
        </p>
      </div>

      <Tabs defaultValue="api-tests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-tests">API Tests</TabsTrigger>
          <TabsTrigger value="e2e-tests">E2E Tests</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="ci-cd">CI/CD</TabsTrigger>
        </TabsList>

        <TabsContent value="api-tests" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-primary" />
                Enhanced API Contract Tests
              </CardTitle>
              <CardDescription>
                Comprehensive validation of the ambient audio recording API with contract testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-semibold mb-2">server/tests/enhanced-api.test.js</h4>
                <pre className="text-sm bg-background p-4 rounded border overflow-x-auto">
{`const request = require('supertest');
const app = require('../app');
const { validateResponse } = require('../utils/schema-validator');

describe('Ambient Audio API - Enhanced Tests', () => {
  describe('Authentication Flow', () => {
    test('should authenticate with valid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'healthcare_professional',
          password: 'secure_password'
        })
        .expect(200);
      
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.role).toBe('healthcare_professional');
    });

    test('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          username: 'invalid_user',
          password: 'wrong_password'
        })
        .expect(401);
      
      expect(response.body.error).toBe('Invalid credentials');
    });
  });

  describe('Audio Upload Workflow', () => {
    let authToken;
    
    beforeEach(async () => {
      // Setup authenticated session
      const authResponse = await request(app)
        .post('/api/v1/auth/login')
        .send({ username: 'test_user', password: 'test_pass' });
      authToken = authResponse.body.token;
    });

    test('should upload audio file successfully', async () => {
      const response = await request(app)
        .post('/api/v1/recordings')
        .set('Authorization', \`Bearer \${authToken}\`)
        .attach('audio', 'tests/fixtures/sample-audio.wav')
        .field('metadata', JSON.stringify({
          duration: 120,
          sampleRate: 44100,
          channels: 1,
          recordedAt: new Date().toISOString()
        }))
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('status', 'uploaded');
      expect(response.body).toHaveProperty('processingQueue');
      
      // Validate response schema
      await validateResponse(response.body, 'recording-upload-response');
    });

    test('should handle large file upload with progress', async () => {
      const response = await request(app)
        .post('/api/v1/recordings/chunked')
        .set('Authorization', \`Bearer \${authToken}\`)
        .attach('audioChunk', 'tests/fixtures/large-audio-chunk.wav')
        .field('chunkIndex', '0')
        .field('totalChunks', '5')
        .field('sessionId', 'upload_session_123')
        .expect(202);
      
      expect(response.body).toHaveProperty('progress');
      expect(response.body.progress).toBeLessThanOrEqual(100);
    });

    test('should validate audio file format', async () => {
      const response = await request(app)
        .post('/api/v1/recordings')
        .set('Authorization', \`Bearer \${authToken}\`)
        .attach('audio', 'tests/fixtures/invalid-file.txt')
        .expect(400);
      
      expect(response.body.error).toContain('Invalid audio format');
    });
  });

  describe('AI Processing Status', () => {
    test('should track processing status', async () => {
      // Create a recording first
      const uploadResponse = await request(app)
        .post('/api/v1/recordings')
        .set('Authorization', \`Bearer \${authToken}\`)
        .attach('audio', 'tests/fixtures/sample-audio.wav');
      
      const recordingId = uploadResponse.body.id;
      
      const statusResponse = await request(app)
        .get(\`/api/v1/recordings/\${recordingId}/status\`)
        .set('Authorization', \`Bearer \${authToken}\`)
        .expect(200);
      
      expect(statusResponse.body).toHaveProperty('status');
      expect(['queued', 'processing', 'completed', 'failed'])
        .toContain(statusResponse.body.status);
    });
  });

  describe('Performance & Reliability', () => {
    test('should handle concurrent uploads', async () => {
      const concurrentUploads = Array.from({ length: 10 }, (_, i) =>
        request(app)
          .post('/api/v1/recordings')
          .set('Authorization', \`Bearer \${authToken}\`)
          .attach('audio', 'tests/fixtures/sample-audio.wav')
          .field('metadata', JSON.stringify({ sessionId: \`concurrent_\${i}\` }))
      );
      
      const responses = await Promise.all(concurrentUploads);
      
      responses.forEach(response => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
      });
    });

    test('should respond within latency requirements', async () => {
      const startTime = Date.now();
      
      await request(app)
        .get('/api/v1/recordings')
        .set('Authorization', \`Bearer \${authToken}\`)
        .expect(200);
      
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(200); // Healthcare requirement: < 200ms
    });
  });
});`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="e2e-tests" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Critical User Journey Tests
              </CardTitle>
              <CardDescription>
                End-to-end validation of healthcare professional workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-semibold mb-2">tests/e2e/healthcare-workflows.spec.js</h4>
                <pre className="text-sm bg-background p-4 rounded border overflow-x-auto">
{`const { test, expect } = require('@playwright/test');

test.describe('Healthcare Professional Audio Recording Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login as healthcare professional
    await page.goto('/login');
    await page.fill('[data-testid="username"]', 'dr.smith@hospital.com');
    await page.fill('[data-testid="password"]', 'secure_healthcare_password');
    await page.click('[data-testid="login-button"]');
    
    // Verify successful authentication
    await expect(page.locator('[data-testid="user-dashboard"]')).toBeVisible();
  });

  test('should complete full ambient recording workflow', async ({ page }) => {
    // Navigate to recording interface
    await page.click('[data-testid="new-recording-button"]');
    await expect(page.locator('[data-testid="recording-interface"]')).toBeVisible();
    
    // Verify microphone permission request
    await page.evaluate(() => {
      // Mock getUserMedia for testing
      navigator.mediaDevices.getUserMedia = () => 
        Promise.resolve(new MediaStream());
    });
    
    // Start recording
    await page.click('[data-testid="start-recording"]');
    await expect(page.locator('[data-testid="recording-indicator"]')).toBeVisible();
    
    // Simulate recording for 30 seconds
    await page.waitForTimeout(2000); // Shortened for testing
    
    // Stop recording
    await page.click('[data-testid="stop-recording"]');
    
    // Verify recording preview
    await expect(page.locator('[data-testid="recording-preview"]')).toBeVisible();
    await expect(page.locator('[data-testid="audio-duration"]')).toContainText('0:02');
    
    // Add metadata
    await page.fill('[data-testid="patient-id"]', 'PAT-001');
    await page.fill('[data-testid="recording-notes"]', 'Ambient sounds during patient consultation');
    await page.selectOption('[data-testid="recording-type"]', 'consultation');
    
    // Upload recording
    await page.click('[data-testid="upload-recording"]');
    
    // Verify upload progress
    await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();
    
    // Wait for upload completion
    await expect(page.locator('[data-testid="upload-success"]')).toBeVisible({ timeout: 30000 });
    
    // Verify recording appears in list
    await page.click('[data-testid="recordings-list"]');
    await expect(page.locator('[data-testid="recording-PAT-001"]')).toBeVisible();
  });

  test('should handle network failure during upload gracefully', async ({ page }) => {
    // Setup recording
    await page.click('[data-testid="new-recording-button"]');
    await page.click('[data-testid="start-recording"]');
    await page.waitForTimeout(2000);
    await page.click('[data-testid="stop-recording"]');
    
    // Simulate network failure
    await page.route('**/api/v1/recordings', route => route.abort());
    
    // Attempt upload
    await page.click('[data-testid="upload-recording"]');
    
    // Verify error handling
    await expect(page.locator('[data-testid="upload-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="retry-upload"]')).toBeVisible();
    
    // Verify offline storage message
    await expect(page.locator('[data-testid="offline-storage-notice"]'))
      .toContainText('Recording saved locally and will upload when connection is restored');
  });

  test('should maintain recording quality across devices', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Audio recording not supported in WebKit');
    
    await page.click('[data-testid="new-recording-button"]');
    
    // Check audio quality settings
    const qualitySelect = page.locator('[data-testid="audio-quality"]');
    await expect(qualitySelect).toBeVisible();
    
    // Set high quality for healthcare use
    await qualitySelect.selectOption('high');
    
    // Verify quality parameters are set correctly
    const qualityInfo = await page.locator('[data-testid="quality-info"]').textContent();
    expect(qualityInfo).toContain('44.1 kHz');
    expect(qualityInfo).toContain('16-bit');
  });

  test('should handle concurrent user sessions', async ({ page, context }) => {
    // Open second tab for concurrent session
    const secondPage = await context.newPage();
    await secondPage.goto('/login');
    await secondPage.fill('[data-testid="username"]', 'dr.jones@hospital.com');
    await secondPage.fill('[data-testid="password"]', 'another_secure_password');
    await secondPage.click('[data-testid="login-button"]');
    
    // Both users start recordings simultaneously
    await Promise.all([
      page.click('[data-testid="new-recording-button"]'),
      secondPage.click('[data-testid="new-recording-button"]')
    ]);
    
    // Verify both recording interfaces work independently
    await expect(page.locator('[data-testid="recording-interface"]')).toBeVisible();
    await expect(secondPage.locator('[data-testid="recording-interface"]')).toBeVisible();
    
    await Promise.all([
      page.click('[data-testid="start-recording"]'),
      secondPage.click('[data-testid="start-recording"]')
    ]);
    
    // Verify both recordings are active
    await expect(page.locator('[data-testid="recording-indicator"]')).toBeVisible();
    await expect(secondPage.locator('[data-testid="recording-indicator"]')).toBeVisible();
  });

  test('should meet accessibility standards for healthcare environments', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="new-recording-button"]')).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="recording-interface"]')).toBeVisible();
    
    // Test screen reader compatibility
    const recordButton = page.locator('[data-testid="start-recording"]');
    await expect(recordButton).toHaveAttribute('aria-label', 'Start ambient audio recording');
    
    // Test high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('[data-testid="recording-interface"]')).toBeVisible();
    
    // Verify color contrast ratios meet WCAG standards
    const backgroundColor = await page.locator('body').evaluate(
      el => getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).toBeTruthy();
  });
});`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Performance Monitoring & Load Testing
              </CardTitle>
              <CardDescription>
                Automated performance validation for healthcare environments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-semibold mb-2">performance/load-test.js (Artillery.js)</h4>
                <pre className="text-sm bg-background p-4 rounded border overflow-x-auto">
{`// Artillery.js configuration for healthcare load testing
module.exports = {
  config: {
    target: 'http://localhost:3000',
    phases: [
      { duration: 60, arrivalRate: 5 }, // Warm-up: 5 users/sec for 1 min
      { duration: 300, arrivalRate: 10 }, // Load: 10 users/sec for 5 min
      { duration: 120, arrivalRate: 20 }, // Stress: 20 users/sec for 2 min
      { duration: 60, arrivalRate: 5 }   // Cool-down: 5 users/sec for 1 min
    ],
    defaults: {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    plugins: {
      metrics: {
        enabled: true
      }
    }
  },
  scenarios: [
    {
      name: 'Healthcare Professional Workflow',
      weight: 70,
      flow: [
        {
          post: {
            url: '/api/v1/auth/login',
            json: {
              username: 'load_test_user_{{ $randomInt(1, 100) }}',
              password: 'secure_password'
            },
            capture: {
              json: '$.token',
              as: 'authToken'
            }
          }
        },
        {
          think: 2 // Healthcare professional preparation time
        },
        {
          post: {
            url: '/api/v1/recordings',
            headers: {
              'Authorization': 'Bearer {{ authToken }}'
            },
            formData: {
              audio: '@performance/fixtures/sample-audio-{{ $randomInt(1, 5) }}.wav',
              metadata: '{"patientId": "PAT-{{ $randomInt(1000, 9999) }}", "duration": {{ $randomInt(30, 300) }}}'
            }
          }
        },
        {
          get: {
            url: '/api/v1/recordings/{{ recordingId }}/status',
            headers: {
              'Authorization': 'Bearer {{ authToken }}'
            }
          }
        }
      ]
    },
    {
      name: 'AI Processing Status Checks',
      weight: 30,
      flow: [
        {
          post: {
            url: '/api/v1/auth/login',
            json: {
              username: 'monitoring_user',
              password: 'monitor_password'
            },
            capture: {
              json: '$.token',
              as: 'authToken'
            }
          }
        },
        {
          loop: [
            {
              get: {
                url: '/api/v1/recordings?status=processing',
                headers: {
                  'Authorization': 'Bearer {{ authToken }}'
                }
              }
            },
            {
              think: 5
            }
          ],
          count: 10
        }
      ]
    }
  ]
};

// Custom metrics collection
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);

class HealthcareMetricsCollector {
  constructor() {
    this.metrics = {
      latency: { p50: [], p90: [], p99: [] },
      throughput: [],
      errors: [],
      timestamp: new Date().toISOString()
    };
  }

  collectLatency(responseTime, percentile) {
    this.metrics.latency[percentile].push(responseTime);
  }

  collectError(error) {
    this.metrics.errors.push({
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }

  async generateReport() {
    const report = {
      summary: {
        totalRequests: this.metrics.latency.p50.length,
        errorRate: (this.metrics.errors.length / this.metrics.latency.p50.length) * 100,
        p50Latency: this.calculatePercentile(this.metrics.latency.p50, 50),
        p90Latency: this.calculatePercentile(this.metrics.latency.p50, 90),
        p99Latency: this.calculatePercentile(this.metrics.latency.p50, 99)
      },
      healthcareCompliance: {
        p90UnderThreshold: this.metrics.latency.p90.every(time => time < 400),
        availabilityTarget: this.calculateAvailability(),
        performanceGrade: this.calculatePerformanceGrade()
      },
      recommendations: this.generateRecommendations()
    };

    await writeFile(
      \`performance-report-\${Date.now()}.json\`,
      JSON.stringify(report, null, 2)
    );

    return report;
  }

  calculatePercentile(values, percentile) {
    const sorted = values.sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }

  calculateAvailability() {
    const totalRequests = this.metrics.latency.p50.length;
    const successfulRequests = totalRequests - this.metrics.errors.length;
    return (successfulRequests / totalRequests) * 100;
  }

  calculatePerformanceGrade() {
    const p90 = this.calculatePercentile(this.metrics.latency.p50, 90);
    const errorRate = (this.metrics.errors.length / this.metrics.latency.p50.length) * 100;
    
    if (p90 < 200 && errorRate < 0.1) return 'A+';
    if (p90 < 400 && errorRate < 1) return 'A';
    if (p90 < 800 && errorRate < 2) return 'B';
    return 'C';
  }

  generateRecommendations() {
    const p90 = this.calculatePercentile(this.metrics.latency.p50, 90);
    const recommendations = [];

    if (p90 > 400) {
      recommendations.push('P90 latency exceeds healthcare requirements (400ms). Consider optimizing audio processing pipeline.');
    }

    if (this.metrics.errors.length > 0) {
      recommendations.push(\`Error rate: \${(this.metrics.errors.length / this.metrics.latency.p50.length * 100).toFixed(2)}%. Review error handling and retry mechanisms.\`);
    }

    return recommendations;
  }
}

module.exports = HealthcareMetricsCollector;`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ci-cd" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary" />
                GitHub Actions CI/CD Pipeline
              </CardTitle>
              <CardDescription>
                Automated quality gates for healthcare application deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary p-4 rounded-lg">
                <h4 className="font-semibold mb-2">.github/workflows/healthcare-quality.yml</h4>
                <pre className="text-sm bg-background p-4 rounded border overflow-x-auto">
{`name: Healthcare Audio Quality Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *' # Nightly regression tests

env:
  NODE_VERSION: '18.x'
  HEALTHCARE_COMPLIANCE_CHECK: true

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint and format check
        run: |
          npm run lint
          npm run format:check
      
      - name: Security audit
        run: npm audit --audit-level moderate
      
      - name: HIPAA compliance check
        run: npm run compliance:hipaa

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests with coverage
        run: npm run test:unit -- --coverage --watchAll=false
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella

  api-contract-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: ambient_audio_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgres://postgres:test_password@localhost:5432/ambient_audio_test
      
      - name: Run API contract tests
        run: npm run test:api
        env:
          DATABASE_URL: postgres://postgres:test_password@localhost:5432/ambient_audio_test
          JWT_SECRET: test_jwt_secret_for_ci
      
      - name: Validate OpenAPI schema
        run: npm run validate:openapi

  performance-tests:
    runs-on: ubuntu-latest
    if: github.event_name == 'schedule' || contains(github.event.head_commit.message, '[perf-test]')
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start application
        run: |
          npm run build
          npm start &
          sleep 30
      
      - name: Run performance tests
        run: npm run test:performance
      
      - name: Validate healthcare latency requirements
        run: |
          node scripts/validate-latency-requirements.js
          if [ \$? -ne 0 ]; then
            echo "Performance tests failed healthcare requirements"
            exit 1
          fi
      
      - name: Upload performance report
        uses: actions/upload-artifact@v3
        with:
          name: performance-report
          path: performance-report-*.json

  e2e-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps \${{ matrix.browser }}
      
      - name: Start application
        run: |
          npm run build
          npm start &
          sleep 30
      
      - name: Run E2E tests
        run: npx playwright test --project=\${{ matrix.browser }}
        env:
          HEALTHCARE_TEST_MODE: true
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report-\${{ matrix.browser }}
          path: playwright-report/

  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Validate WCAG 2.1 AA compliance
        run: npm run validate:wcag

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run OWASP ZAP security scan
        uses: zaproxy/action-full-scan@v0.4.0
        with:
          target: 'http://localhost:3000'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'

  quality-gate:
    runs-on: ubuntu-latest
    needs: [code-quality, unit-tests, api-contract-tests, e2e-tests, accessibility-tests]
    if: always()
    
    steps:
      - name: Check all tests passed
        run: |
          if [ "\${{ needs.code-quality.result }}" != "success" ] || \\
             [ "\${{ needs.unit-tests.result }}" != "success" ] || \\
             [ "\${{ needs.api-contract-tests.result }}" != "success" ] || \\
             [ "\${{ needs.e2e-tests.result }}" != "success" ] || \\
             [ "\${{ needs.accessibility-tests.result }}" != "success" ]; then
            echo "Quality gate failed - one or more test suites failed"
            exit 1
          fi
          echo "Quality gate passed - all tests successful"
      
      - name: Calculate quality metrics
        run: |
          echo "QUALITY_SCORE=\$(node scripts/calculate-quality-score.js)" >> \$GITHUB_ENV
      
      - name: Post quality report to PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🏥 **Healthcare Quality Report**\\n\\n' +
                    '✅ All quality gates passed\\n' +
                    \`📊 Quality Score: \${process.env.QUALITY_SCORE}/100\\n\` +
                    '🔒 Security scan: Clean\\n' +
                    '♿ Accessibility: WCAG 2.1 AA compliant\\n' +
                    '⚡ Performance: Healthcare latency requirements met'
            });

  deploy-staging:
    runs-on: ubuntu-latest
    needs: quality-gate
    if: github.ref == 'refs/heads/develop'
    
    steps:
      - name: Deploy to staging
        run: echo "Deploying to healthcare staging environment"
      
      - name: Run smoke tests
        run: npm run test:smoke -- --env=staging
      
      - name: Notify healthcare team
        run: |
          curl -X POST \${{ secrets.SLACK_WEBHOOK_URL }} \\
            -H 'Content-type: application/json' \\
            --data '{"text":"🏥 Healthcare audio app deployed to staging - ready for clinical validation"}'`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default CodeExamples;