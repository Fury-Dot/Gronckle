import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gems", label: "Explore" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center group-hover:glow-purple transition-all duration-300">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl gradient-text hidden sm:block">
            GRONCKLE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                location.pathname === link.href
                  ? "bg-[hsl(var(--glass-bg-hover))] text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--glass-bg))]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <Button
            variant="gradient"
            size="sm"
            className="rounded-full hidden sm:flex"
            asChild
          >
            <Link to="/gems">
              Explore Gems
            </Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass rounded-2xl mt-2 p-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.href
                    ? "bg-[hsl(var(--glass-bg-hover))] text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--glass-bg))]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="gradient"
              className="mt-2 rounded-full"
              asChild
            >
              <Link to="/gems" onClick={() => setMobileMenuOpen(false)}>
                Explore Gems
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
