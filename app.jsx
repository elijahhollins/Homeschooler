/* ============================================================ *
 *  HomeschoolKit · app shell, routing, modals, mount
 * ============================================================ */

const NAV = [
  { group: 'Make', items: GENERATORS.map((g) => ({ id: 'gen:' + g.id, icon: g.icon, label: g.title })) },
  { group: 'Discover', items: [{ id: 'place', icon: 'place', label: 'Place Explorer' }] },
  { group: 'Library', items: [
    { id: 'library', icon: 'library', label: 'My Library' },
    { id: 'shared', icon: 'share', label: 'Shared with me' },
  ] },
];

function Sidebar({ route, go, t, library, mobile, onClose }) {
  return (
    <aside style={{ width: 236, flex: '0 0 236px', background: t.surface, borderRight: `1px solid ${t.border}`,
      padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 20, height: '100vh',
      position: mobile ? 'fixed' : 'sticky', top: 0, left: 0, zIndex: 120, overflowY: 'auto',
      boxShadow: mobile ? t.shadowLg : 'none' }}>
      <div onClick={() => { go({ view: 'home' }); onClose && onClose(); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px', cursor: 'pointer' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: t.accent, color: '#fff', display: 'grid',
          placeItems: 'center', fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 17 }}>H</div>
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 17.5, letterSpacing: '-0.02em' }}>HomeschoolKit</div>
      </div>

      <Btn kind="primary" icon="spark" onClick={() => { go({ view: 'home' }); onClose && onClose(); }} style={{ width: '100%' }}>Create new</Btn>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <NavItem icon="home" label="Home" on={route.view === 'home'} onClick={() => { go({ view: 'home' }); onClose && onClose(); }} t={t} />
        {NAV.map((grp) => (
          <div key={grp.group} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: t.textFaint, padding: '0 8px 5px' }}>{grp.group}</div>
            {grp.items.map((it) => {
              const on = it.id.startsWith('gen:') ? (route.view === 'gen' && route.type === it.id.slice(4))
                : route.view === it.id;
              return <NavItem key={it.id} icon={it.icon} label={it.label} on={on} t={t}
                onClick={() => { it.id.startsWith('gen:') ? go({ view: 'gen', type: it.id.slice(4) }) : go({ view: it.id }); onClose && onClose(); }} />;
            })}
          </div>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 6px 2px', borderTop: `1px solid ${t.border}` }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: t.accentSoft, color: t.accent, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>MR</div>
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Maya Rivera</div>
          <div style={{ fontSize: 11.5, color: t.textMuted }}>3 learners · Free plan</div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, on, onClick, t }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 9px', borderRadius: 9, cursor: 'pointer',
        background: on ? t.accentSoft : h ? t.surfaceAlt : 'transparent', color: on ? t.accent : t.text,
        fontWeight: on ? 600 : 500, fontSize: 13.5, transition: 'background .12s' }}>
      <Icon name={icon} size={18} stroke={on ? t.accent : t.textMuted} /> {label}
    </div>
  );
}

