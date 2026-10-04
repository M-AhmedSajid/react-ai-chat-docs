"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clipboard,
  Monitor,
  Moon,
  RotateCcw,
  Sun,
  WandSparkles,
} from "lucide-react";

import { Chatbot } from "react-ai-chat";
import { useTheme } from "next-themes";

const POSITION_OPTIONS = [
  ["bottom-left", "Bottom left"],
  ["bottom-right", "Bottom right"],
  ["top-left", "Top left"],
  ["top-right", "Top right"],
];

const THEME_OPTIONS = [
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
];

const COLOR_OPTIONS = [
  ["primaryColor", "Primary"],
  ["primaryForeground", "Primary foreground"],
  ["background", "Background"],
  ["foreground", "Foreground"],
  ["mutedBackground", "Muted background"],
  ["mutedForeground", "Muted foreground"],
  ["borderColor", "Border"],
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Label({ children }) {
  return (
    <div className="mb-2 text-xs font-medium text-foreground">{children}</div>
  );
}

function TextInput({ label, value, placeholder, onChange }) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground"
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
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
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

function CodeBlock({ config }) {
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
    const lines = ["<Chatbot"];

    const addString = (name, value) => {
      if (!value) return;

      const escaped = value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

      lines.push(`  ${name}="${escaped}"`);
    };

    addString("title", config.title);
    addString("subtitle", config.subtitle);
    addString("triggerText", config.triggerText);
    addString("placeholder", config.placeholder);
    addString("emptyStateText", config.emptyStateText);
    addString("starterPromptsLabel", config.starterPromptsLabel);

    if (config.starterPrompts.length > 0) {
      lines.push("  starterPrompts={[");

      config.starterPrompts.forEach((prompt) => {
        const escaped = prompt.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

        lines.push(`    "${escaped}",`);
      });

      lines.push("  ]}");
    }

    lines.push(`  position="${config.position}"`);
    lines.push(`  themeMode="${config.themeMode}"`);

    if (config.initialOpen) {
      lines.push("  initialOpen");
    }

    lines.push("  theme={{");

    lines.push("    light: {");
    lines.push(`      primaryColor: "${config.theme.light.primaryColor}",`);
    lines.push(
      `      primaryForeground: "${config.theme.light.primaryForeground}",`,
    );
    lines.push(`      background: "${config.theme.light.background}",`);
    lines.push(`      foreground: "${config.theme.light.foreground}",`);
    lines.push(
      `      mutedBackground: "${config.theme.light.mutedBackground}",`,
    );
    lines.push(
      `      mutedForeground: "${config.theme.light.mutedForeground}",`,
    );
    lines.push(`      borderColor: "${config.theme.light.borderColor}",`);
    lines.push("    },");

    lines.push("    dark: {");
    lines.push(`      primaryColor: "${config.theme.dark.primaryColor}",`);
    lines.push(
      `      primaryForeground: "${config.theme.dark.primaryForeground}",`,
    );
    lines.push(`      background: "${config.theme.dark.background}",`);
    lines.push(`      foreground: "${config.theme.dark.foreground}",`);
    lines.push(
      `      mutedBackground: "${config.theme.dark.mutedBackground}",`,
    );
    lines.push(
      `      mutedForeground: "${config.theme.dark.mutedForeground}",`,
    );
    lines.push(`      borderColor: "${config.theme.dark.borderColor}",`);
    lines.push("    },");

    lines.push("  }}");
    lines.push("/>");

    return lines.join("\n");
  }, [config]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-[#0b0b0c] text-white shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>

          <span className="ml-2 font-mono text-xs text-white/50">
            chatbot.tsx
          </span>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <Clipboard className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="max-h-105 overflow-auto p-5 font-mono text-[12px] leading-6 sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ChatPlayground() {
  const { theme, setTheme } = useTheme();

  const DEFAULT_LIGHT_THEME = {
    primaryColor: "#18181b",
    primaryForeground: "#fafafa",
    background: "#ffffff",
    foreground: "#18181b",
    mutedBackground: "#f4f4f5",
    mutedForeground: "#71717a",
    borderColor: "#e4e4e7",
  };

  const DEFAULT_DARK_THEME = {
    primaryColor: "#fafafa",
    primaryForeground: "#18181b",
    background: "#18181b",
    foreground: "#fafafa",
    mutedBackground: "#27272a",
    mutedForeground: "#a1a1aa",
    borderColor: "#3f3f46",
  };

  const DEFAULT_CONFIG = {
    title: "Ask AI Assistant",
    subtitle: "Trained on custom project data and experience",
    triggerText: "Ask AI",
    placeholder: "Ask a question...",
    emptyStateText:
      "👋 Hi! Ask me anything about skills, projects, or experience.",
    starterPromptsLabel: "Try asking:",
    starterPrompts: [
      "What can you help me with?",
      "Show me an example",
      "How does this chatbot work?",
    ],
    position: "bottom-right",
    themeMode: theme,
    initialOpen: false,
    theme: {
      light: { ...DEFAULT_LIGHT_THEME },
      dark: { ...DEFAULT_DARK_THEME },
    },
  };

  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [editingTheme, setEditingTheme] = useState("light");

  function update(key, value) {
    setConfig((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateTheme(key, value) {
    setConfig((current) => ({
      ...current,
      theme: {
        ...current.theme,
        [editingTheme]: {
          ...current.theme[editingTheme],
          [key]: value,
        },
      },
    }));
  }

  function updatePrompt(index, value) {
    setConfig((current) => ({
      ...current,
      starterPrompts: current.starterPrompts.map((prompt, i) =>
        i === index ? value : prompt,
      ),
    }));
  }

  function addPrompt() {
    setConfig((current) => ({
      ...current,
      starterPrompts: [...current.starterPrompts, "Ask me something else"],
    }));
  }

  function removePrompt(index) {
    setConfig((current) => ({
      ...current,
      starterPrompts: current.starterPrompts.filter((_, i) => i !== index),
    }));
  }

  function reset() {
    setConfig({
      ...DEFAULT_CONFIG,
      starterPrompts: [...DEFAULT_CONFIG.starterPrompts],
      theme: {
        light: { ...DEFAULT_LIGHT_THEME },
        dark: { ...DEFAULT_DARK_THEME },
      },
    });

    setEditingTheme("light");
  }

  const activeTheme = config.theme[editingTheme];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Interactive playground
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Customize the chatbot and see the result instantly.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs font-medium transition hover:bg-muted"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>

      <div className="grid overflow-hidden rounded-2xl border bg-background shadow-xl lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Preview */}
        <div className="min-h-150 border-b lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium">Live preview</span>
            </div>

            <span className="text-[11px] text-muted-foreground">
              Actual Chatbot component
            </span>
          </div>

          <div className="relative flex min-h-138 items-center justify-center overflow-hidden bg-muted/5 p-6">
            <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,oklch(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border)/0.35)_1px,transparent_1px)] bg-size-[48px_48px]" />

            <div className="relative max-w-md text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border bg-background shadow-sm">
                <WandSparkles className="size-6" />
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                Customize it visually.
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every change on the right is applied to the real{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                  Chatbot
                </code>{" "}
                component.
              </p>
            </div>

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="pointer-events-auto relative h-full w-full">
                <Chatbot
                  key={`${config.initialOpen}-${config.position}`}
                  title={config.title}
                  subtitle={config.subtitle}
                  triggerText={config.triggerText}
                  placeholder={config.placeholder}
                  emptyStateText={config.emptyStateText}
                  starterPromptsLabel={config.starterPromptsLabel}
                  starterPrompts={config.starterPrompts}
                  position={config.position}
                  themeMode={config.themeMode}
                  initialOpen={config.initialOpen}
                  theme={config.theme}
                  classNames={{
                    wrapper: "absolute! bottom-6! right-6!",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <aside className="bg-background">
          <div className="border-b px-5 py-4">
            <div className="text-sm font-semibold">Configuration</div>

            <div className="mt-1 text-xs text-muted-foreground">
              These controls map directly to Chatbot props.
            </div>
          </div>

          <div className="max-h-150 space-y-7 overflow-y-auto p-5">
            {/* Theme mode */}
            <section>
              <Label>Theme mode</Label>

              <div className="grid grid-cols-3 gap-2">
                {THEME_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const active = config.themeMode === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        update("themeMode", option.value);
                        setTheme(option.value);
                      }}
                      className={cn(
                        "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-medium transition",
                        active
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted",
                      )}
                    >
                      <Icon className="size-3.5" />
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                Auto follows the user's system or site color scheme.
              </p>
            </section>

            {/* Position */}
            <section>
              <Label>Position</Label>

              <div className="grid grid-cols-2 gap-2">
                {POSITION_OPTIONS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => update("position", value)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-xs font-medium transition",
                      config.position === value
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>

            {/* Content */}
            <section className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Content
              </div>

              <TextInput
                label="Title"
                value={config.title}
                placeholder="Ask AI Assistant"
                onChange={(value) => update("title", value)}
              />

              <TextInput
                label="Subtitle"
                value={config.subtitle}
                placeholder="Trained on custom project data"
                onChange={(value) => update("subtitle", value)}
              />

              <TextInput
                label="Trigger text"
                value={config.triggerText}
                placeholder="Ask AI"
                onChange={(value) => update("triggerText", value)}
              />

              <TextInput
                label="Input placeholder"
                value={config.placeholder}
                placeholder="Ask a question..."
                onChange={(value) => update("placeholder", value)}
              />

              <TextInput
                label="Empty state"
                value={config.emptyStateText}
                placeholder="👋 Hi! Ask me anything."
                onChange={(value) => update("emptyStateText", value)}
              />

              <TextInput
                label="Starter prompts label"
                value={config.starterPromptsLabel}
                placeholder="Try asking:"
                onChange={(value) => update("starterPromptsLabel", value)}
              />
            </section>

            {/* Starter prompts */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold">Starter prompts</div>

                  <div className="mt-1 text-[11px] text-muted-foreground">
                    Questions shown when the chat is empty.
                  </div>
                </div>

                <Toggle
                  checked={config.starterPrompts.length > 0}
                  onChange={(enabled) => {
                    if (!enabled) {
                      update("starterPrompts", []);
                    } else if (config.starterPrompts.length === 0) {
                      update("starterPrompts", [
                        ...DEFAULT_CONFIG.starterPrompts,
                      ]);
                    }
                  }}
                />
              </div>

              {config.starterPrompts.length > 0 && (
                <div className="space-y-2">
                  {config.starterPrompts.map((prompt, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={prompt}
                        onChange={(event) =>
                          updatePrompt(index, event.target.value)
                        }
                        className="h-9 min-w-0 flex-1 rounded-lg border bg-background px-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />

                      <button
                        type="button"
                        onClick={() => removePrompt(index)}
                        className="size-9 shrink-0 rounded-lg border text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        aria-label={`Remove prompt ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPrompt}
                    className="mt-1 w-full rounded-lg border border-dashed px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    + Add prompt
                  </button>
                </div>
              )}
            </section>

            {/* Behavior */}
            <section className="space-y-3 rounded-xl border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium">Initially open</div>

                  <div className="mt-1 text-[11px] text-muted-foreground">
                    Open the chatbot when the component mounts.
                  </div>
                </div>

                <Toggle
                  checked={config.initialOpen}
                  onChange={(value) => update("initialOpen", value)}
                />
              </div>
            </section>

            {/* Colors */}
            <section>
              <div className="mb-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Theme colors
                </div>

                <div className="mt-1 text-[11px] text-muted-foreground">
                  Fine-tune the chatbot's visual identity.
                </div>
              </div>

              {/* Light / Dark editor */}
              <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-1">
                <button
                  type="button"
                  onClick={() => setEditingTheme("light")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition",
                    editingTheme === "light"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Sun className="size-3.5" />
                  Light
                </button>

                <button
                  type="button"
                  onClick={() => setEditingTheme("dark")}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition",
                    editingTheme === "dark"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Moon className="size-3.5" />
                  Dark
                </button>
              </div>

              <div className="mb-3 rounded-lg border bg-muted/20 px-3 py-2.5">
                <div className="text-[11px] font-medium">
                  Editing {editingTheme} theme
                </div>

                <div className="mt-0.5 text-[10px] text-muted-foreground">
                  These values are used when themeMode is set to {editingTheme}.
                </div>
              </div>

              <div className="space-y-3">
                {COLOR_OPTIONS.map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-xs">{label}</span>

                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={activeTheme[key]}
                        onChange={(event) =>
                          updateTheme(key, event.target.value)
                        }
                        className="size-8 cursor-pointer rounded-md border bg-background p-0.5"
                        aria-label={`${label} color`}
                      />

                      <input
                        value={activeTheme[key]}
                        onChange={(event) =>
                          updateTheme(key, event.target.value)
                        }
                        className="h-8 w-24 rounded-md border bg-background px-2 font-mono text-[11px] uppercase outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>

      {/* Generated code */}
      <div className="mt-8">
        <div className="mb-3">
          <h3 className="text-sm font-semibold">Generated configuration</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Copy this directly into your React component.
          </p>
        </div>

        <CodeBlock config={config} />
      </div>
    </div>
  );
}
