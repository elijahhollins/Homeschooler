/* ============================================================ *
 *  HomeschoolKit · Place Explorer
 *  Search places → pick one → place info + generated unit study
 *  + nearby homeschool deals/resources. Generate materials from it.
 * ============================================================ */

function placeIcon(type) {
  return ({ aquarium: 'reading', zoo: 'users', museum: 'book', park: 'flag', science: 'spark', history: 'compass' })[type] || 'place';
}
function Stars({ n, t, size = 13 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: t.warm }}>
      <Icon name="star" size={size} stroke={t.warm} sw={0} style={{ fill: t.warm }} />
      <span style={{ fontWeight: 700, fontSize: size, color: t.text }}>{n.toFixed(1)}</span>
    </span>
  );
}

function PlaceExplorer({ onGenerate, onToast }) {
  const t = useT();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(null);      // selected place
  const [typeFilter, setTypeFilter] = useState('all');
  const [located, setLocated] = useState(false);
  const [locating, setLocating] = useState(false);

  const results = useMemo(() => {
    let r = PLACES;
    if (typeFilter !== 'all') r = r.filter((p) => p.type === typeFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter((p) => p.name.toLowerCase().includes(q) || p.typeLabel.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) || p.type.includes(q));
    }
    return [...r].sort((a, b) => a.dist - b.dist);
  }, [query, typeFilter]);

  const useLocation = () => {
    setLocating(true);
    setTimeout(() => { setLocating(false); setLocated(true); onToast('Showing places near you'); }, 1100);
  };

  if (active) return <PlaceDetail place={active} t={t} onBack={() => setActive(null)} onGenerate={onGenerate} onToast={onToast} />;

  return (
    <div>
      {/* Hero search */}
      <div style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`, borderRadius: t.radiusLg,
        padding: '30px 32px', color: '#fff', marginBottom: 22, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, opacity: 0.12 }}><Icon name="place" size={200} stroke="#fff" sw={1} /></div>
        <div style={{ position: 'relative', maxWidth: 620 }}>
          <h1 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 27, letterSpacing: '-0.02em' }}>Turn your next outing into a lesson</h1>
          <p style={{ margin: '8px 0 20px', fontSize: 15, opacity: 0.92, lineHeight: 1.5 }}>
            Search a destination — an aquarium, zoo, museum, park — and get a ready-made unit study plus homeschool deals nearby.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 260, display: 'flex', alignItems: 'center', gap: 10, background: '#fff',
              borderRadius: t.radiusSm, padding: '12px 16px' }}>
              <Icon name="search" size={19} stroke={t.textMuted} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search aquariums, zoos, museums, parks…"
                style={{ border: 'none', outline: 'none', flex: 1, fontSize: 15, fontFamily: t.fontBody, color: t.text, background: 'transparent' }} />
              {query && <button onClick={() => setQuery('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: t.textMuted, display: 'flex' }}><Icon name="close" size={18} /></button>}
            </div>
            <Btn kind="warm" size="lg" icon="locate" onClick={useLocation} disabled={locating}
              style={{ background: '#fff', color: t.accent }}>
              {locating ? 'Locating…' : located ? 'Near you' : 'Use my location'}
            </Btn>
          </div>
        </div>
      </div>

      {/* Type filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => setTypeFilter('all')} style={chipStyle(t, typeFilter === 'all')}>All places</button>
        {PLACE_TYPES.map((pt) => (
          <button key={pt.id} onClick={() => setTypeFilter(pt.id)} style={chipStyle(t, typeFilter === pt.id)}>
            <Icon name={pt.icon} size={15} stroke={typeFilter === pt.id ? t.accent : t.textMuted} /> {pt.label}
          </button>
        ))}
      </div>

      {located && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14, fontSize: 13.5, color: t.textMuted }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: t.good, boxShadow: `0 0 0 3px ${t.goodSoft}` }} />
          Showing {results.length} places near <strong style={{ color: t.text }}>your location</strong> · sorted by distance
        </div>
      )}

      {/* Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: 16 }}>
        {results.map((p) => <PlaceCard key={p.id} p={p} t={t} onClick={() => setActive(p)} />)}
      </div>
      {results.length === 0 && (
        <Card style={{ textAlign: 'center', padding: '50px 20px', color: t.textMuted }}>
          <Icon name="search" size={34} stroke={t.textFaint} />
          <div style={{ marginTop: 12, fontSize: 15 }}>No places match "{query}". Try a different search or browse all places.</div>
        </Card>
      )}
    </div>
  );
}

function chipStyle(t, on) {
  return { display: 'inline-flex', alignItems: 'center', gap: 7, border: `1px solid ${on ? t.accent : t.border}`,
    background: on ? t.accentSoft : t.surface, color: on ? t.accent : t.text, borderRadius: 999,
    padding: '8px 14px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: t.fontBody, whiteSpace: 'nowrap' };
}

function PlaceCard({ p, t, onClick }) {
  return (
    <Card hover onClick={onClick} pad={0} style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 96, background: `linear-gradient(135deg, ${t.accentSoft}, ${t.warmSoft})`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', position: 'relative' }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: '#fff', color: t.accent, display: 'grid',
          placeItems: 'center', boxShadow: t.shadow }}><Icon name={placeIcon(p.type)} size={27} stroke={t.accent} /></div>
        <Badge tone="warm" style={{ background: '#fff' }}><Icon name="pin2" size={12} stroke={t.warm} /> {p.dist} mi</Badge>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{p.name}</div>
            <Stars n={p.rating} t={t} />
          </div>
          <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 3 }}>{p.typeLabel} · {p.city}</div>
        </div>
        <div style={{ fontSize: 13, color: t.text, lineHeight: 1.45, flex: 1 }}>{p.blurb}</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 2 }}>
          <Badge tone="accent">{p.grades}</Badge>
          {p.subjects.map((s) => <Badge key={s}>{s}</Badge>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6,
          paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
          <span style={{ fontSize: 12.5, color: t.good, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Icon name="ticket" size={14} stroke={t.good} /> {p.deals.length} deals nearby</span>
          <span style={{ color: t.accent, fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            Explore <Icon name="chevR" size={15} /></span>
        </div>
      </div>
    </Card>
  );
}

/* ---- Place detail ---- */
function PlaceDetail({ place: p, t, onBack, onGenerate, onToast }) {
  const [tab, setTab] = useState('unit'); // unit | info | deals
  const u = p.unit;
  return (
    <div style={{ animation: 'hk-fade .25s ease' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none',
        background: 'transparent', color: t.textMuted, cursor: 'pointer', fontSize: 13.5, fontWeight: 600,
        fontFamily: t.fontBody, marginBottom: 14, padding: 0 }}><Icon name="chevL" size={17} /> All places</button>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`, borderRadius: t.radiusLg,
        padding: '26px 30px', color: '#fff', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, bottom: -40, opacity: 0.12 }}><Icon name={placeIcon(p.type)} size={190} stroke="#fff" sw={1} /></div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Badge style={{ background: 'rgba(255,255,255,0.22)', color: '#fff' }}>{p.typeLabel}</Badge>
              <span style={{ fontSize: 13, opacity: 0.9, display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="pin2" size={14} stroke="#fff" /> {p.city} · {p.dist} mi away</span>
            </div>
            <h1 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 30, letterSpacing: '-0.02em' }}>{p.name}</h1>
            <p style={{ margin: '10px 0 0', fontSize: 15, opacity: 0.93, lineHeight: 1.5 }}>{p.blurb}</p>
            <div style={{ display: 'flex', gap: 18, marginTop: 16, flexWrap: 'wrap' }}>
              <HeaderStat icon="star" label={`${p.rating} (${(p.reviews/1000).toFixed(1)}k reviews)`} />
              <HeaderStat icon="clock" label={p.hours} />
              <HeaderStat icon="ticket" label={p.priceNote} />
              <HeaderStat icon="grade" label={`Grades ${p.grades}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${t.border}`, marginBottom: 22 }}>
        {[['unit', 'Unit study', 'book'], ['info', 'Plan your visit', 'pin2'], ['deals', `Deals & resources (${p.deals.length})`, 'ticket']].map(([id, lb, ic]) => (
          <button key={id} onClick={() => setTab(id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7,
            border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: t.fontBody, fontWeight: 600,
            fontSize: 14, padding: '11px 14px', color: tab === id ? t.accent : t.textMuted,
            borderBottom: `2px solid ${tab === id ? t.accent : 'transparent'}`, marginBottom: -1 }}>
            <Icon name={ic} size={16} stroke={tab === id ? t.accent : t.textMuted} /> {lb}
          </button>
        ))}
      </div>

      {tab === 'unit' && <UnitStudy p={p} u={u} t={t} onGenerate={onGenerate} />}
      {tab === 'info' && <PlanVisit p={p} t={t} />}
      {tab === 'deals' && <DealsTab p={p} t={t} onToast={onToast} />}
    </div>
  );
}

