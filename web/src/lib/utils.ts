import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PERSONAS = {
  friendly: {
    name: 'The Friendly Guide',
    description: 'Warm, simple, and encouraging.',
    icon: '😊',
    color: 'bg-green-500',
    prompt: "You are 'The Friendly Guide', a warm and encouraging Election Process Assistant..."
  },
  legal: {
    name: 'The Strict Legal Expert',
    description: 'Formal, precise, and academic.',
    icon: '⚖️',
    color: 'bg-slate-700',
    prompt: "You are 'The Strict Legal Expert', a highly formal and precise Election Process Assistant..."
  },
  genz: {
    name: 'Gen Z Voter',
    description: 'Casual, energetic, and trendy.',
    icon: '🔥',
    color: 'bg-orange-500',
    prompt: "You are the 'Gen Z Voter' assistant. Your vibe is energetic, casual, and relatable..."
  },
};
