import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, Clock, TrendingUp, Shield, Zap } from "lucide-react";
import Navigation from "./Navigation";

const QualityDashboard = () => {
  const testMetrics = {
    overall: { passed: 89, total: 95, percentage: 93.7 },
    api: { passed: 45, total: 48, percentage: 93.8 },
    ui: { passed: 28, total: 30, percentage: 93.3 },
    e2e: { passed: 16, total: 17, percentage: 94.1 }
  };

  const performanceMetrics = {
    p50: 125,
    p90: 340,
    p99: 580,
    availability: 99.97
  };

  const qualityTrends = [
    { week: "W1", passRate: 91.2, p90: 380 },
    { week: "W2", passRate: 92.8, p90: 360 },
    { week: "W3", passRate: 93.1, p90: 350 },
    { week: "W4", passRate: 93.7, p90: 340 }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="h-12 w-12" />
            <div>
              <h1 className="text-4xl font-bold">Ambient Audio Quality Guardian</h1>
              <p className="text-lg opacity-90">Healthcare-Grade Quality Engineering Dashboard</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Overall Health</p>
                    <p className="text-3xl font-bold">{testMetrics.overall.percentage}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">P90 Latency</p>
                    <p className="text-3xl font-bold">{performanceMetrics.p90}ms</p>
                  </div>
                  <Zap className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Availability</p>
                    <p className="text-3xl font-bold">{performanceMetrics.availability}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Active Tests</p>
                    <p className="text-3xl font-bold">{testMetrics.overall.total}</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary-glow" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="testing">Testing Strategy</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="workflow">CI/CD Pipeline</TabsTrigger>
            <TabsTrigger value="metrics">Quality Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Test Suite Status</CardTitle>
                  <CardDescription>Current test execution results across all suites</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Tests</span>
                      <Badge variant="outline" className="text-success border-success">
                        {testMetrics.api.passed}/{testMetrics.api.total} passed
                      </Badge>
                    </div>
                    <Progress value={testMetrics.api.percentage} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">UI Tests</span>
                      <Badge variant="outline" className="text-success border-success">
                        {testMetrics.ui.passed}/{testMetrics.ui.total} passed
                      </Badge>
                    </div>
                    <Progress value={testMetrics.ui.percentage} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">E2E Tests</span>
                      <Badge variant="outline" className="text-success border-success">
                        {testMetrics.e2e.passed}/{testMetrics.e2e.total} passed
                      </Badge>
                    </div>
                    <Progress value={testMetrics.e2e.percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Real-time latency and availability tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-secondary rounded-lg">
                      <p className="text-2xl font-bold text-primary">{performanceMetrics.p50}ms</p>
                      <p className="text-sm text-muted-foreground">P50 Latency</p>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-lg">
                      <p className="text-2xl font-bold text-warning">{performanceMetrics.p90}ms</p>
                      <p className="text-sm text-muted-foreground">P90 Latency</p>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-lg">
                      <p className="text-2xl font-bold text-danger">{performanceMetrics.p99}ms</p>
                      <p className="text-sm text-muted-foreground">P99 Latency</p>
                    </div>
                    <div className="text-center p-4 bg-secondary rounded-lg">
                      <p className="text-2xl font-bold text-success">{performanceMetrics.availability}%</p>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quality Trends</CardTitle>
                <CardDescription>4-week rolling quality metrics for ambient audio system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityTrends.map((trend, index) => (
                    <div key={trend.week} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{trend.week}</Badge>
                        <div>
                          <p className="font-medium">Pass Rate: {trend.passRate}%</p>
                          <p className="text-sm text-muted-foreground">P90: {trend.p90}ms</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {index > 0 && trend.passRate > qualityTrends[index - 1].passRate && (
                          <TrendingUp className="h-4 w-4 text-success" />
                        )}
                        {index > 0 && trend.p90 < qualityTrends[index - 1].p90 && (
                          <Zap className="h-4 w-4 text-success" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Testing Strategy</CardTitle>
                  <CardDescription>Risk-based testing approach for healthcare audio applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-secondary rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Critical Path Testing</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Audio capture → Upload → AI processing flow</li>
                        <li>• Authentication and session management</li>
                        <li>• Data integrity validation</li>
                        <li>• Error recovery mechanisms</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-secondary rounded-lg">
                      <h4 className="font-semibold text-warning mb-2">Edge Case Validation</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Network failure scenarios</li>
                        <li>• Large file handling (&gt;100MB)</li>
                        <li>• Concurrent user stress testing</li>
                        <li>• Browser compatibility matrix</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-secondary rounded-lg">
                      <h4 className="font-semibold text-success mb-2">Performance Benchmarks</h4>
                      <ul className="text-sm space-y-1">
                        <li>• P90 latency &lt; 400ms healthcare requirement</li>
                        <li>• Audio upload completion under 30s</li>
                        <li>• 99.9% availability target</li>
                        <li>• Progressive loading for poor connections</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Test Coverage Matrix</CardTitle>
                  <CardDescription>Comprehensive validation across application layers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium">Unit Tests</span>
                      <Badge className="bg-success text-success-foreground">85% Coverage</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium">Integration Tests</span>
                      <Badge className="bg-warning text-warning-foreground">72% Coverage</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium">API Contract Tests</span>
                      <Badge className="bg-success text-success-foreground">94% Coverage</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium">E2E User Journeys</span>
                      <Badge className="bg-success text-success-foreground">88% Coverage</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium">Security Tests</span>
                      <Badge className="bg-warning text-warning-foreground">68% Coverage</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <span className="font-medium">Performance Tests</span>
                      <Badge className="bg-success text-success-foreground">91% Coverage</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance Monitoring</CardTitle>
                <CardDescription>Real-time tracking of system performance for healthcare environments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Latency Targets</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">API Response</span>
                        <span className="text-sm font-medium">&lt; 200ms</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Audio Upload</span>
                        <span className="text-sm font-medium">&lt; 30s</span>
                      </div>
                      <Progress value={90} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">AI Processing</span>
                        <span className="text-sm font-medium">&lt; 60s</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Alert Thresholds</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-secondary rounded">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="text-sm">P90 &gt; 400ms</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-secondary rounded">
                        <AlertTriangle className="h-4 w-4 text-danger" />
                        <span className="text-sm">Error rate &gt; 1%</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-secondary rounded">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        <span className="text-sm">Availability &lt; 99.5%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Monitoring Tools</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-secondary rounded">
                        <span className="text-sm font-medium">Artillery.js</span>
                        <p className="text-xs text-muted-foreground">Load testing & performance</p>
                      </div>
                      <div className="p-2 bg-secondary rounded">
                        <span className="text-sm font-medium">Playwright</span>
                        <p className="text-xs text-muted-foreground">E2E performance monitoring</p>
                      </div>
                      <div className="p-2 bg-secondary rounded">
                        <span className="text-sm font-medium">Custom Metrics</span>
                        <p className="text-xs text-muted-foreground">JSON output for dashboards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>CI/CD Pipeline</CardTitle>
                <CardDescription>Automated quality gates for development workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Pre-commit Hooks</h4>
                      <p className="text-sm text-muted-foreground">Lint, format, and basic validation</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Pull Request Gates</h4>
                      <p className="text-sm text-muted-foreground">Full test suite + performance benchmarks</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <Clock className="h-6 w-6 text-warning" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Nightly Regression Suite</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive E2E and integration testing</p>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">Scheduled</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Production Monitoring</h4>
                      <p className="text-sm text-muted-foreground">Real-time alerts and health checks</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Live</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quality KPIs</CardTitle>
                <CardDescription>Key performance indicators for ongoing quality tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary">Development Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">Test Pass Rate</span>
                        <span className="font-bold text-success">93.7%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">Test Flake Rate</span>
                        <span className="font-bold text-warning">2.1%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">Code Coverage</span>
                        <span className="font-bold text-success">87.3%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">Build Success Rate</span>
                        <span className="font-bold text-success">98.1%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary">Production Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">System Availability</span>
                        <span className="font-bold text-success">99.97%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">Error Rate</span>
                        <span className="font-bold text-success">0.03%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">Mean Recovery Time</span>
                        <span className="font-bold text-warning">4.2 min</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-secondary rounded">
                        <span className="text-sm">User Satisfaction</span>
                        <span className="font-bold text-success">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QualityDashboard;