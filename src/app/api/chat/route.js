import { google } from "@ai-sdk/google";
import { createChatRoute } from "react-ai-chat/server";

export const POST = createChatRoute({
    model: google("gemini-3.5-flash"),
});