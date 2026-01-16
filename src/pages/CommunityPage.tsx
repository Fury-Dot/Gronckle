import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatbot } from "@/components/chat/AIChatbot";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DragonLogo } from "@/components/chat/gklogo";
import { useAuth } from "@/hooks/useAuth";

interface Submission {
  id: string;
  tool_name: string;
  url: string;
  description: string;
  category: string;
  submitted_by: string;
  email?: string;
  status: "pending" | "approved" | "rejected";
  votes: number;
  comments: number;
  created_at: string;
}

const statusConfig = {
  pending: {
    icon: AlertCircle,
    label: "Pending",
    className: "badge-productivity",
  },
  approved: {
    icon: CheckCircle,
    label: "Approved",
    className: "badge-marketing",
  },
  rejected: {
    icon: XCircle,
    label: "Rejected",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
};

export default function CommunityPage() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [tags, setTags] = useState("");

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submissions", filter],
    queryFn: async () => {
      let query = supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Submission[];
    },
  });

  const voteMutation = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: "up" | "down" }) => {
      const { data, error } = await supabase.rpc("handle_submission_vote", {
        submission_id: id,
        vote_type: type,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Vote recorded!");
    },
    onError: (error) => {
      toast.error("Failed to record vote: " + error.message);
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (newSubmission: Partial<Submission> & { status?: string; votes?: number; comments?: number }) => {
      const { data, error } = await supabase
        .from("submissions")
        .insert([newSubmission])
        .select();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Submission received! We'll review it soon.");
      setShowSubmitModal(false);
      setCategory("");
      setTags("");
    },
    onError: (error) => {
      console.error("Submission error:", error);
      toast.error("Failed to submit tool: " + error.message);
    },
  });

  const handleVote = (id: string, type: "up" | "down") => {
    voteMutation.mutate({ id, type });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user?.email) {
      toast.error("You must be logged in to submit a tool");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const toolName = formData.get("tool_name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const githubUrl = formData.get("github_url") as string;
    
    if (!toolName || !url || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    
    const data = {
      tool_name: toolName,
      url: url,
      category: category,
      description: description,
      github_url: githubUrl || null,
      tags: tagsArray.length > 0 ? tagsArray : [],
      submitted_by: user.id,
      email: user.email,
      status: "pending",
      votes: 0,
      comments: 0,
    };
    
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 relative">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DragonLogo className="w-10 h-10" />
            <h1 className="text-3xl sm:text-4xl font-bold">
              Share Your <span className="gradient-text">Discovery</span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Found an amazing tool? Submit it for the community to vote on. Top-voted submissions get added to our curated collection.
          </p>
          <Button
            variant="gradient"
            size="lg"
            onClick={() => setShowSubmitModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Submit a Tool
          </Button>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 justify-center flex-wrap">
            {(["all", "pending", "approved"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === option
                    ? "gradient-bg text-primary-foreground"
                    : "glass hover:bg-[hsl(var(--glass-bg-hover))] text-muted-foreground"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Submissions List */}
      <section className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12 glass rounded-2xl">
              <p className="text-muted-foreground">No submissions found.</p>
            </div>
          ) : (
            submissions.map((submission, index) => {
              const StatusIcon = statusConfig[submission.status].icon;

              return (
                <article
                  key={submission.id}
                  className="glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="flex gap-4">
                    {/* Vote buttons */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleVote(submission.id, "up")}
                        disabled={voteMutation.isPending}
                        className="p-2 rounded-lg hover:bg-[hsl(var(--glass-bg))] text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                      >
                        <ArrowUp className="w-5 h-5" />
                      </button>
                      <span className="font-bold text-lg gradient-text">
                        {submission.votes}
                      </span>
                      <button
                        onClick={() => handleVote(submission.id, "down")}
                        disabled={voteMutation.isPending}
                        className="p-2 rounded-lg hover:bg-[hsl(var(--glass-bg))] text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                      >
                        <ArrowDown className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold hover:gradient-text transition-colors cursor-pointer">
                            {submission.tool_name}
                          </h3>
                          <a
                            href={submission.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            {submission.url}
                          </a>
                        </div>
                        <span
                          className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border ${
                            statusConfig[submission.status].className
                          }`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[submission.status].label}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {submission.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="glass px-2 py-1 rounded text-xs">
                          {submission.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {submission.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(submission.created_at).toLocaleDateString()}
                        </span>
                        <span className="truncate">by @{submission.email || submission.submitted_by}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* Top 5 Contenders */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-2">
            Top 5 <span className="gradient-text">Contenders</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            When a submission reaches 50 votes, it gets reviewed for the main list
          </p>

          <div className="space-y-3">
            {[...submissions]
              .sort((a, b) => b.votes - a.votes)
              .slice(0, 5)
              .map((submission, index) => {
                const progress = Math.min((submission.votes / 50) * 100, 100);
                return (
                  <div
                    key={submission.id}
                    className="glass rounded-xl p-4 flex items-center gap-4"
                  >
                    <span className="text-2xl font-bold gradient-text w-8">
                      #{index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{submission.tool_name}</span>
                        <span className="text-sm text-muted-foreground">
                          {submission.votes}/50 votes
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-bg transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
      <AIChatbot />

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowSubmitModal(false)}
          />
          <div className="glass rounded-2xl p-8 w-full max-w-lg relative z-10 animate-fade-in-up">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Submit a <span className="gradient-text">New Tool</span>
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tool Name *
                </label>
                <Input
                  name="tool_name"
                  type="text"
                  required
                  placeholder="e.g., Excalidraw"
                  className="h-12 rounded-xl glass border-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL *</label>
                <Input
                  name="url"
                  type="url"
                  required
                  placeholder="https://example.com"
                  className="h-12 rounded-xl glass border-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="w-full h-12 px-4 rounded-xl glass border-none text-foreground focus:ring-2 focus:ring-primary/50">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="glass border-primary/20">
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Productivity">Productivity</SelectItem>
                    <SelectItem value="AI Tools">AI Tools</SelectItem>
                    <SelectItem value="Image Processing">Image Processing</SelectItem>
                    <SelectItem value="Writing">Writing</SelectItem>
                    <SelectItem value="Data & Analytics">Data & Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <Textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="What makes this tool special?"
                  className="rounded-xl glass border-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Tags (comma-separated, optional)
                </label>
                <Input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., design, productivity, open-source"
                  className="h-12 rounded-xl glass border-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  GitHub URL (optional)
                </label>
                <Input
                  name="github_url"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  className="h-12 rounded-xl glass border-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full mt-6"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? "Submitting..." : "Submit for Review"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
