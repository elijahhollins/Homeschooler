/* ============================================================ *
 *  HomeschoolKit · core
 *  Focus theme tokens, icon set, shared UI primitives, helpers.
 *  Exposed on window for the other babel scripts to use.
 * ============================================================ */
const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

/* ---- Theme tokens (Focus direction) -------------------------- */
const BASE_THEME = {
  bg: '#f6f8fa',
  surface: '#ffffff',
  surfaceAlt: '#eef2f6',
  surfaceInset: '#f4f6f9',
  text: '#1b2430',
  textMuted: '#6a7585',
  textFaint: '#98a2b1',
  border: '#e4e9ef',
  borderStrong: '#d3dae3',
  accent: '#3863a8',
  accentHover: '#2f5494',
  accentText: '#ffffff',
  accentSoft: '#e8eff8',
  accentLine: '#cbdcef',
  warm: '#bf7a45',      // secondary accent for Place / deals
  warmSoft: '#f6ece1',
  warmLine: '#ecd6bf',
  good: '#2f8a5b',
  goodSoft: '#e2f0e8',
  fontDisplay: "'Space Grotesk', system-ui, sans-serif",
  fontBody: "'Plus Jakarta Sans', system-ui, sans-serif",
  fontMono: "'Space Mono', monospace",
  radius: 13,
  radiusSm: 9,
  radiusLg: 18,
  shadow: '0 1px 2px rgba(20,30,45,0.05), 0 6px 18px rgba(20,30,45,0.04)',
  shadowLg: '0 8px 30px rgba(20,30,45,0.12), 0 2px 6px rgba(20,30,45,0.06)',
};

const ThemeCtx = createContext(BASE_THEME);
const useT = () => useContext(ThemeCtx);

