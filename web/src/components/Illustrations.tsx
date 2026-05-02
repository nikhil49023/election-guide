'use client';

import type React from 'react';
import { motion, Transition } from 'framer-motion';
import { Role, Step } from '@/lib/journey-data';

// Indian Flag Colors
const COLORS = {
  saffron: '#FF9933',
  white: '#FFFFFF',
  green: '#128807',
  navy: '#000080',
  slate: '#475569',
  blue: '#3B82F6'
};

const springTransition: Transition = { type: 'spring', stiffness: 300, damping: 20 };

function StageShell({ step, children }: { step: Step; children: React.ReactNode }) {
  return (
    <motion.svg viewBox="0 0 520 360" className="h-full w-full max-w-[520px]" fill="none" role="img" aria-label={`${step.label} animated illustration`}>
      <rect x="28" y="24" width="464" height="312" rx="18" fill="white" stroke="#E2E8F0" strokeWidth="2" />
      <motion.path
        d="M78 306H442"
        stroke="#E2E8F0"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1 }}
      />
      {children}
      <text x="260" y="62" textAnchor="middle" fill={COLORS.slate} fontSize="13" fontWeight="900">
        {step.description}
      </text>
    </motion.svg>
  );
}

function RegisterScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <motion.rect x="126" y="86" width="210" height="190" rx="12" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="3" initial={{ y: 20 }} animate={{ y: 0 }} transition={springTransition} />
      <rect x="150" y="112" width="64" height="70" rx="8" fill="#E2E8F0" />
      <rect x="232" y="118" width="76" height="9" rx="4" fill={COLORS.saffron} />
      <rect x="232" y="144" width="54" height="9" rx="4" fill={COLORS.green} />
      <rect x="150" y="206" width="158" height="9" rx="4" fill="#CBD5E1" />
      <motion.g initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.35 }}>
        <circle cx="356" cy="238" r="38" fill="white" stroke={COLORS.green} strokeWidth="4" />
        <path d="M338 239L352 253L376 222" stroke={COLORS.green} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </StageShell>
  );
}

function VerifyScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <rect x="108" y="98" width="216" height="154" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
      {[0, 1, 2].map((row) => (
        <motion.g key={row} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: row * 0.15 }}>
          <rect x="132" y={124 + row * 38} width="136" height="11" rx="5" fill={row === 1 ? COLORS.green : '#CBD5E1'} />
          <circle cx="286" cy={130 + row * 38} r="8" fill={row === 1 ? COLORS.green : '#E2E8F0'} />
        </motion.g>
      ))}
      <motion.g animate={{ x: [0, 12, 0], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.6 }}>
        <circle cx="350" cy="194" r="42" fill="white" stroke={COLORS.blue} strokeWidth="8" />
        <path d="M380 224L418 262" stroke={COLORS.blue} strokeWidth="12" strokeLinecap="round" />
      </motion.g>
    </StageShell>
  );
}

function AwarenessScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <motion.path d="M116 184C154 118 226 104 276 184C226 264 154 250 116 184Z" fill="#F8FAFC" stroke={COLORS.green} strokeWidth="5" animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} />
      <circle cx="196" cy="184" r="28" fill={COLORS.green} />
      <rect x="316" y="116" width="86" height="140" rx="14" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="3" />
      <motion.circle cx="360" cy="150" r="14" fill={COLORS.saffron} animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.2 }} />
      <rect x="342" y="184" width="36" height="8" rx="4" fill={COLORS.slate} />
      <rect x="334" y="206" width="52" height="8" rx="4" fill="#CBD5E1" />
    </StageShell>
  );
}

function CampaignScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <motion.g animate={{ rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ originX: '238px', originY: '178px' }}>
        <path d="M128 174L268 112V244L128 198Z" fill="#FFF7ED" stroke={COLORS.saffron} strokeWidth="5" />
        <rect x="92" y="166" width="50" height="42" rx="8" fill={COLORS.saffron} />
      </motion.g>
      <motion.path d="M292 142C330 154 350 174 360 210" stroke={COLORS.green} strokeWidth="7" strokeLinecap="round" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.3 }} />
      <rect x="330" y="234" width="88" height="42" rx="8" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="3" />
      <text x="374" y="260" textAnchor="middle" fill={COLORS.slate} fontSize="12" fontWeight="900">MCC</text>
    </StageShell>
  );
}

function TrainingScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <rect x="112" y="96" width="296" height="148" rx="12" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="3" />
      <path d="M142 132H378" stroke={COLORS.green} strokeWidth="8" strokeLinecap="round" />
      <path d="M142 164H288" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
      <motion.path d="M330 198L352 220L392 174" stroke={COLORS.green} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ repeat: Infinity, duration: 1.4, repeatDelay: 1 }} />
      <rect x="154" y="252" width="60" height="36" rx="8" fill={COLORS.saffron} />
      <rect x="230" y="252" width="60" height="36" rx="8" fill={COLORS.green} />
    </StageShell>
  );
}

function PollingScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      {[0, 1, 2].map((person) => (
        <motion.g key={person} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: person * 0.15 }}>
          <circle cx={128 + person * 72} cy="154" r="20" fill={person === 0 ? COLORS.saffron : person === 1 ? COLORS.green : COLORS.blue} />
          <rect x={108 + person * 72} y="182" width="40" height="66" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
        </motion.g>
      ))}
      <rect x="344" y="116" width="72" height="134" rx="10" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="4" />
      <motion.rect x="358" y="134" width="44" height="18" rx="9" fill={COLORS.green} animate={{ opacity: [0.35, 1, 0.35] }} transition={{ repeat: Infinity, duration: 1.2 }} />
      <rect x="358" y="174" width="44" height="46" rx="5" fill="#E2E8F0" />
    </StageShell>
  );
}

function EvmScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <rect x="92" y="92" width="150" height="204" rx="12" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="4" />
      {[0, 1, 2].map((item) => (
        <g key={item}>
          <rect x="112" y={122 + item * 48} width="62" height="28" rx="6" fill="#E2E8F0" />
          <motion.circle cx="202" cy={136 + item * 48} r="13" fill={item === 1 ? COLORS.blue : '#CBD5E1'} animate={item === 1 ? { scale: [1, 1.2, 1] } : {}} transition={{ repeat: Infinity, duration: 1.4 }} />
        </g>
      ))}
      <rect x="304" y="112" width="112" height="166" rx="12" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="4" />
      <rect x="322" y="132" width="76" height="70" rx="6" fill={COLORS.navy} />
      <motion.rect x="334" y="146" width="52" height="28" rx="3" fill="white" animate={{ opacity: [0, 1, 1, 0], y: [0, 0, 14, 14] }} transition={{ repeat: Infinity, duration: 2.8 }} />
    </StageShell>
  );
}

function SecurityScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <rect x="124" y="144" width="272" height="116" rx="16" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="4" />
      <path d="M184 144V120C184 82 336 82 336 120V144" stroke={COLORS.slate} strokeWidth="12" strokeLinecap="round" />
      <motion.circle cx="260" cy="202" r="20" fill={COLORS.saffron} animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
      <path d="M260 222V236" stroke={COLORS.saffron} strokeWidth="8" strokeLinecap="round" />
      <motion.path d="M112 290H408" stroke={COLORS.green} strokeWidth="7" strokeLinecap="round" strokeDasharray="20 14" animate={{ strokeDashoffset: [0, -68] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} />
    </StageShell>
  );
}

function CountingScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <rect x="102" y="96" width="316" height="186" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
      {[0, 1, 2].map((bar) => (
        <motion.rect
          key={bar}
          x={142 + bar * 82}
          y={218 - bar * 28}
          width="42"
          height={48 + bar * 28}
          rx="8"
          fill={bar === 0 ? COLORS.saffron : bar === 1 ? COLORS.green : COLORS.blue}
          initial={{ height: 0, y: 266 }}
          animate={{ height: 48 + bar * 28, y: 218 - bar * 28 }}
          transition={{ delay: bar * 0.18, ...springTransition }}
        />
      ))}
      <motion.path d="M116 128H404" stroke={COLORS.navy} strokeWidth="6" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }} />
    </StageShell>
  );
}

