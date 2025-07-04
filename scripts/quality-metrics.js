
#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

async function collectQualityMetrics() {
  const metrics = {
    timestamp: new Date().toISOString(),
    testResults: {},
    performance: {},
    coverage: {},
    quality: {}
  };

  try {
    // Collect test results
    console.log('📊 Collecting test metrics...');
    
    const testResults = JSON.parse(execSync('npm test -- --json --watchAll=false', { encoding: 'utf8' }));
    metrics.testResults = {
      total: testResults.numTotalTests,
      passed: testResults.numPassedTests,
      failed: testResults.numFailedTests,
      passRate: (testResults.numPassedTests / testResults.numTotalTests * 100).toFixed(2)
    };

    // Collect API test results
    const apiResults = JSON.parse(execSync('npm run test:api -- --json', { encoding: 'utf8' }));
    metrics.testResults.api = {
      total: apiResults.numTotalTests,
      passed: apiResults.numPassedTests,
      passRate: (apiResults.numPassedTests / apiResults.numTotalTests * 100).toFixed(2)
    };

    // Run performance test and collect metrics
    console.log('⚡ Running performance tests...');
    execSync('npx artillery run tests/performance/load-test.yml --output temp-perf.json');
    const perfResults = JSON.parse(fs.readFileSync('temp-perf.json', 'utf8'));
    
    metrics.performance = {
      p50: perfResults.aggregate.latency.p50,
      p90: perfResults.aggregate.latency.p90,
      p99: perfResults.aggregate.latency.p99,
      errorRate: (perfResults.aggregate.counters['http.codes.4xx'] || 0) + (perfResults.aggregate.counters['http.codes.5xx'] || 0),
      requestRate: perfResults.aggregate.counters['http.requests']
    };

    // Calculate overall quality score
    const qualityScore = calculateQualityScore(metrics);
    metrics.quality = {
      score: qualityScore,
      grade: getQualityGrade(qualityScore),
      recommendations: getRecommendations(metrics)
    };

    // Output metrics
    const output = {
      summary: {
        timestamp: metrics.timestamp,
        overallHealth: `${qualityScore}%`,
        testPassRate: `${metrics.testResults.passRate}%`,
        p90Latency: `${metrics.performance.p90}ms`,
        qualityGrade: metrics.quality.grade
      },
      detailed: metrics
    };

    console.log('\n🎯 Quality Metrics Summary:');
    console.log(`Overall Health: ${output.summary.overallHealth}`);
    console.log(`Test Pass Rate: ${output.summary.testPassRate}`);
    console.log(`P90 Latency: ${output.summary.p90Latency}`);
    console.log(`Quality Grade: ${output.summary.qualityGrade}`);

    // Save detailed metrics for dashboard
    fs.writeFileSync('quality-metrics.json', JSON.stringify(output, null, 2));
    
    // Cleanup
    if (fs.existsSync('temp-perf.json')) {
      fs.unlinkSync('temp-perf.json');
    }

    return output;

  } catch (error) {
    console.error('❌ Error collecting metrics:', error.message);
    process.exit(1);
  }
}

function calculateQualityScore(metrics) {
  const weights = {
    testPassRate: 0.4,
    performance: 0.3,
    coverage: 0.2,
    stability: 0.1
  };

  let score = 0;
  
  // Test pass rate contribution
  score += parseFloat(metrics.testResults.passRate) * weights.testPassRate;
  
  // Performance contribution (inverse of P90 latency)
  const perfScore = Math.max(0, 100 - (metrics.performance.p90 / 4)); // 400ms = 0 points
  score += perfScore * weights.performance;
  
  // Stability (based on error rate)
  const stabilityScore = Math.max(0, 100 - (metrics.performance.errorRate * 10));
  score += stabilityScore * weights.stability;
  
  // Default coverage score (would integrate with actual coverage data)
  score += 85 * weights.coverage;

  return Math.round(score);
}

function getQualityGrade(score) {
  if (score >= 95) return 'A+';
  if (score >= 90) return 'A';
  if (score >= 85) return 'B+';
  if (score >= 80) return 'B';
  if (score >= 75) return 'C+';
  if (score >= 70) return 'C';
  return 'D';
}

function getRecommendations(metrics) {
  const recommendations = [];
  
  if (parseFloat(metrics.testResults.passRate) < 95) {
    recommendations.push('Improve test stability - current pass rate below 95%');
  }
  
  if (metrics.performance.p90 > 400) {
    recommendations.push('Optimize performance - P90 latency exceeds healthcare requirements');
  }
  
  if (metrics.performance.errorRate > 1) {
    recommendations.push('Reduce error rate - current rate impacts user experience');
  }
  
  return recommendations;
}

// Run if called directly
if (require.main === module) {
  collectQualityMetrics();
}

module.exports = { collectQualityMetrics };