/* ---- Icon set (simple line icons) ---------------------------- */
function Icon({ name, size = 20, stroke = 'currentColor', sw = 1.7, style }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke,
    strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  switch (name) {
    case 'worksheet': return (<svg {...c}><rect x="5" y="3" width="14" height="18" rx="2"/><line x1="8.5" y1="8" x2="15.5" y2="8"/><line x1="8.5" y1="12" x2="15.5" y2="12"/><line x1="8.5" y1="16" x2="13" y2="16"/></svg>);
    case 'quiz': return (<svg {...c}><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.7"/><line x1="12" y1="16.5" x2="12" y2="16.6"/></svg>);
    case 'wordsearch': return (<svg {...c}><rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="9.3" x2="20" y2="9.3"/><line x1="4" y1="14.6" x2="20" y2="14.6"/><line x1="9.3" y1="4" x2="9.3" y2="20"/><line x1="14.6" y1="4" x2="14.6" y2="20"/></svg>);
    case 'vocab': return (<svg {...c}><path d="M7 18 11 6l4 12"/><line x1="8.3" y1="14" x2="13.7" y2="14"/><line x1="17" y1="9" x2="17" y2="18"/></svg>);
    case 'reading': return (<svg {...c}><path d="M12 6c-1.8-1.3-4-1.8-6.5-1.5V18c2.5-.3 4.7.2 6.5 1.5 1.8-1.3 4-1.8 6.5-1.5V4.5C16 4.2 13.8 4.7 12 6Z"/><line x1="12" y1="6" x2="12" y2="19.5"/></svg>);
    case 'place': return (<svg {...c}><path d="M12 21c4-4 6.5-7 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 14 8 17 12 21Z"/><circle cx="12" cy="10.5" r="2.2"/></svg>);
    case 'library': return (<svg {...c}><rect x="4" y="4" width="6" height="16" rx="1"/><rect x="14" y="4" width="6" height="16" rx="1"/></svg>);
    case 'share': return (<svg {...c}><circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><line x1="8.1" y1="10.9" x2="14.9" y2="7.1"/><line x1="8.1" y1="13.1" x2="14.9" y2="16.9"/></svg>);
    case 'home': return (<svg {...c}><path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/></svg>);
    case 'search': return (<svg {...c}><circle cx="11" cy="11" r="6.5"/><line x1="16" y1="16" x2="20" y2="20"/></svg>);
    case 'plus': return (<svg {...c}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
    case 'spark': return (<svg {...c}><path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21"/><path d="M6.3 6.3 8.5 8.5M15.5 15.5l2.2 2.2M17.7 6.3 15.5 8.5M8.5 15.5 6.3 17.7"/></svg>);
    case 'print': return (<svg {...c}><path d="M7 9V4h10v5"/><rect x="5" y="9" width="14" height="7" rx="1.5"/><path d="M7 14h10v6H7z"/><line x1="16" y1="12" x2="16.01" y2="12"/></svg>);
    case 'save': return (<svg {...c}><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4"/><rect x="8" y="13" width="8" height="7"/></svg>);
    case 'edit': return (<svg {...c}><path d="M14 5l5 5M4 20l1-4L16 5l3 3L8 19l-4 1Z"/></svg>);
    case 'check': return (<svg {...c}><path d="M5 12.5 10 17.5 19 7"/></svg>);
    case 'chevR': return (<svg {...c}><path d="M9 6l6 6-6 6"/></svg>);
    case 'chevL': return (<svg {...c}><path d="M15 6l-6 6 6 6"/></svg>);
    case 'chevD': return (<svg {...c}><path d="M6 9l6 6 6-6"/></svg>);
    case 'arrowR': return (<svg {...c}><line x1="4" y1="12" x2="19" y2="12"/><path d="M13 6l6 6-6 6"/></svg>);
    case 'close': return (<svg {...c}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>);
    case 'locate': return (<svg {...c}><circle cx="12" cy="12" r="3.2"/><line x1="12" y1="2.5" x2="12" y2="5.5"/><line x1="12" y1="18.5" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5.5" y2="12"/><line x1="18.5" y1="12" x2="21.5" y2="12"/></svg>);
    case 'tag': return (<svg {...c}><path d="M4 4h7l9 9-7 7-9-9V4Z"/><circle cx="8.5" cy="8.5" r="1.4"/></svg>);
    case 'clock': return (<svg {...c}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>);
    case 'grade': return (<svg {...c}><path d="M12 3 14.6 8.3 20.5 9.2 16.2 13.3 17.3 19.1 12 16.3 6.7 19.1 7.8 13.3 3.5 9.2 9.4 8.3Z"/></svg>);
    case 'download': return (<svg {...c}><path d="M12 4v10M8 10l4 4 4-4"/><path d="M5 18h14"/></svg>);
    case 'copy': return (<svg {...c}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V5a1 1 0 0 1 1-1h11"/></svg>);
    case 'mail': return (<svg {...c}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>);
    case 'link': return (<svg {...c}><path d="M9 15l6-6"/><path d="M11 7l1-1a4 4 0 0 1 6 6l-1 1"/><path d="M13 17l-1 1a4 4 0 0 1-6-6l1-1"/></svg>);
    case 'ticket': return (<svg {...c}><path d="M4 8a2 2 0 0 0 2-2h12a2 2 0 0 0 2 2 2 2 0 0 0 0 4 2 2 0 0 0-2 2H6a2 2 0 0 0-2-2 2 2 0 0 0 0-4Z"/><line x1="12" y1="6" x2="12" y2="18" strokeDasharray="2 2"/></svg>);
    case 'star': return (<svg {...c}><path d="M12 4 14.2 8.6 19.2 9.3 15.6 12.9 16.5 17.9 12 15.5 7.5 17.9 8.4 12.9 4.8 9.3 9.8 8.6Z"/></svg>);
    case 'pin2': return (<svg {...c}><circle cx="12" cy="10" r="7"/><path d="M12 17v4"/></svg>);
    case 'sliders': return (<svg {...c}><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="8" r="2.2"/><circle cx="15" cy="16" r="2.2"/></svg>);
    case 'dots': return (<svg {...c}><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>);
    case 'refresh': return (<svg {...c}><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 16"/><path d="M4 20v-4h4"/></svg>);
    case 'users': return (<svg {...c}><circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M16.5 19a5.5 5.5 0 0 0-2-4.3"/></svg>);
    case 'book': return (<svg {...c}><path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z"/><path d="M18 16H7a2 2 0 0 0-2 2"/></svg>);
    case 'flag': return (<svg {...c}><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>);
    case 'compass': return (<svg {...c}><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11Z"/></svg>);
    default: return (<svg {...c}><circle cx="12" cy="12" r="8"/></svg>);
  }
}

/* ---- Primitives ---------------------------------------------- */
function Btn({ children, kind = 'primary', size = 'md', icon, iconR, onClick, style, full, disabled, type }) {
  const t = useT();
  const [h, setH] = useState(false);
  const sizes = {
    sm: { padding: '7px 12px', fontSize: 13 },
    md: { padding: '10px 16px', fontSize: 14 },
    lg: { padding: '13px 22px', fontSize: 15 },
  };
  const kinds = {
    primary: { background: h && !disabled ? t.accentHover : t.accent, color: t.accentText, border: '1px solid transparent' },
    soft: { background: h ? t.accentLine : t.accentSoft, color: t.accent, border: '1px solid transparent' },
    ghost: { background: h ? t.surfaceAlt : 'transparent', color: t.text, border: '1px solid transparent' },
    outline: { background: h ? t.surfaceAlt : t.surface, color: t.text, border: `1px solid ${t.border}` },
    warm: { background: h ? '#a96a3a' : t.warm, color: '#fff', border: '1px solid transparent' },
  };
  return (
    <button type={type || 'button'} onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderRadius: t.radiusSm, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: t.fontBody,
        fontWeight: 600, lineHeight: 1, transition: 'background .15s, opacity .15s', whiteSpace: 'nowrap',
        opacity: disabled ? 0.5 : 1, width: full ? '100%' : 'auto',
        ...sizes[size], ...kinds[kind], ...style }}>
      {icon && <Icon name={icon} size={size === 'lg' ? 18 : 16} stroke="currentColor" />}
      {children}
      {iconR && <Icon name={iconR} size={size === 'lg' ? 18 : 16} stroke="currentColor" />}
    </button>
  );
}

function Card({ children, style, pad = 18, onClick, hover, inset }) {
  const t = useT();
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: inset ? t.surfaceInset : t.surface, border: `1px solid ${t.border}`,
        borderRadius: t.radius, boxShadow: hover && h ? t.shadowLg : t.shadow, padding: pad,
        cursor: onClick ? 'pointer' : 'default', transition: 'box-shadow .15s, transform .15s, border-color .15s',
        transform: hover && h ? 'translateY(-2px)' : 'none',
        borderColor: hover && h ? t.borderStrong : t.border, ...style }}>
      {children}
    </div>
  );
}

function Badge({ children, tone = 'neutral', style }) {
  const t = useT();
  const tones = {
    neutral: { bg: t.surfaceAlt, fg: t.textMuted },
    accent: { bg: t.accentSoft, fg: t.accent },
    warm: { bg: t.warmSoft, fg: t.warm },
    good: { bg: t.goodSoft, fg: t.good },
  };
  const c = tones[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: c.bg, color: c.fg,
      borderRadius: 999, padding: '4px 10px', fontSize: 11.5, fontWeight: 600, whiteSpace: 'nowrap',
      letterSpacing: '0.01em', ...style }}>{children}</span>
  );
}

function Field({ label, children, hint, style }) {
  const t = useT();
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 7, ...style }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: t.text, letterSpacing: '0.01em' }}>{label}</span>
      {children}
      {hint && <span style={{ fontSize: 11.5, color: t.textFaint }}>{hint}</span>}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, mono, style }) {
  const t = useT();
  const [f, setF] = useState(false);
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ background: t.surface, border: `1px solid ${f ? t.accent : t.border}`,
        boxShadow: f ? `0 0 0 3px ${t.accentSoft}` : 'none', outline: 'none',
        borderRadius: t.radiusSm, padding: '10px 13px', fontSize: 14, color: t.text,
        fontFamily: mono ? t.fontMono : t.fontBody, width: '100%', transition: 'border-color .15s, box-shadow .15s', ...style }} />
  );
}

