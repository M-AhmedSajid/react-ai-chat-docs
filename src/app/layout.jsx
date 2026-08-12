import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { RootProvider } from "fumadocs-ui/provider/next";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "next-ai-chatbot",
    template: "%s | next-ai-chatbot",
  },
  description:
    "A complete AI chatbot toolkit with streaming, RAG, embeddings, and a customizable React UI.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans">
        <RootProvider
          theme={{ enableSystem: true }}
          search={{
            options: {
              api: "/api/search",
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
