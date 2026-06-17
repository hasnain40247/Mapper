import type { OllamaStatus } from "./types";

const OLLAMA_BASE = "http://localhost:11434";

interface OllamaTagsResponse {
  models?: { name: string }[];
}

export async function checkOllamaConnection(): Promise<OllamaStatus> {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`);
    if (res.ok) {
      const data: OllamaTagsResponse = await res.json();
      if (data.models && data.models.length > 0) {
        return { status: "connected", model: "llama3:8b" };
      }
    }
    return { status: "offline", model: "" };
  } catch {
    return { status: "offline", model: "" };
  }
}

export async function streamChatMessage(
  model: string,
  countryName: string,
  userMessage: string,
  onToken: (token: string) => void,
  onDone: () => void,
  onError: (err: string) => void
): Promise<void> {
  const context = countryName
    ? `You are a friendly, knowledgeable guide about ${countryName}. Answer concisely in 2-4 sentences. Be engaging and share interesting details.`
    : "You are a world geography assistant. Be concise.";

  try {
    const res = await fetch(`${OLLAMA_BASE}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt: `${context}\n\nUser: ${userMessage}\n\nAssistant:`,
        stream: true,
        options: { temperature: 0.7, num_predict: 300 },
      }),
    });

    if (!res.ok || !res.body) {
      onError("Failed to connect to Ollama.");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const chunk = JSON.parse(line) as { response?: string; done?: boolean };
          if (chunk.response) {
            onToken(chunk.response);
          }
          if (chunk.done) {
            onDone();
            return;
          }
        } catch {
          // skip malformed lines
        }
      }
    }

    onDone();
  } catch {
    onError("Failed to reach Ollama. Is it running?");
  }
}
