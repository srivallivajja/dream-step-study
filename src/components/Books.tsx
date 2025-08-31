import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Download, 
  Search,
  FileText,
  Star,
  Clock,
  Eye
} from "lucide-react";

const subjects = [
  { id: "all", name: "All Subjects" },
  { id: "math", name: "Mathematics" },
  { id: "physics", name: "Physics" },
  { id: "chemistry", name: "Chemistry" },
  { id: "biology", name: "Biology" },
];

const books = [
  {
    id: 1,
    title: "NCERT Mathematics Class 12",
    subject: "math",
    type: "textbook",
    pages: 450,
    rating: 4.8,
    downloads: 1250,
    description: "Complete NCERT textbook for Mathematics Class 12 with all chapters and exercises.",
    chapters: ["Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants"]
  },
  {
    id: 2,
    title: "Quadratic Equations - Study Notes",
    subject: "math",
    type: "notes",
    pages: 25,
    rating: 4.9,
    downloads: 850,
    description: "Comprehensive notes covering all concepts of quadratic equations with solved examples.",
    chapters: ["Introduction", "Standard Form", "Discriminant", "Methods of Solution"]
  },
  {
    id: 3,
    title: "Physics Mechanics - NCERT",
    subject: "physics",
    type: "textbook",
    pages: 320,
    rating: 4.7,
    downloads: 980,
    description: "Complete mechanics section from NCERT Physics covering motion, laws, and energy.",
    chapters: ["Motion in a Straight Line", "Laws of Motion", "Work Energy Power"]
  },
  {
    id: 4,
    title: "Chemical Bonding Quick Reference",
    subject: "chemistry",
    type: "notes",
    pages: 18,
    rating: 4.6,
    downloads: 650,
    description: "Quick reference guide for chemical bonding concepts and types.",
    chapters: ["Ionic Bonding", "Covalent Bonding", "Metallic Bonding", "Hydrogen Bonding"]
  },
  {
    id: 5,
    title: "Cell Biology Illustrated Guide",
    subject: "biology",
    type: "guide",
    pages: 75,
    rating: 4.8,
    downloads: 720,
    description: "Illustrated guide to cell biology with diagrams and detailed explanations.",
    chapters: ["Cell Structure", "Cell Organelles", "Cell Division", "Cell Metabolism"]
  },
  {
    id: 6,
    title: "Practice Problems: Calculus",
    subject: "math",
    type: "practice",
    pages: 120,
    rating: 4.5,
    downloads: 420,
    description: "Collection of practice problems for calculus with step-by-step solutions.",
    chapters: ["Limits", "Derivatives", "Integration", "Applications"]
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "textbook": return "bg-primary text-primary-foreground";
    case "notes": return "bg-success text-success-foreground";
    case "guide": return "bg-accent text-accent-foreground";
    case "practice": return "bg-warning text-warning-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "textbook": return "Textbook";
    case "notes": return "Notes";
    case "guide": return "Guide";
    case "practice": return "Practice";
    default: return "Document";
  }
};

export function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || book.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  if (selectedBook) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedBook(null)}
          >
            ← Back to Library
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedBook.title}</h1>
            <p className="text-muted-foreground">{selectedBook.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Book Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-[3/4] bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Badge className={getTypeColor(selectedBook.type)}>
                      {getTypeLabel(selectedBook.type)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{selectedBook.pages} pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-warning" />
                      <span>{selectedBook.rating}/5.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>{selectedBook.downloads} downloads</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Online
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chapters */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedBook.chapters.map((chapter: string, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{chapter}</h4>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Books */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Related Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {books
                    .filter(book => book.subject === selectedBook.subject && book.id !== selectedBook.id)
                    .slice(0, 4)
                    .map(book => (
                      <div key={book.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <h5 className="font-medium text-sm">{book.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{book.type}</p>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Books & Notes</h1>
        <p className="text-muted-foreground">
          Access NCERT textbooks, study notes, and practice materials for all subjects.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books, notes, and materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedSubject} onValueChange={setSelectedSubject}>
              <TabsList>
                {subjects.map(subject => (
                  <TabsTrigger key={subject.id} value={subject.id}>
                    {subject.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card 
            key={book.id} 
            className="hover:shadow-medium transition-all duration-normal cursor-pointer"
            onClick={() => setSelectedBook(book)}
          >
            <CardContent className="p-6">
              <div className="aspect-[3/4] bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <Badge className={getTypeColor(book.type)}>
                    {getTypeLabel(book.type)}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-lg leading-tight">{book.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>{book.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-warning" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No materials found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or selecting a different subject.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}