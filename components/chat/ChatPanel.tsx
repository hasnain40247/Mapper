"use client";

import { useState, useEffect, useRef } from "react";
import type { CountryInfo, ChatMessage } from "@/lib/types";
import { checkOllamaConnection, streamChatMessage } from "@/lib/ollama";
import { fetchCountryFacts } from "@/lib/countryfacts";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

interface ChatPanelProps {
  country: CountryInfo;
  onClose: () => void;
  externalQuestion?: string | null;
  onQuestionConsumed?: () => void;
}

export default function ChatPanel({ country, onClose, externalQuestion, onQuestionConsumed }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<"unknown" | "connected" | "offline">("unknown");
  const [ollamaModel, setOllamaModel] = useState("");
  const historyRef = useRef<Record<string, ChatMessage[]>>({});
  const prevCountryRef = useRef<string>("");
  const [flagUrl, setFlagUrl] = useState<string | null>(null);

  useEffect(() => { doCheck(); }, []);

  useEffect(() => {
    setFlagUrl(null);
    fetchCountryFacts(country.name).then((f) => { if (f?.flagPng) setFlagUrl(f.flagPng); });
  }, [country.name]);

  useEffect(() => {
    if (prevCountryRef.current && prevCountryRef.current !== country.name) {
      historyRef.current[prevCountryRef.current] = messages;
    }
    prevCountryRef.current = country.name;

    const saved = historyRef.current[country.name];
    if (saved && saved.length > 0) {
      setMessages(saved);
    } else {
      setMessages([{ role: "system", text: `Ask me anything about ${country.name}! I can tell you about its history, culture, geography, economy, and more.` }]);
    }
    setInput("");
  }, [country.name]);

  useEffect(() => {
    if (country.name && messages.length > 0) {
      historyRef.current[country.name] = messages;
    }
  }, [messages, country.name]);

  async function doCheck(): Promise<void> {
    const { status, model } = await checkOllamaConnection();
    setOllamaStatus(status);
    setOllamaModel(model);
  }

  async function sendMessage(msg: string): Promise<void> {
    if (!msg.trim() || sending) return;
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setSending(true);

    if (ollamaStatus !== "connected") {
      setMessages((prev) => [...prev, { role: "error", text: "Ollama is not running. Start it with `ollama serve` in your terminal." }]);
      setSending(false);
      return;
    }

    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    await streamChatMessage(
      ollamaModel, country.name, msg,
      (token: string) => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") updated[updated.length - 1] = { ...last, text: last.text + token };
          return updated;
        });
      },
      () => { setSending(false); },
      (err: string) => {
        setMessages((prev) => {
          const updated = prev.filter((m, i) => !(i === prev.length - 1 && m.role === "assistant" && m.text === ""));
          return [...updated, { role: "error", text: err }];
        });
        setSending(false);
      }
    );
  }

  function handleSend(): void {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    sendMessage(msg);
  }

  function handleClear(): void {
    setMessages([{ role: "system", text: `Ask me anything about ${country.name}! I can tell you about its history, culture, geography, economy, and more.` }]);
    historyRef.current[country.name] = [];
  }

  useEffect(() => {
    if (externalQuestion && !sending) {
      sendMessage(externalQuestion);
      onQuestionConsumed?.();
    }
  }, [externalQuestion]);

  return (
    <div style={{
      position: "absolute", top: 20, right: 20,
      width: 440, maxHeight: "calc(100vh - 40px)",
      zIndex: 20,
      background: "rgba(255, 255, 255, 0.62)",
      backdropFilter: "blur(32px) saturate(1.4)",
      WebkitBackdropFilter: "blur(32px) saturate(1.4)",
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.55)",
      boxShadow: "0 12px 48px rgba(139,115,155,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
      display: "flex", flexDirection: "column" as const,
      overflow: "hidden",
      animation: "panelIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      pointerEvents: "auto" as const,
    }}>
      <ChatHeader
        country={country}
        flagUrl={flagUrl}
        ollamaStatus={ollamaStatus}
        ollamaModel={ollamaModel}
        onClear={handleClear}
        onClose={onClose}
        onRetry={doCheck}
      />
      <MessageList messages={messages} sending={sending} />
      <ChatInput
        value={input}
        sending={sending}
        countryName={country.name}
        onChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
}
