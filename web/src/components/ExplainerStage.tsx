'use client';

import { motion } from 'framer-motion';
import { Step, Language, Role } from '@/lib/journey-data';
import { PersonaAvatar, ProcessIllustration } from '@/components/Illustrations';
import { useMemo, useState } from 'react';
import { FileText, CheckCircle2, Circle, AlertTriangle, Zap, Quote, Flag, ExternalLink, ListChecks } from 'lucide-react';

interface ExplainerStageProps {
  activeStep: Step;
  lang: Language;
  role: Role;
}

export function ExplainerStage({ activeStep, lang, role }: ExplainerStageProps) {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const completedDocs = useMemo(
    () => activeStep.requiredDocs.filter((doc) => checkedDocs[`${activeStep.id}:${doc}`]).length,
    [activeStep.id, activeStep.requiredDocs, checkedDocs]
  );
  const isReady = activeStep.requiredDocs.length > 0 && completedDocs === activeStep.requiredDocs.length;

  const labels = lang === 'hi' ? {
    docs: 'दस्तावेज',
    impact: 'राष्ट्र पर प्रभाव',
    phase: 'सक्रिय चरण',
    protocol: 'प्रक्रिया और प्रोटोकॉल',
    readiness: 'तैयारी की जाँच',
    action: 'कार्रवाई आवश्यक',
    ready: 'तैयार',
    pending: 'अधूरा',
    checklist: 'चेकलिस्ट'
  } : {
    docs: 'Documents',
    impact: 'Impact on Nation',
    phase: 'Active Phase',
    protocol: 'Process and Protocol',
    readiness: 'Readiness Check',
    action: 'Action Required',
    ready: 'Ready',
    pending: 'Pending',
    checklist: 'Checklist'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 50, damping: 10, delay: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex-1 flex w-full max-w-7xl flex-col items-center justify-center gap-8 overflow-hidden px-4 py-8 sm:px-6 lg:flex-row lg:gap-14 lg:px-16 lg:py-12 xl:gap-20"
    >
      {/* Left: Illustration & Avatar */}
      <div className="relative flex min-h-[250px] w-full flex-col items-center justify-center gap-5 lg:min-h-[380px] lg:w-[46%]">
        <PersonaAvatar role={role} />

        <motion.div
          variants={imageVariants}
          className="relative z-10 flex w-full justify-center"
        >
          <ProcessIllustration step={activeStep} />
        </motion.div>
      </div>

      {/* Right: Detail Cards */}
      <div className="w-full max-w-2xl space-y-6 lg:w-[54%]">
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-1 bg-[#FF9933] rounded-full shadow-[0_0_10px_#FF9933]" />
               <span className="text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] italic">{labels.phase}</span>
            </div>
            <h2 className="text-3xl font-black uppercase italic leading-none tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {activeStep.label}
            </h2>
            <p className="text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400 lg:text-lg">
              {activeStep.detailedExplanation}
            </p>
          </motion.div>

          {/* Quote Card */}
          {activeStep.quote && (
            <motion.div variants={itemVariants} className="relative rounded-lg border-l-4 border-[#128807] bg-slate-50 p-5 italic shadow-sm dark:bg-slate-900">
               <Quote className="w-6 h-6 text-[#128807]/20 absolute -mt-4 -ml-4" />
               <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  {activeStep.quote}
               </p>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3 text-[#000080] dark:text-blue-200">
              <ListChecks className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">{labels.protocol}</span>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {activeStep.protocolSteps.map((protocolStep, index) => (
                <li key={protocolStep} className="flex items-start gap-3 rounded-lg bg-slate-50 p-3 text-xs font-bold leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#FF9933] text-[10px] font-black text-white">
                    {index + 1}
                  </span>
                  <span>{protocolStep}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
             {/* Docs Card */}
             <motion.div variants={itemVariants} className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3 text-[#FF9933]">
                   <FileText className="w-5 h-5" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{labels.docs}</span>
                </div>
                <ul className="space-y-2">
                   {activeStep.requiredDocs.map((doc, i) => (
                     <li key={i} className="flex items-start gap-2 text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#128807] shrink-0 mt-0.5" />
                        {doc}
                     </li>
                   ))}
                </ul>
             </motion.div>

             {/* Impact Card */}
             {activeStep.impact && (
               <motion.div variants={itemVariants} className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-3 text-[#128807]">
                     <Flag className="w-5 h-5" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{labels.impact}</span>
                  </div>
                  <p className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeStep.impact}
                  </p>
               </motion.div>
             )}
          </div>

          <motion.div variants={itemVariants} className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-500/20 dark:border-slate-800 dark:bg-slate-900">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                   <Zap className="w-5 h-5" />
                   <span className="text-[10px] font-black uppercase tracking-widest">{labels.readiness}</span>
                </div>
                <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase text-white bg-[#128807]">
                  {isReady ? labels.ready : labels.pending}
                </span>
             </div>
             <div className="space-y-4">
                <p className="text-lg lg:text-xl font-bold leading-tight text-slate-900 dark:text-white">{activeStep.readinessCheck.question}</p>
                <div className="space-y-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 p-4">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>{labels.checklist}</span>
                    <span>{completedDocs}/{activeStep.requiredDocs.length}</span>
                  </div>
                  <div className="space-y-2">
                    {activeStep.requiredDocs.map((doc) => {
                      const key = `${activeStep.id}:${doc}`;
                      const checked = Boolean(checkedDocs[key]);

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setCheckedDocs((current) => ({ ...current, [key]: !checked }))}
                          className="flex w-full items-center gap-3 rounded-lg bg-white px-3 py-2 text-left text-xs font-bold text-slate-700 shadow-sm transition-colors hover:bg-orange-50 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700"
                        >
                          {checked ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#128807]" /> : <Circle className="h-4 w-4 shrink-0 text-slate-400" />}
                          <span>{doc}</span>
                        </button>
                      );
                    })}
                  </div>
                  {!isReady && (
                    <div className="flex items-start gap-2 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{lang === 'hi' ? 'आगे बढ़ने से पहले बचे हुए दस्तावेज पूरे करें।' : 'Complete the remaining items before moving ahead.'}</span>
                    </div>
                  )}
                </div>
                {activeStep.readinessCheck.url ? (
                  <a
                    href={activeStep.readinessCheck.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-100 bg-white py-4 text-xs font-black uppercase tracking-widest text-slate-900 shadow-lg transition-transform hover:scale-[1.01] dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                  >
                     {activeStep.readinessCheck.action}
                     <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button className="w-full rounded-lg border border-slate-100 bg-white py-4 text-xs font-black uppercase tracking-widest text-slate-900 transition-transform hover:scale-[1.01] dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                     {activeStep.readinessCheck.action}
                  </button>
                )}
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
