'use client';

/**
 * ============================================================
 * KEC BioPulse AI — Main Component
 * ============================================================
 * Changes from original:
 *  1. Imports SuggestAllButton + SuggestOneButton from GeminiSuggest
 *  2. handleChange passed to onSuggest callbacks
 *  3. Contact links read from process.env (set in .env.local)
 *  4. HERO: logo badge + "BioPulse AI" title merged into one row
 *  5. All other UI/logic unchanged
 * ============================================================
 */

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Leaf, ChevronRight, ChevronLeft, CheckCircle2,
  TrendingUp, Users, BarChart3, Award, RotateCcw,
  AlertCircle, Sparkles, Brain, Target, Shield, Clock,
  Zap, ArrowRight
} from 'lucide-react';

// ── Gemini components (all LLM logic lives here) ─────────────
import { SuggestAllButton } from './GeminiSuggest';

// ── Contact config from env ───────────────────────────────────
const PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+918527626868';
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918287933634';
const WA_MESSAGE = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hello%20KEC%20Team,%20I%20completed%20the%20BioPulse%20AI%20analysis%20and%20want%20a%20detailed%20consultation.';

const FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
const F = "var(--font-inter), system-ui, sans-serif";

const STEPS = [
  {
    id: 1, title: 'Investor Profile', subtitle: 'Tell us about yourself',
    icon: Users, color: 'emerald',
    questions: [
      {
        id: 'profileType', label: 'What best describes you?', type: 'radio', required: true, icon: '👤',
        options: ['Business Owner', 'Investor', 'Farmer', 'Industrialist', 'Startup Founder', 'Energy Sector Professional']
      },
      {
        id: 'investmentRange', label: 'What is your planned investment range?', type: 'radio', required: true, icon: '💰',
        options: ['₹25L – ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹3Cr', '₹3Cr – ₹5Cr', '₹5Cr+']
      },
      {
        id: 'cbgExperience', label: 'Have you explored CBG before?', type: 'radio', required: true, icon: '🔍',
        options: ['Just Started Exploring', 'Basic Understanding', 'Already Evaluating Projects', 'Ready to Invest']
      }
    ]
  },
  {
    id: 2, title: 'Project Possibility', subtitle: 'Your resources & interests',
    icon: Target, color: 'amber',
    questions: [
      {
        id: 'landAvailability', label: 'Do you already have land available?', type: 'radio', required: true, icon: '🌾',
        options: ['Yes', 'No', 'Planning to Acquire', 'Need Guidance']
      },
      {
        id: 'feedstockAccess', label: 'What feedstock access do you have?', type: 'multiselect', required: true, icon: '🌿',
        hint: 'Multiple sources improve gas yield and plant efficiency',
        options: ['Agriculture Waste', 'Press Mud', 'Cow Dung', 'Food Waste', 'Multiple Sources', 'Not Sure Yet']
      },
      {
        id: 'opportunityInterest', label: 'Which opportunity interests you most?', type: 'radio', required: true, icon: '⚡',
        options: ['Standalone CBG Plant', 'CBG Park Model', 'Partnership Model', 'Technology & EPC', 'Complete End-to-End Solution']
      }
    ]
  },
  {
    id: 3, title: 'AI Analysis', subtitle: 'Final inputs for your report',
    icon: Brain, color: 'emerald',
    questions: [
      {
        id: 'topPriority', label: 'What matters most to you?', type: 'radio', required: true, icon: '🎯',
        options: ['ROI', 'Long-Term Business', 'Sustainability', 'Government Support', 'Scalable Infrastructure']
      },
      {
        id: 'projectTimeline', label: 'Expected project timeline?', type: 'radio', required: true, icon: '📅',
        options: ['Immediately', 'Within 3 Months', 'Within 6 Months', 'Just Exploring']
      },
      {
        id: 'consultationInterest', label: 'Would you like a personalized investor consultation?', type: 'radio', required: true, icon: '🤝',
        hint: 'KEC experts provide free 30-minute project feasibility sessions',
        options: ['Yes', 'Maybe Later']
      }
    ]
  }
];

