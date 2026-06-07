/* ============================================================ *
 *  HomeschoolKit · Home, Library, Shared screens
 * ============================================================ */

function typeTone(type) { return 'accent'; }

function MiniThumb({ type, t, h = 64 }) {
  const g = GEN_BY_ID[type];
  return (
    <div style={{ height: h, borderRadius: t.radiusSm, background: t.surfaceInset, border: `1px solid ${t.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: `repeating-linear-gradient(0deg, ${t.border} 0 1px, transparent 1px 9px)`, margin: 10 }} />
      <div style={{ position: 'relative', color: t.accent, opacity: 0.9 }}><Icon name={g.icon} size={h > 50 ? 26 : 20} stroke={t.accent} /></div>
    </div>
  );
}

function timeAgo(ts) {
  const d = Math.floor((Date.now() - ts) / 86400000);
  if (d <= 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d/7)} wk ago`;
  return `${Math.floor(d/30)} mo ago`;
}

/* ---- Home ---- */
function HomeScreen({ onNav, onGenerate, library, onOpen, onToggleFav, greetName }) {
  const t = useT();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const recent = [...library].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  return (
    <div>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: '-0.025em' }}>{greeting}, {greetName || 'Maya'}</h1>
        <p style={{ margin: '6px 0 0', color: t.textMuted, fontSize: 15.5 }}>Let's make something worth learning today.</p>
      </div>

      <SectionHead title="Create with AI" sub="Pick a tool — a ready-to-edit draft appears in seconds." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 30 }}>
        {GENERATORS.map((g) => (
          <Card key={g.id} hover onClick={() => onGenerate(g.id)} style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 138 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: t.accentSoft, color: t.accent, display: 'grid', placeItems: 'center' }}><Icon name={g.icon} size={23} stroke={t.accent} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16.5, letterSpacing: '-0.01em' }}>{g.title}</div>
              <div style={{ color: t.textMuted, fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>{g.desc}</div>
            </div>
            <div style={{ fontFamily: t.fontMono, fontSize: 10.5, color: t.textFaint, letterSpacing: '0.02em' }}>{g.meta}</div>
          </Card>
        ))}
      </div>

      {/* Place Explorer banner */}
      <Card pad={0} hover onClick={() => onNav('place')} style={{ overflow: 'hidden', marginBottom: 30, cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280, padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <Badge tone="warm" style={{ alignSelf: 'flex-start' }}><Icon name="place" size={13} stroke={t.warm} /> Place Explorer</Badge>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Going somewhere? Turn the trip into a lesson.</div>
            <div style={{ color: t.textMuted, fontSize: 14.5, lineHeight: 1.5, maxWidth: 460 }}>
              Find aquariums, zoos, museums and parks near you — each comes with a ready-made unit study and homeschool deals nearby.</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
              {PLACE_TYPES.slice(0, 5).map((c) => (
                <span key={c.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: t.surfaceAlt,
                  borderRadius: 999, padding: '6px 12px', fontSize: 12.5, color: t.text, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  <Icon name={c.icon} size={13} stroke={t.textMuted} /> {c.label}</span>
              ))}
            </div>
            <Btn kind="warm" icon="search" style={{ alignSelf: 'flex-start', marginTop: 6 }}>Explore places near me</Btn>
          </div>
          <div style={{ width: 280, background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`, position: 'relative', minHeight: 200 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#fff', opacity: 0.9 }}><Icon name="place" size={92} stroke="#fff" sw={1.2} /></div>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 26px)` }} />
          </div>
        </div>
      </Card>

      <SectionHead title="Recent in your library" action={<Btn kind="ghost" size="sm" iconR="arrowR" onClick={() => onNav('library')}>View all</Btn>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {recent.map((r) => <LibCard key={r.id} m={r} t={t} onOpen={onOpen} onToggleFav={onToggleFav} />)}
      </div>
    </div>
  );
}

function LibCard({ m, t, onOpen, onToggleFav }) {
  return (
    <Card hover pad={14} onClick={() => onOpen(m)} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
      <MiniThumb type={m.type} t={t} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
          <Icon name={GEN_BY_ID[m.type].icon} size={14} stroke={t.accent} />
          <span style={{ fontFamily: t.fontMono, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em', color: t.textMuted }}>{GEN_BY_ID[m.type].title}</span>
          {onToggleFav && (
            <button onClick={(e) => { e.stopPropagation(); onToggleFav(m.id); }}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2, marginLeft: 'auto',
                color: m.fav ? t.warm : t.textFaint, display: 'flex', lineHeight: 1 }}>
              <Icon name="star" size={14} stroke={m.fav ? t.warm : t.textFaint} style={m.fav ? { fill: t.warm } : {}} sw={m.fav ? 0 : 1.7} />
            </button>
          )}
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{m.title}</div>
        <div style={{ fontSize: 12, color: t.textMuted, marginTop: 4 }}>{m.subject} · {m.grade}</div>
      </div>
      <div style={{ fontSize: 11.5, color: t.textFaint, display: 'flex', alignItems: 'center', gap: 5, paddingTop: 9, borderTop: `1px solid ${t.border}` }}>
        <Icon name="clock" size={12} stroke={t.textFaint} /> {timeAgo(m.createdAt)}
      </div>
    </Card>
  );
}

/* ---- Library ---- */
function LibraryScreen({ library, onOpen, onToggleFav }) {
  const t = useT();
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const filtered = library.filter((m) => (filter === 'all' || m.type === filter) &&
    (!q.trim() || m.title.toLowerCase().includes(q.toLowerCase()) || m.subject.toLowerCase().includes(q.toLowerCase())))
    .sort((a, b) => { if (a.fav !== b.fav) return a.fav ? -1 : 1; return b.createdAt - a.createdAt; });
  const counts = library.reduce((acc, m) => { acc[m.type] = (acc[m.type]||0)+1; return acc; }, {});
  return (
    <div>
      <SectionHead title="My Library" sub={`${library.length} saved materials, ready to edit, print, or share.`} />
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: t.surface, border: `1px solid ${t.border}`,
          borderRadius: t.radiusSm, padding: '9px 13px', width: 250 }}>
          <Icon name="search" size={16} stroke={t.textMuted} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your library…"
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13.5, fontFamily: t.fontBody, color: t.text, background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          <button onClick={() => setFilter('all')} style={chipStyle(t, filter === 'all')}>All ({library.length})</button>
          {GENERATORS.filter((g) => counts[g.id]).map((g) => (
            <button key={g.id} onClick={() => setFilter(g.id)} style={chipStyle(t, filter === g.id)}>
              <Icon name={g.icon} size={14} stroke={filter === g.id ? t.accent : t.textMuted} /> {g.plural} ({counts[g.id]})</button>
          ))}
        </div>
      </div>
      {filtered.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {filtered.map((m) => <LibCard key={m.id} m={m} t={t} onOpen={onOpen} onToggleFav={onToggleFav} />)}
        </div>
      ) : (
        <Card style={{ textAlign: 'center', padding: '50px 20px', color: t.textMuted }}>
          <Icon name="library" size={32} stroke={t.textFaint} />
          <div style={{ marginTop: 12, fontSize: 15 }}>Nothing here yet. Generate a material and save it to your library.</div>
        </Card>
      )}
    </div>
  );
}