/* ---- Share modal ---- */
function ShareModal({ open, onClose, material, t, onToast }) {
  const [tab, setTab] = useState('link');
  const [copied, setCopied] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailNote, setEmailNote] = useState('');
  const groups = ['Cedar Co-op', 'Bayside Learners'];
  const link = material ? `homeschoolkit.app/m/${material.id || 'shared'}` : '';

  const copyLink = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    onToast('Link copied to clipboard');
    setTimeout(() => setCopied(false), 1800);
  };

  const sendEmail = () => {
    if (!emailTo.trim()) { onToast('Please enter a recipient email'); return; }
    onToast(`Material sent to ${emailTo.trim().split(',')[0].trim()}`);
    setEmailTo(''); setEmailNote('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Share material" width={460}>
      {material && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: t.surfaceInset,
          borderRadius: t.radiusSm, marginBottom: 18 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: t.accentSoft, color: t.accent, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={GEN_BY_ID[material.type].icon} size={20} stroke={t.accent} /></div>
          <div><div style={{ fontWeight: 600, fontSize: 14 }}>{material.title}</div>
            <div style={{ fontSize: 12.5, color: t.textMuted }}>{GEN_BY_ID[material.type].title} · {material.grade}</div></div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 4, background: t.surfaceAlt, borderRadius: t.radiusSm, padding: 3, marginBottom: 18 }}>
        {[['link', 'Copy link'], ['coop', 'Share to co-op'], ['email', 'Email']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, border: 'none', cursor: 'pointer', borderRadius: t.radiusSm - 3,
            padding: '8px', fontSize: 13, fontWeight: 600, fontFamily: t.fontBody, background: tab === id ? t.surface : 'transparent',
            color: tab === id ? t.accent : t.textMuted, boxShadow: tab === id ? '0 1px 2px rgba(20,30,45,0.08)' : 'none' }}>{lb}</button>
        ))}
      </div>
      {tab === 'link' && (
        <div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, background: t.surfaceInset, border: `1px solid ${t.border}`, borderRadius: t.radiusSm,
              padding: '11px 13px', fontSize: 13.5, color: t.textMuted, fontFamily: t.fontMono, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{link}</div>
            <Btn kind="primary" icon={copied ? 'check' : 'copy'} onClick={copyLink}>{copied ? 'Copied' : 'Copy'}</Btn>
          </div>
          <p style={{ fontSize: 12.5, color: t.textFaint, marginTop: 10, marginBottom: 0 }}>Anyone with the link can view and print this material.</p>
        </div>
      )}
      {tab === 'coop' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {groups.map((g) => (
            <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `1px solid ${t.border}`, borderRadius: t.radiusSm }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: t.warmSoft, color: t.warm, display: 'grid', placeItems: 'center' }}><Icon name="users" size={18} stroke={t.warm} /></span>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{g}</div>
                <div style={{ fontSize: 12, color: t.textMuted }}>{g === 'Cedar Co-op' ? '14 families' : '8 families'}</div></div>
              <Btn kind="soft" size="sm" icon="share" onClick={() => { onToast(`Shared to ${g}`); onClose(); }}>Share</Btn>
            </div>
          ))}
        </div>
      )}
      {tab === 'email' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Recipient emails" hint="Separate multiple addresses with commas.">
            <TextInput value={emailTo} onChange={setEmailTo} placeholder="parent@example.com" />
          </Field>
          <Field label="Note (optional)">
            <TextInput value={emailNote} onChange={setEmailNote} placeholder="Thought your kids might like this!" />
          </Field>
          <Btn kind="primary" icon="mail" full onClick={sendEmail}>Send</Btn>
        </div>
      )}
    </Modal>
  );
}

/* ---- Material view (opened from library/shared) ---- */
function MaterialView({ entry, t, onBack, onShare, onPrint, onToast }) {
  const [material, setMaterial] = useState(null);
  const [editable, setEditable] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  useEffect(() => {
    setMaterial(generateMaterial(entry.type, { topic: entry.title, subject: entry.subject, grade: entry.grade }));
    setEditable(false); setShowAnswers(false);
  }, [entry]);
  if (!material) return null;
  const hasKey = ['worksheet', 'quiz', 'reading', 'wordsearch'].includes(entry.type);
  const editMat = (k, v) => setMaterial((m) => ({ ...m, [k]: v }));
  return (
    <div>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', background: 'transparent',
        color: t.textMuted, cursor: 'pointer', fontSize: 13.5, fontWeight: 600, fontFamily: t.fontBody, marginBottom: 14, padding: 0 }}>
        <Icon name="chevL" size={17} /> Back</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ marginRight: 'auto' }}>
          <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 20, letterSpacing: '-0.02em' }}>{material.title}</div>
          <div style={{ fontSize: 12.5, color: t.textMuted }}>{GEN_BY_ID[entry.type].title} · {entry.subject} · {entry.grade}{entry.by ? ` · shared by ${entry.by}` : ''}</div>
        </div>
        <Btn kind={editable ? 'primary' : 'outline'} size="sm" icon="edit" onClick={() => setEditable((e) => !e)}>{editable ? 'Done' : 'Edit'}</Btn>
        {hasKey && <Btn kind={showAnswers ? 'soft' : 'outline'} size="sm" icon="check" onClick={() => setShowAnswers((s) => !s)}>{showAnswers ? 'Hide key' : 'Answer key'}</Btn>}
        <Btn kind="outline" size="sm" icon="print" onClick={() => onPrint(material)}>Print / PDF</Btn>
        <Btn kind="outline" size="sm" icon="share" onClick={() => onShare(material)}>Share</Btn>
      </div>
      {editable && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 12.5, color: t.accent, fontWeight: 600 }}><Icon name="edit" size={14} /> Click the title, instructions, or text to edit.</div>}
      <MaterialDoc m={material} t={t} editable={editable} onEdit={editMat} showAnswers={showAnswers} />
    </div>
  );
}