function generateInsights(answers) {
  const rangeMap = {
    '₹25L – ₹50L': { capex: 3750000, cbgTPD: 0.25, label: '250 kg/day Micro Plant' },
    '₹50L – ₹1Cr': { capex: 7500000, cbgTPD: 0.5, label: '500 kg/day Small Plant' },
    '₹1Cr – ₹3Cr': { capex: 20000000, cbgTPD: 1, label: '1 TPD Standard Plant' },
    '₹3Cr – ₹5Cr': { capex: 40000000, cbgTPD: 2, label: '2 TPD Medium Plant' },
    '₹5Cr+': { capex: 100000000, cbgTPD: 5, label: '5 TPD Large Plant' },
  };
  const range = rangeMap[answers.investmentRange] || rangeMap['₹1Cr – ₹3Cr'];
  const { cbgTPD, capex, label } = range;
  const cbgAnnual = cbgTPD * 330;
  const cbgRevenue = cbgAnnual * 46000;
  const digestateRevenue = cbgTPD * 8000 * 330;
  const totalRevenue = cbgRevenue + digestateRevenue;
  const opex = cbgTPD * 2000000;
  const ebitda = totalRevenue - opex;
  const netCapex = capex * 0.7;
  const paybackYears = ebitda > 0 ? (netCapex / ebitda).toFixed(1) : 'N/A';
  const roi5yr = ebitda > 0 ? (((ebitda * 5 - netCapex) / netCapex) * 100).toFixed(0) : 0;
  const parkSuitable = answers.opportunityInterest === 'CBG Park Model' ||
    answers.investmentRange === '₹5Cr+' ||
    (answers.feedstockAccess || []).includes('Multiple Sources');
  const urgencyMap = { 'Immediately': 'HIGH', 'Within 3 Months': 'HIGH', 'Within 6 Months': 'MEDIUM', 'Just Exploring': 'LOW' };
  return {
    cbgTPD, cbgAnnual, cbgRevenue, digestateRevenue, totalRevenue, opex, ebitda,
    capex, netCapex, paybackYears, roi5yr, label, parkSuitable,
    urgency: urgencyMap[answers.projectTimeline] || 'MEDIUM'
  };
}

