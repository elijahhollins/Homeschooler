/* ============================================================ *
 *  HomeschoolKit · generator screen
 *  Config form  →  simulated generation  →  result + toolbar.
 * ============================================================ */

const GEN_STATUS = {
  worksheet: ['Reading the topic…', 'Choosing grade-appropriate problems…', 'Writing the answer key…', 'Laying out the page…'],
  quiz: ['Reading the topic…', 'Writing multiple-choice questions…', 'Adding short-answer prompts…', 'Marking the answer key…'],
  wordsearch: ['Collecting your word list…', 'Hiding words in the grid…', 'Filling in letters…', 'Finishing the puzzle…'],
  vocab: ['Reading the topic…', 'Selecting key terms…', 'Writing kid-friendly definitions…', 'Adding example sentences…'],
  reading: ['Reading the topic…', 'Writing a leveled passage…', 'Checking the reading level…', 'Adding comprehension questions…'],
};

function GeneratingOverlay({ type, t }) {
  const steps = GEN_STATUS[type] || GEN_STATUS.worksheet;
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => Math.min(x + 1, steps.length - 1)), 360);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '80px 20px', textAlign: 'center', gap: 22 }}>
      <div style={{ position: 'relative', width: 58, height: 58 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${t.accentSoft}` }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid transparent`,
          borderTopColor: t.accent, animation: 'hk-spin .8s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: t.accent }}>
          <Icon name="spark" size={24} />
        </div>
      </div>
      <div>
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em' }}>Generating your {GEN_BY_ID[type].title.toLowerCase()}…</div>
        <div style={{ color: t.textMuted, fontSize: 14, marginTop: 6, minHeight: 20, transition: 'opacity .2s' }}>{steps[i]}</div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {steps.map((_, k) => (
          <div key={k} style={{ width: 7, height: 7, borderRadius: '50%',
            background: k <= i ? t.accent : t.accentLine, transition: 'background .3s' }} />
        ))}
      </div>
    </div>
  );
}

/* Type-specific config fields */
function GenConfigFields({ type, cfg, set, t }) {
  if (type === 'worksheet') return (
    <>
      <Field label="Number of problems"><Stepper value={cfg.count} onChange={(v) => set('count', v)} min={4} max={20} /></Field>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13.5, fontWeight: 600 }}>
        <Toggle on={cfg.includeWordBank} onClick={() => set('includeWordBank', !cfg.includeWordBank)} t={t} />
        Include a word bank
      </label>
    </>
  );
  if (type === 'quiz') return (
    <>
      <Field label="Multiple-choice questions"><Stepper value={cfg.mcCount} onChange={(v) => set('mcCount', v)} min={2} max={12} /></Field>
      <Field label="Short-answer questions"><Stepper value={cfg.saCount} onChange={(v) => set('saCount', v)} min={0} max={6} /></Field>
    </>
  );
  if (type === 'wordsearch') return (
    <>
      <Field label="Grid size" hint="Larger grids are harder.">
        <Segmented value={cfg.size} onChange={(v) => set('size', v)}
          options={[{ value: 11, label: 'Small' }, { value: 13, label: 'Medium' }, { value: 16, label: 'Large' }]} />
      </Field>
      <Field label="Your words" hint="Comma-separated. Leave blank to use words from the topic.">
        <TextInput value={cfg.wordsRaw} onChange={(v) => set('wordsRaw', v)} placeholder="otter, kelp, tide, gills…" />
      </Field>
    </>
  );
  if (type === 'reading') return (
    <Field label="Passage length">
      <Segmented value={cfg.length} onChange={(v) => set('length', v)}
        options={[{ value: 'short', label: 'Short' }, { value: 'medium', label: 'Medium' }, { value: 'long', label: 'Long' }]} />
    </Field>
  );
  return null;
}

