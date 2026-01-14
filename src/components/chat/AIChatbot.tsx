import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, X, Send, Trash2 } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the GRONCKLE AI assistant. I can help you discover the perfect development tools. What are you trying to accomplish today?",
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

    // Simulate AI response (replace with actual API call when backend is connected)
    setTimeout(() => {
      const responses: Record<string, string> = {
        diagram:
          "**Excalidraw** - Perfect for quick hand-drawn style diagrams!\nIt's free, open-source, and works right in your browser. Great for architecture diagrams and flowcharts.\n\n**Mermaid** - If you prefer code-based diagrams, Mermaid lets you create diagrams using markdown-like syntax.",
        api:
          "**Insomnia** - A beautiful REST client that's free and open-source. Great for API testing and debugging.\n\n**HTTPie** - A command-line HTTP client that's more user-friendly than curl.",
        image:
          "**TinyPNG** - Compresses PNG and JPEG images with minimal quality loss. Free for up to 500 images/month.\n\n**Squoosh** - Google's image compression tool that runs entirely in your browser.",
        color:
          "**Coolors** - The super fast color palette generator! Press spacebar to generate new palettes instantly.\n\n**Happy Hues** - Curated color palettes with real-world examples of how to use them.",
      };

      const lowerMessage = userMessage.toLowerCase();
      let response =
        "I'd be happy to help you find the right tool! Could you tell me more about what you're trying to accomplish? For example:\n\n• What type of project are you working on?\n• Are you looking for free or paid tools?\n• Any specific features you need?";

      if (lowerMessage.includes("diagram") || lowerMessage.includes("draw"))
        response = responses.diagram;
      else if (lowerMessage.includes("api") || lowerMessage.includes("test"))
        response = responses.api;
      else if (
        lowerMessage.includes("image") ||
        lowerMessage.includes("compress")
      )
        response = responses.image;
      else if (lowerMessage.includes("color") || lowerMessage.includes("palette"))
        response = responses.color;

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared! What would you like to find today?",
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
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-bg flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow ${
          isOpen ? "opacity-0 pointer-events-none" : ""
        }`}
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Chat Overlay */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] glass rounded-2xl flex flex-col overflow-hidden animate-slide-in-right border border-primary/20">
          {/* Header */}
          <div className="gradient-bg px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
              <div>
                <h3 className="font-bold text-primary-foreground">
                  Gem Finder AI
                </h3>
                <p className="text-xs text-primary-foreground/80">
                  Ask me to find the perfect tool
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleClear}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "gradient-bg text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Example Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {examplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleExampleClick(prompt)}
                    className="text-xs px-3 py-1.5 rounded-full glass hover:bg-[hsl(var(--glass-bg-hover))] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you need..."
                className="flex-1 min-h-[44px] max-h-24 px-4 py-3 rounded-xl glass bg-transparent resize-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={1}
              />
              <Button
                variant="gradient"
                size="icon"
                className="h-11 w-11 rounded-xl shrink-0"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
