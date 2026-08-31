import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Code2,
  Command,
  Database,
  Layers3,
  MessageSquare,
  Package,
  Play,
  Rocket,
  Search,
  Server,
  Sparkles,
  Terminal,
  WandSparkles,
  Zap,
} from "lucide-react";
import { GitHub } from "react-feather";

import { buttonVariants } from "@/components/ui/button";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Tab, Tabs } from "@/components/tabs";
import { CodeBlock, Pre } from "@/components/codeblock";

const providers = [
  "Google",
  "OpenAI",
  "Voyage",
  "Cohere",
  "Jina",
  "Hugging Face",
];

const frameworks = ["Next.js", "Vite", "React Router"];

function FeatureCard({ icon: Icon, title, description, href, className = "" }) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-5 flex size-10 items-center justify-center rounded-xl border bg-muted/60 text-foreground">
        <Icon className="size-5" />
      </div>

      <h3 className="font-semibold tracking-tight">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-sm font-medium opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
        Learn more
        <ArrowRight className="size-4" />
      </div>
    </Link>
  );
}

function CodeLine({ children, muted = false }) {
  return (
    <div
      className={`font-mono text-[13px] leading-6 ${
        muted ? "text-muted-foreground/70" : "text-foreground"
      }`}
    >
      {children}
    </div>
  );
}

function Architecture() {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(var(--primary)/0.08),transparent_35%),radial-gradient(circle_at_80%_80%,oklch(var(--primary)/0.06),transparent_35%)]" />

      <div className="relative grid md:grid-cols-3">
        <ArchitectureNode
          icon={MessageSquare}
          number="01"
          title="Your React app"
          description="Render the chatbot or generate editable UI directly into your project."
        />

        <ArchitectureNode
          icon={Server}
          number="02"
          title="Your API route"
          description="Use createChatRoute() to connect the client to an AI SDK model."
        />

        <ArchitectureNode
          icon={Sparkles}
          number="03"
          title="AI model"
          description="Choose the model and provider that fit your application."
        />
      </div>

      <div className="relative border-t px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Optional RAG</span>
          <ArrowRight className="size-3.5" />
          <span>Documents</span>
          <ArrowRight className="size-3.5" />
          <span>Embeddings</span>
          <ArrowRight className="size-3.5" />
          <span>Relevant context</span>
          <ArrowRight className="size-3.5" />
          <span>AI response</span>
        </div>
      </div>
    </div>
  );
}

function ArchitectureNode({ icon: Icon, number, title, description }) {
  return (
    <div className="relative p-7 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl border bg-background shadow-sm">
          <Icon className="size-5" />
        </div>

        <span className="font-mono text-xs text-muted-foreground">
          {number}
        </span>
      </div>

      <h3 className="font-semibold tracking-tight">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {number !== "03" && (
        <div className="absolute right-0 top-1/2 hidden h-px w-8 translate-x-1/2 bg-border md:block" />
      )}
    </div>
  );
}

