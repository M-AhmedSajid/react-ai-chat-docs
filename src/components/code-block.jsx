"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeBlock({ code, language = "bash", filename }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 overflow-hidden rounded-lg border border-border bg-zinc-950 font-mono text-sm text-zinc-50">
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-400">
          <span>{filename}</span>
          <span className="text-[10px] uppercase text-zinc-500">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed sm:text-sm">
          <code>{code}</code>
        </pre>
        <Button
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
          className="absolute right-2 top-2 h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
