'use client';

import { motion } from 'framer-motion';
import { JOURNEY_DATA, Role, Language } from '@/lib/journey-data';

interface RolePickerProps {
  onSelect: (role: Role) => void;
  lang: Language;
}

export function RolePicker({ onSelect, lang }: RolePickerProps) {
  const content = lang === 'hi' ? {
    title: 'अपनी चुनाव यात्रा चुनें',
    subtitle: 'भारतीय लोकतंत्र में अपनी भूमिका चुनें और यात्रा शुरू करें।'
  } : {
    title: 'Choose Your Election Path',
    subtitle: 'Select your role in Indian democracy to start your interactive guided journey.'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-4xl space-y-8 p-6 text-center sm:space-y-12 lg:p-12"
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-black uppercase italic leading-none tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
          {content.title.split(' ').slice(0, -2).join(' ')} <span className="text-[#FF9933]">{content.title.split(' ').slice(-2).join(' ')}</span>
        </h2>
        <p className="text-base font-medium text-slate-500 dark:text-slate-400 lg:text-xl">
          {content.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {Object.entries(JOURNEY_DATA[lang].roles).map(([id, data]) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(id as Role)}
            aria-label={`Select role: ${data.title}`}
            className="group rounded-lg border border-slate-100 bg-white p-5 text-left shadow-xl transition-all hover:border-[#128807]/50 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 sm:p-6 lg:p-8"
          >
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg font-black text-[#000080] transition-transform group-hover:scale-105 dark:bg-slate-900 lg:h-16 lg:w-16">{data.icon}</div>
              <div className="min-w-0">
                <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white uppercase italic group-hover:text-[#FF9933] transition-colors">{data.title}</h3>
                <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">{data.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
