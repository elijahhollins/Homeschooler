/* ============================================================ *
 *  HomeschoolKit · document renderers
 *  "Paper" views of generated materials — clean printable docs.
 *  Used in the result view, library preview, and print mode.
 * ============================================================ */

/* Shared paper sheet wrapper */
function Sheet({ children, t, editable, onTitle, m }) {
  return (
    <div className="hk-sheet" style={{ background: '#fff', color: '#1b2430',
      borderRadius: t.radius, border: `1px solid ${t.border}`, boxShadow: t.shadow,
      padding: '46px 52px', maxWidth: 720, margin: '0 auto', fontFamily: t.fontBody }}>
      {children}
    </div>
  );
}

function DocHeader({ m, t, editable, onEdit }) {
  return (
    <div style={{ borderBottom: `2px solid ${t.text}`, paddingBottom: 14, marginBottom: 22,
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: t.fontMono, fontSize: 11, letterSpacing: '0.08em', color: t.textMuted,
          textTransform: 'uppercase', marginBottom: 6 }}>{GEN_BY_ID[m.type].title} · {m.subject}</div>
        <EditableText editable={editable} value={m.title} onChange={(v) => onEdit && onEdit('title', v)}
          style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.12 }} />
      </div>
      <div style={{ textAlign: 'right', fontSize: 12.5, color: t.textMuted, lineHeight: 1.7, flexShrink: 0 }}>
        <div>Name: ______________</div>
        <div>{m.grade} · Date: ______</div>
      </div>
    </div>
  );
}

function Instructions({ text, t, editable, onEdit }) {
  return (
    <div style={{ background: t.accentSoft, borderLeft: `3px solid ${t.accent}`, borderRadius: 6,
      padding: '11px 15px', marginBottom: 24, fontSize: 13.5, color: t.text, lineHeight: 1.5 }}>
      <EditableText editable={editable} value={text} onChange={(v) => onEdit && onEdit('instructions', v)} multiline />
    </div>
  );
}

/* Inline editable text */
function EditableText({ value, onChange, editable, style, multiline }) {
  const ref = useRef(null);
  if (!editable) return <div style={{ ...style, whiteSpace: multiline ? 'pre-wrap' : 'normal' }}>{value}</div>;
  return (
    <div ref={ref} contentEditable suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent)}
      style={{ ...style, outline: 'none', borderRadius: 4, padding: '1px 3px', margin: '-1px -3px',
        background: 'rgba(56,99,168,0.06)', boxShadow: 'inset 0 0 0 1px rgba(56,99,168,0.18)',
        whiteSpace: multiline ? 'pre-wrap' : 'normal', cursor: 'text' }}>{value}</div>
  );
}

function AnswerLines({ n = 1, t }) {
  return (<div style={{ marginTop: 8 }}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{ borderBottom: `1px solid ${t.borderStrong}`, height: 26 }} />
    ))}
  </div>);
}

/* ---- Worksheet ---- */
function WorksheetDoc({ m, t, editable, onEdit, showAnswers }) {
  return (
    <Sheet t={t}>
      <DocHeader m={m} t={t} editable={editable} onEdit={onEdit} />
      <Instructions text={m.instructions} t={t} editable={editable} onEdit={onEdit} />
      {m.sections && m.sections.map((s, i) => s.kind === 'wordbank' && (
        <div key={i} style={{ border: `1px dashed ${t.borderStrong}`, borderRadius: 8, padding: '12px 16px',
          marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: '8px 22px', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 12.5, fontFamily: t.fontMono, textTransform: 'uppercase', color: t.textMuted }}>Word Bank</span>
          {s.words.map((w) => <span key={w} style={{ fontSize: 14, fontWeight: 500 }}>{w}</span>)}
        </div>
      ))}
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', counterReset: 'q' }}>
        {m.items.map((it) => (
          <li key={it.n} style={{ display: 'flex', gap: 13, marginBottom: 20, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, fontSize: 15, color: t.accent,
              minWidth: 22, flexShrink: 0 }}>{it.n}.</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, lineHeight: 1.5 }}>{it.q}</div>
              {it.kind === 'solve'
                ? <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, color: t.textMuted }}>Answer:</span>
                    <span style={{ display: 'inline-block', minWidth: 120, borderBottom: `1px solid ${t.borderStrong}`, height: 22 }} />
                    {showAnswers && <span style={{ color: t.good, fontWeight: 700, fontSize: 14 }}>{it.a}</span>}
                  </div>
                : <>{showAnswers && <div style={{ color: t.good, fontWeight: 700, fontSize: 14, marginTop: 6 }}>{it.a}</div>}
                   {!showAnswers && <AnswerLines n={1} t={t} />}</>}
            </div>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}