function Select({ value, onChange, options, style }) {
  const t = useT();
  return (
    <div style={{ position: 'relative', ...style }}>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        style={{ appearance: 'none', WebkitAppearance: 'none', background: t.surface,
          border: `1px solid ${t.border}`, borderRadius: t.radiusSm, padding: '10px 36px 10px 13px',
          fontSize: 14, color: t.text, fontFamily: t.fontBody, width: '100%', cursor: 'pointer', outline: 'none' }}>
        {options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', color: t.textMuted, display: 'flex' }}><Icon name="chevD" size={16} /></span>
    </div>
  );
}

/* Segmented control for short option sets */
function Segmented({ value, onChange, options, style }) {
  const t = useT();
  return (
    <div style={{ display: 'inline-flex', background: t.surfaceAlt, borderRadius: t.radiusSm,
      padding: 3, gap: 3, ...style }}>
      {options.map((o) => {
        const v = o.value ?? o, l = o.label ?? o, on = v === value;
        return (
          <button key={v} onClick={() => onChange(v)}
            style={{ border: 'none', cursor: 'pointer', borderRadius: t.radiusSm - 3, padding: '7px 13px',
              fontSize: 13, fontWeight: 600, fontFamily: t.fontBody, whiteSpace: 'nowrap',
              background: on ? t.surface : 'transparent', color: on ? t.accent : t.textMuted,
              boxShadow: on ? '0 1px 2px rgba(20,30,45,0.08)' : 'none', transition: 'all .15s' }}>{l}</button>
        );
      })}
    </div>
  );
}

/* Stepper for counts */
function Stepper({ value, onChange, min = 1, max = 50, step = 1 }) {
  const t = useT();
  const set = (v) => onChange(Math.max(min, Math.min(max, v)));
  const btn = { width: 34, height: 34, border: `1px solid ${t.border}`, background: t.surface,
    color: t.text, cursor: 'pointer', display: 'grid', placeItems: 'center', borderRadius: t.radiusSm };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <button style={btn} onClick={() => set(value - step)}><Icon name="chevD" size={16} style={{ transform: 'rotate(90deg)' }} /></button>
      <span style={{ minWidth: 30, textAlign: 'center', fontWeight: 700, fontSize: 15, fontFamily: t.fontDisplay }}>{value}</span>
      <button style={btn} onClick={() => set(value + step)}><Icon name="chevD" size={16} style={{ transform: 'rotate(-90deg)' }} /></button>
    </div>
  );
}

