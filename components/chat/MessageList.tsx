"use client";

import { useRef, useEffect } from "react";
import type { ChatMessage } from "@/lib/types";

const MSG_BG: Record<ChatMessage["role"], string> = {
  user: "#E8725C",
  error: "rgba(220,60,60,0.1)",
  system: "rgba(232,114,92,0.06)",
  assistant: "rgba(255,255,255,0.75)",
};

const MSG_COLOR: Record<ChatMessage["role"], string> = {
  user: "#fff",
  error: "#C33",
  system: "#7B6B8D",
  assistant: "#3A3154",
};

interface MessageListProps {
  messages: ChatMessage[];
  sending: boolean;
}

export default function MessageList({ messages, sending }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  return (
    <div style={{
      flex: 1, overflowY: "auto" as const,
      padding: "16px 16px 8px",
      display: "flex", flexDirection: "column" as const, gap: 10,
    }}>
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            padding: "10px 14px",
            borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            background: MSG_BG[msg.role],
            color: MSG_COLOR[msg.role],
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "88%",
            fontSize: msg.role === "system" ? 12.5 : 13.5,
            lineHeight: 1.55,
            fontStyle: msg.role === "system" ? "italic" : "normal",
            border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.5)" : "none",
            animation: "msgIn 0.25s ease",
          }}
        >
          {msg.text}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
