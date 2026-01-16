/**
 * Owned by Lithish
 */
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Search, Heart, Zap, MessageSquare, Users, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { DragonLogo } from "@/components/chat/gklogo";

// Floating shapes for background
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Hero image background */}
    <img
      src={heroBg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
    
    {/* Floating geometric shapes */}
    <div className="absolute top-20 right-20 w-24 h-24 border border-primary/20 rounded-2xl rotate-12 animate-float" />
    <div className="absolute bottom-40 left-20 w-16 h-16 border border-secondary/20 rounded-xl -rotate-12 animate-float-reverse" />
    <div className="absolute top-1/2 right-10 w-20 h-20 border border-accent/20 rounded-full animate-float" />
  </div>
);

// Testimonial card component
const TestimonialCard = ({
  name,
  role,
  content,
  delay,
}: {
  name: string;
  role: string;
  content: string;
  delay: string;
}) => (
  <div
    className={`glass rounded-2xl p-6 opacity-0 animate-fade-in-up ${delay}`}
  >
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-muted-foreground mb-6 italic">"{content}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
        {name[0]}
      </div>
      <div>
        <div className="font-bold text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  </div>
);

// Stats card component
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="glass rounded-2xl px-6 py-4 text-center">
    <div className="text-2xl font-bold gradient-text">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

// Feature card component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: string;
}) => (
  <div
    className={`glass glass-hover rounded-2xl p-8 text-center opacity-0 animate-fade-in-up ${delay}`}
  >
    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center">
      <Icon className="w-8 h-8 text-primary-foreground" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Index = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const supabase = createClient();
  const { data: count } = useQuery({
    queryKey: ["gems-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("gems")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 overflow-hidden">
        <FloatingShapes />

        <div className="container mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 opacity-0 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              ✨ {count ? `${count}+` : "20+"} curated tools for developers
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 opacity-0 animate-fade-in-up stagger-1">
            Discover Tools You
            <br />
            <span className="gradient-text">Never Knew Existed</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up stagger-2">
            AI-powered discovery platform where developers find hidden gems,
            explore curated collections, and build their perfect toolkit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in-up stagger-3">
            <Button variant="hero" size="xl" asChild>
              <Link to="/gems">
                Start Exploring
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="hero-secondary" 
              size="xl" 
              onClick={() => setShowComingSoon(true)}
            >
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto opacity-0 animate-fade-in-up stagger-4">
            <StatCard value={count ? `${count}+` : "20+"} label="Tools" />
            <StatCard value="8" label="Categories" />
            <StatCard value="100%" label="Free" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-secondary/5 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by <span className="gradient-text">Modern Developers</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See what the community is saying about their discoveries on Gronckle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TestimonialCard
              name="Sarah Chen"
              role="Senior Frontend Engineer"
              content="Gronckle has become my go-to for finding niche dev tools. Found three libraries last week that saved me hours of boilerplate."
              delay="stagger-1"
            />
            <TestimonialCard
              name="Alex River"
              role="Fullstack Developer"
              content="The AI assistant is surprisingly good at understanding what I need. It's like having a specialized search engine for just the good stuff."
              delay="stagger-2"
            />
            <TestimonialCard
              name="Jordan Smith"
              role="Tech Lead @ Startup"
              content="Finally, a curated list that actually stays updated. The community voting ensures that only the highest quality tools make it to the top."
              delay="stagger-3"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why <span className="gradient-text">GRONCKLE</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to discover and organize the best developer tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={Search}
              title="Smart Search"
              description="AI-powered search helps you find exactly what you need, even if you don't know what it's called."
              delay="stagger-1"
            />
            <FeatureCard
              icon={Heart}
              title="Save Favorites"
              description="Bookmark tools and build your personal toolkit. Access your collection from anywhere."
              delay="stagger-2"
            />
            <FeatureCard
              icon={Zap}
              title="Always Updated"
              description="New gems added regularly, curated by developers who understand what makes a tool great."
              delay="stagger-3"
            />
          </div>
        </div>
      </section>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="glass border-primary/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <DragonLogo className="w-8 h-8" />
              Coming <span className="gradient-text">Soon</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-4">
              We're building a vibrant community space for developers to share insights, 
              compare toolkits, and discuss the latest in the ecosystem. 
              <br /><br />
              Sign up for our newsletter to be the first to know when we launch!
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            <Input 
              placeholder="Enter your email" 
              className="glass border-none h-11"
            />
            <Button variant="gradient" onClick={() => {
              setShowComingSoon(false);
              toast.success("Thanks for joining the waitlist!");
            }}>
              Notify Me
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 gradient-bg opacity-10" />
            
            <div className="relative z-10">
              <DragonLogo className="w-16 h-16 mx-auto mb-6 transition-transform duration-500 hover:scale-110 hover:rotate-12" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to discover your next favorite tool?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join developers who've already found their hidden gems. Start exploring our curated collection today.
              </p>
              <Button variant="gradient" size="xl" asChild>
                <Link to="/gems">
                  Explore All Gems
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
