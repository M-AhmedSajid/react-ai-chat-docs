"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Moon,
  RotateCcw,
  Sun,
  WandSparkles,
} from "lucide-react";

const DEFAULT_CONFIG = {
  themeMode: "auto",
  position: "bottom-right",
  title: "Ask AI Assistant",
  subtitle: "Trained on custom project data and experience",
  triggerText: "Ask AI",
  placeholder: "Ask a question...",
  emptyStateText:
    "👋 Hi! Ask me anything about skills, projects, or experience.",
  starterPromptsLabel: "Try asking:",
  starterPrompts: true,
  initialOpen: false,
};

const PROMPTS = [
  "What can you help me with?",
  "Show me an example",
  "How does this chatbot work?",
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ControlLabel({ children }) {
  return (
    <div className="mb-2 text-xs font-medium text-foreground">{children}</div>
  );
}

function SegmentedControl({ value, options, onChange }) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-lg border bg-muted/40 p-1">
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-md px-2 py-2 text-xs font-medium transition-colors",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function InputControl({ label, value, onChange, placeholder }) {
  return (
    <div>
      <ControlLabel>{label}</ControlLabel>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted-foreground/25",
      )}
    >
      <span
        className={cn(
          "absolute top-1 size-4 rounded-full bg-background shadow-sm transition-transform",
          checked ? "left-6" : "left-1",
        )}
      />
    </button>
  );
}