function Toggle({ on, onClick, t }) {
  return (
    <button onClick={onClick} style={{ width: 38, height: 22, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: on ? t.accent : t.borderStrong, position: 'relative', transition: 'background .15s', flexShrink: 0 }}>
      <span style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 18, height: 18, borderRadius: '50%',
        background: '#fff', transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

function GeneratorScreen({ type, presetTopic, onSave, onShare, onToast, onPrint }) {
  const t = useT();
  const { mid } = useViewport();
  const g = GEN_BY_ID[type];
  const [cfg, setCfg] = useState({
    topic: presetTopic || '', subject: g.id === 'worksheet' ? 'Math' : 'Science', grade: 'Grade 3',
    count: 8, mcCount: 4, saCount: 2, size: 13, wordsRaw: '', length: 'medium', includeWordBank: true,
  });
  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }));
  const [phase, setPhase] = useState('config'); // config | generating | result
  const [material, setMaterial] = useState(null);
  const [editable, setEditable] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => { setPhase('config'); setMaterial(null); setEditable(false); setShowAnswers(false);
    setCfg((c) => ({ ...c, topic: presetTopic || c.topic })); }, [type]);

  const run = async () => {
    setPhase('generating');
    const built = { ...cfg, words: cfg.wordsRaw ? cfg.wordsRaw.split(',').map((s) => s.trim()).filter(Boolean) : null };
    const [mat] = await Promise.all([
      generateMaterialAsync(type, built),
      new Promise((r) => setTimeout(r, 1400)),
    ]);
    setMaterial(mat);
    setPhase('result');
  };
  const editMat = (k, v) => setMaterial((m) => ({ ...m, [k]: v }));
  const hasAnswerKey = ['worksheet', 'quiz', 'reading', 'wordsearch'].includes(type);

  const topicChips = {
    worksheet: ['Fractions', 'The Water Cycle', 'Solar System'],
    quiz: ['The Water Cycle', 'American Revolution', 'Photosynthesis'],
    wordsearch: ['Ocean Animals', 'Solar System', 'The Water Cycle'],
    vocab: ['Solar System', 'Photosynthesis', 'Ocean Animals'],
    reading: ['The Water Cycle', 'Ocean Animals', 'American Revolution'],
  }[type];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: mid ? '1fr' : '340px 1fr', gap: 26, alignItems: 'start' }}>
      {/* Config panel */}
      <div style={{ position: mid ? 'static' : 'sticky', top: 0 }}>
        <Card pad={20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ width: 42, height: 42, borderRadius: t.radiusSm, background: t.accentSoft, color: t.accent,
              display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={g.icon} size={22} stroke={t.accent} /></div>
            <div>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em' }}>{g.title}</div>
              <div style={{ fontSize: 12.5, color: t.textMuted }}>{g.desc}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label={type === 'wordsearch' ? 'Theme / topic' : 'Topic'} hint={cfg.topic ? null : 'Try a topic below, or type your own.'}>
              <TextInput value={cfg.topic} onChange={(v) => set('topic', v)} placeholder="e.g. The Water Cycle" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
                {topicChips.map((c) => (
                  <button key={c} onClick={() => set('topic', c)} style={{ border: `1px solid ${t.border}`,
                    background: cfg.topic === c ? t.accentSoft : t.surface, color: cfg.topic === c ? t.accent : t.textMuted,
                    borderRadius: 999, padding: '4px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    fontFamily: t.fontBody, whiteSpace: 'nowrap' }}>{c}</button>
                ))}
              </div>
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Subject"><Select value={cfg.subject} onChange={(v) => set('subject', v)} options={SUBJECTS} /></Field>
              <Field label="Grade"><Select value={cfg.grade} onChange={(v) => set('grade', v)} options={GRADES} /></Field>
            </div>
            <GenConfigFields type={type} cfg={cfg} set={set} t={t} />
            <Btn kind="primary" icon="spark" full size="lg" onClick={run} style={{ marginTop: 4 }}
              disabled={phase === 'generating'}>
              {phase === 'result' ? 'Regenerate' : `Generate ${g.title.toLowerCase()}`}
            </Btn>
            <div style={{ fontSize: 11.5, color: t.textFaint, textAlign: 'center', marginTop: -4 }}>
              AI draft · always review before sharing with learners
            </div>
          </div>
        </Card>
      </div>

      {/* Preview / result */}
      <div>
        {phase === 'result' && material && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <Btn kind={editable ? 'primary' : 'outline'} size="sm" icon="edit" onClick={() => setEditable((e) => !e)}>{editable ? 'Done editing' : 'Edit'}</Btn>
            {hasAnswerKey && <Btn kind={showAnswers ? 'soft' : 'outline'} size="sm" icon={showAnswers ? 'check' : 'check'} onClick={() => setShowAnswers((s) => !s)}>{showAnswers ? 'Hide answer key' : 'Answer key'}</Btn>}
            <Btn kind="outline" size="sm" icon="refresh" onClick={run}>Regenerate</Btn>
            <div style={{ flex: 1 }} />
            <Btn kind="outline" size="sm" icon="print" onClick={() => onPrint(material)}>Print / PDF</Btn>
            <Btn kind="outline" size="sm" icon="share" onClick={() => onShare(material)}>Share</Btn>
            <Btn kind="primary" size="sm" icon="save" onClick={() => onSave(material)}>Save to library</Btn>
          </div>
        )}

        <div style={{ minHeight: 480 }}>
          {phase === 'config' && <GenEmptyState type={type} t={t} />}
          {phase === 'generating' && <Card pad={0}><GeneratingOverlay type={type} t={t} /></Card>}
          {phase === 'result' && material && (
            <div style={{ animation: 'hk-fade .3s ease' }}>
              {editable && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 12.5,
                  color: t.accent, fontWeight: 600 }}>
                  <Icon name="edit" size={14} /> Click the title, instructions, or passage to edit directly.
                </div>
              )}
              <MaterialDoc m={material} t={t} editable={editable} onEdit={editMat} showAnswers={showAnswers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenEmptyState({ type, t }) {
  const g = GEN_BY_ID[type];
  return (
    <Card pad={0} style={{ overflow: 'hidden' }}>
      <div style={{ padding: '64px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 18 }}>
        <div style={{ width: 76, height: 76, borderRadius: 20, background: t.accentSoft, color: t.accent,
          display: 'grid', placeItems: 'center' }}><Icon name={g.icon} size={38} stroke={t.accent} /></div>
        <div>
          <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 21, letterSpacing: '-0.02em' }}>Your {g.title.toLowerCase()} will appear here</div>
          <div style={{ color: t.textMuted, fontSize: 14.5, marginTop: 7, maxWidth: 380, lineHeight: 1.5 }}>
            Pick a topic and settings on the left, then hit <strong style={{ color: t.text }}>Generate</strong>. You can edit every word, reveal the answer key, and print or save it.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 6 }}>
          {[['spark', 'AI drafts it'], ['edit', 'You refine it'], ['print', 'Print or save']].map(([ic, lb], i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, width: 84 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: t.surfaceAlt, color: t.textMuted, display: 'grid', placeItems: 'center' }}><Icon name={ic} size={18} /></div>
              <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>{lb}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

Object.assign(window, { GeneratorScreen });
