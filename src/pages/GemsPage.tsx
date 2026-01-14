import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GemCard } from "@/components/gems/GemCard";
import { AIChatbot } from "@/components/chat/AIChatbot";
import { gems, categories } from "@/data/gems";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortOption = "popular" | "newest" | "most-liked";
type TypeFilter = "all" | "free" | "open-source";

export default function GemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredGems = useMemo(() => {
    let result = [...gems];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (gem) =>
          gem.name.toLowerCase().includes(query) ||
          gem.description.toLowerCase().includes(query) ||
          gem.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (gem) => gem.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }

    // Filter by type
    if (typeFilter === "open-source") {
      result = result.filter((gem) => gem.github_url);
    }

    // Sort
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "most-liked":
        result.sort((a, b) => b.likes - a.likes);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, typeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Mini Hero with Search */}
      <section className="pt-32 pb-8 px-4 relative">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Discover <span className="gradient-text">Hidden Gems</span>
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 20+ tools by name, description, or tags..."
              className="w-full h-14 pl-12 pr-12 rounded-2xl glass text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-3">
            Showing {filteredGems.length} gems
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              {/* Mobile filter toggle */}
              <Button
                variant="glass"
                className="w-full lg:hidden mb-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <div
                className={`glass rounded-2xl p-6 space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          selectedCategory === category.slug
                            ? "gradient-bg text-primary-foreground"
                            : "hover:bg-[hsl(var(--glass-bg))] text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </span>
                        <span className="text-xs opacity-70">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Sort By
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(["popular", "newest", "most-liked"] as SortOption[]).map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => setSortBy(option)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                            sortBy === option
                              ? "gradient-bg text-primary-foreground"
                              : "glass hover:bg-[hsl(var(--glass-bg-hover))] text-muted-foreground"
                          }`}
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1).replace("-", " ")}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    Type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "free", "open-source"] as TypeFilter[]).map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => setTypeFilter(option)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                            typeFilter === option
                              ? "gradient-bg text-primary-foreground"
                              : "glass hover:bg-[hsl(var(--glass-bg-hover))] text-muted-foreground"
                          }`}
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1).replace("-", " ")}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Gems Grid */}
            <main className="flex-1">
              {filteredGems.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredGems.map((gem, index) => (
                    <div
                      key={gem.id}
                      className="opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
                    >
                      <GemCard gem={gem} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold mb-2">No gems found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button
                    variant="gradient"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setTypeFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <Footer />
      <AIChatbot />
    </div>
  );
}
