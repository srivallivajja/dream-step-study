import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ProgressCardProps {
  title: string;
  current: number;
  total: number;
  status: "pending" | "complete" | "in-progress";
  description?: string;
}

export function ProgressCard({ title, current, total, status, description }: ProgressCardProps) {
  const percentage = (current / total) * 100;
  
  const getStatusColor = () => {
    switch (status) {
      case "complete":
        return "bg-success text-success-foreground";
      case "in-progress":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-normal">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge className={getStatusColor()}>
          {status === "complete" ? "Complete" : status === "in-progress" ? "In Progress" : "Pending"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{description}</span>
            <span className="font-medium">{current}/{total}</span>
          </div>
          <Progress 
            value={percentage} 
            className="h-2"
          />
          <div className="text-xs text-muted-foreground">
            {percentage.toFixed(0)}% complete
          </div>
        </div>
      </CardContent>
    </Card>
  );
}