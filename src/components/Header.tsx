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
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const navItems = [
  { path: "/", labelKey: "nav.home", icon: Home },
  { path: "/verify", labelKey: "nav.vote", icon: Vote },
  { path: "/dashboard", labelKey: "nav.dashboard", icon: BarChart3 },
  { path: "/education", labelKey: "nav.education", icon: BookOpen },
  { path: "/observer", labelKey: "nav.observer", icon: Eye },
  { path: "/admin", labelKey: "nav.admin", icon: Shield },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-soft">
      {/* Creator Watermark */}
      <div 
        className="absolute top-2 right-4 text-xs font-black tracking-[0.3em] select-none pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--saffron)) 0%, hsl(var(--ashoka-blue)) 50%, hsl(var(--india-green)) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 20px hsl(var(--ashoka-blue) / 0.3)',
          filter: 'drop-shadow(0 0 8px hsl(var(--ashoka-blue) / 0.4))'
        }}
      >
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
                    {t(item.labelKey)}
                  </Button>
                </Link>
              );
            })}
            <div className="ml-2 border-l border-border pl-2">
              <LanguageSelector />
            </div>
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
                      {t(item.labelKey)}
                    </Button>
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border mt-2">
                <LanguageSelector />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
