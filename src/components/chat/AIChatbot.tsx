import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Send, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ColoredDragonLogo } from "./gklogo";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const examplePrompts = [
  "Find a tool for drawing diagrams",
  "Best free API testing tools",
  "Help me compress images",
  "Color palette generator",
];

export function AIChatbot() {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the GRONCKLE AI assistant. I can help you discover the perfect development tools from our curated collection. What are you trying to accomplish today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Special commands
      if (userMessage.toLowerCase().includes("show all") || userMessage.toLowerCase().includes("all tools")) {
        const { data: allGems } = await supabase.from("gems").select("*");
        const response = `We have ${allGems?.length || 0} amazing tools! Visit the main Gems page to browse all of them, or tell me what you're looking for! 🔍`;
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
        setIsLoading(false);
        return;
      }

      // Fetch all gems
      const { data: allGems, error } = await supabase.from("gems").select("*");
      if (error) throw error;

      const queryLower = userMessage.toLowerCase();

      // 🎯 SMART INTENT DETECTION
      const intent = detectIntent(queryLower);
      
      const scoredGems = (allGems || []).map(gem => {
        let score = 0;

        // 🔥 INTENT-BASED SCORING
        if (intent.category && gem.category === intent.category) {
          score += 20;
        }

        if (intent.specificTool && gem.name.toLowerCase() === intent.specificTool) {
          score += 50;
        }

        // 🔥 KEYWORD SCORING
        intent.keywords.forEach(keyword => {
          const nameLower = gem.name.toLowerCase();
          const descLower = gem.description.toLowerCase();
          
          if (nameLower === keyword) score += 15;
          else if (nameLower.includes(keyword)) score += 10;
          
          if (descLower.includes(keyword)) score += 5;
          
          if (gem.tags?.some((tag: string) => tag.toLowerCase() === keyword)) score += 8;
          else if (gem.tags?.some((tag: string) => tag.toLowerCase().includes(keyword))) score += 4;
        });

        if (gem.featured) score += 2;

        return { ...gem, score };
      })
      .filter(gem => gem.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

      // Generate response
      let response = "";
      if (scoredGems.length > 0) {
        const topScore = scoredGems[0].score;
        const matchQuality = topScore > 20 ? "🎯 Perfect match!" : topScore > 10 ? "✨ Great match" : "💡 Might help";

        response = `${matchQuality}\n\n` +
          scoredGems.map((gem, idx) => {
            return `**${idx + 1}. ${gem.name}** ${gem.featured ? '⭐' : ''}\n${gem.description}\n📂 ${gem.category} ${gem.stars ? `| ⭐ ${gem.stars}` : ''}\n🔗 [Visit ${gem.name}](${gem.url})`;
          }).join("\n\n");
      } else {
        response = `I couldn't find a perfect match for "${userMessage}" 😕\n\n💡 **Try asking:**\n• "grammar checker"\n• "design tools"\n• "AI tools"\n• Type "show all tools" to browse everything!`;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error: unknown) {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Oops! Something went wrong 😅 Please try again later!" 
      }]);
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("[") && part.includes("](")) {
        const linkText = part.match(/\[(.*?)\]/)?.[1];
        const url = part.match(/\((.*?)\)/)?.[1];
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80 transition-colors inline-flex items-center gap-1"
          >
            {linkText}
          </a>
        );
      }
      return part;
    });
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! What would you like to find today?",
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-bg flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow ${
          isOpen ? "opacity-0 pointer-events-none" : ""
        }`}
        aria-label="Open AI Assistant"
      >
        <ColoredDragonLogo className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] glass rounded-2xl flex flex-col overflow-hidden animate-slide-in-right border border-primary/20">
          <div className="gradient-bg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ColoredDragonLogo className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-primary-foreground">Gem Finder AI</h3>
                <p className="text-xs text-primary-foreground/80">Ask me to find tools</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground" onClick={handleClear}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${message.role === "user" ? "gradient-bg text-primary-foreground" : "bg-muted text-foreground"}`}>
                  <div className="text-sm whitespace-pre-wrap">{renderContent(message.content)}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-2 flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {examplePrompts.map((prompt) => (
                <button key={prompt} onClick={() => handleExampleClick(prompt)} className="text-xs px-3 py-1.5 rounded-full glass text-muted-foreground hover:text-foreground">
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="p-4 border-t border-border">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you need..."
                className="flex-1 min-h-[44px] max-h-24 px-4 py-3 rounded-xl glass bg-transparent resize-none text-sm focus:outline-none"
                rows={1}
              />
              <Button variant="gradient" size="icon" className="h-11 w-11 rounded-xl" onClick={handleSend} disabled={!input.trim() || isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function detectIntent(query: string) {
  const intent: { category: string | null; keywords: string[]; specificTool: string | null; } = {
    category: null,
    keywords: [],
    specificTool: null,
  };

  const categories = {
    'Writing': ['spelling', 'grammar', 'grammarly', 'write', 'writing', 'editor', 'text', 'proofread'],
    'Design': ['design', 'draw', 'drawing', 'sketch', 'diagram', 'wireframe', 'color', 'palette', 'mockup', 'ui', 'ux'],
    'Development': ['code', 'coding', 'developer', 'programming', 'api', 'github', 'terminal', 'debug', 'test'],
    'Image Processing': ['image', 'photo', 'compress', 'resize', 'background', 'remove', 'png', 'jpg'],
    'AI Tools': ['ai', 'gpt', 'chatbot', 'intelligence'],
    'Productivity': ['productivity', 'organize', 'notes', 'task', 'todo', 'planner', 'focus'],
    'Data & Analytics': ['data', 'analytics', 'chart', 'graph', 'visualization', 'metrics'],
    'Marketing': ['marketing', 'email', 'campaign', 'newsletter', 'seo']
  };

  for (const [cat, kws] of Object.entries(categories)) {
    if (kws.some(kw => query.includes(kw))) {
      intent.category = cat;
      intent.keywords.push(...kws.filter(kw => query.includes(kw)));
    }
  }

  if (!intent.category) {
    const stopWords = ['i', 'need', 'a', 'for', 'the', 'to', 'help', 'me', 'find', 'tool', 'tools', 'want', 'looking'];
    intent.keywords = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(word => word.length > 2 && !stopWords.includes(word));
  }

  return intent;
}
