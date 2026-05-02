'use client';

import { useChat } from 'ai/react';
import { Send, Bot, User, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step, Role, Language } from '@/lib/journey-data';
import { cn } from '@/lib/utils';

interface ContextAssistantProps {
  activeStep: Step;
  role: Role;
  lang: Language;
}

function renderAssistantContent(content: string) {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line, index) => {
    const urlMatch = line.match(/(https?:\/\/[^\s)]+)/);
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)/);
    const bulletMatch = line.match(/^[-*]\s+(.+)/);
    const labelMatch = line.match(/^([^:]{2,32}):\s*(.+)$/);

    if (numberedMatch) {
      return (
        <div key={`${line}-${index}`} className="flex gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#128807] text-[9px] font-black text-white">
            {numberedMatch[1]}
          </span>
          <span>{numberedMatch[2]}</span>
        </div>
      );
    }

    if (bulletMatch) {
      return (
        <div key={`${line}-${index}`} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF9933]" />
          <span>{bulletMatch[1]}</span>
        </div>
      );
    }

    if (urlMatch) {
      const url = urlMatch[1];
      const [before, after] = line.split(url);

      return (
        <p key={`${line}-${index}`}>
          {before}
          <a href={url} target="_blank" rel="noopener noreferrer" className="break-all text-[#000080] underline decoration-[#FF9933] underline-offset-2 dark:text-blue-200">
            {url}
          </a>
          {after}
        </p>
      );
    }

    if (labelMatch) {
      return (
        <div key={`${line}-${index}`} className="space-y-1">
          <div className="text-[9px] font-black uppercase tracking-widest text-[#128807] dark:text-green-300">
            {labelMatch[1]}
          </div>
          <p>{labelMatch[2]}</p>
        </div>
      );
    }

    return <p key={`${line}-${index}`}>{line}</p>;
  });
}

export function ContextAssistant({ activeStep, role, lang }: ContextAssistantProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: { activeStep, role, lang },
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.aside
      animate={{ height: isOpen ? 'min(400px, calc(100vh - 190px))' : '60px' }}
      className="fixed bottom-3 left-3 right-3 z-50 flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:left-auto sm:right-6 sm:w-[360px] lg:bottom-10 lg:right-10 lg:w-[400px]"
    >
      {/* Header - Tricolor Gradient */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="assistant-chat-panel"
        aria-label={isOpen ? "Minimize Smart Assistant" : "Expand Smart Assistant"}
        className="flex shrink-0 cursor-pointer items-center justify-between border-b border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 sm:p-5"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#FF9933] p-2 shadow-lg shadow-orange-500/20">
             <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-[10px] lg:text-xs uppercase tracking-widest text-slate-900 dark:text-white">Smart Assistant</span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Messages */}
            <div id="assistant-chat-panel" role="log" aria-live="polite" aria-atomic="false" ref={scrollRef} className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-4">
                  <p className="text-[11px] lg:text-sm font-bold text-slate-400 italic px-4">
                    &quot;{lang === 'hi' ? `मैं ${activeStep.label} चरण में आपकी सहायता के लिए यहाँ हूँ। कुछ भी पूछें!` : `I'm here to help you with the ${activeStep.label} phase. Ask me anything!`}&quot;
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={cn("flex items-start gap-3", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn("p-1.5 rounded-lg shrink-0", m.role === 'user' ? "bg-[#FF9933] text-white" : "bg-[#128807] text-white")}>
                    {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                  <div className={cn(
                    "max-w-[82%] rounded-lg px-4 py-2 text-[11px] font-bold leading-relaxed lg:text-xs",
                    m.role === 'user' ? "bg-[#FF9933] text-white" : "border border-slate-100 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  )}>
                    {m.role === 'assistant' ? (
                      <div className="space-y-3 font-semibold">
                        {renderAssistantContent(m.content)}
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-center gap-2 p-4">
                    <div className="w-1 h-1 bg-[#128807] rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-[#128807] rounded-full animate-bounce delay-150" />
                    <div className="w-1 h-1 bg-[#128807] rounded-full animate-bounce delay-300" />
                 </div>
              )}
            </div>

            {/* Input */}
            <footer className="border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  className="w-full rounded-lg border-none bg-slate-50 py-3 pl-4 pr-12 text-[11px] font-bold focus:ring-2 focus:ring-[#FF9933] dark:bg-slate-800 dark:text-white lg:text-xs"
                  value={input}
                  placeholder={lang === 'hi' ? "सवाल पूछें..." : "Ask a question..."}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 rounded-lg bg-[#128807] p-1.5 text-white shadow-lg shadow-green-500/20 transition-transform hover:scale-105 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </footer>
          </>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
