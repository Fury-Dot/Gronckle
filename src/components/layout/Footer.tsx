import { Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { DragonLogo } from "@/components/chat/gklogo";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <DragonLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold text-lg gradient-text">GRONCKLE</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover and share the best developer resources and tools.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/gems" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Explore Gems
              </Link>
              <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
              <Link to="/submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Submit a Gem
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Gronckle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
