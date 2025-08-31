import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Target,
  Calendar,
  Star,
  BookOpen,
  Award
} from "lucide-react";

const performanceData = [
  { subject: "Mathematics", score: 85, tests: 12, color: "bg-primary" },
  { subject: "Physics", score: 78, tests: 10, color: "bg-accent" },
  { subject: "Chemistry", score: 92, tests: 8, color: "bg-success" },
  { subject: "Biology", score: 74, tests: 6, color: "bg-warning" },
];

const recentTests = [
  {
    id: 1,
    subject: "Chemistry",
    chapter: "Atomic Structure",
    score: 95,
    date: "Today",
    status: "excellent"
  },
  {
    id: 2,
    subject: "Mathematics",
    chapter: "Quadratic Equations",
    score: 78,
    date: "Yesterday",
    status: "good"
  },
  {
    id: 3,
    subject: "Physics",
    chapter: "Newton's Laws",
    score: 85,
    date: "2 days ago",
    status: "good"
  },
  {
    id: 4,
    subject: "Biology",
    chapter: "Cell Structure",
    score: 65,
    date: "3 days ago",
    status: "needs-improvement"
  },
];

const achievements = [
  {
    title: "Perfect Score",
    description: "Scored 100% on 3 tests",
    icon: Star,
    color: "bg-warning"
  },
  {
    title: "Consistent Learner",
    description: "Completed tests 7 days in a row",
    icon: Target,
    color: "bg-success"
  },
  {
    title: "Top Performer",
    description: "Ranked in top 10% this month",
    icon: Trophy,
    color: "bg-accent"
  },
  {
    title: "Knowledge Seeker",
    description: "Completed 50+ lectures",
    icon: BookOpen,
    color: "bg-primary"
  },
];

export function Results() {
  const overallAverage = Math.round(
    performanceData.reduce((sum, subject) => sum + subject.score, 0) / performanceData.length
  );

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "bg-success text-success-foreground" };
    if (score >= 75) return { label: "Good", color: "bg-primary text-primary-foreground" };
    if (score >= 60) return { label: "Average", color: "bg-warning text-warning-foreground" };
    return { label: "Needs Work", color: "bg-destructive text-destructive-foreground" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Results & Progress</h1>
        <p className="text-muted-foreground">
          Track your performance and see detailed analytics of your learning journey.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{overallAverage}%</div>
            <p className="text-sm text-muted-foreground">Overall Average</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">36</div>
            <p className="text-sm text-muted-foreground">Tests Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">+12%</div>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">12</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {performanceData.map((subject) => {
            const status = getScoreStatus(subject.score);
            return (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${subject.color}`} />
                    <span className="font-medium">{subject.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={status.color}>
                      {status.label}
                    </Badge>
                    <span className="font-bold">{subject.score}%</span>
                  </div>
                </div>
                <Progress value={subject.score} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {subject.tests} tests completed
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTests.map((test) => {
              const status = getScoreStatus(test.score);
              return (
                <div key={test.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{test.subject}</h4>
                    <p className="text-sm text-muted-foreground">{test.chapter}</p>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-bold">{test.score}%</div>
                    <div className="text-xs text-muted-foreground">{test.date}</div>
                  </div>

                  <Badge className={status.color}>
                    {status.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${achievement.color}/10`}>
                    <Icon className={`h-6 w-6 ${achievement.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Study Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Study Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <h4 className="font-medium text-warning mb-2">Focus Area: Biology</h4>
            <p className="text-sm">
              Your Biology performance is below average. Consider spending more time on cellular processes and reviewing the Cell Structure chapter.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <h4 className="font-medium text-success mb-2">Strength: Chemistry</h4>
            <p className="text-sm">
              Excellent work in Chemistry! You're consistently scoring above 90%. Keep up the great work!
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <h4 className="font-medium text-primary mb-2">Next Goal: Math Mastery</h4>
            <p className="text-sm">
              You're close to mastering Mathematics. Focus on Polynomial Functions to reach 90%+ average.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}