function fmt(n) {
  if (typeof n !== 'number' || isNaN(n)) return '₹0';
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

function MeshBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(46,158,99,0.28) 0%, transparent 65%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(236,124,98,0.16) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 15% 60%, rgba(46,158,99,0.10) 0%, transparent 55%)' }} />
      {[
        { size: 360, x: '8%', y: '15%', delay: 0, dur: 18, color: 'rgba(46,158,99,0.10)' },
        { size: 220, x: '72%', y: '8%', delay: 3, dur: 14, color: 'rgba(236,124,98,0.12)' },
        { size: 280, x: '58%', y: '60%', delay: 6, dur: 22, color: 'rgba(46,158,99,0.09)' },
      ].map((o, i) => (
        <motion.div key={i}
          style={{
            position: 'absolute', width: o.size, height: o.size, left: o.x, top: o.y,
            borderRadius: '50%', background: o.color, filter: 'blur(70px)'
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -25, 15, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function StepNav({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const done = current > s.id;
        const active = current === s.id;
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: 1 }}>
              <div style={{ position: 'relative' }}>
                {active && (
                  <motion.div style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid rgba(46,158,99,0.5)' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity }} />
                )}
                <motion.div animate={active ? { scale: 1.15 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: done ? 'linear-gradient(135deg,#2e9e63,#218452)' : active ? 'linear-gradient(135deg,#ec7c62,#d96450)' : 'rgba(255,255,255,0.08)',
                    border: done || active ? 'none' : '1.5px solid rgba(255,255,255,0.18)',
                    boxShadow: active ? '0 0 22px rgba(236,124,98,0.55)' : done ? '0 0 16px rgba(46,158,99,0.4)' : 'none'
                  }}>
                  {done ? <CheckCircle2 size={16} color="white" /> : <Icon size={14} color={active ? 'white' : 'rgba(255,255,255,0.5)'} />}
                </motion.div>
              </div>
              <span style={{
                fontSize: 12, fontFamily: F, fontWeight: 600, letterSpacing: '0.04em',
                color: active ? '#ec7c62' : done ? '#2e9e63' : 'rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap'
              }}>
                {s.title}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, margin: '0 6px', background: 'rgba(255,255,255,0.12)', maxWidth: 80, borderRadius: 4, overflow: 'hidden' }}>
                <motion.div style={{ height: '100%', background: 'linear-gradient(90deg,#2e9e63,#4fae79)', borderRadius: 4 }}
                  animate={{ width: done ? '100%' : '0%' }} transition={{ duration: 0.5 }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OptionCard({ label, selected, onClick, multi, accent }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-20, 20], [3, -3]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-3, 3]), { stiffness: 300, damping: 30 });
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  const emColor = accent === 'amber' ? '#ec7c62' : '#2e9e63';
  const emGlow = accent === 'amber' ? 'rgba(236,124,98,0.25)' : 'rgba(46,158,99,0.25)';
  const emBg = accent === 'amber' ? 'rgba(236,124,98,0.09)' : 'rgba(46,158,99,0.09)';

  return (
    <motion.div onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick}
      style={{
        perspective: 600, rotateX, rotateY, cursor: 'pointer', borderRadius: 13,
        border: selected ? `1.5px solid ${emColor}` : '1.5px solid rgba(255,255,255,0.12)',
        background: selected ? emBg : 'rgba(255,255,255,0.04)', padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: selected ? `0 0 20px ${emGlow}` : 'none',
        transition: 'border-color 0.18s, background 0.18s, box-shadow 0.18s', userSelect: 'none'
      }}
      whileHover={{ scale: 1.012, background: selected ? emBg : 'rgba(255,255,255,0.07)' }}
      whileTap={{ scale: 0.985 }}>
      <div style={{
        width: 19, height: 19, borderRadius: multi ? 5 : '50%', flexShrink: 0,
        border: selected ? `2px solid ${emColor}` : '2px solid rgba(255,255,255,0.3)',
        background: selected ? emColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: selected ? `0 0 10px ${emGlow}` : 'none', transition: 'all 0.18s'
      }}>
        {selected && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
            {multi ? <CheckCircle2 size={10} color="white" /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />}
          </motion.div>
        )}
      </div>
      <span style={{
        fontFamily: F, fontSize: 15, fontWeight: 500,
        color: '#ffffff', transition: 'color 0.18s', flex: 1
      }}>
        {label}
      </span>
      {selected && (
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: emColor, boxShadow: `0 0 8px ${emColor}` }} />
        </motion.div>
      )}
    </motion.div>
  );
}

function QuestionField({ q, value, onChange, accent }) {
  if (q.type === 'radio') return (
    <div style={{ display: 'grid', gap: 8 }}>
      {q.options.map(o => <OptionCard key={o} label={o} selected={value === o} onClick={() => onChange(q.id, o)} accent={accent} />)}
    </div>
  );
  if (q.type === 'multiselect') {
    const sel = Array.isArray(value) ? value : [];
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        {q.options.map(o => <OptionCard key={o} label={o} multi selected={sel.includes(o)}
          onClick={() => onChange(q.id, sel.includes(o) ? sel.filter(x => x !== o) : [...sel, o])} accent={accent} />)}
      </div>
    );
  }
  return null;
}

