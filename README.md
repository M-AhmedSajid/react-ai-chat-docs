# react-ai-chat Docs

Official documentation for [react-ai-chat](https://github.com/M-AhmedSajid/react-ai-chat).

`react-ai-chat` is a React AI chatbot package that provides a ready-made chatbot UI, server-side chat routes, multiple AI providers, and RAG support.

## Documentation

The documentation site is available at:

**[react-ai-chat Documentation](https://react-ai-chat.vercel.app/)**

## What is react-ai-chat?

`react-ai-chat` makes it easier to add an AI chatbot to a React application.

It provides:

- Ready-made chatbot UI
- Editable chatbot generation through the CLI
- Server-side chat route creation
- Multiple AI model providers
- Embedding providers
- RAG support
- Customizable chatbot appearance
- TypeScript support
- JSX support

## Installation

Install the package with your preferred package manager:

```bash
npm install react-ai-chat
```

```bash
pnpm add react-ai-chat
```

```bash
yarn add react-ai-chat
```

```bash
bun add react-ai-chat
```

## Quick Start

Import the `Chatbot` component and its stylesheet:

```tsx
"use client";

import { Chatbot } from "react-ai-chat";
import "react-ai-chat/style.css";

export function App() {
  return <Chatbot apiEndpoint="/api/chat" />;
}
```

Then create your server route with `createChatRoute()`:

```tsx
import { createChatRoute } from "react-ai-chat/server";

export const POST = createChatRoute({
  model,
});
```

The chatbot communicates with this endpoint to send and receive messages.

See the [Quick Start](https://react-ai-chat-docs.vercel.app/docs/getting-started/quick-start) guide for the complete setup.

## Generated Chatbot

If you need more control over the chatbot UI, generate an editable implementation with the CLI:

```bash
npx react-ai-chat init
```

The generated source code becomes part of your project and can be customized directly.

You can generate JSX instead of TypeScript:

```bash
npx react-ai-chat init --jsx
```

Choose a custom output directory:

```bash
npx react-ai-chat init --path src/components/chatbot
```

Replace existing generated files:

```bash
npx react-ai-chat init --force
```

See the [Generated Chatbot](https://react-ai-chat-docs.vercel.app/docs/guides/generated-chatbot) guide.

## CLI

The package includes a CLI for generating chatbot source code and creating RAG indexes.

Initialize a chatbot:

```bash
npx react-ai-chat init
```

Generate a RAG index with Google:

```bash
npx react-ai-chat --google
```

Generate a RAG index from a custom directory:

```bash
npx react-ai-chat --google ./docs
```

Specify a custom output path:

```bash
npx react-ai-chat --google --output ./data/embeddings.json
```

Or provide both paths:

```bash
npx react-ai-chat \
  --google \
  ./docs \
  ./data/embeddings.json
```

Available embedding provider flags:

```text
--google
--openai
--voyage
--cohere
--jina
--huggingface
```

You can also use:

```bash
npx react-ai-chat --provider google
```

See the [CLI](https://react-ai-chat-docs.vercel.app/docs/guides/cli) guide for all commands and options.

## RAG

`react-ai-chat` supports retrieval augmented generation using your own content.

Create a content directory:

```text
content/
├── getting-started.md
├── installation.md
├── configuration.md
└── faq.md
```

Generate the embedding index:

```bash
npx react-ai-chat --google
```

The default paths are:

```text
Content: ./content
Output:  ./chatbot/embeddings.json
```

You can customize both:

```bash
npx react-ai-chat \
  --google \
  ./docs \
  ./data/embeddings.json
```

Then configure RAG on your server route:

```tsx
import { createChatRoute } from "react-ai-chat/server";

export const POST = createChatRoute({
  model,
  rag: {
    index,
    provider,
    topK: 3,
  },
});
```

Supported embedding providers include:

* Google
* OpenAI
* Voyage
* Cohere
* Jina
* Hugging Face

See the [RAG](https://react-ai-chat-docs.vercel.app/docs/rag) guide for the complete workflow.

## Providers

`react-ai-chat` supports different providers for chat generation and embeddings.

Embedding providers include:

* Google
* OpenAI
* Voyage
* Cohere
* Jina
* Hugging Face

Provider configuration depends on the provider you choose.

See the [Providers](https://react-ai-chat-docs.vercel.app/docs/api/providers) documentation for installation and configuration details.

## Customization

The ready-made `Chatbot` component provides options for customizing its appearance and behavior.

For example:

```tsx
<Chatbot
  title="Project Assistant"
  subtitle="Ask questions about this project"
  placeholder="Ask a question..."
  position="bottom-right"
  themeMode="auto"
/>
```

You can customize text, theme, icons, positioning, classes, starter prompts, and error handling.

See the [Customization](https://react-ai-chat-docs.vercel.app/docs/guides/customization) guide.

## Documentation Development

This repository contains the documentation site for `react-ai-chat`.

### Clone the repository

```bash
git clone https://github.com/M-AhmedSajid/react-ai-chat-docs.git
cd react-ai-chat-docs
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The documentation site will be available at the local URL shown by Next.js.

### Build the documentation

```bash
npm run build
```

### Start the production build

```bash
npm run start
```

## Tech Stack

The documentation site uses:

* Next.js
* Fumadocs
* Fumadocs MDX
* Tailwind CSS
* shadcn/ui
* TypeScript

## Repository

Package:

[github.com/M-AhmedSajid/react-ai-chat](https://github.com/M-AhmedSajid/react-ai-chat)

Documentation:

[github.com/M-AhmedSajid/react-ai-chat-docs](https://github.com/M-AhmedSajid/react-ai-chat-docs)

## Contributing

Found an issue in the documentation?

Open an issue or submit a pull request in the documentation repository.

If the issue is related to the package itself, report it in the [react-ai-chat repository](https://github.com/M-AhmedSajid/react-ai-chat).

## License

The documentation follows the license of the `react-ai-chat` project.