function ReportScene({ step }: { step: Step }) {
  return (
    <StageShell step={step}>
      <rect x="146" y="88" width="228" height="210" rx="14" fill="#F8FAFC" stroke={COLORS.slate} strokeWidth="4" />
      <rect x="198" y="72" width="124" height="42" rx="10" fill="white" stroke={COLORS.slate} strokeWidth="4" />
      {[0, 1, 2].map((line) => (
        <motion.g key={line} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: line * 0.16 }}>
          <circle cx="180" cy={148 + line * 44} r="8" fill={line === 1 ? COLORS.green : COLORS.saffron} />
          <rect x="202" y={142 + line * 44} width="126" height="12" rx="6" fill="#CBD5E1" />
        </motion.g>
      ))}
      <motion.path d="M304 256L326 278L370 224" stroke={COLORS.green} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ repeat: Infinity, duration: 1.3, repeatDelay: 1.2 }} />
    </StageShell>
  );
}

export function ProcessIllustration({ step }: { step: Step }) {
  if (step.illustration === 'register') return <RegisterScene step={step} />;
  if (step.illustration === 'verify') return <VerifyScene step={step} />;
  if (step.illustration === 'awareness') return <AwarenessScene step={step} />;
  if (step.illustration === 'campaign') return <CampaignScene step={step} />;
  if (step.illustration === 'training') return <TrainingScene step={step} />;
  if (step.illustration === 'polling') return <PollingScene step={step} />;
  if (step.illustration === 'evm') return <EvmScene step={step} />;
  if (step.illustration === 'security') return <SecurityScene step={step} />;
  if (step.illustration === 'counting') return <CountingScene step={step} />;

  return <ReportScene step={step} />;
}

export function RegistrationIllustration() {
  return (
    <motion.svg viewBox="0 0 400 400" className="w-full h-full max-w-[350px]" fill="none">
      <circle cx="200" cy="200" r="150" fill={COLORS.saffron} fillOpacity="0.05" />
      <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={springTransition}>
        <rect x="60" y="100" width="280" height="180" rx="24" fill="white" stroke={COLORS.slate} strokeWidth="2" />
        <rect x="85" y="130" width="70" height="70" rx="12" fill="#F1F5F9" />
        <rect x="175" y="140" width="140" height="12" rx="6" fill={COLORS.saffron} fillOpacity="0.2" />
        <rect x="175" y="165" width="100" height="12" rx="6" fill={COLORS.green} fillOpacity="0.2" />

        {/* Animated Stamp */}
        <motion.g initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 }}>
          <circle cx="280" cy="220" r="40" fill={COLORS.navy} fillOpacity="0.05" stroke={COLORS.navy} strokeWidth="2" strokeDasharray="4 2" />
          <text x="280" y="225" textAnchor="middle" fill={COLORS.navy} fontSize="10" fontWeight="900" className="uppercase tracking-widest">ECI Verified</text>
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

export function EVMIllustration() {
  return (
    <motion.svg viewBox="0 0 500 400" className="w-full h-full max-w-[450px]" fill="none">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ballot Unit */}
      <rect x="50" y="80" width="180" height="280" rx="10" fill="#CBD5E1" stroke={COLORS.slate} strokeWidth="4" />
      <rect x="70" y="100" width="140" height="240" rx="5" fill="white" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="80" y={120 + i * 50} width="30" height="30" rx="4" fill={i === 0 ? COLORS.saffron : i === 1 ? '#E2E8F0' : COLORS.green} fillOpacity="0.3" />
          <motion.rect
            x="170" y={125 + i * 50} width="20" height="20" rx="10" fill={COLORS.blue}
            whileTap={{ scale: 0.8 }}
            animate={i === 1 ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </g>
      ))}
      {/* VVPAT */}
      <rect x="280" y="120" width="160" height="240" rx="10" fill="#94A3B8" stroke={COLORS.slate} strokeWidth="4" />
      <rect x="300" y="140" width="120" height="100" fill={COLORS.navy} rx="4" />
      <motion.rect
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 150, opacity: [0, 1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 1 }}
        x="310" y="0" width="100" height="50" fill="white" rx="2"
      />
      <path d="M230 300H280" stroke={COLORS.slate} strokeWidth="6" strokeLinecap="round" />
    </motion.svg>
  );
}