function AnalysisLoader({ onDone }) {
  const [phase, setPhase] = useState(0);
  const phases = ['Scanning market conditions…', 'Calculating ROI vectors…', 'Matching subsidy schemes…', 'Generating your report…'];
  useEffect(() => {
    const ts = phases.map((_, i) => setTimeout(() => setPhase(i), i * 650));
    const done = setTimeout(onDone, phases.length * 650 + 500);
    return () => { ts.forEach(clearTimeout); clearTimeout(done); };
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 20px', gap: 28 }}>
      <div style={{ position: 'relative', width: 84, height: 84 }}>
        <motion.div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#2e9e63', boxShadow: '0 0 24px rgba(46,158,99,0.5)' }}
          animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
        <motion.div style={{ position: 'absolute', inset: 12, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#ec7c62', borderBottomColor: 'rgba(236,124,98,0.3)' }}
          animate={{ rotate: -360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Brain size={24} color="#2e9e63" />
          </motion.div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10 }}>BioPulse AI Processing</div>
        <AnimatePresence mode="wait">
          <motion.p key={phase} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
            style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            {phases[phase]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {phases.map((_, i) => (
          <motion.div key={i} animate={{ scale: i === phase ? 1.4 : 1 }}
            style={{
              width: 7, height: 7, borderRadius: '50%',
              background: i <= phase ? '#2e9e63' : 'rgba(255,255,255,0.18)',
              boxShadow: i <= phase ? '0 0 8px rgba(46,158,99,0.7)' : 'none',
              transition: 'all 0.3s'
            }} />
        ))}
      </div>
    </motion.div>
  );
}

function ResultsScreen({ answers, onRestart }) {
  const r = generateInsights(answers);
  const urgencyConfig = {
    HIGH: { color: '#ef4444', glow: 'rgba(239,68,68,0.3)', label: 'HIGH URGENCY', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.28)' },
    MEDIUM: { color: '#ec7c62', glow: 'rgba(236,124,98,0.3)', label: 'MEDIUM URGENCY', bg: 'rgba(236,124,98,0.08)', border: 'rgba(236,124,98,0.28)' },
    LOW: { color: '#3b82f6', glow: 'rgba(59,130,246,0.3)', label: 'EXPLORING', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.28)' },
  };
  const uc = urgencyConfig[r.urgency];
  const kpis = [
    { label: '5-Year ROI', value: `${r.roi5yr}%`, sub: 'projected return', icon: TrendingUp, color: '#2e9e63' },
    { label: 'Payback Period', value: `${r.paybackYears} yrs`, sub: 'estimated', icon: Clock, color: '#ec7c62' },
    { label: 'Annual Revenue', value: fmt(r.totalRevenue), sub: 'projected', icon: BarChart3, color: '#2e9e63' },
    { label: 'Net CAPEX', value: fmt(r.netCapex), sub: 'post 30% subsidy', icon: Shield, color: '#ec7c62' },
  ];
  const checks = [
    { label: 'ROI Potential', val: `${r.roi5yr}% over 5 years`, desc: `Payback in ${r.paybackYears} yrs`, icon: TrendingUp },
    { label: 'Subsidy Possible', val: '30% NABARD Eligible', desc: `Reduces capex to ${fmt(r.netCapex)}`, icon: Shield },
    { label: 'Infra Fit', val: r.label, desc: `${r.cbgTPD} TPD · ${fmt(r.totalRevenue)}/yr`, icon: BarChart3 },
    {
      label: 'CBG Park Match', val: r.parkSuitable ? 'High Suitability' : 'Standard Plant',
      desc: r.parkSuitable ? 'Park model aligns' : 'Standalone recommended', icon: Award
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Hero card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden', padding: '26px 22px', textAlign: 'center',
          background: 'linear-gradient(135deg,rgba(46,158,99,0.16) 0%,rgba(33,132,82,0.08) 100%)',
          border: '1px solid rgba(46,158,99,0.28)'
        }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: 'radial-gradient(circle,rgba(46,158,99,0.22),transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 110, height: 110, background: 'radial-gradient(circle,rgba(236,124,98,0.15),transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'relative' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 99,
              background: 'rgba(236,124,98,0.15)', border: '1px solid rgba(236,124,98,0.35)',
              color: '#f4ae9a', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12
            }}>
            <Brain size={11} /> AI ANALYSIS COMPLETE
          </motion.div>
          <h2 style={{ fontFamily: F, fontSize: 21, fontWeight: 800, color: 'white', marginBottom: 8, lineHeight: 1.3 }}>
            You're well-positioned for a<br /><span style={{ color: '#4fae79' }}>scalable CBG opportunity</span>
          </h2>
          <p style={{ fontFamily: F, color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.6, maxWidth: 420, margin: '0 auto' }}>
            Based on your inputs, KEC BioPulse AI estimates you're in the current market cycle for a high-potential bioenergy investment.
          </p>
        </div>
      </motion.div>

      {/* Urgency banner */}
      <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}
        style={{ display: 'flex', gap: 12, padding: '13px 15px', borderRadius: 13, background: uc.bg, border: `1px solid ${uc.border}` }}>
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 8, height: 8, borderRadius: '50%', background: uc.color, boxShadow: `0 0 8px ${uc.glow}`, flexShrink: 0, marginTop: 3 }} />
        <div>
          <div style={{ fontFamily: F, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: uc.color, marginBottom: 4 }}>
            MARKET URGENCY: {uc.label}
          </div>
          <p style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, margin: 0 }}>
            India's SATAT scheme has a limited window at ₹46/kg guaranteed price.
            {r.urgency === 'HIGH' ? ' Your timeline aligns perfectly — act now for early mover advantage.' : ' Plan early to secure land, feedstock & subsidy windows.'}
          </p>
        </div>
      </motion.div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {kpis.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 20, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.28 + i * 0.07, type: 'spring', stiffness: 220 }}
            style={{ padding: '16px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -18, right: -18, width: 64, height: 64, background: `radial-gradient(circle,${k.color}30,transparent 70%)`, borderRadius: '50%' }} />
            <k.icon size={17} color={k.color} style={{ marginBottom: 9 }} />
            <div style={{ fontFamily: F, fontSize: 19, fontWeight: 800, color: 'white', marginBottom: 2 }}>{k.value}</div>
            <div style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em' }}>{k.label}</div>
            <div style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{k.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Check grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
        {checks.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 + i * 0.06 }}
            style={{ padding: '13px', borderRadius: 13, background: 'rgba(46,158,99,0.06)', border: '1px solid rgba(46,158,99,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
              <CheckCircle2 size={11} color="#2e9e63" />
              <span style={{ fontFamily: F, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>{c.label}</span>
            </div>
            <div style={{ fontFamily: F, fontSize: 12.5, fontWeight: 600, color: '#4fae79', marginBottom: 3 }}>{c.val}</div>
            <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{c.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue breakdown */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }}
        style={{ padding: '18px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7, letterSpacing: '0.06em' }}>
          <BarChart3 size={14} color="#2e9e63" /> PROJECTED REVENUE BREAKDOWN
        </div>
        {[
          { label: 'CBG Sales (SATAT @ ₹46/kg)', value: r.cbgRevenue, color: '#2e9e63', pct: r.cbgRevenue / r.totalRevenue },
          { label: 'Digestate / Bio-Fertilizer', value: r.digestateRevenue, color: '#ec7c62', pct: r.digestateRevenue / r.totalRevenue },
        ].map((rb, i) => (
          <div key={rb.label} style={{ marginBottom: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{rb.label}</span>
              <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: 'white' }}>{fmt(rb.value)}</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', borderRadius: 99, background: rb.color, boxShadow: `0 0 8px ${rb.color}60` }}
                initial={{ width: 0 }} animate={{ width: `${rb.pct * 100}%` }}
                transition={{ duration: 1.3, delay: 0.9 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }} />
            </div>
          </div>
        ))}
        <div style={{ paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>Total Annual Revenue</span>
          <span style={{ fontFamily: F, fontSize: 20, fontWeight: 800, color: '#2e9e63', textShadow: '0 0 20px rgba(46,158,99,0.45)' }}>{fmt(r.totalRevenue)}</span>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}
        style={{ display: 'flex', gap: 9, padding: '11px 13px', borderRadius: 11, background: 'rgba(236,124,98,0.07)', border: '1px solid rgba(236,124,98,0.2)' }}>
        <Sparkles size={13} color="#ec7c62" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.52)', lineHeight: 1.6, margin: 0 }}>
          Projections are indicative estimates based on industry averages. Actual returns depend on local conditions, feedstock quality, and market prices. KEC will prepare a detailed bankable DPR after site assessment.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
        style={{
          borderRadius: 20, overflow: 'hidden', padding: '26px 22px', textAlign: 'center', position: 'relative',
          background: 'linear-gradient(135deg,#1a6a42 0%,#218452 50%,#124b2f 100%)',
          border: '1px solid rgba(46,158,99,0.35)'
        }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(79,174,121,0.6),transparent)' }} />
        <h3 style={{ fontFamily: F, fontSize: 17, fontWeight: 800, color: 'white', marginBottom: 6 }}>Ready to build your CBG plant?</h3>
        <p style={{ fontFamily: F, color: 'rgba(255,255,255,0.65)', fontSize: 12, marginBottom: 22 }}>
          Get a detailed DPR, approvals assistance, and end-to-end EPC support from KEC.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ height: 1, width: 36, background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontFamily: F, fontSize: 9, color: 'rgba(79,174,121,0.8)', letterSpacing: '0.12em', fontWeight: 700 }}>TALK TO OUR EXPERT</span>
          <div style={{ height: 1, width: 36, background: 'rgba(255,255,255,0.15)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, maxWidth: 480, margin: '0 auto 14px' }}>
          {/* Phone — from env */}
          <motion.a href={`tel:${PHONE}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'white', borderRadius: 13, padding: '13px 14px', textDecoration: 'none', boxShadow: '0 6px 24px rgba(0,0,0,0.25)' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>📞</span>
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <div style={{ fontFamily: F, fontSize: 10, color: '#9ca3af', fontWeight: 500 }}>Call us now</div>
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: '#111', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{PHONE}</div>
            </div>
          </motion.a>

          {/* WhatsApp — from env */}
          <motion.a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(37,211,102,0.3)' }} whileTap={{ scale: 0.98 }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#25D366', borderRadius: 13, padding: '13px 14px', textDecoration: 'none', boxShadow: '0 6px 24px rgba(37,211,102,0.2)' }}>
            <svg viewBox="0 0 32 32" fill="white" width="20" height="20" style={{ flexShrink: 0 }}><path d="M16 .4C7.4.4.4 7.4.4 16c0 2.7.7 5.3 2 7.6L.4 31.6l8.2-2c2.2 1.2 4.7 1.8 7.4 1.8 8.6 0 15.6-7 15.6-15.6C31.6 7.4 24.6.4 16 .4zm0 28.6c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.9 1.2 1.3-4.7-.3-.5C3.7 20.8 3 18.5 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 13-13 13zm7.1-9.7c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.5-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .4-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.4 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.4.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5z" /></svg>
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <div style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Chat instantly</div>
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: 'white' }}>WhatsApp Us</div>
            </div>
          </motion.a>
        </div>
        <motion.button onClick={onRestart} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 10,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)', fontFamily: F, fontSize: 12, fontWeight: 600, cursor: 'pointer'
          }}>
          <RotateCcw size={12} /> Re-analyse
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function KecBioPulseAI() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState('form');
  const cardRef = useRef(null);

  useEffect(() => {
    if (!document.querySelector(`link[href="${FONTS_URL}"]`)) {
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = FONTS_URL;
      document.head.appendChild(l);
    }
  }, []);

  const currentStep = STEPS[step - 1];
  const accent = currentStep.color;
  const emColor = accent === 'amber' ? '#ec7c62' : '#2e9e63';
  const emGlow = accent === 'amber' ? 'rgba(236,124,98,0.45)' : 'rgba(46,158,99,0.45)';

  // ── handleChange: used by both manual clicks AND AI suggestions ──
  const handleChange = (id, value) => {
    setAnswers(p => ({ ...p, [id]: value }));
    setErrors(p => ({ ...p, [id]: false }));
  };

  const validate = () => {
    const e = {};
    currentStep.questions.forEach(q => {
      if (q.required) { const v = answers[q.id]; if (!v || (Array.isArray(v) && v.length === 0) || v === '') e[q.id] = true; }
    });
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step === STEPS.length) { setPhase('loading'); cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else { setStep(s => s + 1); cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  };

  const handleRestart = () => {
    setStep(1); setAnswers({}); setErrors({}); setPhase('form');
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a1310', position: 'relative' }}>
      {/* Fixed grid */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: ['linear-gradient(rgba(11,46,29,0.55) 1px, transparent 1px)', 'linear-gradient(90deg, rgba(11,46,29,0.55) 1px, transparent 1px)'].join(','),
        backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(10,60,35,0.85) 0%, transparent 70%)' }} />
          <MeshBackground />
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '60px 20px 68px', textAlign: 'center' }}>

            {/* ── logo badge + BioPulse AI title: single row ── */}
            <motion.div initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexWrap: 'wrap', gap: 14, marginBottom: 16,
              }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 20px', borderRadius: 99, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)' }}>
                <Image
                  src="/images/kec-logo.png"
                  alt="KEC"
                  width={800}
                  height={600}
                  style={{ height: 30, width: 'auto', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none', width: 30, height: 30, borderRadius: 8, background: 'rgba(46,158,99,0.22)', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf size={15} color="#2e9e63" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.15 }}>
                  <span style={{ fontFamily: F, fontWeight: 800, fontSize: 16, color: 'rgba(255,255,255,0.95)', letterSpacing: '0.04em' }}>KEC</span>
                  <span style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: '#2e9e63', letterSpacing: '0.06em' }}>Biofuel</span>
                </div>
              </div>

              <div style={{
                fontFamily: F, fontSize: 'clamp(32px,7vw,60px)', fontWeight: 800, lineHeight: 1.0,
                letterSpacing: '-0.03em', whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg,#4fae79 0%,#2e9e63 40%,#7fc49b 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                BioPulse AI
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 99, background: 'rgba(236,124,98,0.12)', border: '1px solid rgba(236,124,98,0.35)', color: '#f4ae9a', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em' }}>
                <Sparkles size={10} /> INVESTOR INTELLIGENCE TOOL
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              style={{ fontFamily: F, fontSize: 15, fontWeight: 600, color: '#ec7c62', letterSpacing: '0.05em', marginBottom: 14 }}>
              AI Feasibility Engine
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
              style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.75 }}>
              Get an AI-generated investment forecast for your CBG plant in under 60 seconds.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '18px 44px' }}>
              {[['100+', 'Plants Built'], ['₹500Cr+', 'Investments'], ['30%', 'NABARD Subsidy'], ['95%', 'Plant Uptime']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: F, fontSize: 24, fontWeight: 800, color: '#ec7c62', textShadow: '0 0 18px rgba(236,124,98,0.4)' }}>{n}</div>
                  <div style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, letterSpacing: '0.04em', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── CARD ── */}
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 14px 72px' }} ref={cardRef}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5 }}
            style={{
              background: 'rgba(7,18,13,0.80)', borderRadius: 26, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)',
              backdropFilter: 'blur(16px)'
            }}>

            {phase === 'form' && (
              <div style={{ padding: '18px 24px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                  <div>
                    <div style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Investor Profile Engine</div>
                    <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>All fields help BioPulse AI generate a more accurate analysis</div>
                  </div>
                  <div style={{
                    padding: '4px 12px', borderRadius: 99, flexShrink: 0, marginLeft: 10,
                    background: `rgba(${accent === 'amber' ? '236,124,98' : '46,158,99'},0.12)`,
                    border: `1px solid rgba(${accent === 'amber' ? '236,124,98' : '46,158,99'},0.3)`,
                    color: emColor, fontFamily: F, fontSize: 11, fontWeight: 700
                  }}>
                    {step} / {STEPS.length}
                  </div>
                </div>
                <StepNav current={step} />
              </div>
            )}

            <div style={{ padding: '26px 24px' }}>
              <AnimatePresence mode="wait">
                {phase === 'loading' && <AnalysisLoader key="loading" onDone={() => setPhase('results')} />}
                {phase === 'results' && <ResultsScreen key="results" answers={answers} onRestart={handleRestart} />}
                {phase === 'form' && (
                  <motion.div key={step} initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -36 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}>

                    <div style={{ marginBottom: 18 }}>
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 11px', borderRadius: 99, marginBottom: 9,
                          background: `rgba(${accent === 'amber' ? '236,124,98' : '46,158,99'},0.11)`,
                          border: `1px solid rgba(${accent === 'amber' ? '236,124,98' : '46,158,99'},0.25)`,
                          color: emColor, fontSize: 9, fontFamily: F, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase'
                        }}>
                        <currentStep.icon size={10} /> {currentStep.title}
                      </motion.div>
                      <h3 style={{ fontFamily: F, fontSize: 21, fontWeight: 800, color: 'white', margin: 0 }}>{currentStep.subtitle}</h3>
                    </div>

                    {/* ── GEMINI SUGGEST ALL — placed above questions ── */}
                    <SuggestAllButton
                      questions={currentStep.questions}
                      answers={answers}
                      onSuggest={handleChange}
                      accent={accent}
                    />

                    {/* ── Questions ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                      {currentStep.questions.map((q, qi) => (
                        <motion.div key={q.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qi * 0.07 }}>

                          {/* Label row */}
                          <div style={{ marginBottom: 9 }}>
                            <label style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: '#ffffff' }}>
                              <span style={{ marginRight: 5 }}>{q.icon}</span>{q.label}
                              <span style={{ color: '#ec7c62', marginLeft: 3 }}>*</span>
                            </label>
                          </div>

                          {q.hint && (
                            <div style={{ display: 'flex', gap: 7, padding: '7px 11px', borderRadius: 9, background: 'rgba(46,158,99,0.08)', border: '1px solid rgba(46,158,99,0.22)', marginBottom: 9 }}>
                              <Zap size={11} color="#2e9e63" style={{ flexShrink: 0, marginTop: 1 }} />
                              <p style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>{q.hint}</p>
                            </div>
                          )}
                          <QuestionField q={q} value={answers[q.id]} onChange={handleChange} accent={accent} />
                          {errors[q.id] && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 7, fontFamily: F, fontSize: 11.5, color: '#f87171', fontWeight: 500 }}>
                              <AlertCircle size={12} /> This field is required
                            </motion.p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* ── Navigation ── */}
                    <div style={{ display: 'flex', gap: 10, marginTop: 32, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      {step > 1 && (
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(s => s - 1)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 7, padding: '13px 18px', borderRadius: 13,
                            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.65)', fontFamily: F, fontSize: 13, fontWeight: 600, cursor: 'pointer'
                          }}>
                          <ChevronLeft size={15} /> Back
                        </motion.button>
                      )}
                      <motion.button whileHover={{ scale: 1.015, boxShadow: `0 0 28px ${emGlow}` }}
                        whileTap={{ scale: 0.985 }} onClick={handleNext}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                          padding: '15px', borderRadius: 13, border: 'none', cursor: 'pointer',
                          fontFamily: F, fontSize: 14, fontWeight: 700, color: 'white',
                          background: accent === 'amber' ? 'linear-gradient(135deg,#d96450,#b44e3d)' : 'linear-gradient(135deg,#218452,#1a6a42)',
                          boxShadow: accent === 'amber' ? '0 4px 20px rgba(217,100,80,0.35)' : '0 4px 20px rgba(33,132,82,0.35)',
                          transition: 'box-shadow 0.25s'
                        }}>
                        {step === STEPS.length ? <><Brain size={15} /> Run BioPulse AI Analysis</> : <>Continue <ArrowRight size={15} /></>}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Trust strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px', marginTop: 20 }}>
            {['100+ Plants Built', 'SATAT Registered', 'NABARD Empanelled', 'EPC + O&M Guarantee'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={12} color="#2e9e63" />
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.45)' }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}