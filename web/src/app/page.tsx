'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { JOURNEY_DATA, Role, Step, Language } from '@/lib/journey-data';
import { cn } from '@/lib/utils';
import { RolePicker } from '@/components/RolePicker';
import { ExplainerStage } from '@/components/ExplainerStage';
import { ContextAssistant } from '@/components/ContextAssistant';
import { JourneyMap } from '@/components/JourneyMap';
import { Vote, ChevronLeft, Terminal, X, Zap, Code2, ArrowDown, Languages } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<Language | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [activeStep, setActiveStep] = useState<Step | null>(null);
  const [showInspector, setShowInspector] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = (selectedRole: Role) => {
    if (!lang) return;
    setRole(selectedRole);
    setActiveStep(JOURNEY_DATA[lang].roles[selectedRole].steps[0]);
  };

  const handleBack = () => {
    if (role) {
      setRole(null);
      setActiveStep(null);
    } else {
      setLang(null);
    }
  };

  const handleStepSelect = (step: Step) => {
    setActiveStep(step);
    document
      .querySelector(`[data-step-id="${step.id}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!role || !lang) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = entry.target.getAttribute('data-step-id');
          const step = JOURNEY_DATA[lang].roles[role].steps.find((s) => s.id === stepId);
          if (step) {
            setActiveStep(step);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.step-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [role, lang]);

  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang;
    } else {
      document.documentElement.lang = 'en';
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-slate-950 font-sans selection:bg-orange-100 dark:selection:bg-orange-900 overflow-x-hidden">

      <AnimatePresence mode="wait">
        {!lang ? (
          <motion.div
            key="lang-picker"
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex min-h-screen w-full flex-col items-center justify-center space-y-8 overflow-hidden px-4 py-8 text-center sm:space-y-12 sm:p-6"
          >
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border-4 border-white bg-gradient-to-tr from-[#FF9933] via-white to-[#128807] shadow-2xl shadow-orange-500/20 dark:border-slate-800 sm:h-20 sm:w-20">
                <Languages className="h-8 w-8 text-slate-900 dark:text-white sm:h-10 sm:w-10" />
              </div>
              <h2 className="mx-auto max-w-[calc(100vw-2rem)] text-4xl font-black uppercase italic leading-none tracking-tight text-slate-900 dark:text-white sm:max-w-none sm:text-5xl">
                <span className="block sm:inline">Select</span> <span className="block text-[#FF9933] sm:inline">Language</span>
              </h2>
              <p className="text-lg font-medium text-slate-500 sm:text-xl">अपनी भाषा चुनें</p>
            </div>
            <div className="mx-auto grid w-[calc(100vw-2rem)] max-w-xs grid-cols-1 gap-4 sm:max-w-md sm:grid-cols-2 sm:gap-6">
              <button
                onClick={() => setLang('en')}
                className="group rounded-lg border-2 border-slate-100 bg-white p-6 shadow-xl transition-all hover:border-[#FF9933] dark:border-slate-800 dark:bg-slate-900 sm:p-10"
              >
                <span className="text-3xl font-black italic block group-hover:scale-110 transition-transform text-[#FF9933]">EN</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">English</span>
              </button>
              <button
                onClick={() => setLang('hi')}
                className="group rounded-lg border-2 border-slate-100 bg-white p-6 shadow-xl transition-all hover:border-[#128807] dark:border-slate-800 dark:bg-slate-900 sm:p-10"
              >
                <span className="text-3xl font-black italic block group-hover:scale-110 transition-transform text-[#128807]">HI</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">हिंदी</span>
              </button>
            </div>
          </motion.div>
        ) : !role ? (
          <motion.div
            key="role-picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-screen flex-col items-center justify-center px-4 py-20"
          >
            <div className="absolute left-4 top-4 sm:left-10 sm:top-10">
               <button onClick={handleBack} aria-label={lang === 'hi' ? 'भाषा बदलें (Change Language)' : 'Change Language'} className="flex items-center gap-2 rounded-lg p-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 sm:p-4">
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" /> {lang === 'hi' ? 'भाषा बदलें' : 'Change Language'}
               </button>
            </div>
            <RolePicker onSelect={handleRoleSelect} lang={lang} />
          </motion.div>
        ) : (
          <motion.div
            key="journey-canvas"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen"
          >
            {/* Header - Fixed */}
            <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-slate-100 bg-white/90 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 lg:px-10 lg:py-6">
               <div className="flex min-w-0 items-center gap-3 lg:gap-6">
                  <button
                    onClick={handleBack}
                    aria-label="Go back"
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white lg:p-3"
                  >
                     <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
                  </button>
                  <div className="flex min-w-0 items-center gap-3 lg:gap-4">
                     <div className="rounded-lg bg-[#FF9933] p-2 shadow-xl shadow-orange-500/20 lg:p-2.5">
                        <Vote className="text-white w-5 h-5 lg:w-6 h-6" />
                     </div>
                     <div className="min-w-0">
                        <h1 className="text-base font-black uppercase italic leading-none tracking-tight text-slate-900 dark:text-white lg:text-xl">Election Guide</h1>
                        <p className="mt-1 truncate text-[8px] font-black uppercase tracking-[0.18em] text-[#128807] lg:text-[10px] lg:tracking-[0.3em]">Journey: {JOURNEY_DATA[lang].roles[role].title}</p>
                     </div>
                  </div>
               </div>

               <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                  <button
                    onClick={() => setShowInspector(!showInspector)}
                    aria-label={showInspector ? "Hide Logic Inspector" : "Show Logic Inspector"}
                    aria-expanded={showInspector}
                    className="group hidden rounded-lg p-3 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 sm:block"
                  >
                    <Terminal aria-hidden="true" className={cn("w-6 h-6 transition-colors", showInspector ? "text-[#FF9933]" : "text-slate-400 group-hover:text-slate-600")} />
                  </button>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-white/50 px-3 py-2 text-slate-900 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-white lg:gap-3 lg:px-6">
                     <div className="w-2 h-2 rounded-full bg-[#128807] animate-pulse" />
                     <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">Guide Online</span>
                  </div>
               </div>
            </header>

            <div className="fixed left-0 right-0 top-[72px] z-20 lg:top-[84px]">
              <JourneyMap
                steps={JOURNEY_DATA[lang].roles[role].steps}
                activeStepId={activeStep?.id ?? ''}
                onStepSelect={handleStepSelect}
              />
            </div>

            {/* Vertical Progress Indicator - Tricolor */}
            <div className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
              {JOURNEY_DATA[lang].roles[role].steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "w-1 transition-all duration-500 rounded-full",
                    activeStep?.id === step.id ? "h-12 bg-[#FF9933] shadow-[0_0_15px_rgba(255,153,51,0.5)]" : "h-2 bg-slate-200 dark:bg-slate-800"
                  )}
                />
              ))}
            </div>

            {/* Main Stage - Scrollable */}
            <main className={cn(
              "relative flex flex-1 flex-col pt-32 transition-all duration-700 ease-in-out lg:pt-40",
              showInspector ? "mr-0 lg:mr-[480px]" : "mr-0"
            )}>
               <div ref={scrollContainerRef} className="no-scrollbar h-[calc(100vh-8rem)] snap-y snap-mandatory overflow-y-auto lg:h-[calc(100vh-10rem)]">
                  {JOURNEY_DATA[lang].roles[role].steps.map((step, index) => (
                    <section
                      key={step.id}
                      data-step-id={step.id}
                      className="step-section relative flex min-h-[calc(100vh-8rem)] snap-start snap-always items-center justify-center border-b border-slate-100 px-4 pb-32 pt-4 last:border-b-0 dark:border-slate-800 sm:px-6 lg:min-h-[calc(100vh-10rem)] lg:px-16 lg:pb-8 xl:px-24"
                    >
                      <div className="pointer-events-none absolute left-4 top-8 opacity-5 lg:left-24 lg:top-10 lg:opacity-10">
                        <span className="text-[120px] lg:text-[200px] font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">
                          0{index + 1}
                        </span>
                      </div>
                      <ExplainerStage activeStep={step} lang={lang} role={role} />

                      {index < JOURNEY_DATA[lang].roles[role].steps.length - 1 && (
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce text-[#128807]">
                           <span className="text-[8px] font-black uppercase tracking-widest">Scroll for {JOURNEY_DATA[lang].roles[role].steps[index+1].label}</span>
                           <ArrowDown className="w-4 h-4" />
                        </div>
                      )}
                    </section>
                  ))}
               </div>

               {/* Fixed Assistant */}
               {activeStep && <ContextAssistant activeStep={activeStep} role={role} lang={lang} />}
            </main>

            {/* Logic Engine Inspector Panel */}
            <AnimatePresence>
              {showInspector && (
                <motion.aside
                  initial={{ x: 480 }}
                  animate={{ x: 0 }}
                  exit={{ x: 480 }}
                  transition={{ type: 'spring', damping: 35, stiffness: 220 }}
                  className="fixed top-0 right-0 w-full lg:w-[480px] h-full bg-[#020617]/95 backdrop-blur-3xl z-40 flex flex-col shadow-[-40px_0_80px_-20px_rgba(0,0,0,0.7)] border-l border-white/10"
                >
                  <div className="p-10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#FF9933]/20 rounded-2xl">
                         <Code2 className="text-[#FF9933] w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="text-white font-black tracking-tight uppercase text-lg italic">Logic Engine</h3>
                         <p className="text-[11px] text-[#FF9933] font-bold uppercase tracking-[0.3em]">Real-time Prompt Context</p>
                      </div>
                    </div>
                    <button onClick={() => setShowInspector(false)} aria-label="Close Logic Inspector" className="p-3 hover:bg-white/10 rounded-2xl transition-all text-slate-500 hover:text-white">
                      <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
                    <div className="space-y-6">
                      <h4 className="text-[#FF9933] font-black flex items-center gap-3 uppercase text-xs tracking-[0.3em] italic">
                        <Zap className="w-4 h-4" /> Grounded Prompt
                      </h4>
                      <div className="p-8 bg-white/5 rounded-lg border border-white/10 space-y-6 relative overflow-hidden group">
                        <div className="p-6 bg-black/60 rounded-3xl font-mono text-[12px] text-blue-100/60 leading-relaxed border border-white/5 italic">
                          &quot;You are a helpful Indian Election Process Assistant. <br/>
                          Language: {lang === 'hi' ? 'Hindi' : 'English'} <br/>
                          Current User Role: {role ? JOURNEY_DATA[lang].roles[role].title : 'N/A'} <br/>
                          Current Step: {activeStep?.label} <br/>
                          Deadlines: {activeStep?.deadlines} ...&quot;
                        </div>
                        <p className="text-slate-500 text-[10px] font-medium leading-relaxed italic">
                          This prompt is dynamically updated as the user scrolls, ensuring 100% grounded responses for the current stage in the selected language.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[#128807] font-black flex items-center gap-3 uppercase text-xs tracking-[0.3em] italic">
                        <Terminal className="w-4 h-4" /> System Stats
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { l: 'CORE', v: 'Gemini 1.5 Pro' },
                          { l: 'MODE', v: 'Context-Anchored' },
                          { l: 'REASONING', v: 'Grounded' },
                          { l: 'SYNC', v: 'Active' },
                        ].map((item, i) => (
                          <div key={i} className="p-6 bg-white/5 rounded-lg border border-white/5 hover:border-[#FF9933]/30 transition-all duration-500">
                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{item.l}</div>
                            <div className="text-white font-mono text-sm mt-2 font-black italic tracking-tight text-blue-100">{item.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
