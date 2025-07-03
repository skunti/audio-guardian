import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, TestTube, Code } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Shield },
    { path: "/testing-strategy", label: "Testing Strategy", icon: TestTube },
    { path: "/code-examples", label: "Implementation", icon: Code }
  ];

  return (
    <nav className="bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Ambient Audio Guardian</h1>
              <p className="text-xs text-muted-foreground">Healthcare Quality Engineering</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
            
            <Badge variant="outline" className="text-success border-success">
              Live Demo
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;