import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Search, Heart, Zap, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

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
              ✨ 20+ curated tools for developers
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
            <Button variant="hero-secondary" size="xl" asChild>
              <Link to="/community">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto opacity-0 animate-fade-in-up stagger-4">
            <StatCard value="20+" label="Tools" />
            <StatCard value="8" label="Categories" />
            <StatCard value="100%" label="Free" />
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

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 gradient-bg opacity-10" />
            
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary animate-bounce-gentle" />
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