export function CandidateIllustration() {
  return (
    <motion.svg viewBox="0 0 400 400" className="w-full h-full max-w-[350px]" fill="none">
      <rect x="100" y="100" width="200" height="250" rx="10" fill="white" stroke={COLORS.saffron} strokeWidth="4" />
      <motion.path
        d="M150 180L180 210L250 140" stroke={COLORS.green} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      />
      <text x="200" y="280" textAnchor="middle" fill={COLORS.slate} fontSize="14" fontWeight="900" className="uppercase tracking-widest">Nomination Form</text>
    </motion.svg>
  );
}

export function VolunteerIllustration() {
  return (
    <motion.svg viewBox="0 0 400 400" className="w-full h-full max-w-[350px]" fill="none">
      <circle cx="200" cy="200" r="120" stroke={COLORS.green} strokeWidth="2" strokeDasharray="10 10" />
      <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} style={{ originX: '200px', originY: '200px' }}>
        <rect x="180" y="60" width="40" height="40" rx="10" fill={COLORS.saffron} />
        <rect x="180" y="300" width="40" height="40" rx="10" fill={COLORS.green} />
      </motion.g>
      <circle cx="200" cy="200" r="40" fill={COLORS.white} stroke={COLORS.navy} strokeWidth="4" />
      <text x="200" y="210" textAnchor="middle" fill={COLORS.navy} fontSize="24" fontWeight="900">🤝</text>
    </motion.svg>
  );
}

export function ObserverIllustration() {
  return (
    <motion.svg viewBox="0 0 400 400" className="w-full h-full max-w-[350px]" fill="none">
      <motion.path
        d="M100 200Q200 100 300 200T200 300T100 200" stroke={COLORS.navy} strokeWidth="4"
        animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}
      />
      <circle cx="200" cy="200" r="30" fill={COLORS.navy} />
      <motion.circle
        cx="200" cy="200" r="60" stroke={COLORS.saffron} strokeWidth="2" strokeDasharray="5 5"
        animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      />
    </motion.svg>
  );
}

export function WelcomeIllustration() {
  return (
    <motion.svg viewBox="0 0 400 400" className="w-full h-full max-w-[350px]" fill="none">
      <rect x="120" y="120" width="160" height="160" rx="40" fill={COLORS.white} stroke={COLORS.saffron} strokeWidth="8" />
      <motion.path
        d="M160 200H240" stroke={COLORS.green} strokeWidth="8" strokeLinecap="round"
        animate={{ x: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 2 }}
      />
      <circle cx="200" cy="160" r="10" fill={COLORS.navy} />
    </motion.svg>
  );
}

export function PollingIllustration() {
  return (
    <motion.svg viewBox="0 0 400 400" className="w-full h-full max-w-[350px]" fill="none">
      <rect x="80" y="150" width="240" height="180" rx="20" fill="white" stroke={COLORS.slate} strokeWidth="4" />
      <motion.rect
        x="120" y="100" width="160" height="80" rx="10" fill={COLORS.saffron} fillOpacity="0.2"
        animate={{ y: [100, 160, 100] }} transition={{ repeat: Infinity, duration: 3 }}
      />
    </motion.svg>
  );
}

export function PersonaAvatar({ role }: { role: Role }) {
  const avatars = {
    voter: "IN",
    candidate: "CN",
    volunteer: "PW",
    observer: "OB"
  };

  return (
    <div className="relative group">
       <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-white dark:bg-slate-900 rounded-lg border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center text-2xl lg:text-3xl font-black tracking-tight text-[#000080] shadow-2xl">
          {avatars[role]}
          <div className="absolute -bottom-2 -right-2 bg-[#128807] w-8 h-8 rounded-lg flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900">
             <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          </div>
       </div>
    </div>
  );
}
