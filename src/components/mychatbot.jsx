"use client";

import { Chatbot } from "react-ai-chat";
import "react-ai-chat/style.css";

export function MyChatbot() {
  return (
    <Chatbot
      title="react-ai-chat Assistant"
      subtitle="Ask anything about react-ai-chat"
      triggerText="Ask AI"
      emptyStateText="How can I help you with react-ai-chat?"
      placeholder="Ask about installation, RAG, CLI, or customization..."
      starterPromptsLabel="Try asking"
      starterPrompts={[
        "How do I get started with react-ai-chat?",
        "How do I set up RAG with my own content?",
        "Which embedding provider should I use?",
        "How do I customize the chatbot?",
      ]}
      position="bottom-right"
      themeMode="auto"
    />
  );
}
