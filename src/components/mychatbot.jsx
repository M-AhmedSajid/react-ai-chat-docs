"use client";

import { Chatbot } from "react-ai-chat";
import "react-ai-chat/style.css";

export function MyChatbot() {
  return <Chatbot apiEndpoint="/api/chat" />;
}
