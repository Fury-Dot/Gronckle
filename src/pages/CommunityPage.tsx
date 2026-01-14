import { useState } from "react";
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
} from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  tool_name: string;
  url: string;
  description: string;
  category: string;
  submitted_by: string;
  status: "pending" | "approved" | "rejected";
  votes: number;
  comments: number;
  created_at: string;
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    tool_name: "Responsively",
    url: "https://responsively.app",
    description:
      "A modified browser for responsive web development. View all your target screens in a single window side-by-side.",
    category: "Development",
    submitted_by: "devuser123",
    status: "pending",
    votes: 42,
    comments: 8,
    created_at: "2 days ago",
  },
  {
    id: "2",
    tool_name: "Penpot",
    url: "https://penpot.app",
    description:
      "Open-source design and prototyping platform for cross-domain teams. The first design platform with a truly open architecture.",
    category: "Design",
    submitted_by: "designer_pro",
    status: "approved",
    votes: 89,
    comments: 23,
    created_at: "1 week ago",
  },
  {
    id: "3",
    tool_name: "Hoppscotch",
    url: "https://hoppscotch.io",
    description:
      "Open-source API development ecosystem. A free, fast, and beautiful alternative to Postman.",
    category: "Development",
    submitted_by: "api_lover",
    status: "pending",
    votes: 67,
    comments: 15,
    created_at: "3 days ago",
  },
  {
    id: "4",
    tool_name: "Spline",
    url: "https://spline.design",
    description:
      "Design and collaborate in 3D. Create interactive 3D web experiences that run anywhere.",
    category: "Design",
    submitted_by: "3d_enthusiast",
    status: "pending",
    votes: 34,
    comments: 5,
    created_at: "5 hours ago",
  },
];

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
  const [submissions] = useState(mockSubmissions);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [votes, setVotes] = useState<Record<string, number>>({});

  const filteredSubmissions =
    filter === "all"
      ? submissions
      : submissions.filter((s) => s.status === filter);

  const handleVote = (id: string, type: "up" | "down") => {
    setVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (type === "up" ? 1 : -1),
    }));
    toast.success(type === "up" ? "Upvoted!" : "Downvoted");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 relative">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Share Your <span className="gradient-text">Discovery</span>
          </h1>
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
          {filteredSubmissions.map((submission, index) => {
            const StatusIcon = statusConfig[submission.status].icon;
            const currentVotes = submission.votes + (votes[submission.id] || 0);

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
                      className="p-2 rounded-lg hover:bg-[hsl(var(--glass-bg))] text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-lg gradient-text">
                      {currentVotes}
                    </span>
                    <button
                      onClick={() => handleVote(submission.id, "down")}
                      className="p-2 rounded-lg hover:bg-[hsl(var(--glass-bg))] text-muted-foreground hover:text-destructive transition-colors"
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
                        {submission.created_at}
                      </span>
                      <span>by @{submission.submitted_by}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
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
            {submissions
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
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Submission received! We'll review it soon.");
                setShowSubmitModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tool Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Excalidraw"
                  className="w-full h-12 px-4 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com"
                  className="w-full h-12 px-4 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category *
                </label>
                <select className="w-full h-12 px-4 rounded-xl glass text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent">
                  <option value="">Select a category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="productivity">Productivity</option>
                  <option value="ai">AI Tools</option>
                  <option value="image">Image Processing</option>
                  <option value="writing">Writing</option>
                  <option value="data">Data & Analytics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="What makes this tool special?"
                  className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full h-12 px-4 rounded-xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <Button variant="gradient" size="lg" className="w-full mt-6">
                Submit for Review
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
