'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sparkles, ArrowRight, CheckCircle2, AlertCircle, Loader2, Brain, ChevronDown } from 'lucide-react';

const FONTS_URL =
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';

const F = "var(--font-inter), system-ui, sans-serif";

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli & Daman & Diu',
    'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

function StaticMesh() {
    return (
        <div style={{
            position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
            background: [
                'radial-gradient(ellipse 70% 50% at 50% 0%,   rgba(46,158,99,0.20) 0%, transparent 60%)',
                'radial-gradient(ellipse 50% 40% at 85% 75%,  rgba(236,124,98,0.11) 0%, transparent 55%)',
                'radial-gradient(ellipse 45% 35% at 10% 55%,  rgba(46,158,99,0.08) 0%, transparent 55%)',
            ].join(','),
        }} />
    );
}

function Field({ label, id, type = 'text', placeholder, value, onChange, error, icon }) {
    const [focused, setFocused] = useState(false);
    const borderColor = error ? '#f87171' : focused ? '#2e9e63' : 'rgba(255,255,255,0.15)';
    const glowColor = error ? 'rgba(248,113,113,0.18)' : focused ? 'rgba(46,158,99,0.20)' : 'transparent';

    return (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label htmlFor={id} style={{
                fontFamily: F, fontSize: 15, fontWeight: 600,
                color: 'rgba(255,255,255,0.90)', display: 'flex', alignItems: 'center', gap: 7
            }}>
                <span style={{ fontSize: 16 }}>{icon}</span>{label}
                <span style={{ color: '#ec7c62' }}>*</span>
            </label>
            <input
                id={id} type={type} placeholder={placeholder} value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                style={{
                    width: '100%', boxSizing: 'border-box', padding: '14px 18px',
                    borderRadius: 12, border: `1.5px solid ${borderColor}`,
                    background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.92)',
                    fontFamily: F, fontSize: 15, fontWeight: 400, outline: 'none',
                    boxShadow: `0 0 0 3px ${glowColor}`,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
            />
            <AnimatePresence>
                {error && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5, margin: 0,
                            fontFamily: F, fontSize: 12, color: '#f87171', fontWeight: 500
                        }}>
                        <AlertCircle size={12} /> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function StateDropdown({ value, onChange, error }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const borderColor = error ? '#f87171' : open ? '#2e9e63' : 'rgba(255,255,255,0.15)';
    const glowColor = error ? 'rgba(248,113,113,0.18)' : open ? 'rgba(46,158,99,0.20)' : 'transparent';

    useEffect(() => {
        const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const select = s => { onChange(s); setOpen(false); };

    return (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{
                fontFamily: F, fontSize: 15, fontWeight: 600,
                color: 'rgba(255,255,255,0.90)', display: 'flex', alignItems: 'center', gap: 7
            }}>
                <span style={{ fontSize: 16 }}>📍</span>State
                <span style={{ color: '#ec7c62' }}>*</span>
            </label>

            <div ref={ref} style={{ position: 'relative' }}>
                <div onClick={() => setOpen(o => !o)}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 18px', borderRadius: 12,
                        border: `1.5px solid ${borderColor}`,
                        background: 'rgba(255,255,255,0.06)',
                        boxShadow: `0 0 0 3px ${glowColor}`,
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        cursor: 'pointer', userSelect: 'none',
                    }}>
                    <span style={{
                        fontFamily: F, fontSize: 15, fontWeight: 400,
                        color: value ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.35)'
                    }}>
                        {value || 'Select your state'}
                    </span>
                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown size={16} color="rgba(255,255,255,0.45)" />
                    </motion.div>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
                                zIndex: 9999, transformOrigin: 'top',
                                background: '#111e18', border: '1.5px solid rgba(46,158,99,0.28)',
                                borderRadius: 12, overflow: 'hidden',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
                                maxHeight: 240, overflowY: 'auto',
                            }}>
                            {INDIAN_STATES.map((s, i) => (
                                <div key={s} onClick={() => select(s)}
                                    style={{
                                        padding: '11px 18px', cursor: 'pointer',
                                        fontFamily: F, fontSize: 14, fontWeight: 400,
                                        color: value === s ? '#2e9e63' : 'rgba(255,255,255,0.80)',
                                        background: value === s ? 'rgba(46,158,99,0.12)' : 'transparent',
                                        borderBottom: i < INDIAN_STATES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                        transition: 'background 0.15s',
                                    }}
                                    onMouseEnter={e => { if (value !== s) e.target.style.background = 'rgba(255,255,255,0.06)'; }}
                                    onMouseLeave={e => { if (value !== s) e.target.style.background = 'transparent'; }}>
                                    {value === s && <span style={{ marginRight: 8, fontSize: 12 }}>✓</span>}
                                    {s}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 5, margin: 0,
                            fontFamily: F, fontSize: 12, color: '#f87171', fontWeight: 500
                        }}>
                        <AlertCircle size={12} /> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function RoiForm({ onSuccess }) {
    const [form, setForm] = useState({ name: '', phone: '', state: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        if (!document.querySelector(`link[href="${FONTS_URL}"]`)) {
            const l = document.createElement('link');
            l.rel = 'stylesheet'; l.href = FONTS_URL;
            document.head.appendChild(l);
        }
    }, []);

    const set = key => val => {
        setForm(p => ({ ...p, [key]: val }));
        setErrors(p => ({ ...p, [key]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        else if (!/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
        if (!form.state) e.state = 'Please select your state';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setStatus('loading');
        try {
            const res = await fetch('/api/biofuel-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    phone: form.phone.trim(),
                    state: form.state,
                }),
            });
            await res.json();
            setStatus('success');
            setTimeout(onSuccess, 1400);
        } catch (err) {
            console.error('Submit error:', err);
            setStatus('success');
            setTimeout(onSuccess, 1400);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0a1310', display: 'flex', flexDirection: 'column', fontFamily: F, position: 'relative' }}>
            <StaticMesh />
            <div style={{
                position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none',
                backgroundImage: [
                    'linear-gradient(rgba(11,46,29,0.55) 1px, transparent 1px)',
                    'linear-gradient(90deg, rgba(11,46,29,0.55) 1px, transparent 1px)',
                ].join(','),
                backgroundSize: '60px 60px',
            }} />

            <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>

                {/* Hero */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '52px 20px 56px', textAlign: 'center' }}>

                        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                            style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 99,
                                background: 'rgba(236,124,98,0.12)', border: '1px solid rgba(236,124,98,0.35)',
                                color: '#f4ae9a', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em'
                            }}>
                                <Sparkles size={10} /> INVESTOR INTELLIGENCE TOOL
                            </div>
                        </motion.div>

                        {/* ── logo badge + KEC + BioPulse AI: single row ── */}
                        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            style={{
                                marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexWrap: 'wrap', gap: 14
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                                    borderRadius: 99, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', flexShrink: 0
                                }}>
                                    <Image
                                        src="/images/kec-logo.png"
                                        alt="KEC"
                                        width={800}
                                        height={600}
                                        style={{ height: 36, width: 'auto', objectFit: 'contain' }}
                                        onError={(e) => {
                                            e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div style={{
                                        display: 'none', width: 26, height: 26, borderRadius: 6,
                                        background: 'rgba(46,158,99,0.22)', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Leaf size={13} color="#2e9e63" />
                                    </div>
                                </div>
                                <div style={{
                                    fontFamily: F, fontSize: 'clamp(32px,7vw,56px)', fontWeight: 800,
                                    color: 'white', lineHeight: 1.0, letterSpacing: '-0.02em', whiteSpace: 'nowrap'
                                }}>
                                    KEC
                                </div>
                            </div>
                            <div style={{
                                fontFamily: F, fontSize: 'clamp(32px,7vw,56px)', fontWeight: 800,
                                lineHeight: 1.0, letterSpacing: '-0.02em', whiteSpace: 'nowrap',
                                background: 'linear-gradient(135deg,#4fae79 0%,#2e9e63 40%,#7fc49b 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                            }}>
                                BioPulse AI
                            </div>
                        </motion.div>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: '#ec7c62', letterSpacing: '0.05em', marginBottom: 12 }}>
                            AI Feasibility Engine
                        </motion.p>
                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
                            style={{ fontFamily: F, fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.60)', maxWidth: 400, margin: '0 auto', lineHeight: 1.75 }}>
                            Get an AI-generated investment forecast for your CBG plant in under 60 seconds.
                        </motion.p>
                    </div>
                </div>

                {/* Form card */}
                <div style={{ maxWidth: 550, margin: '0 auto', width: '100%', padding: '0 16px 72px' }}>
                    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.45 }}
                        style={{
                            background: 'rgba(255,255,255,0.05)', borderRadius: 24, overflow: 'visible',
                            border: '1px solid rgba(255,255,255,0.10)',
                            boxShadow: '0 40px 90px rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)'
                        }}>

                        <div style={{ padding: '22px 24px 18px', borderRadius: '24px 24px 0 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 11px', borderRadius: 99,
                                background: 'rgba(46,158,99,0.11)', border: '1px solid rgba(46,158,99,0.25)',
                                color: '#2e9e63', fontSize: 9, fontFamily: F, fontWeight: 700,
                                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12
                            }}>
                                <Brain size={10} /> Step 0 of 3 — Unlock Your Analysis
                            </div>
                            <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.3 }}>
                                <span style={{ color: 'white' }}>Your free CBG investor</span>
                                <br />
                                <span style={{ color: '#4fae79' }}>report awaits</span>
                            </h2>
                            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.65 }}>
                                Share your details so our team can follow up with a personalised DPR and subsidy guidance.
                            </p>
                        </div>

                        <div style={{ padding: '26px 24px' }}>
                            <AnimatePresence mode="wait">

                                {status === 'success' && (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '28px 0', textAlign: 'center' }}>
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260 }}
                                            style={{
                                                width: 64, height: 64, borderRadius: '50%', background: 'rgba(46,158,99,0.14)',
                                                border: '2px solid rgba(46,158,99,0.45)', display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', boxShadow: '0 0 28px rgba(46,158,99,0.35)'
                                            }}>
                                            <CheckCircle2 size={28} color="#2e9e63" />
                                        </motion.div>
                                        <div>
                                            <div style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 6 }}>Details saved!</div>
                                            <p style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                                                Launching your BioPulse AI analysis…
                                            </p>
                                        </div>
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                                            style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#2e9e63' }} />
                                    </motion.div>
                                )}

                                {status !== 'success' && (
                                    <motion.div key="form" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

                                        <Field id="name" label="Full Name" icon="👤" placeholder="Enter your full name"
                                            value={form.name} onChange={set('name')} error={errors.name} />
                                        <Field id="phone" label="Phone Number" icon="📱" placeholder="Enter your phone number"
                                            value={form.phone} onChange={set('phone')} error={errors.phone} type="tel" />
                                        <StateDropdown value={form.state} onChange={set('state')} error={errors.state} />

                                        <p style={{
                                            fontFamily: F, fontSize: 12, fontWeight: 400,
                                            color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.65, display: 'flex', gap: 7
                                        }}>
                                            <span style={{ flexShrink: 0 }}>🔒</span>
                                            Your details are confidential and will only be used by KEC experts for project consultation.
                                        </p>

                                        <AnimatePresence>
                                            {status === 'error' && (
                                                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    style={{
                                                        display: 'flex', gap: 8, padding: '10px 14px', borderRadius: 10,
                                                        background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)'
                                                    }}>
                                                    <AlertCircle size={14} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                                                    <p style={{ fontFamily: F, fontSize: 12, color: '#fca5a5', margin: 0, lineHeight: 1.5 }}>
                                                        Something went wrong. Please try again or contact us on WhatsApp.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <motion.button onClick={handleSubmit} disabled={status === 'loading'}
                                            whileHover={status !== 'loading' ? { scale: 1.015, boxShadow: '0 0 28px rgba(46,158,99,0.5)' } : {}}
                                            whileTap={status !== 'loading' ? { scale: 0.985 } : {}}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                                padding: '16px', borderRadius: 13, border: 'none',
                                                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                                fontFamily: F, fontSize: 15, fontWeight: 700, color: 'white',
                                                background: status === 'loading' ? 'rgba(33,132,82,0.5)' : 'linear-gradient(135deg,#218452,#1a6a42)',
                                                boxShadow: '0 4px 20px rgba(33,132,82,0.35)',
                                                transition: 'background 0.2s, box-shadow 0.25s',
                                                marginTop: 4, letterSpacing: '0.01em',
                                            }}>
                                            {status === 'loading'
                                                ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                                                    <Loader2 size={17} />
                                                </motion.div> Saving…</>
                                                : <><Brain size={16} /> Unlock My Free Analysis <ArrowRight size={16} /></>}
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
                        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px', marginTop: 22 }}>
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