/* ---- Quiz ---- */
function QuizDoc({ m, t, editable, onEdit, showAnswers }) {
  return (
    <Sheet t={t}>
      <DocHeader m={m} t={t} editable={editable} onEdit={onEdit} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <Instructions text={m.instructions} t={t} editable={editable} onEdit={onEdit} />
      </div>
      <div style={{ marginBottom: 8, fontFamily: t.fontMono, fontSize: 11, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: t.textMuted }}>Part A · Multiple Choice</div>
      <ol style={{ margin: '0 0 26px', padding: 0, listStyle: 'none' }}>
        {m.mc.map((q) => (
          <li key={q.n} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 11 }}>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, color: t.accent, minWidth: 22 }}>{q.n}.</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, lineHeight: 1.45, marginBottom: 9 }}>{q.q}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 18px' }}>
                  {q.opts.map((o, i) => {
                    const correct = showAnswers && i === q.correct;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14,
                        color: correct ? t.good : t.text, fontWeight: correct ? 700 : 400 }}>
                        <span style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                          border: `1.5px solid ${correct ? t.good : t.borderStrong}`, display: 'grid', placeItems: 'center',
                          background: correct ? t.good : 'transparent' }}>
                          {correct ? <Icon name="check" size={11} stroke="#fff" sw={2.4} />
                            : <span style={{ fontSize: 10, color: t.textMuted, fontWeight: 700 }}>{'ABCD'[i]}</span>}
                        </span>
                        {o}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div style={{ marginBottom: 10, fontFamily: t.fontMono, fontSize: 11, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: t.textMuted }}>Part B · Short Answer</div>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {m.sa.map((q) => (
          <li key={q.n} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', gap: 11 }}>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, color: t.accent, minWidth: 22 }}>{m.mc.length + q.n}.</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, lineHeight: 1.45 }}>{q.q}</div>
                <AnswerLines n={2} t={t} />
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div style={{ marginTop: 22, textAlign: 'right', fontSize: 13, color: t.textMuted, fontFamily: t.fontMono }}>
        Total: ____ / {m.points} pts
      </div>
    </Sheet>
  );
}

/* ---- Word Search ---- */
function WordSearchDoc({ m, t, editable, onEdit, showAnswers }) {
  const cell = 30;
  const inWord = (r, c) => showAnswers && m.placed.some((p) =>
    Array.from({ length: p.word.length }).some((_, i) => p.r + p.dr*i === r && p.c + p.dc*i === c));
  return (
    <Sheet t={t}>
      <DocHeader m={m} t={t} editable={editable} onEdit={onEdit} />
      <Instructions text={m.instructions} t={t} editable={editable} onEdit={onEdit} />
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ border: `1.5px solid ${t.text}`, borderRadius: 8, padding: 12, background: '#fff' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${m.size}, ${cell}px)` }}>
            {m.grid.map((row, r) => row.map((ch, c) => (
              <div key={`${r}-${c}`} style={{ width: cell, height: cell, display: 'grid', placeItems: 'center',
                fontFamily: t.fontMono, fontSize: 15, fontWeight: 700, color: inWord(r, c) ? t.accent : t.text,
                background: inWord(r, c) ? t.accentSoft : 'transparent', borderRadius: 5 }}>{ch}</div>
            )))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <div style={{ fontFamily: t.fontMono, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: t.textMuted, marginBottom: 10 }}>Find these words</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 14px' }}>
            {m.words.map((w) => (
              <div key={w} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600 }}>
                <span style={{ width: 14, height: 14, border: `1.5px solid ${t.borderStrong}`, borderRadius: 3, flexShrink: 0 }} />
                {w}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sheet>
  );
}

/* ---- Vocabulary ---- */
function VocabDoc({ m, t, editable, onEdit }) {
  return (
    <Sheet t={t}>
      <DocHeader m={m} t={t} editable={editable} onEdit={onEdit} />
      <Instructions text={m.instructions} t={t} editable={editable} onEdit={onEdit} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {m.words.map((w, i) => (
          <div key={i} style={{ border: `1px solid ${t.border}`, borderRadius: 10, padding: '14px 18px',
            display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: t.accentSoft, color: t.accent,
              display: 'grid', placeItems: 'center', fontFamily: t.fontDisplay, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: 18, letterSpacing: '-0.01em', textTransform: 'capitalize' }}>{w.word}</div>
              <div style={{ fontSize: 14, color: t.text, marginTop: 4, lineHeight: 1.5 }}>{w.def}</div>
              <div style={{ fontSize: 13.5, color: t.textMuted, marginTop: 7, fontStyle: 'italic', lineHeight: 1.5 }}>
                <span style={{ fontStyle: 'normal', fontWeight: 700, fontFamily: t.fontMono, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Use it · </span>
                {w.sentence}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

/* ---- Reading Passage ---- */
function ReadingDoc({ m, t, editable, onEdit, showAnswers }) {
  return (
    <Sheet t={t}>
      <DocHeader m={m} t={t} editable={editable} onEdit={onEdit} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <Badge tone="accent">Lexile {m.lexile}</Badge>
        <Badge>{m.grade}</Badge>
      </div>
      <div style={{ fontSize: 15.5, lineHeight: 1.72, color: t.text, whiteSpace: 'pre-wrap',
        marginBottom: 26, columnGap: 0 }}>
        <EditableText editable={editable} value={m.passage} onChange={(v) => onEdit && onEdit('passage', v)} multiline
          style={{ fontSize: 15.5, lineHeight: 1.72 }} />
      </div>
      <div style={{ borderTop: `2px solid ${t.text}`, paddingTop: 18 }}>
        <div style={{ fontFamily: t.fontMono, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: t.textMuted, marginBottom: 14 }}>Comprehension Questions</div>
        <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {m.questions.map((q) => (
            <li key={q.n} style={{ marginBottom: 16, display: 'flex', gap: 11 }}>
              <span style={{ fontFamily: t.fontDisplay, fontWeight: 700, color: t.accent, minWidth: 22 }}>{q.n}.</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, lineHeight: 1.45 }}>{q.q}</div>
                {q.kind === 'mc'
                  ? <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 18px', marginTop: 8 }}>
                      {q.opts.map((o, i) => {
                        const correct = showAnswers && i === q.correct;
                        return (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14,
                          color: correct ? t.good : t.text, fontWeight: correct ? 700 : 400 }}>
                          <span style={{ width: 17, height: 17, borderRadius: '50%', border: `1.5px solid ${correct ? t.good : t.borderStrong}`,
                            display: 'grid', placeItems: 'center', flexShrink: 0, background: correct ? t.good : 'transparent' }}>
                            {correct ? <Icon name="check" size={10} stroke="#fff" sw={2.5} /> : <span style={{ fontSize: 9.5, color: t.textMuted, fontWeight: 700 }}>{'ABCD'[i]}</span>}
                          </span>{o}</div>);
                      })}
                    </div>
                  : <AnswerLines n={2} t={t} />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Sheet>
  );
}

function MaterialDoc({ m, ...rest }) {
  if (!m) return null;
  const map = { worksheet: WorksheetDoc, quiz: QuizDoc, wordsearch: WordSearchDoc, vocab: VocabDoc, reading: ReadingDoc };
  const C = map[m.type] || WorksheetDoc;
  return <C m={m} {...rest} />;
}

Object.assign(window, { Sheet, MaterialDoc, WorksheetDoc, QuizDoc, WordSearchDoc, VocabDoc, ReadingDoc, EditableText });
