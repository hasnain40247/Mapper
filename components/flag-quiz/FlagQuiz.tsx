"use client";

import { useState, useCallback, useEffect } from "react";
import { CODE, toFlag } from "@/lib/countries";
import { COLORS as C } from "@/lib/constants";
import { playCorrectSound, playWrongSound } from "@/lib/audio";
import ScoreBar from "./ScoreBar";
import AnswerOptions, { type QuizOption } from "./AnswerOptions";

interface QuizQuestion {
  correctName: string;
  correctCode: string;
  options: QuizOption[];
}

const allCountries = Object.entries(CODE).map(([name, code]) => ({ name, code }));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestion(): QuizQuestion {
  const shuffled = shuffle(allCountries);
  const correct = shuffled[0];
  const wrong = shuffled.slice(1, 4);
  return {
    correctName: correct.name,
    correctCode: correct.code,
    options: shuffle([
      { name: correct.name, code: correct.code, isCorrect: true },
      ...wrong.map((w) => ({ name: w.name, code: w.code, isCorrect: false })),
    ]),
  };
}

export default function FlagQuiz() {
  const [question, setQuestion] = useState<QuizQuestion>(generateQuestion);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const next = useCallback(() => {
    setQuestion(generateQuestion());
    setSelected(null);
  }, []);

  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(next, 1200);
      return () => clearTimeout(timer);
    }
  }, [selected, next]);

  function handlePick(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = question.options[idx].isCorrect;
    if (isCorrect) playCorrectSound(); else playWrongSound();
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    setStreak((s) => (isCorrect ? s + 1 : 0));
  }

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div style={{
      width: 460,
      background: "rgba(255, 255, 255, 0.62)",
      backdropFilter: "blur(32px) saturate(1.4)",
      WebkitBackdropFilter: "blur(32px) saturate(1.4)",
      borderRadius: 24,
      border: "1px solid rgba(255,255,255,0.55)",
      boxShadow: "0 12px 48px rgba(139,115,155,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
      padding: 32,
      display: "flex", flexDirection: "column" as const,
      alignItems: "center", gap: 24,
      animation: "quizIn 0.25s ease",
    }}>
      <ScoreBar score={score} accuracy={accuracy} streak={streak} />

      <div style={{ fontSize: 96, lineHeight: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }}>
        {toFlag(question.correctCode)}
      </div>

      <div style={{ fontFamily: "'Quicksand',sans-serif", fontWeight: 600, fontSize: 16, color: C.text }}>
        Which country does this flag belong to?
      </div>

      <AnswerOptions options={question.options} selected={selected} onPick={handlePick} />

      <button
        onClick={selected === null ? next : undefined}
        style={{
          padding: "8px 20px", background: "transparent", border: "none",
          color: C.textMuted, fontFamily: "'Quicksand',sans-serif",
          fontSize: 13, fontWeight: 600,
          cursor: selected === null ? "pointer" : "default",
          textDecoration: "underline",
          transition: "color 0.15s, opacity 0.15s",
          opacity: selected === null ? 1 : 0,
          pointerEvents: selected === null ? "auto" : "none",
        }}
        onMouseEnter={(e) => { if (selected === null) e.currentTarget.style.color = C.text; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = C.textMuted; }}
      >
        Skip this one
      </button>
    </div>
  );
}
