"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, FlaskConical, Lightbulb } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; slug: string }[];
}

const suggestions = [
  "What's the optimal protein intake for muscle gain?",
  "Does creatine actually work?",
  "How does sleep affect recovery?",
  "Are BCAAs worth taking?",
  "What's better: full body or split routines?",
];

const welcomeMessage: Message = {
  role: "assistant",
  content:
    "I'm the **GymHub Evidence Bot**. I search across our curated database of **334 peer-reviewed studies** to give you evidence-based answers with cited sources.\n\nWhat would you like to know?",
};

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center h-6 px-1">
      <motion.div
        className="w-2 h-2 rounded-full bg-muted-foreground/50"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-muted-foreground/50"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-muted-foreground/50"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
    </div>
  );
}

/** Simple markdown parser — no external deps, works reliably */
function formatContent(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const result: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];
  let listKey = 0;

  function flushList() {
    if (listItems.length > 0) {
      result.push(
        <ul key={`list-${listKey++}`} className="list-disc list-outside space-y-1.5 mb-3 ml-5 text-[15px]">
          {listItems.map((item, i) => (
            <li key={i} className="leading-[1.7] pl-1">{item}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (trimmed === "") {
      flushList();
      continue;
    }

    // Bullet list
    if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(parseInline(trimmed.slice(2)));
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      inList = true;
      listItems.push(parseInline(trimmed.replace(/^\d+\.\s/, "")));
      continue;
    }

    // Horizontal rule
    if (/^---+/.test(trimmed)) {
      flushList();
      result.push(<hr key={`hr-${i}`} className="border-border/50 my-5" />);
      continue;
    }

    flushList();

    // Heading
    if (trimmed.startsWith("## ")) {
      result.push(
        <h2 key={`h-${i}`} className="text-base font-semibold text-foreground mt-4 mb-2">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith("# ")) {
      result.push(
        <h1 key={`h-${i}`} className="text-lg font-semibold text-foreground mt-5 mb-2">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      result.push(
        <blockquote key={`bq-${i}`} className="border-l-4 border-accent/30 pl-4 italic text-muted-foreground mb-3 text-[15px]">
          {parseInline(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Regular paragraph
    result.push(
      <p key={`p-${i}`} className="text-[15px] leading-[1.7] mb-3">
        {parseInline(trimmed)}
      </p>
    );
  }

  flushList();
  return result;
}

/** Parse inline markdown: bold, italic, code, links */
function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Combined regex for bold, italic, code, links
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }

    if (match[1]) {
      // Bold
      parts.push(<strong key={key++} className="font-semibold text-foreground">{match[2]}</strong>);
    } else if (match[3]) {
      // Italic
      parts.push(<em key={key++} className="italic text-muted-foreground">{match[4]}</em>);
    } else if (match[5]) {
      // Code
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded-md bg-secondary text-sm font-mono text-foreground">
          {match[6]}
        </code>
      );
    } else if (match[7]) {
      // Link
      parts.push(
        <a key={key++} href={match[9]} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:no-underline font-medium">
          {match[8]}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return <>{parts}</>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });

      // Parse sources from header
      let sources: { title: string; slug: string }[] = [];
      const sourcesHeader = res.headers.get("X-Sources");
      if (sourcesHeader) {
        try {
          sources = JSON.parse(sourcesHeader);
        } catch {
          // ignore parse error
        }
      }

      // Create empty assistant message for streaming
      setMessages((prev) => [...prev, { role: "assistant", content: "", sources }]);

      // Read stream
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          streamedContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === "assistant") {
              next[next.length - 1] = { ...last, content: streamedContent };
            }
            return next;
          });
        }
        // Final decode flush
        streamedContent += decoder.decode();
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === "assistant") {
            next[next.length - 1] = { ...last, content: streamedContent };
          }
          return next;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect to the evidence database. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-3xl flex flex-col" style={{ minHeight: "calc(100vh - 3.5rem)" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 mb-3">
          <Bot className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-1">
          Evidence Bot
        </h1>
        <p className="text-sm text-muted-foreground">
          Ask anything about fitness, health, or performance.
        </p>
      </motion.div>

      <Card className="flex-1 flex flex-col overflow-hidden border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl shadow-sm" style={{ minHeight: "500px" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Assistant Avatar */}
                {msg.role === "assistant" && (
                  <Avatar className="h-10 w-10 bg-accent text-accent-foreground shrink-0 rounded-xl mt-1">
                    <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md border border-border/40"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div>{formatContent(msg.content)}</div>
                  ) : (
                    <div className="text-[15px] leading-[1.7] whitespace-pre-wrap">{msg.content}</div>
                  )}

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <FlaskConical className="h-3.5 w-3.5" />
                        Sources
                      </p>
                      <div className="space-y-1.5">
                        {msg.sources.map((s) => (
                          <a
                            key={s.slug}
                            href={`/studies/${s.slug}`}
                            className="block text-sm text-accent hover:underline"
                          >
                            {s.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {msg.role === "user" && (
                  <Avatar className="h-10 w-10 bg-secondary text-foreground shrink-0 rounded-xl mt-1">
                    <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator — only when last message is empty */}
          {loading && messages[messages.length - 1]?.role === "assistant" && messages[messages.length - 1]?.content === "" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <Avatar className="h-10 w-10 bg-accent text-accent-foreground shrink-0 rounded-xl">
                <AvatarFallback><Bot className="h-5 w-5" /></AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl rounded-bl-md px-5 py-4 text-base text-muted-foreground flex items-center gap-2 border border-border/40">
                <Sparkles className="h-4 w-4 animate-pulse-soft" />
                <TypingIndicator />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-5 pb-3">
            <p className="text-sm text-muted-foreground mb-2.5 flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5" />
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-sm px-4 py-2 rounded-full border border-border bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border p-5">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about protein, creatine, sleep, training..."
              className="flex-1 rounded-xl h-12 text-base bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-ring px-4"
            />
            <Button type="submit" size="icon" disabled={loading} className="rounded-xl h-12 w-12 shrink-0">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
