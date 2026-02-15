"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mic,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  PiggyBank,
  Target,
  ChartBar,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// const PYTHON_URL = import.meta.env.VITE_PYTHON_URL;
// import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMockResponse = (prompt) => {
    const normalized = prompt.toLowerCase();

    if (normalized.includes("budget")) {
      return "Start with the 50-30-20 rule and cap variable categories first. If you share your monthly income and fixed costs, I can build a clear budget split.";
    }

    if (normalized.includes("forecast") || normalized.includes("predict")) {
      return "I can estimate next-month expenses by category and flag likely spikes. Add recent transactions and I will produce a tighter forecast.";
    }

    if (normalized.includes("goal") || normalized.includes("save")) {
      return "Set one target amount and deadline, then automate weekly transfers. I can break your goal into milestones with progress checks.";
    }

    return "I can help with spending analysis, budgeting, savings goals, and forecasting. Tell me which area you want to improve first.";
  };

  const fallbackMessage =
    "Sorry, I couldn’t generate a response right now. Please try again.";

  const handleSend = async (prefilledQuery) => {
    const finalQuery = (prefilledQuery ?? query).trim();
    if (!finalQuery) return;

    setMessages((prev) => [...prev, { query: finalQuery }]);
    setQuery("");
    setIsTyping(true);
    inputRef.current?.focus();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalQuery }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { answer: data.answer || fallbackMessage },
      ]);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [...prev, { answer: fallbackMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action) => {
    handleSend(action);
  };

  const handleMic = () => {
    setListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition");
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      inputRef.current?.focus();
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
  {
    icon: <PiggyBank size={18} />,
    title: "How to Budget?",
    description: "Learn simple budgeting methods like 50/30/20.",
    query: "How should I create a monthly budget?",
  },
  {
    icon: <TrendingUp size={18} />,
    title: "Improve Savings",
    description: "Tips to save more money without stress.",
    query: "How can I save more money every month?",
  },
  {
    icon: <Target size={18} />,
    title: "Emergency Fund",
    description: "Understand why it's important and how much to keep.",
    query: "How much emergency fund should I keep?",
  },
  {
    icon: <ChartBar size={18} />,
    title: "Investing Basics",
    description: "Understand SIP, mutual funds, and long-term investing.",
    query: "What is SIP and how does it work?",
  },
];


  return (
    <div className="min-h-screen w-full px-4 py-2 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <button
          onClick={() => router.back()}
          className="group mb-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-900/35 bg-black/45 px-3 py-2 text-sm text-emerald-100 transition-all hover:border-emerald-700/45 hover:bg-slate-900/65 hover:text-emerald-50"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Go Back</span>
        </button>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-emerald-900/35 bg-black/55 shadow-[0_20px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="border-b border-emerald-900/30 bg-gradient-to-r from-[#050807]/95 via-[#0b1110]/92 to-[#121722]/85 px-5 py-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-md" />
                <div className="relative rounded-full border border-emerald-800/35 bg-black/55 p-2">
                  <Bot className="text-emerald-300" size={20} strokeWidth={2.5} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold tracking-tight text-slate-100">FIN-AI</h2>
                  <Sparkles className="text-emerald-300/90" size={13} />
                </div>
                <p className="text-xs font-medium text-slate-400">Your financial intelligence assistant</p>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  <span className="hidden text-xs text-slate-400 sm:inline">Online</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMessages([])}
                  disabled={messages.length === 0}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-slate-700/50 bg-black/45 px-2 py-1 text-[11px] font-medium text-slate-300 transition hover:border-emerald-700/40 hover:bg-slate-900/70 hover:text-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="custom-scrollbar h-[62vh] min-h-[420px] max-h-[680px] overflow-y-auto bg-gradient-to-b from-[#050806]/70 via-[#040605]/85 to-[#010202] p-5">
            <div className="animate-fadeIn mb-5 flex items-start gap-3">
              <div className="shrink-0 rounded-lg border border-emerald-900/40 bg-black/45 p-2 shadow-lg">
                <Bot className="text-emerald-300" size={18} />
              </div>

              <div className="w-full rounded-xl rounded-tl-sm border border-emerald-900/35 bg-gradient-to-br from-[#0c1412]/90 to-[#0a1110]/75 p-4 shadow-xl">
                <p className="mb-4 text-sm leading-relaxed text-slate-100/90">
                  Hello. I am <span className="font-semibold text-emerald-300">FIN-AI</span>. Ask me anything about budgeting, forecasting, and smarter spending decisions.
                </p>

                {messages.length === 0 && (
                  <div className="mt-4 border-t border-slate-800/80 pt-4">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-300">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {quickActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action.query)}
                          className="group rounded-lg border border-slate-800/70 bg-gradient-to-br from-[#0e1614]/90 to-[#0b1211]/80 p-3 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-emerald-800/45 hover:from-[#111a18] hover:to-[#0d1513]"
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="shrink-0 rounded-md bg-emerald-900/30 p-1.5 text-emerald-300 transition-colors group-hover:bg-emerald-800/40 group-hover:text-emerald-100">
                              {action.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="mb-0.5 flex items-center gap-1.5 text-xs font-semibold text-slate-100">
                                {action.title}
                                <span className="text-emerald-300/80 opacity-0 transition-opacity group-hover:opacity-100">-&gt;</span>
                              </h4>
                              <p className="text-[11px] leading-snug text-slate-400">{action.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.query ? (
                  <div className="animate-slideIn mb-4 flex items-start justify-end gap-3">
                    <div className="max-w-[85%] rounded-xl rounded-tr-sm border border-emerald-700/40 bg-gradient-to-br from-emerald-800/75 to-emerald-950/90 p-3.5 shadow-xl md:max-w-[75%]">
                      <p className="break-words text-sm leading-relaxed text-white/95">{msg.query}</p>
                    </div>
                    <div className="shrink-0 rounded-lg border border-slate-700/45 bg-slate-900/70 p-2 shadow-lg">
                      <User className="text-emerald-200" size={18} />
                    </div>
                  </div>
                ) : (
                  <div className="animate-slideIn mb-4 flex items-start gap-3">
                    <div className="shrink-0 rounded-lg border border-emerald-900/40 bg-black/45 p-2 shadow-lg">
                      <Bot className="text-emerald-300" size={18} />
                    </div>
                    <div className="max-w-[88%] rounded-xl rounded-tl-sm border border-emerald-900/35 bg-gradient-to-br from-[#0d1513]/90 to-[#0a1110]/80 p-4 shadow-xl md:max-w-[80%]">
                      <p className="text-sm leading-relaxed text-slate-100/90">{msg.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="animate-fadeIn mb-4 flex items-start gap-3">
                <div className="shrink-0 rounded-lg border border-emerald-900/40 bg-black/45 p-2 shadow-lg">
                  <Bot className="text-emerald-300" size={18} />
                </div>
                <div className="rounded-xl rounded-tl-sm border border-emerald-900/35 bg-gradient-to-br from-[#0d1513]/90 to-[#0a1110]/80 p-4 shadow-xl">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400/75" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400/75" style={{ animationDelay: "0.2s" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400/75" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-800/80 bg-[#040706]/95 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything about finance..."
                  className="w-full rounded-xl border border-slate-700/70 bg-black/55 py-3 pl-4 pr-4 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner transition-all duration-200 focus:border-emerald-700/50 focus:bg-black/70 focus:outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={listening}
                />
              </div>
              <button
                type="button"
                onClick={handleSend}
                disabled={!query.trim() || listening}
                className="shrink-0 rounded-xl border border-emerald-800/45 bg-gradient-to-r from-emerald-800/90 to-teal-950/95 p-3 text-white shadow-lg transition-all duration-200 hover:from-emerald-700/95 hover:to-teal-900/95 hover:shadow-[0_0_18px_rgba(16,185,129,0.2)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
              >
                <Send size={18} strokeWidth={2.5} />
              </button>
            </div>

            <p className="mt-2.5 text-center text-xs text-slate-500">
              Press <kbd className="rounded border border-slate-700/70 bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-slate-300">Enter</kbd> to send
              {listening ? " | Listening..." : ""}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(10, 13, 12, 0.85);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(52, 211, 153, 0.22);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(52, 211, 153, 0.34);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.45s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.28s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Chat;
