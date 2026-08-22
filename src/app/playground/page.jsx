import Link from "next/link";
import { ArrowRight, Check, Code2, Sparkles, Terminal } from "lucide-react";
import { GitHub } from "react-feather";

import { buttonVariants } from "@/components/ui/button";
import { ChatPlayground } from "@/components/chat-playground";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export const metadata = {
  title: "Playground",
  description:
    "Experiment with react-ai-chat and customize your chatbot before adding it to your React application.",
};

export default function PlaygroundPage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="overflow-hidden">
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(var(--primary)/0.12),transparent_45%)]" />

          <div className="absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(to_right,oklch(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border)/0.45)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]" />

          <div className="mx-auto max-w-6xl px-6 pb-14 pt-16 text-center sm:pb-20 sm:pt-24">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-3" />
              </span>
              Interactive playground
            </div>

            <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
              Build your chatbot before you build your app.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
              Change the chatbot configuration and see how it feels instantly.
              When you're happy with it, copy the generated configuration into
              your React application.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/docs/getting-started"
                className={buttonVariants({ variant: "outline" })}
              >
                Read the docs
                <ArrowRight />
              </Link>

              <Link
                href="https://github.com/M-AhmedSajid/react-ai-chat"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "ghost" })}
              >
                <GitHub />
                GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b bg-muted/16">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
            <ChatPlayground />
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Code2 className="size-3.5" />
                From playground to production
              </div>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Like the configuration?
                <br />
                Drop it into your app.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                The playground controls map directly to the Chatbot component.
                Configure the experience here, then connect it to your own API
                route when you're ready.
              </p>

              <Link
                href="/docs/getting-started/quick-start"
                className={`mt-7 ${buttonVariants({ size: "lg" })}`}
              >
                Start building
                <ArrowRight />
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-[#0b0b0c] shadow-xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/20" />
                </div>

                <div className="ml-2 flex items-center gap-2 font-mono text-xs text-white/50">
                  <Terminal className="size-3.5" />
                  chatbot.tsx
                </div>
              </div>

              <pre className="overflow-x-auto p-5 text-[13px] leading-7 text-white/90 sm:p-7">
                <code>
                  <span className="text-purple-300">import</span>{" "}
                  {"{ Chatbot }"} <span className="text-purple-300">from</span>{" "}
                  <span className="text-emerald-300">"react-ai-chat"</span>;
                  {"\n\n"}
                  <span className="text-purple-300">
                    export default function
                  </span>{" "}
                  <span className="text-blue-300">App</span>() {"{"}
                  {"\n"}
                  {"  "}
                  <span className="text-purple-300">return</span> ({"\n"}
                  {"    "}
                  <span className="text-white/50">&lt;</span>
                  <span className="text-blue-300">Chatbot</span>
                  {"\n"}
                  {"      "}
                  <span className="text-cyan-300">title</span>=
                  <span className="text-emerald-300">"Ask AI Assistant"</span>
                  {"\n"}
                  {"      "}
                  <span className="text-cyan-300">position</span>=
                  <span className="text-emerald-300">"bottom-right"</span>
                  {"\n"}
                  {"      "}
                  <span className="text-cyan-300">themeMode</span>=
                  <span className="text-emerald-300">"dark"</span>
                  {"\n"}
                  {"      "}
                  <span className="text-cyan-300">triggerText</span>=
                  <span className="text-emerald-300">"Ask AI"</span>
                  {"\n"}
                  {"    "}
                  <span className="text-white/50">/&gt;</span>
                  {"\n"}
                  {"  "}){";"}
                  {"\n"}
                  {"}"}
                </code>
              </pre>

              <div className="border-t border-white/10 bg-white/3 px-5 py-4">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Check className="size-3.5 text-emerald-400" />
                  Connect your own API route for live AI responses.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
            <div className="mx-auto flex size-11 items-center justify-center rounded-xl border bg-background shadow-sm">
              <Sparkles className="size-5" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight">
              Need more control?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
              Generate the chatbot UI directly into your project with the CLI.
              Edit the components, styles, and structure however you want.
            </p>

            <Link
              href="/docs/guides/generated-chatbot"
              className={`mt-7 ${buttonVariants({ variant: "outline" })}`}
            >
              Explore generated UI
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}
