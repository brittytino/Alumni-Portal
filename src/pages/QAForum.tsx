
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  ThumbsUp,
  Tag,
  Plus,
  Search,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import { Question, Answer } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

// Load questions from localStorage or use empty array
const getStoredQuestions = () => {
  const stored = localStorage.getItem("questions");
  return stored ? JSON.parse(stored) : [];
};

const QuestionForm = ({ onSubmit, onClose }: { onSubmit: (question: Partial<Question>) => void; onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Textarea
          placeholder="Describe your question..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[100px]"
        />
      </div>
      <div>
        <Input
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Post Question
      </Button>
    </form>
  );
};

const AnswerForm = ({ questionId, onSubmit }: { questionId: string; onSubmit: (answer: string) => void }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <Input
        placeholder="Write your answer..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

const QAForum = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>(getStoredQuestions());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const handleAddQuestion = (questionData: Partial<Question>) => {
    if (!user) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.studentName,
      title: questionData.title!,
      content: questionData.content!,
      date: new Date().toISOString(),
      tags: questionData.tags!,
      upvotes: 0,
      answers: [],
    };

    const updatedQuestions = [newQuestion, ...questions];
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    toast({
      title: "Success",
      description: "Your question has been posted successfully!",
    });
  };

  const handleAddAnswer = (questionId: string, content: string) => {
    if (!user) return;

    const newAnswer: Answer = {
      id: Date.now().toString(),
      questionId,
      userId: user.id,
      userName: user.studentName,
      content,
      date: new Date().toISOString(),
      upvotes: 0,
    };

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, answers: [...q.answers, newAnswer] };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    toast({
      title: "Success",
      description: "Your answer has been posted successfully!",
    });
  };

  const handleUpvote = (questionId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to upvote questions.",
        variant: "destructive",
      });
      return;
    }

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, upvotes: (q.upvotes || 0) + 1 };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleUpvoteAnswer = (questionId: string, answerId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to upvote answers.",
        variant: "destructive",
      });
      return;
    }

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: q.answers.map((a) => {
            if (a.id === answerId) {
              return { ...a, upvotes: (a.upvotes || 0) + 1 };
            }
            return a;
          }),
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || q.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(
    new Set(questions.flatMap((q) => q.tags))
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Q&A Forum</h1>
        <Dialog open={showQuestionForm} onOpenChange={setShowQuestionForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Ask Question
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ask a Question</DialogTitle>
            </DialogHeader>
            <QuestionForm
              onSubmit={handleAddQuestion}
              onClose={() => setShowQuestionForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className="flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{question.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>{question.userName}</span>
                <span>{format(new Date(question.date), "MMM d, yyyy")}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700">{question.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(question.id)}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {question.upvotes || 0}
                  </Button>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="h-4 w-4" />
                    {question.answers.length}
                  </div>
                </div>
              </div>

              {/* Answers Section */}
              <div className="mt-6 space-y-4">
                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className="pl-4 border-l-2 border-gray-200"
                  >
                    <p className="text-gray-700">{answer.content}</p>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>{answer.userName}</span>
                        <span>{format(new Date(answer.date), "MMM d, yyyy")}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpvoteAnswer(question.id, answer.id)}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {answer.upvotes || 0}
                      </Button>
                    </div>
                  </div>
                ))}
                {user && (
                  <AnswerForm
                    questionId={question.id}
                    onSubmit={(content) => handleAddAnswer(question.id, content)}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QAForum;
