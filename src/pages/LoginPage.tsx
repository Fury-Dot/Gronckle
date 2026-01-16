import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DragonLogo } from "@/components/chat/gklogo";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

type AuthMode = "login" | "signup";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signUp, signIn, loading } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        if (!email || !password) {
          toast.error("Please fill in all fields");
          setIsLoading(false);
          return;
        }
        await signIn(email, password);
        toast.success("Logged in successfully!");
      } else {
        if (!email || !password || !username) {
          toast.error("Please fill in all fields");
          setIsLoading(false);
          return;
        }
        await signUp(email, password, username);
        toast.success("Account created! Check your email to verify.");
      }
      
      setTimeout(() => {
        navigate("/gems");
      }, 1000);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-background/50 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-3xl rotate-12 animate-float" />
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-accent/10 rounded-2xl -rotate-12 animate-float-reverse" />
        <div className="absolute top-1/2 right-10 w-28 h-28 border border-primary/5 rounded-full animate-float" />
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-3xl p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <DragonLogo className="w-12 h-12 transition-transform duration-500 hover:scale-110 hover:rotate-12" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">GRONCKLE</span>
            </h1>
            <p className="text-muted-foreground">
              Discover tools you never knew existed
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 mb-8 p-1 bg-secondary/10 rounded-xl">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                mode === "login"
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                mode === "signup"
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="username" className="text-sm font-medium mb-2 block">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="john_developer"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass border-none h-11 focus-visible:ring-primary"
                  disabled={isLoading || loading}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass border-none h-11 focus-visible:ring-primary"
                disabled={isLoading || loading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass border-none h-11 focus-visible:ring-primary"
                disabled={isLoading || loading}
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full h-11 rounded-xl mt-6"
              disabled={isLoading || loading}
            >
              {isLoading || loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-primary hover:text-accent font-semibold transition-colors"
                type="button"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>


        </div>

        {/* Floating badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Make easy with Gronckle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
