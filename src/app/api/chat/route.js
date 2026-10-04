import { google } from "@ai-sdk/google";
import { GoogleGenAI } from "@google/genai";
import { createChatRoute, googleEmbedding } from "react-ai-chat/server";
import embeddings from "@/../chatbot/embeddings.json";

const client = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const provider = googleEmbedding(client, {
    model: embeddings.model,
    dimensions: embeddings.dimensions,
    dimensions: embeddings.dimensions,
});

const systemPrompt = `
You are a helpful assistant for react-ai-chat documentation.

Guidelines:

    - Use the provided context as your primary source of truth.
    - If the answer is not present in the context, clearly say you don't have that information instead of guessing.
    - Never fabricate anything.
    - Keep answers concise and professional.
    - Expand only if the user asks for more detail.
    - Politely decline unrelated general knowledge questions by explaining that you're designed specifically for \`react-ai-chat\`.
`

export const POST = createChatRoute({
    model: google("gemini-3.5-flash"),
    systemPrompt,
    rag: {
        index: embeddings,
        provider,
        topK: 3,
    },
});