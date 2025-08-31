import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressCard } from "@/components/ProgressCard";
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Trophy,
  Clock,
  Target,
  Star,
  TrendingUp
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero/80" />
        </div>
        <CardContent className="relative z-10 p-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-lg mb-6 text-white/90">
              Ready to continue your learning journey? You have 2 pending tests and 3 new lectures available.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg">
                <PlayCircle className="h-5 w-5" />
                Continue Learning
              </Button>
              <Button variant="card" size="lg" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                <Target className="h-5 w-5" />
                Take Daily Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProgressCard
          title="Today's Lectures"
          current={2}
          total={5}
          status="in-progress"
          description="Math & Physics"
        />
        <ProgressCard
          title="Daily Tests"
          current={1}
          total={3}
          status="pending"
          description="Chemistry pending"
        />
        <ProgressCard
          title="Weekly Goal"
          current={4}
          total={7}
          status="in-progress"
          description="Study sessions"
        />
        <ProgressCard
          title="Overall Progress"
          current={75}
          total={100}
          status="in-progress"
          description="This month"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft hover:shadow-medium transition-all duration-normal cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Watch Lectures</h3>
            <p className="text-sm text-muted-foreground">Continue with Chapter 5: Quadratic Equations</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all duration-normal cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-warning/20 transition-colors">
              <FileText className="h-6 w-6 text-warning" />
            </div>
            <h3 className="font-semibold mb-2">Daily Tests</h3>
            <p className="text-sm text-muted-foreground">Take pending tests to unlock new content</p>
            <Badge className="mt-2 bg-warning text-warning-foreground">2 Pending</Badge>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all duration-normal cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Weekly Exams</h3>
            <p className="text-sm text-muted-foreground">Next exam: Tomorrow at 10:00 AM</p>
            <Badge className="mt-2 bg-accent text-accent-foreground">
              <Clock className="h-3 w-3 mr-1" />
              Scheduled
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all duration-normal cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-success/20 transition-colors">
              <BookOpen className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-semibold mb-2">Study Materials</h3>
            <p className="text-sm text-muted-foreground">Access notes, books, and practice problems</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Completed Physics Chapter 3 Test</p>
                <p className="text-sm text-muted-foreground">Score: 85% • 2 hours ago</p>
              </div>
              <Badge className="bg-success text-success-foreground">Passed</Badge>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <PlayCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Watched: Organic Chemistry Basics</p>
                <p className="text-sm text-muted-foreground">Duration: 45 minutes • Yesterday</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Weekly Math Exam</p>
                <p className="text-sm text-muted-foreground">Score: 92% • 3 days ago</p>
              </div>
              <Badge className="bg-warning text-warning-foreground">Excellent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}