/* Toggle chips (multi-select) */
function ChipToggle({ options, value, onChange }) {
  const t = useT();
  const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button key={o} onClick={() => toggle(o)}
            style={{ border: `1px solid ${on ? t.accent : t.border}`, cursor: 'pointer',
              background: on ? t.accentSoft : t.surface, color: on ? t.accent : t.text,
              borderRadius: 999, padding: '7px 13px', fontSize: 13, fontWeight: 600,
              fontFamily: t.fontBody, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'all .12s' }}>
            {on && <Icon name="check" size={13} />} {o}
          </button>
        );
      })}
    </div>
  );
}

/* Modal */
function Modal({ open, onClose, children, width = 480, title }) {
  const t = useT();
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20,30,45,0.34)',
      backdropFilter: 'blur(2px)', display: 'grid', placeItems: 'center', zIndex: 200, padding: 24,
      animation: 'hk-fade .15s ease' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, borderRadius: t.radiusLg,
        boxShadow: t.shadowLg, width, maxWidth: '100%', maxHeight: '88vh', overflow: 'auto',
        animation: 'hk-pop .18s cubic-bezier(.2,.9,.3,1.2)' }}>
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 22px', borderBottom: `1px solid ${t.border}` }}>
            <h3 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em' }}>{title}</h3>
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer',
              color: t.textMuted, display: 'flex', padding: 4 }}><Icon name="close" size={20} /></button>
          </div>
        )}
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

/* Toast */
function useToast() {
  const [msg, setMsg] = useState(null);
  const show = (m) => { setMsg(m); window.clearTimeout(window.__hkToast); window.__hkToast = window.setTimeout(() => setMsg(null), 2600); };
  return [msg, show];
}
function Toast({ msg }) {
  const t = useT();
  if (!msg) return null;
  return (
    <div style={{ position: 'fixed', bottom: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 300,
      background: t.text, color: '#fff', borderRadius: 999, padding: '11px 20px', fontSize: 13.5, fontWeight: 600,
      boxShadow: t.shadowLg, display: 'flex', alignItems: 'center', gap: 9, animation: 'hk-toast .25s ease' }}>
      <Icon name="check" size={16} stroke="#7fd6a3" /> {msg}
    </div>
  );
}

/* Viewport width hook for responsive layout */
function useViewport() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return { w, narrow: w < 760, mid: w < 1040, mobile: w < 600 };
}

/* Section header */
function SectionHead({ title, sub, action }) {
  const t = useT();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 14 }}>
      <div>
        <h2 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 19, letterSpacing: '-0.02em' }}>{title}</h2>
        {sub && <div style={{ color: t.textMuted, fontSize: 13.5, marginTop: 4 }}>{sub}</div>}
      </div>
      {action}
    </div>
  );
}

Object.assign(window, {
  React, useState, useEffect, useRef, useMemo, createContext, useContext,
  BASE_THEME, ThemeCtx, useT, Icon, Btn, Card, Badge, Field, TextInput, Select,
  Segmented, Stepper, ChipToggle, Modal, useToast, Toast, SectionHead, useViewport,
});
