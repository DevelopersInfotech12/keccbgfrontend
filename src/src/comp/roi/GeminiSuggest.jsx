'use client';

/**
 * ============================================================
 * GeminiSuggest — AI Suggestion UI Component
 * ============================================================
 *
 * Renders the "✨ AI Suggest" button and handles all suggestion
 * UX: loading states, errors, quota messages, tooltips.
 *
 * This component is PURELY presentational + orchestration.
 * All LLM logic lives in services/geminiService.js.
 *
 * PROPS:
 *   questions   {object[]}  — questions for current step
 *   answers     {object}    — current answers state
 *   onSuggest   {function}  — callback(questionId, value) to update answers
 *   stepAccent  {string}    — 'emerald' | 'amber' for theming
 * ============================================================
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { suggestStepAnswers, suggestAnswer } from '@/lib/geminiService';

// ── Theme helpers ─────────────────────────────────────────────
const theme = (accent) => ({
  primary:     accent === 'amber' ? '#ec7c62' : '#2e9e63',
  primaryGlow: accent === 'amber' ? 'rgba(236,124,98,0.35)' : 'rgba(46,158,99,0.35)',
  primaryBg:   accent === 'amber' ? 'rgba(236,124,98,0.10)' : 'rgba(46,158,99,0.10)',
  primaryBdr:  accent === 'amber' ? 'rgba(236,124,98,0.30)' : 'rgba(46,158,99,0.30)',
  gradient:    accent === 'amber'
    ? 'linear-gradient(135deg, #d96450, #b44e3d)'
    : 'linear-gradient(135deg, #218452, #1a6a42)',
});

// ── Status types ──────────────────────────────────────────────
const STATUS = {
  IDLE:     'idle',
  LOADING:  'loading',
  SUCCESS:  'success',
  ERROR:    'error',
  QUOTA:    'quota',
};

// ── Friendly error messages ───────────────────────────────────
function friendlyError(err) {
  const msg = err?.message || '';
  if (msg.includes('QUOTA_EXCEEDED')) return { type: STATUS.QUOTA,  text: 'Daily AI limit reached. Try again tomorrow or fill manually.' };
  if (msg.includes('RATE_LIMIT'))     return { type: STATUS.ERROR,   text: 'Too fast! Wait a moment and try again.' };
  if (msg.includes('API key'))        return { type: STATUS.ERROR,   text: 'AI not configured. Fill in your .env.local key.' };
  if (msg.includes('fetch'))          return { type: STATUS.ERROR,   text: 'Network error. Check your connection.' };
  return { type: STATUS.ERROR, text: 'AI suggestion failed. Please fill manually.' };
}

// ── Individual question suggest button ────────────────────────
export function SuggestOneButton({ question, answers, onSuggest, accent }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const t = theme(accent);

  const handleSuggest = useCallback(async () => {
    setStatus(STATUS.LOADING);
    try {
      const value = await suggestAnswer(question, answers);
      onSuggest(question.id, value);
      setStatus(STATUS.SUCCESS);
      setTimeout(() => setStatus(STATUS.IDLE), 2000);
    } catch (err) {
      const { type } = friendlyError(err);
      setStatus(type);
      setTimeout(() => setStatus(STATUS.IDLE), 3500);
    }
  }, [question, answers, onSuggest]);

  const isLoading = status === STATUS.LOADING;
  const isSuccess = status === STATUS.SUCCESS;

  return (
    <motion.button
      onClick={handleSuggest}
      disabled={isLoading}
      whileHover={!isLoading ? { scale: 1.04 } : {}}
      whileTap={!isLoading ? { scale: 0.96 } : {}}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 11px',
        borderRadius: 99,
        border: `1px solid ${isSuccess ? 'rgba(46,158,99,0.4)' : t.primaryBdr}`,
        background: isSuccess ? 'rgba(46,158,99,0.1)' : t.primaryBg,
        color: isSuccess ? '#2e9e63' : t.primary,
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        transition: 'all 0.2s',
        letterSpacing: '0.02em',
        flexShrink: 0,
      }}
    >
      {isLoading ? (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
          <Loader2 size={10} />
        </motion.div>
      ) : isSuccess ? (
        <CheckCircle2 size={10} />
      ) : (
        <Sparkles size={10} />
      )}
      {isLoading ? 'Thinking…' : isSuccess ? 'Suggested!' : 'AI Suggest'}
    </motion.button>
  );
}

// ── Full-step "Suggest All" button + status banner ────────────
export function SuggestAllButton({ questions, answers, onSuggest, accent }) {
  const [status, setStatus]     = useState(STATUS.IDLE);
  const [errorInfo, setErrorInfo] = useState(null);
  const [progress, setProgress] = useState(0); // 0–100
  const t = theme(accent);

  const handleSuggestAll = useCallback(async () => {
    setStatus(STATUS.LOADING);
    setProgress(0);
    setErrorInfo(null);

    try {
      // Progress tracking: simulate per-question progress
      const total = questions.length;
      let done = 0;

      const results = await suggestStepAnswers(
        questions,
        answers,
      );

      // Apply suggestions one by one with animation delay
      for (const [id, value] of Object.entries(results)) {
        onSuggest(id, value);
        done++;
        setProgress(Math.round((done / total) * 100));
        await new Promise(r => setTimeout(r, 120));
      }

      setStatus(STATUS.SUCCESS);
      setTimeout(() => { setStatus(STATUS.IDLE); setProgress(0); }, 2800);

    } catch (err) {
      const info = friendlyError(err);
      setErrorInfo(info);
      setStatus(info.type);
      setTimeout(() => { setStatus(STATUS.IDLE); setErrorInfo(null); }, 4000);
    }
  }, [questions, answers, onSuggest]);

  const isLoading = status === STATUS.LOADING;
  const isSuccess = status === STATUS.SUCCESS;
  const isError   = status === STATUS.ERROR || status === STATUS.QUOTA;

  return (
    <div style={{ marginBottom: 18 }}>

      {/* ── Main button ── */}
      <motion.button
        onClick={handleSuggestAll}
        disabled={isLoading}
        whileHover={!isLoading ? { scale: 1.015, boxShadow: `0 0 22px ${t.primaryGlow}` } : {}}
        whileTap={!isLoading ? { scale: 0.985 } : {}}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 9,
          padding: '12px 18px',
          borderRadius: 13,
          border: `1.5px dashed ${isSuccess ? 'rgba(46,158,99,0.5)' : isError ? 'rgba(239,68,68,0.4)' : t.primaryBdr}`,
          background: isSuccess
            ? 'rgba(46,158,99,0.07)'
            : isError
            ? 'rgba(239,68,68,0.05)'
            : t.primaryBg,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Progress bar fill */}
        {isLoading && (
          <motion.div
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              background: `${t.primaryBg}`,
              borderRadius: 13,
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Button content */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 9 }}>
          {isLoading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Sparkles size={14} color={t.primary} />
              </motion.div>
              <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: t.primary }}>
                AI is thinking… ({progress}%)
              </span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 size={14} color="#2e9e63" />
              <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: '#2e9e63' }}>
                All answers suggested! Review & edit if needed.
              </span>
            </>
          ) : isError ? (
            <>
              <AlertCircle size={14} color="#f87171" />
              <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: '#f87171' }}>
                {errorInfo?.text || 'Something went wrong'}
              </span>
            </>
          ) : (
            <>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={14} color={t.primary} />
              </motion.div>
              <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: 13, fontWeight: 700, color: t.primary }}>
                ✨ Auto-fill with AI
              </span>
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
}

// ── Default export ────────────────────────────────────────────
export default { SuggestAllButton };