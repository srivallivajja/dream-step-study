import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  BarChart3, 
  Trophy,
  Home,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "lectures", label: "Lectures", icon: PlayCircle },
  { id: "tests", label: "Daily Tests", icon: FileText },
  { id: "exams", label: "Weekly Exams", icon: Trophy },
  { id: "books", label: "Books & Notes", icon: BookOpen },
  { id: "results", label: "Results", icon: BarChart3 },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            EduFlow
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {isMobileMenuOpen && (
          <Card className="m-4 p-4">
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="flex flex-col h-16 gap-1"
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block w-64 border-r border-border bg-muted/30">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">
            EduFlow
          </h1>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}