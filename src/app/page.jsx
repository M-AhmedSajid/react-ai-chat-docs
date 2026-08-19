import Link from "next/link";
import { ArrowRight, Package, Sparkles } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { GitHub } from "react-feather";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="min-h-[calc(100vh-4rem)]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5" />
              Open source AI chatbot for React
            </div>

            <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              Add an AI chatbot to your app in minutes.
            </h1>

            <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
              A customizable React chatbot component with streaming responses,
              theming, and server-side AI integration.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/docs" className={buttonVariants({ size: "lg" })}>
                Get Started
                <ArrowRight />
              </Link>
              <Link
                href="https://github.com/M-AhmedSajid/react-ai-chat"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <GitHub />
                GitHub
              </Link>
            </div>

            {/* Install */}
            <div className="mt-10 flex w-full max-w-md items-center rounded-lg border bg-muted/50 p-1.5 text-left">
              <code className="flex-1 px-3 py-2 font-mono text-sm text-muted-foreground">
                npm install react-ai-chat
              </code>
            </div>
          </div>
        </section>

        {/* Preview */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-10 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Built for developers
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                A chatbot that feels native to your app.
              </h2>
            </div>

            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <div className="size-2.5 rounded-full bg-muted-foreground/30" />
                <div className="size-2.5 rounded-full bg-muted-foreground/30" />
                <div className="size-2.5 rounded-full bg-muted-foreground/30" />

                <span className="ml-2 text-xs text-muted-foreground">
                  AI Assistant
                </span>
              </div>

              <div className="flex min-h-90 flex-col">
                <div className="flex-1 space-y-6 p-6">
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">
                      How can I add an AI chatbot to my React app?
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Sparkles className="size-4" />
                    </div>

                    <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-sm leading-6">
                      Install the package, add the Chatbot component, and
                      connect it to your API route. You can customize the theme
                      and behavior to match your app.
                    </div>
                  </div>
                </div>

                <div className="border-t p-4">
                  <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
                    <span className="flex-1 text-sm text-muted-foreground">
                      Ask anything...
                    </span>

                    <Button size="icon" className="size-8">
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-3">
              <Feature
                title="Simple API"
                description="Drop the Chatbot component into your React application and start building."
              />

              <Feature
                title="Fully customizable"
                description="Customize the appearance, behavior, prompts, and model configuration."
              />

              <Feature
                title="Streaming ready"
                description="Give users responsive AI interactions with streamed model responses."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <Package className="mx-auto size-8 text-muted-foreground" />

            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              Start building with react-ai-chat
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Read the documentation and get your first AI chatbot running in
              minutes.
            </p>
            <Link
              href="/docs"
              className={`mt-8 ${buttonVariants({ size: "lg" })}`}
            >
              Read the documentation
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </HomeLayout>
  );
}

function Feature({ title, description }) {
  return (
    <div className="bg-card p-8">
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
