import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, Code, Smartphone, Monitor, Shield } from "lucide-react";
import Navigation from "./Navigation";

const TestingStrategy = () => {
  const testSuites = [
    {
      name: "API Contract Tests",
      icon: Code,
      priority: "Critical",
      coverage: 94,
      tests: [
        "Authentication endpoints validation",
        "Audio upload API contract",
        "AI processing status endpoints",
        "Data retrieval and filtering",
        "Error response standardization"
      ],
      tools: ["Jest", "Supertest", "OpenAPI Validator"],
      rationale: "Ensures backend stability and prevents breaking changes for mobile and web clients."
    },
    {
      name: "UI Integration Tests",
      icon: Monitor,
      priority: "High",
      coverage: 88,
      tests: [
        "Audio recording workflow",
        "File upload progress tracking",
        "Authentication state management",
        "Responsive design validation",
        "Accessibility compliance"
      ],
      tools: ["Playwright", "React Testing Library", "Axe-core"],
      rationale: "Validates user experience across devices and ensures healthcare accessibility standards."
    },
    {
      name: "iOS App Tests",
      icon: Smartphone,
      priority: "High",
      coverage: 85,
      tests: [
        "Audio permission handling",
        "Background recording capability",
        "Network failure recovery",
        "iOS version compatibility",
        "Memory management validation"
      ],
      tools: ["XCTest", "XCUITest", "Performance XCTest"],
      rationale: "Critical for healthcare professionals using mobile devices in fast-paced environments."
    },
    {
      name: "Security & Compliance",
      icon: Shield,
      priority: "Critical",
      coverage: 78,
      tests: [
        "HIPAA compliance validation",
        "Data encryption in transit",
        "Audio file integrity checks",
        "Authentication security",
        "Input sanitization"
      ],
      tools: ["OWASP ZAP", "Custom Security Scanner", "Compliance Checker"],
      rationale: "Essential for healthcare data protection and regulatory compliance."
    }
  ];

  const riskMatrix = [
    { scenario: "Network failure during audio upload", likelihood: "High", impact: "Critical", mitigation: "Retry logic + offline storage" },
    { scenario: "Large file processing timeout", likelihood: "Medium", impact: "High", mitigation: "Chunked upload + progress tracking" },
    { scenario: "Concurrent user stress", likelihood: "Medium", impact: "Medium", mitigation: "Load testing + rate limiting" },
    { scenario: "iOS permission denial", likelihood: "Low", impact: "Critical", mitigation: "Graceful degradation + user guidance" },
    { scenario: "AI processing service outage", likelihood: "Low", impact: "High", mitigation: "Queue system + status updates" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Comprehensive Testing Strategy</h1>
        <p className="text-lg text-muted-foreground">
          Risk-based approach for ambient audio recording in healthcare environments
        </p>
      </div>

      {/* Testing Pyramid */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Testing Pyramid for Healthcare Audio Applications</CardTitle>
          <CardDescription>
            Balanced approach prioritizing fast feedback and comprehensive coverage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {testSuites.map((suite, index) => (
              <div key={suite.name} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <suite.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">{suite.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={suite.priority === "Critical" ? "destructive" : "secondary"}>
                      {suite.priority}
                    </Badge>
                    <Badge variant="outline" className="text-success border-success">
                      {suite.coverage}% Coverage
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{suite.rationale}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Test Cases</h4>
                    <ul className="space-y-1">
                      {suite.tests.map((test, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-success" />
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Tools & Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {suite.tools.map((tool, i) => (
                        <Badge key={i} variant="outline">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Matrix */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Risk Assessment & Mitigation</CardTitle>
          <CardDescription>
            Identified risks for healthcare audio recording applications with mitigation strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskMatrix.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                  <div>
                    <h4 className="font-semibold text-sm">{risk.scenario}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Likelihood:</span>
                    <Badge variant={risk.likelihood === "High" ? "destructive" : 
                                   risk.likelihood === "Medium" ? "secondary" : "outline"}>
                      {risk.likelihood}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Impact:</span>
                    <Badge variant={risk.impact === "Critical" ? "destructive" : 
                                   risk.impact === "High" ? "secondary" : "outline"}>
                      {risk.impact}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Mitigation:</span>
                    <p className="text-sm font-medium">{risk.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Roadmap */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>8-Hour Implementation Roadmap</CardTitle>
          <CardDescription>
            Prioritized action plan for immediate quality improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-primary mb-3">Hours 1-3: Foundation</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Enhanced API contract tests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    GitHub Actions CI pipeline
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Performance baseline setup
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    Test reporting infrastructure
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-warning mb-3">Hours 4-6: User Experience</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Critical E2E user journeys
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Cross-browser compatibility
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Mobile responsiveness tests
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Accessibility validation
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-success mb-3">Hours 7-8: Monitoring</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Real-time latency tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Quality metrics dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Alerting system setup
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    Documentation & handoff
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default TestingStrategy;