function ChatWindow({ config }) {
  const isDark =
    config.themeMode === "dark" ||
    (config.themeMode === "auto" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [open, setOpen] = useState(config.initialOpen);

  return (
    <div
      className={cn(
        "absolute z-20",
        config.position.includes("bottom") ? "bottom-5" : "top-5",
        config.position.includes("right") ? "right-5" : "left-5",
      )}
    >
      {open ? (
        <div
          className={cn(
            "w-[min(calc(100vw-48px),360px)] overflow-hidden rounded-2xl border shadow-2xl",
            isDark
              ? "border-white/10 bg-[#111113] text-white"
              : "border-border bg-background text-foreground",
          )}
        >
          <div
            className={cn(
              "flex items-start justify-between border-b px-4 py-4",
              isDark ? "border-white/10" : "border-border",
            )}
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">
                {config.title || "Ask AI Assistant"}
              </div>

              {config.subtitle && (
                <div
                  className={cn(
                    "mt-1 truncate text-xs",
                    isDark ? "text-white/50" : "text-muted-foreground",
                  )}
                >
                  {config.subtitle}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn(
                "ml-3 flex size-7 shrink-0 items-center justify-center rounded-md transition-colors",
                isDark ? "hover:bg-white/10" : "hover:bg-muted",
              )}
              aria-label="Close chatbot"
            >
              x
            </button>
          </div>

          <div className="min-h-65 p-4">
            <div
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm leading-6",
                isDark ? "bg-white/10" : "bg-muted",
              )}
            >
              {config.emptyStateText ||
                "👋 Hi! Ask me anything about this project."}
            </div>

            {config.starterPrompts && (
              <div className="mt-5">
                <div
                  className={cn(
                    "mb-2 text-xs font-medium",
                    isDark ? "text-white/50" : "text-muted-foreground",
                  )}
                >
                  {config.starterPromptsLabel || "Try asking:"}
                </div>

                <div className="space-y-2">
                  {PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-xs transition-colors",
                        isDark
                          ? "border-white/10 hover:bg-white/10"
                          : "border-border hover:bg-muted",
                      )}
                    >
                      <span>{prompt}</span>
                      <span className="opacity-50">→</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className={cn(
              "border-t p-3",
              isDark ? "border-white/10" : "border-border",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-1",
                isDark ? "border-white/10" : "border-border",
              )}
            >
              <div
                className={cn(
                  "flex-1 px-2 text-xs",
                  isDark ? "text-white/40" : "text-muted-foreground",
                )}
              >
                {config.placeholder || "Ask a question..."}
              </div>

              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                →
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-xl transition-transform hover:scale-[1.02]"
        >
          <WandSparkles className="size-4" />
          {config.triggerText || "Ask AI"}
        </button>
      )}
    </div>
  );
}

function CodeBlock({ config }) {
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
    const lines = ["<Chatbot"];

    if (config.title) {
      lines.push(`  title="${config.title}"`);
    }

    if (config.subtitle) {
      lines.push(`  subtitle="${config.subtitle}"`);
    }

    if (config.triggerText) {
      lines.push(`  triggerText="${config.triggerText}"`);
    }

    if (config.placeholder) {
      lines.push(`  placeholder="${config.placeholder}"`);
    }

    lines.push(`  position="${config.position}"`);
    lines.push(`  themeMode="${config.themeMode}"`);

    if (config.starterPrompts) {
      lines.push(`  starterPrompts={[`);
      PROMPTS.forEach((prompt) => {
        lines.push(`    "${prompt}",`);
      });
      lines.push(`  ]}`);
    }

    lines.push("/>");

    return lines.join("\n");
  }, [config]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-[#0b0b0c] text-white shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="font-mono text-xs text-white/50">chatbot.tsx</div>

        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="max-h-80 overflow-auto p-5 font-mono text-[12px] leading-6 sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ChatPlayground() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  function update(key, value) {
    setConfig((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function reset() {
    setConfig(DEFAULT_CONFIG);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Interactive playground
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Change the configuration and preview the result.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>

      <div className="grid overflow-hidden rounded-2xl border bg-background shadow-xl lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-h-150 border-b lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium">Live preview</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span>Mock response</span>
              <span className="size-1 rounded-full bg-border" />
              <span>UI only</span>
            </div>
          </div>

          <div className="relative min-h-138 overflow-hidden bg-muted/2">
            <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,oklch(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border)/0.35)_1px,transparent_1px)] bg-size-[48px_48px]" />

            <div className="absolute left-1/2 top-1/2 w-[80%] max-w-md -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border bg-background shadow-sm">
                <WandSparkles className="size-6" />
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                Your app, your chatbot.
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The controls on the right change the chatbot preview. Try
                different combinations to find the interface you want.
              </p>
            </div>

            <ChatWindow config={config} />
          </div>
        </div>

        <aside className="bg-background">
          <div className="border-b px-5 py-4">
            <div className="text-sm font-semibold">Configuration</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Customize the chatbot experience.
            </div>
          </div>

          <div className="max-h-150 space-y-6 overflow-y-auto p-5">
            <div>
              <ControlLabel>Theme</ControlLabel>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    value: "auto",
                    label: "Auto",
                    icon: <ChevronDown className="size-3.5" />,
                  },
                  {
                    value: "light",
                    label: "Light",
                    icon: <Sun className="size-3.5" />,
                  },
                  {
                    value: "dark",
                    label: "Dark",
                    icon: <Moon className="size-3.5" />,
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => update("themeMode", option.value)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-medium transition-colors",
                      config.themeMode === option.value
                        ? "border-primary bg-primary/5 text-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <ControlLabel>Position</ControlLabel>

              <div className="grid grid-cols-2 gap-2">
                {[
                  ["bottom-left", "Bottom left"],
                  ["bottom-right", "Bottom right"],
                  ["top-left", "Top left"],
                  ["top-right", "Top right"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update("position", value)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors",
                      config.position === value
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <InputControl
                label="Title"
                value={config.title}
                onChange={(value) => update("title", value)}
                placeholder="Ask AI Assistant"
              />

              <InputControl
                label="Subtitle"
                value={config.subtitle}
                onChange={(value) => update("subtitle", value)}
                placeholder="Ask me anything..."
              />

              <InputControl
                label="Trigger text"
                value={config.triggerText}
                onChange={(value) => update("triggerText", value)}
                placeholder="Ask AI"
              />

              <InputControl
                label="Placeholder"
                value={config.placeholder}
                onChange={(value) => update("placeholder", value)}
                placeholder="Ask a question..."
              />

              <InputControl
                label="Empty state"
                value={config.emptyStateText}
                onChange={(value) => update("emptyStateText", value)}
                placeholder="👋 Hi! Ask me anything."
              />

              <InputControl
                label="Starter prompts label"
                value={config.starterPromptsLabel}
                onChange={(value) => update("starterPromptsLabel", value)}
                placeholder="Try asking:"
              />
            </div>

            <div className="space-y-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium">Starter prompts</div>

                  <div className="mt-1 text-[11px] text-muted-foreground">
                    Show suggested questions.
                  </div>
                </div>

                <Toggle
                  checked={config.starterPrompts}
                  onChange={(value) => update("starterPrompts", value)}
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t pt-3">
                <div>
                  <div className="text-xs font-medium">Initially open</div>

                  <div className="mt-1 text-[11px] text-muted-foreground">
                    Open the chatbot on page load.
                  </div>
                </div>

                <Toggle
                  checked={config.initialOpen}
                  onChange={(value) => update("initialOpen", value)}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold">Generated configuration</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              This is the React component configuration based on your
              selections.
            </p>
          </div>

          <CodeBlock config={config} />
        </div>

        <div className="rounded-xl border bg-background p-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <WandSparkles className="size-4" />
          </div>

          <h3 className="mt-4 text-sm font-semibold">Ready for real AI?</h3>

          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Connect the Chatbot to your own API route using the package's server
            utilities.
          </p>

          <a
            href="/docs/getting-started/api-route"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
          >
            Configure API route
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
