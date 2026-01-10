import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Vote, 
  BarChart3, 
  BookOpen, 
  Eye, 
  Shield, 
  Menu,
  X,
  Home
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/verify", label: "Vote", icon: Vote },
  { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/education", label: "Education", icon: BookOpen },
  { path: "/observer", label: "Observer", icon: Eye },
  { path: "/admin", label: "Admin", icon: Shield },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
      {/* Creator Watermark */}
      <div className="absolute top-1 right-3 text-[10px] font-bold tracking-widest text-ashoka-blue/40 select-none pointer-events-none">
        KHAN
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-saffron rounded-t-lg" style={{ height: '33%' }} />
              <div className="absolute inset-0 bg-white" style={{ top: '33%', height: '34%' }} />
              <div className="absolute inset-0 bg-india-green rounded-b-lg" style={{ top: '67%', height: '33%' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-ashoka-blue" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg text-ashoka-blue leading-tight">EMIS</h1>
              <p className="text-xs text-muted-foreground leading-tight">Election Monitor</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "bg-ashoka-blue hover:bg-ashoka-blue-light"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive && "bg-ashoka-blue hover:bg-ashoka-blue-light"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
