import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DragonLogo } from "@/components/chat/gklogo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gems", label: "Explore" },
  { href: "/community", label: "Community" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setMobileMenuOpen(false);
      navigate("/login");
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <DragonLogo className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
          <span className="font-bold text-xl tracking-tight gradient-text hidden sm:block">
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
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--glass-bg))]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full hidden sm:flex"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
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
          )}

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
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--glass-bg))]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Button
                variant="outline"
                className="mt-2 rounded-full w-full"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button
                variant="gradient"
                className="mt-2 rounded-full"
                asChild
              >
                <Link to="/gems" onClick={() => setMobileMenuOpen(false)}>
                  Explore Gems
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