function HeaderStat({ icon, label }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, opacity: 0.95 }}>
    <Icon name={icon} size={16} stroke="#fff" /> {label}</span>;
}

function UnitStudy({ p, u, t, onGenerate }) {
  const { mid } = useViewport();
  const genSuggest = [
    { type: 'reading', label: 'Reading passage' },
    { type: 'vocab', label: 'Vocabulary set' },
    { type: 'worksheet', label: 'Worksheet' },
    { type: 'wordsearch', label: 'Word search' },
    { type: 'quiz', label: 'Quiz' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mid ? '1fr' : '1fr 300px', gap: 24, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Badge tone="accent"><Icon name="spark" size={13} stroke={t.accent} /> AI unit study</Badge>
          <span style={{ fontSize: 12.5, color: t.textFaint }}>Generated for this place · edit anything before you use it</span>
        </div>
        <Card>
          <h2 style={{ margin: '0 0 8px', fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 23, letterSpacing: '-0.02em' }}>{u.title}</h2>
          <p style={{ margin: 0, fontSize: 14.5, color: t.text, lineHeight: 1.6 }}>{u.overview}</p>
        </Card>

        <UnitBlock icon="flag" title="Learning objectives" t={t}>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {u.objectives.map((o, i) => <li key={i} style={{ fontSize: 14.5, lineHeight: 1.5 }}>{o}</li>)}
          </ul>
        </UnitBlock>

        <UnitBlock icon="vocab" title="Key vocabulary" t={t}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {u.vocab.map(([w, d], i) => (
              <div key={i} style={{ background: t.surfaceInset, borderRadius: 10, padding: '11px 13px' }}>
                <div style={{ fontWeight: 700, fontSize: 14, textTransform: 'capitalize' }}>{w}</div>
                <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 3, lineHeight: 1.45 }}>{d}</div>
              </div>
            ))}
          </div>
        </UnitBlock>

        <UnitBlock icon="compass" title="Activities" t={t}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {u.activities.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Badge tone={a.when === 'Before' ? 'neutral' : a.when === 'During' ? 'accent' : 'warm'}
                  style={{ minWidth: 58, justifyContent: 'center', flexShrink: 0 }}>{a.when}</Badge>
                <div style={{ fontSize: 14, lineHeight: 1.5, paddingTop: 2 }}>{a.text}</div>
              </div>
            ))}
          </div>
        </UnitBlock>

        <UnitBlock icon="quiz" title="Discussion questions" t={t}>
          <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {u.discussion.map((q, i) => <li key={i} style={{ fontSize: 14.5, lineHeight: 1.5 }}>{q}</li>)}
          </ol>
        </UnitBlock>

        <UnitBlock icon="worksheet" title="What to bring" t={t}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {u.materials.map((m, i) => <Badge key={i} tone="neutral" style={{ fontSize: 12.5, padding: '6px 12px' }}><Icon name="check" size={12} stroke={t.textMuted} /> {m}</Badge>)}
          </div>
        </UnitBlock>
      </div>

      {/* Generate sidebar */}
      <div style={{ position: mid ? 'static' : 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Card style={{ background: t.accentSoft, borderColor: t.accentLine }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6 }}>
            <Icon name="spark" size={18} stroke={t.accent} />
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em', color: t.accent }}>Make materials for this trip</div>
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 13, color: t.text, lineHeight: 1.5 }}>
            Generate printables pre-filled with <strong>{u.title}</strong> — ready to edit and bring along.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {genSuggest.map((g) => (
              <button key={g.type} onClick={() => onGenerate(g.type, u.title)}
                style={{ display: 'flex', alignItems: 'center', gap: 11, background: t.surface, border: `1px solid ${t.accentLine}`,
                  borderRadius: t.radiusSm, padding: '11px 13px', cursor: 'pointer', fontFamily: t.fontBody, textAlign: 'left', width: '100%' }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: t.accentSoft, color: t.accent, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={GEN_BY_ID[g.type].icon} size={17} stroke={t.accent} /></span>
                <span style={{ flex: 1, fontWeight: 600, fontSize: 13.5, color: t.text }}>{g.label}</span>
                <Icon name="arrowR" size={16} stroke={t.accent} />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function UnitBlock({ icon, title, t, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: t.surfaceAlt, color: t.accent, display: 'grid', placeItems: 'center' }}><Icon name={icon} size={17} stroke={t.accent} /></span>
        <h3 style={{ margin: 0, fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16.5, letterSpacing: '-0.01em' }}>{title}</h3>
      </div>
      <div style={{ paddingLeft: 39 }}>{children}</div>
    </div>
  );
}

function PlanVisit({ p, t }) {
  const { mid } = useViewport();
  const rows = [
    ['clock', 'Hours', p.hours], ['ticket', 'Admission', p.priceNote], ['pin2', 'Location', `${p.city} · ${p.dist} miles away`],
    ['grade', 'Best for', `Grades ${p.grades}`], ['clock', 'Typical visit', p.duration], ['star', 'Rating', `${p.rating} from ${p.reviews.toLocaleString()} reviews`],
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mid ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'start' }}>
      <Card>
        <h3 style={{ margin: '0 0 16px', fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 17, letterSpacing: '-0.01em' }}>Visitor info</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {rows.map(([ic, k, v], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 0',
              borderBottom: i < rows.length - 1 ? `1px solid ${t.border}` : 'none' }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: t.surfaceAlt, color: t.accent, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={ic} size={17} stroke={t.accent} /></span>
              <div><div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: 14.5, fontWeight: 600, marginTop: 1 }}>{v}</div></div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card pad={0} style={{ overflow: 'hidden' }}>
          <div style={{ height: 150, background: `linear-gradient(135deg, ${t.accentSoft}, ${t.warmSoft})`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(0deg, ${t.border} 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, ${t.border} 0 1px, transparent 1px 28px)`, opacity: 0.5 }} />
            <div style={{ position: 'absolute', left: '50%', top: '54%', transform: 'translate(-50%,-50%)', color: t.accent }}><Icon name="place" size={42} stroke={t.accent} /></div>
            <Badge tone="warm" style={{ position: 'absolute', top: 12, left: 12, background: '#fff' }}>{p.dist} mi from you</Badge>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 14.5 }}>{p.name}</div>
            <div style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>{p.city}</div>
          </div>
        </Card>
        <Card>
          <h3 style={{ margin: '0 0 12px', fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>Don't miss</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {p.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: t.accentSoft, color: t.accent, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name="check" size={13} stroke={t.accent} /></span>{h}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DealsTab({ p, t, onToast }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Badge tone="good"><Icon name="ticket" size={13} stroke={t.good} /> {p.deals.length} homeschool deals near {p.name}</Badge>
        <span style={{ fontSize: 12.5, color: t.textFaint }}>Discounts & programs for homeschool families</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {p.deals.map((d, i) => (
          <Card key={i} hover>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: t.warmSoft, color: t.warm, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={d.icon} size={22} stroke={t.warm} /></div>
              <Badge tone="warm">{d.tag}</Badge>
            </div>
            <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 16.5, letterSpacing: '-0.01em' }}>{d.name}</div>
            <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 2 }}>{d.org}</div>
            <div style={{ fontSize: 13.5, color: t.text, lineHeight: 1.5, marginTop: 10 }}>{d.detail}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14,
              paddingTop: 14, borderTop: `1px solid ${t.border}` }}>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 17, color: t.good }}>{d.save}</span>
              <Btn kind="outline" size="sm" icon="tag" onClick={() => onToast('Deal saved to your library')}>Save deal</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PlaceExplorer });
