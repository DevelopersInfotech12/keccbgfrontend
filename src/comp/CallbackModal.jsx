'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Send, CheckCircle2, AlertCircle, Loader2, ChevronDown, Zap, ShieldCheck, Clock, Sparkles } from 'lucide-react';

const F = "var(--font-inter), system-ui, sans-serif";
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';

const INK900 = '#0A1310', INK800 = '#111E18', INK700 = '#1C2C24', INK500 = '#41544B', INK300 = '#7F8F87';
const LEAF700 = '#1A6A42', LEAF600 = '#218452', LEAF500 = '#2E9E63';
const CORAL = '#EC7C62', CORAL_DK = '#B44E3D', CORAL_600 = '#D96450';
const ERR = '#DC2626';
const BORDER = 'rgba(10,19,16,0.12)', BORDER_SOFT = 'rgba(10,19,16,0.08)';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli & Daman & Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

export default function CallbackModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', state: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [ddOpen, setDdOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!document.querySelector(`link[href="${FONTS_URL}"]`)) {
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = FONTS_URL;
      document.head.appendChild(l);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus('idle'); setErrors({}); setDdOpen(false); setQuery('');
      setForm({ name: '', phone: '', state: '' });
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  const set = (k) => (v) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.state) e.state = 'Please select your state';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus('loading');
    try {
      await fetch('/api/biofuel-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          state: form.state,
        }),
      });
    } catch { /* fire-and-forget */ }
    setStatus('success');
    setTimeout(() => onClose?.(), 1900);
  };

  const inputStyle = (bad) => ({
    width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: 12,
    border: `1.5px solid ${bad ? ERR : BORDER}`,
    background: '#FBFCFB', color: INK800,
    fontFamily: F, fontSize: 14.5, outline: 'none',
    transition: 'border-color .2s ease, box-shadow .2s ease',
  });
  const labelStyle = { fontFamily: F, fontSize: 13.5, fontWeight: 600, color: INK800, marginBottom: 6, display: 'block' };
  const errText = (msg) => (
    <p style={{ fontFamily: F, fontSize: 12, color: ERR, margin: '6px 0 0', display: 'flex', gap: 5, alignItems: 'center' }}>
      <AlertCircle size={12} />{msg}
    </p>
  );
  const focusRing = (hasErr) => ({
    onFocus: (e) => { e.target.style.borderColor = LEAF500; e.target.style.boxShadow = '0 0 0 4px rgba(46,158,99,0.12)'; },
    onBlur: (e) => { e.target.style.borderColor = hasErr ? ERR : BORDER; e.target.style.boxShadow = 'none'; },
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16, background: 'rgba(10,19,16,0.55)', backdropFilter: 'blur(8px)', overflowY: 'auto',
          }}
          role="dialog" aria-modal="true" aria-label="Request a callback"
        >
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {[...Array(16)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute', width: 7, height: 7, borderRadius: '50%',
                background: i % 2 ? 'rgba(236,124,98,0.40)' : 'rgba(79,174,121,0.38)',
                top: `${(i * 37) % 100}%`, left: `${(i * 53) % 100}%`,
                animation: `cbPulse ${2 + (i % 3)}s ease-in-out ${i * 0.2}s infinite`,
              }} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: '100%', maxWidth: 980 }}
          >
            <div style={{
              position: 'absolute', inset: -14, borderRadius: 40, filter: 'blur(36px)', opacity: 0.55,
              background: 'linear-gradient(120deg, rgba(26,106,66,0.5), rgba(236,124,98,0.4))'
            }} />

            {/* outer white floating card */}
            <div className="cbModalCard" style={{
              position: 'relative', borderRadius: 30, padding: 12,
              background: '#FFFFFF',
              boxShadow: '0 50px 100px -30px rgba(10,19,16,0.55), 0 14px 34px -18px rgba(10,19,16,0.3)',
              display: 'flex', gap: 0, minHeight: 580,
            }}>
              <div style={{ position: 'absolute', top: 0, left: 40, right: 40, height: 4, borderRadius: 4, background: 'linear-gradient(90deg,#1a6a42,#2e9e63 45%,#ec7c62 100%)' }} />

              {/* ===== IMAGE PANE: stacked top on mobile, side-by-side on desktop (≥760px) ===== */}
              <div className="cbModalImagePane" style={{
                position: 'relative', borderRadius: 22, overflow: 'hidden', background: INK900,
              }}>
                <motion.div initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'absolute', inset: 0 }}>
                  <img
                    src="/images/callbackimage.png"
                    alt="Get a callback from our team"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,19,16,0.05) 0%, rgba(10,19,16,0.05) 55%, rgba(10,19,16,0.75) 100%)' }} />
                </motion.div>

                {/* top bar */}
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                  style={{ position: 'absolute', top: 20, left: 22, right: 22, zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: F, fontWeight: 700, fontSize: 11, color: '#fff', background: "#046f8d", padding: '7px 14px',
                    borderRadius: 99, border: '1.5px solid rgba(255,255,255,0.55)', letterSpacing: '0.02em',
                  }}>
                    Request Callback
                  </span>
                </motion.div>

                {/* bottom-left avatar + caption */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  style={{ position: 'absolute', bottom: 22, left: 22, zIndex: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                    border: '1.5px solid rgba(255,255,255,0.5)', display: 'grid', placeItems: 'center', backdropFilter: 'blur(4px)',
                  }}>
                    <Phone size={16} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: F, fontWeight: 700, fontSize: 13.5, color: '#fff' }}>Our Team</div>
                    <div style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Biofuel ROI experts</div>
                  </div>
                </motion.div>

                {/* bottom-right decorative badges */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 2, display: 'flex', gap: 8 }}>
                  {[Sparkles, ShieldCheck].map((Icon, i) => (
                    <span key={i} style={{
                      width: 32, height: 32, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.55)',
                      display: 'grid', placeItems: 'center', color: '#fff', cursor: 'default',
                    }}>
                      <Icon size={14} />
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* ===== RIGHT: form ===== */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <button onClick={onClose} aria-label="Close"
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#EDEFEC'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#F3F6F4'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                    style={{
                      width: 34, height: 34, borderRadius: '50%', border: `1px solid ${BORDER}`, background: '#F3F6F4',
                      color: INK500, cursor: 'pointer', display: 'grid', placeItems: 'center', transition: 'all .25s ease', flexShrink: 0,
                    }}>
                    <X size={16} />
                  </button>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 380, margin: '0 auto', width: '100%' }}>
                  {status === 'success' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '22px 0', textAlign: 'center' }}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260 }}
                        style={{
                          width: 60, height: 60, borderRadius: '50%', background: 'rgba(46,158,99,0.12)',
                          border: '2px solid rgba(46,158,99,0.4)', display: 'grid', placeItems: 'center', boxShadow: '0 0 26px rgba(46,158,99,0.25)'
                        }}>
                        <CheckCircle2 size={26} color={LEAF600} />
                      </motion.div>
                      <div>
                        <div style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: INK900, marginBottom: 5 }}>
                          Thanks, {form.name.split(' ')[0] || 'there'}!
                        </div>
                        <p style={{ fontFamily: F, fontSize: 13, color: INK500, margin: 0 }}>
                          Your callback request is in. We'll ring you soon.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ fontFamily: F, fontSize: 28, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.01em', color: "#046f8d", textAlign: 'center' }}>
                        Hi there 👋
                      </motion.h2>
                      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        style={{ fontFamily: F, fontSize: 13.5, color: INK500, margin: '0 0 24px', textAlign: 'center' }}>
                        Share a few details, our team calls you back
                      </motion.p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                          <label style={labelStyle}>Full name <span style={{ color: CORAL_600 }}>*</span></label>
                          <input value={form.name} onChange={(e) => set('name')(e.target.value)} placeholder="Your name"
                            style={inputStyle(errors.name)} {...focusRing(errors.name)} />
                          {errors.name && errText(errors.name)}
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                          <label style={labelStyle}>Phone number <span style={{ color: CORAL_600 }}>*</span></label>
                          <input type="tel" value={form.phone} onChange={(e) => set('phone')(e.target.value)} placeholder="+91 ..."
                            style={inputStyle(errors.phone)} {...focusRing(errors.phone)} />
                          {errors.phone && errText(errors.phone)}
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                          <label style={labelStyle}>State <span style={{ color: CORAL_600 }}>*</span></label>
                          <div style={{ position: 'relative' }}>
                            <div style={{ ...inputStyle(errors.state), display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px 0 16px' }}>
                              <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setDdOpen(true); if (form.state) set('state')(''); }}
                                onFocus={(e) => { setDdOpen(true); e.currentTarget.parentElement.style.borderColor = LEAF500; e.currentTarget.parentElement.style.boxShadow = '0 0 0 4px rgba(46,158,99,0.12)'; }}
                                onBlur={(e) => { setTimeout(() => setDdOpen(false), 150); e.currentTarget.parentElement.style.borderColor = errors.state ? ERR : BORDER; e.currentTarget.parentElement.style.boxShadow = 'none'; }}
                                placeholder="Search your state…"
                                style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', padding: '13px 0', color: INK800, fontFamily: F, fontSize: 14.5 }}
                              />
                              {form.state && <CheckCircle2 size={15} color={LEAF600} style={{ flexShrink: 0 }} />}
                              <motion.span animate={{ rotate: ddOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
                                onMouseDown={(e) => { e.preventDefault(); setDdOpen((o) => !o); }}
                                style={{ display: 'inline-flex', cursor: 'pointer', flexShrink: 0 }}>
                                <ChevronDown size={16} color={INK300} />
                              </motion.span>
                            </div>
                            <AnimatePresence>
                              {ddOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6, scaleY: 0.96 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
                                  transition={{ duration: 0.15 }}
                                  style={{
                                    position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 20, transformOrigin: 'top',
                                    background: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden',
                                    boxShadow: '0 16px 40px rgba(10,19,16,0.18)', maxHeight: 190, overflowY: 'auto',
                                  }}>
                                  {(() => {
                                    const q = query.trim().toLowerCase();
                                    const list = q ? INDIAN_STATES.filter((s2) => s2.toLowerCase().includes(q)) : INDIAN_STATES;
                                    if (!list.length) return <div style={{ padding: '12px 16px', fontFamily: F, fontSize: 13.5, color: INK300 }}>No state found</div>;
                                    return list.map((st) => (
                                      <div key={st}
                                        onMouseDown={(e) => { e.preventDefault(); set('state')(st); setQuery(st); setDdOpen(false); }}
                                        style={{
                                          padding: '10px 16px', cursor: 'pointer', fontFamily: F, fontSize: 13.5, fontWeight: form.state === st ? 600 : 400,
                                          color: form.state === st ? LEAF700 : INK700,
                                          background: form.state === st ? 'rgba(46,158,99,0.10)' : 'transparent',
                                          transition: 'background .15s ease',
                                        }}
                                        onMouseEnter={(e) => { if (form.state !== st) e.currentTarget.style.background = 'rgba(10,19,16,0.04)'; }}
                                        onMouseLeave={(e) => { if (form.state !== st) e.currentTarget.style.background = 'transparent'; }}>
                                        {st}
                                      </div>
                                    ));
                                  })()}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {errors.state && errText(errors.state)}
                        </motion.div>

                        <motion.button
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                          whileHover={{ scale: status === 'loading' ? 1 : 1.015, boxShadow: '0 12px 28px -6px rgba(217,100,80,0.6)' }}
                          whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                          onClick={submit} disabled={status === 'loading'}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: '13px', borderRadius: 13, border: 'none',
                            cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontFamily: F, fontSize: 14.5, fontWeight: 700, color: 'white',
                            background: status === 'loading' ? 'rgba(33,132,82,0.55)' : 'linear-gradient(135deg,#EC7C62,#D96450)',
                            boxShadow: '0 8px 22px -6px rgba(217,100,80,0.5)', marginTop: 6,
                          }}>
                          {status === 'loading'
                            ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ display: 'inline-flex' }}><Loader2 size={16} /></motion.span> Sending…</>
                            : <><Send size={15} /> Request Callback</>}
                        </motion.button>

                        <p style={{ fontFamily: F, fontSize: 11.5, color: INK300, margin: '2px 0 4px', textAlign: 'center' }}>
                          🔒 Your details stay confidential
                        </p>

                        {/* bottom trust row, echoes original social-icon row */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          style={{ display: 'flex', justifyContent: 'center', gap: 22, paddingTop: 14, borderTop: `1px solid ${BORDER_SOFT}` }}>
                          {[[ShieldCheck, 'No spam'], [Zap, 'Quick reply'], [Clock, 'Callback in 24h']].map(([Icon, label]) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK300 }}>
                              <Icon size={13} />
                              <span style={{ fontFamily: F, fontSize: 10.5, fontWeight: 500 }}>{label}</span>
                            </div>
                          ))}
                        </motion.div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <style>{`
  @keyframes cbPulse{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.6;transform:scale(1.4)}}
  .cbModalCard { flex-direction: column; }
  .cbModalImagePane { display: block; width: 100%; height: 200px; }
  @media (min-width: 760px) {
    .cbModalCard { flex-direction: row; }
    .cbModalImagePane { width: 48%; min-width: 260px; height: auto; }
  }
`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}