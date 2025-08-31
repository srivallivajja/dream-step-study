import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { Lectures } from "@/components/Lectures";
import { DailyTests } from "@/components/DailyTests";
import { Results } from "@/components/Results";
import { Books } from "@/components/Books";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "lectures":
        return <Lectures />;
      case "tests":
        return <DailyTests />;
      case "exams":
        return <div className="p-8 text-center text-muted-foreground">Weekly Exams coming soon...</div>;
      case "books":
        return <Books />;
      case "results":
        return <Results />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
