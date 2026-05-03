"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dumbbell,
  Menu,
  Search,
  FlaskConical,
  MessageCircle,
  BookOpen,
  User,
  Bookmark,
  Layers,
  Sparkles,
  GraduationCap,
} from "lucide-react";

const navLinks = [
  { href: "/studies", label: "Studies", icon: BookOpen },
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/levels", label: "Levels", icon: Layers },
  { href: "/collections", label: "Collections", icon: Sparkles },
  { href: "/search", label: "Search", icon: Search },
  { href: "/chat", label: "Ask AI", icon: MessageCircle },
  { href: "/about", label: "About", icon: FlaskConical },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50 w-full border-b border-border/60 glass"
    >
      <div className="content flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Dumbbell className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold leading-none tracking-tight text-foreground">
              GymHub
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Science Based
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground rounded-full hover:bg-secondary"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-1.5">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-full h-8 px-3 text-muted-foreground hover:text-foreground"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span className="sr-only">Bookmarks</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 rounded-full h-8 px-3 text-muted-foreground hover:text-foreground"
            >
              <User className="h-3.5 w-3.5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-72 glass-strong border-l border-border/60"
          >
            <div className="flex flex-col gap-1 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border mt-3 pt-3">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-colors"
                >
                  <User className="h-4 w-4" />
                  Account
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