function ProviderPill({ name }) {
  return (
    <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm shadow-sm">
      <span className="flex size-5 items-center justify-center rounded-md bg-muted text-[10px] font-semibold">
        {name.charAt(0)}
      </span>
      {name}
    </div>
  );
}

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="overflow-hidden">
        {/* Hero */}
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(var(--primary)/0.12),transparent_45%)]" />

          <div className="absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(to_right,oklch(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border)/0.45)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]" />

          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-3" />
              </span>
              Open source React AI chatbot
            </div>

            <h1 className="max-w-5xl text-balance text-5xl font-bold tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem] lg:leading-[0.98]">
              AI chat for React.
              <br />
              <span className="bg-linear-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
                Your UI. Your rules.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
              Add a customizable AI chatbot to your React app with streaming
              responses, server-side model integration, and optional RAG. Start
              with the ready-made UI or generate editable chatbot components
              directly into your project.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/docs/getting-started"
                className={buttonVariants({ size: "lg" })}
              >
                Get started
                <ArrowRight />
              </Link>

              <Link
                href="https://github.com/M-AhmedSajid/react-ai-chat"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                <GitHub />
                View on GitHub
              </Link>
              <Link
                href="https://www.npmjs.com/package/react-ai-chat"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                <Package />
                View on npm
              </Link>
            </div>

            <Tabs
              items={["npm", "pnpm", "yarn", "bun"]}
              className="mt-8 w-full max-w-lg rounded-xl shadow-sm text-left"
            >
              <Tab value="npm">
                <CodeBlock className="px-5">
                  <Pre>npm install react-ai-chat</Pre>
                </CodeBlock>
              </Tab>

              <Tab value="pnpm">
                <CodeBlock className="px-5">
                  <Pre>pnpm install react-ai-chat</Pre>
                </CodeBlock>
              </Tab>

              <Tab value="yarn">
                <CodeBlock className="px-5">
                  <Pre>yarn install react-ai-chat</Pre>
                </CodeBlock>
              </Tab>

              <Tab value="bun">
                <CodeBlock className="px-5">
                  <Pre>bun install react-ai-chat</Pre>
                </CodeBlock>
              </Tab>
            </Tabs>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5" />
                React 18 & 19
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5" />
                TypeScript
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5" />
                Node 18+
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5" />
                MIT
              </span>
            </div>
          </div>
        </section>

        {/* Product preview */}
                {/* Interactive demo */}
        <section className="border-b bg-muted/18">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <MessageSquare className="size-3.5" />
                Interactive demo
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Try the chatbot yourself.
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                The chatbot in the bottom-right corner is powered by{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm text-foreground">
                  react-ai-chat
                </code>
                . Open it and ask a question to see the ready-made component
                in action.
              </p>

              <div className="mt-10 flex flex-col items-center">
                <div className="relative flex h-40 w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border bg-background shadow-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(var(--primary)/0.08),transparent_65%)]" />

                  <div className="relative flex flex-col items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-2xl border bg-muted shadow-sm">
                      <Bot className="size-5" />
                    </div>

                    <div className="text-sm font-medium">
                      The chatbot is live on this page
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Look for the chat button in the bottom-right corner.
                    </div>
                  </div>

                  <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs font-medium shadow-lg">
                    <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                    Chatbot
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <ArrowRight className="size-3.5 rotate-45" />
                  Open the chatbot to try it
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main capabilities */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="mb-12 max-w-2xl">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Built around your workflow
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Start simple. Customize when you need to.
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                The package separates chat logic from presentation, so you can
                use the default UI today and take control of the interface
                later.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Bot}
                title="Ready-made chatbot"
                description="Drop Chatbot into your React application and get streaming chat, starter prompts, themes, positioning, and configurable text."
                href="/docs/getting-started/chatbot-ui"
              />

              <FeatureCard
                icon={WandSparkles}
                title="Own the UI"
                description="Generate the chatbot source with the CLI. The generated components live inside your project and can be edited directly."
                href="/docs/guides/generated-chatbot"
              />

              <FeatureCard
                icon={Server}
                title="Simple server route"
                description="Connect your chatbot to an AI SDK-compatible model through createChatRoute()."
                href="/docs/getting-started/api-route"
              />

              <FeatureCard
                icon={Database}
                title="Optional RAG"
                description="Load your own documents, create an embedding index, retrieve relevant context, and ground model responses."
                href="/docs/guides/rag"
              />

              <FeatureCard
                icon={Layers3}
                title="Multiple embeddings"
                description="Choose from Google, OpenAI, Voyage, Cohere, Jina, or Hugging Face for your embedding workflow."
                href="/docs/api/providers"
              />

              <FeatureCard
                icon={Code2}
                title="React-first"
                description="Use the package with React 18 or 19 and tested React frameworks including Next.js, Vite, and React Router."
                href="/docs"
              />
            </div>
          </div>
        </section>

        {/* Ownership section */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Complete control
                </div>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Start with the UI. Own the source.
                </h2>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Generate the UI into your own codebase and change the
                  structure, styling, text, message layout, header, input, or
                  interaction patterns.
                </p>

                <Link
                  href="/docs/guides/generated-chatbot"
                  className={`mt-7 ${buttonVariants({ variant: "outline" })}`}
                >
                  Explore generated UI
                  <ArrowRight />
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl border bg-[#0b0b0c] shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/20" />
                    <span className="size-2.5 rounded-full bg-white/20" />
                    <span className="size-2.5 rounded-full bg-white/20" />
                  </div>

                  <div className="ml-2 flex items-center gap-2 font-mono text-xs text-white/50">
                    <Terminal className="size-3.5" />
                    terminal
                  </div>
                </div>

                <div className="space-y-1 p-5 sm:p-7">
                  <CodeLine muted># Generate an editable chatbot</CodeLine>

                  <CodeLine>
                    <span className="text-emerald-400">$</span> npx
                    react-ai-chat init
                  </CodeLine>

                  <div className="h-3" />

                  <CodeLine muted>Creating chatbot in ./chatbot</CodeLine>

                  <CodeLine>
                    <span className="text-emerald-400">✓</span> chatbot.tsx
                  </CodeLine>

                  <CodeLine>
                    <span className="text-emerald-400">✓</span>{" "}
                    chatbot-header.tsx
                  </CodeLine>

                  <CodeLine>
                    <span className="text-emerald-400">✓</span>{" "}
                    chatbot-messages.tsx
                  </CodeLine>

                  <CodeLine>
                    <span className="text-emerald-400">✓</span>{" "}
                    chatbot-input.tsx
                  </CodeLine>

                  <CodeLine>
                    <span className="text-emerald-400">✓</span> chatbot.css
                  </CodeLine>

                  <div className="h-3" />

                  <CodeLine muted>Your chatbot is ready to customize.</CodeLine>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/3 px-3 py-2 text-xs text-white/50">
                    <Command className="size-3.5" />
                    The UI belongs to your project.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real project demo */}
        <section className="border-b bg-muted/18">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Real project
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                See it running in a real portfolio.
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                I built an AI chatbot for my portfolio using react-ai-chat, RAG,
                and Google Gemini. Visitors can ask questions about my projects,
                skills, and experience.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="relative w-full aspect-video">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/YZPEbH7LYpE?si=c109XV41J2YMrkNE"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5" />
                  Next.js
                </span>

                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5" />
                  Google Gemini
                </span>

                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5" />
                  RAG
                </span>

                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5" />
                  react-ai-chat
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="border-b bg-muted/18">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Architecture
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Keep the pieces you care about.
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                React handles the experience. Your route handles the server.
                Your model handles generation. RAG is there when you need
                grounded answers.
              </p>
            </div>

            <Architecture />
          </div>
        </section>

        {/* RAG */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <Search className="size-3.5" />
                  Optional RAG
                </div>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Give your chatbot something to know.
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                  Index your own documents with the CLI, retrieve relevant
                  chunks at request time, and pass that context to your model.
                  The basic chatbot stays simple when you do not need RAG.
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {providers.map((provider) => (
                    <ProviderPill key={provider} name={provider} />
                  ))}
                </div>

                <Link
                  href="/docs/guides/rag"
                  className={`mt-8 ${buttonVariants({ variant: "outline" })}`}
                >
                  Read the RAG guide
                  <ArrowRight />
                </Link>
              </div>

              <div className="rounded-2xl border bg-card p-5 shadow-lg sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">
                      Retrieval pipeline
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Content to grounded response
                    </div>
                  </div>

                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <Database className="size-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    ["01", "Your documents", "content/"],
                    ["02", "Embedding index", "embeddings.json"],
                    ["03", "Relevant chunks", "topK: 3"],
                    ["04", "Model context", "system prompt"],
                    ["05", "Streaming answer", "AI SDK"],
                  ].map(([number, title, value], index) => (
                    <div key={number}>
                      <div className="flex items-center gap-3 rounded-xl border bg-muted/20 p-3">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {number}
                        </span>

                        <div className="flex-1">
                          <div className="text-sm font-medium">{title}</div>
                          <div className="font-mono text-[11px] text-muted-foreground">
                            {value}
                          </div>
                        </div>

                        {index < 4 ? (
                          <ArrowRight className="size-3.5 text-muted-foreground" />
                        ) : (
                          <Check className="size-4 text-emerald-500" />
                        )}
                      </div>

                      {index < 4 && (
                        <div className="ml-6 h-2 border-l border-dashed" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frameworks */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div>
                <div className="text-sm font-semibold">
                  Tested React integrations
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Works with React apps using these popular frameworks.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 md:justify-end">
                {frameworks.map((framework) => (
                  <div
                    key={framework}
                    className="rounded-full border bg-muted/30 px-4 py-2 text-sm font-medium"
                  >
                    {framework}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick start */}
        <section className="border-b bg-muted/18">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <Rocket className="size-3.5" />
                  Quick start
                </div>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  From install to first message.
                </h2>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Install the package, create your API route, render the
                  chatbot, and start streaming responses.
                </p>

                <Link
                  href="/docs/getting-started/quick-start"
                  className={`mt-7 ${buttonVariants({ size: "lg" })}`}
                >
                  Follow the guide
                  <ArrowRight />
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl border bg-background shadow-xl">
                <div className="flex items-center gap-2 border-b px-4 py-3">
                  <div className="flex size-7 items-center justify-center rounded-md bg-muted">
                    <Code2 className="size-3.5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    app/api/chat/route.ts
                  </span>
                </div>

                <div className="overflow-x-auto p-5 sm:p-7">
                  <pre className="font-mono text-[13px] leading-7">
                    <code>
                      <span className="text-muted-foreground">import </span>
                      <span className="text-foreground">
                        {"{ createChatRoute }"}
                      </span>
                      <span className="text-muted-foreground">{" from "}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {'"react-ai-chat/server"'}
                      </span>
                      <span className="text-muted-foreground">;</span>
                      {"\n"}
                      <span className="text-muted-foreground">import </span>
                      <span className="text-foreground">{"{ google }"}</span>
                      <span className="text-muted-foreground">{" from "}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {'"@ai-sdk/google"'}
                      </span>
                      <span className="text-muted-foreground">;</span>
                      {"\n\n"}
                      <span className="text-muted-foreground">
                        export const
                      </span>{" "}
                      <span className="text-foreground">POST</span>{" "}
                      <span className="text-muted-foreground">=</span>{" "}
                      <span className="text-foreground">createChatRoute</span>
                      <span className="text-muted-foreground">({"{"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-foreground">model: google(</span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        {'"gemini-3.5-flash"'}
                      </span>
                      <span className="text-foreground">)</span>
                      <span className="text-muted-foreground">,</span>
                      {"\n"}
                      <span className="text-muted-foreground">{"});"}</span>
                    </code>
                  </pre>
                </div>

                <div className="border-t bg-muted/20 px-5 py-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Play className="size-3.5" />
                    Then render{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                      {"<Chatbot />"}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
            <div className="absolute inset-x-1/4 top-1/2 -z-10 h-48 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border bg-background shadow-sm">
              <MessageSquare className="size-5" />
            </div>

            <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Build the chat experience your app actually needs.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
              Start with the ready-made chatbot. Move to generated UI when your
              product needs deeper control.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/docs/getting-started"
                className={buttonVariants({ size: "lg" })}
              >
                Get started
                <ArrowRight />
              </Link>

              <Link
                href="/docs"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                })}
              >
                Read the docs
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Open source under MIT
              </div>

              <Link
                href="https://www.patreon.com/cw/mahmedsajid"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Support the project on Patreon
              </Link>
            </div>
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}
