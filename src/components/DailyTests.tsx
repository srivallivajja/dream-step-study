import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  CheckCircle, 
  XCircle,
  FileText,
  Trophy,
  ArrowRight,
  RefreshCw
} from "lucide-react";

const pendingTests = [
  {
    id: 1,
    subject: "Mathematics",
    chapter: "Quadratic Equations",
    questions: 10,
    timeLimit: 15,
    color: "bg-primary"
  },
  {
    id: 2,
    subject: "Chemistry",
    chapter: "Chemical Bonding",
    questions: 8,
    timeLimit: 12,
    color: "bg-success"
  },
  {
    id: 3,
    subject: "Physics",
    chapter: "Energy and Work",
    questions: 12,
    timeLimit: 18,
    color: "bg-accent"
  }
];

const sampleQuestions = [
  {
    id: 1,
    question: "What is the discriminant of the quadratic equation 2x² + 5x - 3 = 0?",
    options: ["49", "25", "1", "-23"],
    correct: 0
  },
  {
    id: 2,
    question: "Which of the following represents a quadratic equation in standard form?",
    options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ + bx² + c = 0", "ax + by = c"],
    correct: 1
  },
  {
    id: 3,
    question: "The roots of x² - 5x + 6 = 0 are:",
    options: ["2, 3", "-2, -3", "1, 6", "-1, -6"],
    correct: 0
  }
];

export function DailyTests() {
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [testCompleted, setTestCompleted] = useState(false);

  const handleStartTest = (test: any) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(test.timeLimit * 60);
    setTestCompleted(false);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitTest = () => {
    setTestCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (testCompleted) {
    const score = Object.entries(answers).filter(([qId, answer]) => 
      sampleQuestions[parseInt(qId) - 1]?.correct === answer
    ).length;
    const percentage = (score / sampleQuestions.length) * 100;

    return (
      <div className="space-y-6">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Test Completed!</h2>
            <p className="text-lg mb-4">
              You scored <span className="font-bold text-primary">{score}/{sampleQuestions.length}</span>
            </p>
            <div className="text-3xl font-bold text-success mb-4">
              {percentage.toFixed(0)}%
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setSelectedTest(null)}>
                Back to Tests
              </Button>
              <Button variant="outline">
                View Explanations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sampleQuestions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      userAnswer === undefined 
                        ? "bg-muted" 
                        : isCorrect 
                          ? "bg-success" 
                          : "bg-destructive"
                    }`}>
                      {userAnswer === undefined ? (
                        <span className="text-xs text-muted-foreground">?</span>
                      ) : isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <XCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <div className="space-y-1 text-sm">
                        {userAnswer !== undefined && (
                          <p className={`${isCorrect ? "text-success" : "text-destructive"}`}>
                            Your answer: {question.options[userAnswer]}
                          </p>
                        )}
                        <p className="text-success">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedTest) {
    const currentQ = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Test Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedTest.subject}</h2>
                <p className="text-muted-foreground">{selectedTest.chapter}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-sm text-muted-foreground">Time remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {progress.toFixed(0)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQ.id]?.toString()}
              onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedTest(null)}
          >
            Exit Test
          </Button>
          <div className="space-x-2">
            {currentQuestion < sampleQuestions.length - 1 ? (
              <Button onClick={handleNextQuestion}>
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmitTest} variant="success">
                Submit Test
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Daily Tests</h1>
        <p className="text-muted-foreground">
          Complete daily tests after watching lectures to unlock new content.
        </p>
      </div>

      {/* Pending Tests */}
      <div className="grid gap-4">
        {pendingTests.map((test) => (
          <Card key={test.id} className="hover:shadow-medium transition-all duration-normal">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${test.color}/10`}>
                  <FileText className={`h-6 w-6 ${test.color.replace('bg-', 'text-')}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{test.subject}</h3>
                  <p className="text-muted-foreground">{test.chapter}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {test.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {test.timeLimit} minutes
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className="mb-2 bg-warning text-warning-foreground">
                    Pending
                  </Badge>
                  <br />
                  <Button onClick={() => handleStartTest(test)}>
                    Start Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Test Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-success mt-0.5" />
            <p>Complete the test within the time limit to proceed to the next lecture.</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-success mt-0.5" />
            <p>You need to score at least 60% to pass and unlock new content.</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-success mt-0.5" />
            <p>Review your answers and explanations after completing the test.</p>
          </div>
          <div className="flex items-start gap-2">
            <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
            <p>You can retake tests if needed, but new questions will be provided.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}