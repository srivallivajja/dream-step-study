import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  Lock,
  BookOpen,
  Video,
  FileText
} from "lucide-react";

const subjects = [
  { id: "math", name: "Mathematics", color: "bg-primary" },
  { id: "physics", name: "Physics", color: "bg-accent" },
  { id: "chemistry", name: "Chemistry", color: "bg-success" },
  { id: "biology", name: "Biology", color: "bg-warning" },
];

const lectures = {
  math: [
    { id: 1, title: "Quadratic Equations", duration: "45 min", completed: true, locked: false },
    { id: 2, title: "Linear Inequalities", duration: "35 min", completed: true, locked: false },
    { id: 3, title: "Polynomial Functions", duration: "50 min", completed: false, locked: false },
    { id: 4, title: "Rational Functions", duration: "40 min", completed: false, locked: true },
  ],
  physics: [
    { id: 1, title: "Newton's Laws of Motion", duration: "55 min", completed: true, locked: false },
    { id: 2, title: "Energy and Work", duration: "45 min", completed: false, locked: false },
    { id: 3, title: "Momentum and Collisions", duration: "50 min", completed: false, locked: true },
  ],
  chemistry: [
    { id: 1, title: "Atomic Structure", duration: "40 min", completed: true, locked: false },
    { id: 2, title: "Chemical Bonding", duration: "45 min", completed: false, locked: false },
    { id: 3, title: "Organic Chemistry Basics", duration: "60 min", completed: false, locked: true },
  ],
  biology: [
    { id: 1, title: "Cell Structure", duration: "35 min", completed: true, locked: false },
    { id: 2, title: "Photosynthesis", duration: "40 min", completed: false, locked: false },
    { id: 3, title: "Cellular Respiration", duration: "45 min", completed: false, locked: true },
  ],
};

export function Lectures() {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [selectedLecture, setSelectedLecture] = useState<any>(null);

  const currentLectures = lectures[selectedSubject as keyof typeof lectures];
  const completedCount = currentLectures.filter(l => l.completed).length;
  const progressPercentage = (completedCount / currentLectures.length) * 100;

  if (selectedLecture) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedLecture(null)}
          >
            ← Back to Lectures
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedLecture.title}</h1>
            <p className="text-muted-foreground">
              {subjects.find(s => s.id === selectedSubject)?.name} • {selectedLecture.duration}
            </p>
          </div>
        </div>

        {/* Video Player Placeholder */}
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Video Player</h3>
                <p className="text-muted-foreground mb-4">
                  {selectedLecture.title} - {selectedLecture.duration}
                </p>
                <Button variant="hero" size="lg">
                  <PlayCircle className="h-5 w-5" />
                  Start Watching
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lecture Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Lecture Notes</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Download notes and key concepts
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Download Notes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Progress</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Mark as complete when finished
              </p>
              <Button variant="success" size="sm" className="w-full">
                <CheckCircle className="h-4 w-4" />
                Mark Complete
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <PlayCircle className="h-4 w-4" />
                <span className="font-medium">Next Steps</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Take daily test to continue
              </p>
              <Button size="sm" className="w-full">
                Take Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Lectures</h1>
        <p className="text-muted-foreground">
          Watch video lectures and track your progress across all subjects.
        </p>
      </div>

      <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
        <TabsList className="grid w-full grid-cols-4">
          {subjects.map((subject) => (
            <TabsTrigger key={subject.id} value={subject.id}>
              {subject.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {subjects.map((subject) => (
          <TabsContent key={subject.id} value={subject.id} className="space-y-4">
            {/* Subject Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${subject.color}`} />
                    {subject.name} Progress
                  </CardTitle>
                  <Badge variant="outline">
                    {completedCount}/{currentLectures.length} Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  {progressPercentage.toFixed(0)}% of lectures completed
                </p>
              </CardContent>
            </Card>

            {/* Lecture List */}
            <div className="grid gap-4">
              {currentLectures.map((lecture) => (
                <Card 
                  key={lecture.id} 
                  className={`transition-all duration-normal ${
                    lecture.locked 
                      ? "opacity-60" 
                      : "hover:shadow-medium cursor-pointer"
                  }`}
                  onClick={() => !lecture.locked && setSelectedLecture(lecture)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        lecture.completed 
                          ? "bg-success/10" 
                          : lecture.locked 
                            ? "bg-muted" 
                            : "bg-primary/10"
                      }`}>
                        {lecture.completed ? (
                          <CheckCircle className="h-6 w-6 text-success" />
                        ) : lecture.locked ? (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        ) : (
                          <PlayCircle className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{lecture.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lecture.duration}
                          </span>
                          {lecture.locked && (
                            <span className="text-warning">
                              Complete previous test to unlock
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {lecture.completed && (
                          <Badge className="bg-success text-success-foreground">
                            Completed
                          </Badge>
                        )}
                        {lecture.locked && (
                          <Badge variant="outline">
                            Locked
                          </Badge>
                        )}
                        {!lecture.completed && !lecture.locked && (
                          <Button>
                            Watch Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}