import { ExternalLink, Github, Heart, Eye, Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export interface Gem {
  id: string;
  name: string;
  url: string;
  github_url?: string;
  description: string;
  category: string;
  tags: string[];
  stars?: string;
  likes: number;
  views: number;
  featured: boolean;
}

interface GemCardProps {
  gem: Gem;
  onLike?: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Development: "badge-development",
  Design: "badge-design",
  Productivity: "badge-productivity",
  "AI Tools": "badge-ai",
  "Image Processing": "badge-image",
  Writing: "badge-writing",
  "Data & Analytics": "badge-data",
  Marketing: "badge-marketing",
};

const categoryGlows: Record<string, string> = {
  Development: "hover:shadow-[0_0_30px_hsl(217_91%_60%/0.3)]",
  Design: "hover:shadow-[0_0_30px_hsl(330_81%_60%/0.3)]",
  Productivity: "hover:shadow-[0_0_30px_hsl(45_93%_58%/0.3)]",
  "AI Tools": "hover:shadow-[0_0_30px_hsl(270_91%_65%/0.3)]",
  "Image Processing": "hover:shadow-[0_0_30px_hsl(162_73%_46%/0.3)]",
  Writing: "hover:shadow-[0_0_30px_hsl(24_95%_53%/0.3)]",
  "Data & Analytics": "hover:shadow-[0_0_30px_hsl(199_89%_48%/0.3)]",
  Marketing: "hover:shadow-[0_0_30px_hsl(142_71%_45%/0.3)]",
};

export function GemCard({ gem, onLike }: GemCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(gem.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(gem.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(gem.url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <article
      className={`glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group ${
        categoryGlows[gem.category] || ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {gem.featured && (
            <span className="text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
            </span>
          )}
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full border ${
              categoryColors[gem.category] || "badge-development"
            }`}
          >
            {gem.category}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">
        {gem.name}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
        {gem.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {gem.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 glass rounded-lg px-3 py-2">
        {gem.stars && (
          <span className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4" />
            {gem.stars}
          </span>
        )}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition-colors ${
            isLiked ? "text-accent" : "hover:text-accent"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          {likes}
        </button>
        <span className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {gem.views}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="gradient"
          size="sm"
          className="flex-1 rounded-lg"
          asChild
        >
          <a href={gem.url} target="_blank" rel="noopener noreferrer">
            Visit Site
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </Button>
        {gem.github_url && (
          <Button
            variant="glass"
            size="sm"
            className="rounded-lg"
            asChild
          >
            <a href={gem.github_url} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}