/* ---- Print overlay ---- */
function PrintOverlay({ material, t, withAnswers, setWithAnswers, onClose, onConfirm }) {
  if (!material) return null;
  return (
    <div className="hk-print-root" style={{ position: 'fixed', inset: 0, zIndex: 250, background: t.surfaceAlt, display: 'flex', flexDirection: 'column' }}>
      <div className="hk-print-bar" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px',
        background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <Icon name="print" size={20} stroke={t.accent} />
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16 }}>Print preview</div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 16, fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>
          <Toggle on={withAnswers} onClick={() => setWithAnswers((v) => !v)} t={t} /> Include answer key
        </label>
        <div style={{ flex: 1 }} />
        <Btn kind="ghost" size="sm" icon="close" onClick={onClose}>Close</Btn>
        <Btn kind="primary" size="sm" icon="download" onClick={onConfirm}>Print / Save as PDF</Btn>
      </div>
      <div className="hk-print-scroll" style={{ flex: 1, overflow: 'auto', padding: '30px 20px' }}>
        <div className="hk-print-page">
          <MaterialDoc m={material} t={t} editable={false} showAnswers={withAnswers} />
        </div>
      </div>
    </div>
  );
}

/* ---- Root App ---- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3863a8",
  "radius": 13,
  "displayFont": "Space Grotesk",
  "greetName": "Maya",
  "apiKey": ""
}/*EDITMODE-END*/;

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const accentHover = shade(tw.accent, -0.14);
  const t = {
    ...BASE_THEME,
    accent: tw.accent, accentHover,
    accentSoft: shade(tw.accent, 0.86, true), accentLine: shade(tw.accent, 0.66, true),
    radius: tw.radius, radiusSm: Math.max(5, tw.radius - 4), radiusLg: tw.radius + 5,
    fontDisplay: `'${tw.displayFont}', system-ui, sans-serif`,
    greetName: tw.greetName || 'Maya',
  };
  const [route, setRoute] = useState({ view: 'home' });
  const [library, setLibrary] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hk_library') || 'null');
      return saved || seedLibrary();
    } catch { return seedLibrary(); }
  });
  useEffect(() => {
    try { localStorage.setItem('hk_library', JSON.stringify(library)); } catch {}
  }, [library]);
  const [toast, showToast] = useToast();
  const [share, setShare] = useState(null);
  const [printMat, setPrintMat] = useState(null);
  const [printKey, setPrintKey] = useState(false);

  window.__hkApiKey = tw.apiKey || '';

  const go = (r) => { setRoute(r); window.scrollTo(0, 0); const el = document.querySelector('.hk-main'); if (el) el.scrollTop = 0; };
  const onGenerate = (type, topic) => go({ view: 'gen', type, presetTopic: topic });
  const onSave = (m) => {
    setLibrary((lib) => [{ id: m.id, type: m.type, title: m.title, subject: m.subject, grade: m.grade, createdAt: Date.now() },
      ...lib.filter((x) => x.id !== m.id)]);
    showToast('Saved to your library');
  };
  const onToggleFav = (id) => {
    setLibrary((lib) => lib.map((m) => m.id === id ? { ...m, fav: !m.fav } : m));
  };
  const doPrint = (m) => { setPrintMat(m); setPrintKey(false); };
  const confirmPrint = () => { window.print(); };
  const { narrow } = useViewport();
  const [drawer, setDrawer] = useState(false);

  return (
    <ThemeCtx.Provider value={t}>
      <div style={{ display: 'flex', background: t.bg, minHeight: '100vh', fontFamily: t.fontBody, color: t.text }}>
        {!narrow && <Sidebar route={route} go={go} t={t} library={library} />}
        {narrow && drawer && (
          <>
            <div onClick={() => setDrawer(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(20,30,45,0.34)', zIndex: 115 }} />
            <Sidebar route={route} go={go} t={t} library={library} mobile onClose={() => setDrawer(false)} />
          </>
        )}
        <main className="hk-main" style={{ flex: 1, minWidth: 0, height: '100vh', overflowY: 'auto' }}>
          {narrow && (
            <div style={{ position: 'sticky', top: 0, zIndex: 60, display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 18px', background: t.surface, borderBottom: `1px solid ${t.border}` }}>
              <button onClick={() => setDrawer(true)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: t.text, display: 'flex', padding: 4 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
              </button>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: t.accent, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 15 }}>H</div>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16.5, letterSpacing: '-0.02em' }}>HomeschoolKit</div>
            </div>
          )}
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: narrow ? '20px 18px 50px' : '30px 38px 60px' }}>
            {route.view === 'home' && <HomeScreen onNav={(v) => go({ view: v })} onGenerate={onGenerate} library={library} onOpen={(m) => go({ view: 'material', entry: m })} onToggleFav={onToggleFav} greetName={t.greetName} />}
            {route.view === 'gen' && <GeneratorScreen type={route.type} presetTopic={route.presetTopic} onSave={onSave} onShare={setShare} onToast={showToast} onPrint={doPrint} />}
            {route.view === 'place' && <PlaceExplorer onGenerate={onGenerate} onToast={showToast} />}
            {route.view === 'library' && <LibraryScreen library={library} onOpen={(m) => go({ view: 'material', entry: m })} onToggleFav={onToggleFav} />}
            {route.view === 'shared' && <SharedScreen onOpen={(m) => go({ view: 'material', entry: m })} />}
            {route.view === 'material' && <MaterialView entry={route.entry} t={t} onBack={() => go({ view: route.entry.by ? 'shared' : 'library' })} onShare={setShare} onPrint={doPrint} onToast={showToast} />}
          </div>
        </main>
      </div>

      <ShareModal open={!!share} onClose={() => setShare(null)} material={share} t={t} onToast={showToast} />
      {printMat && <PrintOverlay material={printMat} t={t} withAnswers={printKey} setWithAnswers={setPrintKey} onClose={() => setPrintMat(null)} onConfirm={confirmPrint} />}
      <Toast msg={toast} />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent color" value={tw.accent}
          options={['#3863a8', '#18887a', '#b85c38', '#6d5bd0', '#1b2430']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSelect label="Display font" value={tw.displayFont}
          options={['Space Grotesk', 'Bricolage Grotesque', 'Newsreader', 'Hanken Grotesk']}
          onChange={(v) => setTweak('displayFont', v)} />
        <TweakSection label="Shape" />
        <TweakSlider label="Corner radius" value={tw.radius} min={6} max={20} unit="px"
          onChange={(v) => setTweak('radius', v)} />
        <TweakSection label="Content" />
        <TweakText label="Greeting name" value={tw.greetName}
          onChange={(v) => setTweak('greetName', v)} />
        <TweakSection label="AI" />
        <TweakText label="Anthropic API key" value={tw.apiKey || ''}
          onChange={(v) => setTweak('apiKey', v)} />
      </TweaksPanel>
    </ThemeCtx.Provider>
  );
}

/* lighten/darken hex; tint=true blends toward white */
function shade(hex, amt, tint) {
  const h = hex.replace('#', '');
  let r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  if (tint) { r = Math.round(r + (255 - r) * amt); g = Math.round(g + (255 - g) * amt); b = Math.round(b + (255 - b) * amt); }
  else { r = Math.round(r * (1 + amt)); g = Math.round(g * (1 + amt)); b = Math.round(b * (1 + amt)); }
  const c = (x) => Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
