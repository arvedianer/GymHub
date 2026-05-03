import Link from "next/link";
import { Dumbbell, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface/50">
      <div className="content py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Dumbbell className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold text-foreground">GymHub</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Peer-reviewed fitness research made accessible for everyone. No bro-science,
              only evidence. Open source and community-driven.
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/studies", label: "All Studies" },
                { href: "/levels", label: "Gym Levels" },
                { href: "/collections", label: "Collections" },
                { href: "/search", label: "Search" },
                { href: "/chat", label: "Ask AI" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/categories/resistance-training", label: "Resistance Training" },
                { href: "/categories/nutrition", label: "Nutrition" },
                { href: "/categories/supplements", label: "Supplements" },
                { href: "/categories/recovery-health", label: "Recovery & Health" },
                { href: "/categories/peds", label: "PEDs & Harm Reduction" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GymHub. Not medical advice.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/arvedianer/gymhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-destructive fill-destructive" /> for fitness
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
