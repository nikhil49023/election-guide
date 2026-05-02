'use client';

import { motion } from 'framer-motion';
import { Step } from '@/lib/journey-data';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface JourneyMapProps {
  steps: Step[];
  activeStepId: string;
  onStepSelect: (step: Step) => void;
}

export function JourneyMap({ steps, activeStepId, onStepSelect }: JourneyMapProps) {
  return (
    <div className="no-scrollbar flex items-center gap-3 overflow-x-auto border-y border-slate-100 bg-white/85 px-4 py-3 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/85 lg:gap-4 lg:px-12 lg:py-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-4 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onStepSelect(step)}
            className={cn(
              "max-w-[180px] whitespace-normal rounded-lg border px-4 py-3 text-left text-[9px] font-black uppercase leading-tight tracking-wider transition-all sm:max-w-none sm:whitespace-nowrap sm:text-[10px] lg:px-5",
              activeStepId === step.id
                ? "bg-[#128807] text-white border-[#128807] shadow-xl shadow-green-700/20"
                : "bg-white dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <span className="opacity-50 mr-2">0{index + 1}</span>
            {step.label}
          </motion.button>
          {index < steps.length - 1 && (
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700" />
          )}
        </div>
      ))}
    </div>
  );
}