/* ---- Shared ---- */
function SharedScreen({ onOpen }) {
  const t = useT();
  const groups = [...new Set(SHARED.map((s) => s.group))];
  return (
    <div>
      <SectionHead title="Shared with me" sub="Materials shared by families in your co-ops." />
      {groups.map((grp) => (
        <div key={grp} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 13 }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: t.warmSoft, color: t.warm, display: 'grid', placeItems: 'center' }}><Icon name="users" size={16} stroke={t.warm} /></span>
            <h3 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16.5, letterSpacing: '-0.01em' }}>{grp}</h3>
            <Badge>{SHARED.filter((s) => s.group === grp).length} materials</Badge>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {SHARED.filter((s) => s.group === grp).map((m) => (
              <Card key={m.id} hover onClick={() => onOpen({ ...m, createdAt: Date.now() })} style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
                <div style={{ width: 46, height: 46, borderRadius: 11, background: t.accentSoft, color: t.accent, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={GEN_BY_ID[m.type].icon} size={23} stroke={t.accent} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5, lineHeight: 1.25 }}>{m.title}</div>
                  <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 3 }}>{m.subject} · {m.grade}</div>
                  <div style={{ fontSize: 12, color: t.textFaint, marginTop: 5, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: t.surfaceAlt, display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, color: t.textMuted }}>{m.by.split(' ').map((x) => x[0]).join('')}</span>
                    {m.by}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { HomeScreen, LibraryScreen, SharedScreen, LibCard, timeAgo, MiniThumb });
