/* global React */
// Content views — index card, finder, dossier, about, learning graph, gallery

const DATA = () => window.PORTFOLIO;

// ==================== Icons ====================
const Icon = {
  folder: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M1 4a1 1 0 0 1 1-1h4l1.5 1.5H14a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4z"/></svg>),
  file: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2h5l3 3v9H4z"/></svg>),
  hash: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 2v12M11 2v12M2 6h12M2 11h12"/></svg>),
  tag: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2h5l7 7-5 5-7-7V2z"/><circle cx="5" cy="5" r="1" fill="currentColor"/></svg>),
  photo: () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="3" width="12" height="10" rx="1"/><circle cx="6" cy="7" r="1.2"/><path d="M3 11l3-3 2 2 2-3 3 4"/></svg>),
  terminal: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>),
  mail: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>),
  github: () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2C5.7 21.5 5 19.3 5 19.3c-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>),
};

// ==================== HERO: Index Card ====================
function IndexCardHero({ onOpen }) {
  const o = DATA().owner;
  return (
    <div className="index-card">
      <div className="left">
        <div className="photo-frame">
          <img src="images/headshot.png" alt="Sanjana Kanchibotla" />
          <div className="caption">PLATE I · TORONTO · 2026</div>
        </div>
        <div className="meta">
          <div><span className="k">Vol.</span> V · Ed. i</div>
          <div><span className="k">Subject</span> Portfolio, 2023 – 26</div>
          <div><span className="k">Archivist</span> self</div>
          <div><span className="k">Location</span> {o.location}</div>
        </div>
      </div>

      <div className="right">
        <div className="stamp">Draft · for review</div>
        <div className="kicker">Index Card · 001</div>
        <h1 className="name">Sanjana <em>Kanchibotla</em></h1>
        <svg className="flourish" viewBox="0 0 220 14" preserveAspectRatio="none">
          <path d="M0,7 C 40,0 80,14 110,7 C 140,0 180,14 220,7" />
        </svg>
        <div className="role">data scientist, trained as a designer,<br/>shaped by engineering</div>
        <div className="sentence">
          I find the problems worth solving, then use <em>whatever it takes</em> to solve them.
        </div>

        <div className="links">
          <div className="link-row" onClick={() => onOpen('finder', 'projects')}>
            <span className="k">Projects</span>
            <span className="v">the files, in order</span>
            <span className="arrow">→</span>
          </div>
          <div className="link-row" onClick={() => onOpen('finder', 'about')}>
            <span className="k">About</span>
            <span className="v">a quieter page</span>
            <span className="arrow">→</span>
          </div>
          <div className="link-row" onClick={() => onOpen('terminal')}>
            <span className="k">Terminal</span>
            <span className="v">ask something direct</span>
            <span className="arrow">→</span>
          </div>
          <div className="link-row" onClick={() => window.open('mailto:' + o.email)}>
            <span className="k">Write</span>
            <span className="v">{o.email}</span>
            <span className="arrow">↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== FINDER ====================
function FinderSidebar({ activeFolder, onOpenFolder, activeTag, onOpenTag }) {
  const allTags = (() => {
    const s = new Set();
    const d = DATA();
    ['work', 'projects', 'competitions'].forEach((k) => {
      (d[k] || []).forEach((p) => (p.tags || []).forEach((t) => s.add(t)));
    });
    return [...s].sort();
  })();

  return (
    <div className="finder-sidebar">
      <div className="group">
        <div className="group-title">Library</div>
        {DATA().folders.map((f) => (
          <div key={f.id}
               className={`item ${activeFolder === f.id && !activeTag ? 'active' : ''}`}
               onClick={() => { onOpenFolder(f.id); onOpenTag(null); }}>
            <span className="ico"><Icon.folder /></span>
            <span>{f.name}</span>
          </div>
        ))}
        <div className={`item ${activeFolder === 'gallery' && !activeTag ? 'active' : ''}`}
             onClick={() => { onOpenFolder('gallery'); onOpenTag(null); }}>
          <span className="ico"><Icon.photo /></span>
          <span>Gallery</span>
        </div>
      </div>

      <div className="group">
        <div className="group-title">Tags</div>
        {allTags.slice(0, 14).map((t) => (
          <div key={t}
               className={`item ${activeTag === t ? 'active' : ''}`}
               onClick={() => { onOpenTag(t); }}>
            <span className="ico"><Icon.tag /></span>
            <span style={{ fontSize: 12, letterSpacing: '0.01em' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinderContent({ folder, tag, activeFileId, onOpenFile }) {
  const d = DATA();

  // Gallery view
  if (folder === 'gallery' && !tag) {
    return (
      <div className="finder-content">
        <div className="finder-toolbar">
          <span>Gallery · everyday frames</span>
          <span>{1} item</span>
        </div>
        <div className="gallery">
          <img src="images/gallery/01.jpeg" alt="" />
        </div>
      </div>
    );
  }

  // About view — single file shortcut
  if (folder === 'about' && !tag) {
    const files = [
      { id: 'about', name: 'about_me', ext: 'md', type: 'DOC', date: '2026', kicker: 'the quieter page' },
      { id: 'resume', name: 'resume', ext: 'pdf', type: 'PDF', date: '2026', kicker: 'one-pager' },
    ];
    return (
      <div className="finder-content">
        <div className="finder-toolbar">
          <span>About · 2 items</span>
          <span>modified Apr 2026</span>
        </div>
        <div className="file-list">
          {files.map((f) => (
            <div key={f.id}
                 className={`file-row ${activeFileId === f.id ? 'active' : ''}`}
                 onClick={() => onOpenFile({ ...f, _kind: f.id === 'resume' ? 'resume' : 'about' })}>
              <div className="ico">{f.ext === 'pdf' ? '¶' : '§'}</div>
              <div>
                <div className="name">{f.name}<span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', fontSize: 11, marginLeft: 4 }}>.{f.ext}</span></div>
                <div className="sub">{f.kicker}</div>
              </div>
              <div className="kind">{f.type}</div>
              <div className="date">{f.date}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Tag filter — flatten work + projects + competitions
  let items;
  let title;
  if (tag) {
    const all = [...d.work, ...d.projects, ...d.competitions];
    items = all.filter((x) => (x.tags || []).includes(tag));
    title = `Tag · ${tag}`;
  } else {
    items = d[folder] || [];
    title = d.folders.find((f) => f.id === folder)?.name || folder;
  }

  return (
    <div className="finder-content">
      <div className="finder-toolbar">
        <span>{title} · {items.length} {items.length === 1 ? 'item' : 'items'}</span>
        <span>sorted · chronological</span>
      </div>
      <div className="file-list">
        {items.map((it) => {
          const [base, ext] = splitExt(it.name);
          return (
            <div key={it.id}
                 className={`file-row ${activeFileId === it.id ? 'active' : ''}`}
                 onClick={() => onOpenFile({ ...it, _kind: 'doc' })}>
              <div className="ico">{glyphFor(it.type)}</div>
              <div>
                <div className="name">{base}<span style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', fontSize: 11, marginLeft: 4 }}>{ext}</span></div>
                <div className="sub">{it.kicker}</div>
              </div>
              <div className="kind">{it.type}</div>
              <div className="date">{it.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function splitExt(name) {
  const i = name.lastIndexOf('.');
  if (i < 0) return [name, ''];
  return [name.slice(0, i), name.slice(i)];
}
function glyphFor(t) {
  if (t === 'EXP') return '¶';
  if (t === 'CASE') return '◊';
  if (t === 'ML' || t === 'DL' || t === 'CV' || t === 'DS' || t === 'AI') return '∂';
  return '§';
}

// ==================== DOC (Dossier) ====================
function DocView({ item }) {
  const onTagClick = (t) => {
    window.dispatchEvent(new CustomEvent('open-tag', { detail: t }));
  };
  return (
    <div className="doc">
      {item.kicker && <div className="kicker">{item.kicker}</div>}
      <h1 dangerouslySetInnerHTML={{ __html: item.title }} />
      {item.subtitle && <div className="subtitle">{item.subtitle}</div>}

      {item.metrics && (
        window.MetricStrip
          ? <window.MetricStrip items={item.metrics} />
          : (
            <div className="metrics">
              {item.metrics.map((m, i) => (
                <div className="metric" key={i}>
                  <div className="v">{m.v}</div>
                  <div className="l">{m.l}</div>
                </div>
              ))}
            </div>
          )
      )}

      {window.ProjectDiagram && <window.ProjectDiagram id={item.id} />}

      {(item.body || []).map((b, i) => (
        <React.Fragment key={i}>
          {b.h && <h3>{b.h}</h3>}
          {b.p && <p>{b.p}</p>}
          {b.list && <ul>{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>}
        </React.Fragment>
      ))}

      {item.tags && (
        <>
          <hr/>
          <div className="tag-row">
            {item.tags.map((t) => (
              <span key={t} className="tag" onClick={() => onTagClick(t)}>{t}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ==================== ABOUT ====================
function AboutDoc() {
  const d = DATA();
  const p = d.personality;
  return (
    <div className="about-doc">
      <div className="hero-row">
        <img src="images/headshot.png" alt="" />
        <div>
          <h1>About</h1>
          <div className="role">{d.owner.role}</div>
        </div>
      </div>

      <div className="pull-quote">"{p.quote}"</div>

      {p.paragraphs.map((para, i) => <p key={i}>{para}</p>)}

      <div className="about-section-head">Education</div>
      {d.education.map((e, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 12, marginBottom: 10, fontSize: 13 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.06em' }}>{e.year}</span>
          <span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>{e.school}</div>
            <div style={{ color: 'var(--ink-faint)', fontSize: 12 }}>{e.program}</div>
          </span>
        </div>
      ))}

      <div className="about-section-head">Recognitions</div>
      <ul>
        {d.achievements.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </div>
  );
}

// ==================== NOW (what i'm up to) ====================
function NowView() {
  const d = DATA();
  const n = d.now || {};
  return (
    <div className="now-doc">
      <div className="now-head">
        <div className="kicker">now · what i'm up to</div>
        <h1>currently<em> living in</em></h1>
        <div className="updated">last updated {n.updated || 'this week'}</div>
      </div>

      <div className="now-block">
        <div className="now-label">currently reading</div>
        {(n.reading || []).map((b, i) => (
          <div key={i} className="now-card">
            <div className="now-card-title">{b.title}</div>
            <div className="now-card-by">{b.author}</div>
            {b.note && <div className="now-card-note">{b.note}</div>}
          </div>
        ))}
      </div>

      <div className="now-block">
        <div className="now-label">currently studying</div>
        {(n.studying || []).map((s, i) => (
          <div key={i} className="now-card">
            <div className="now-card-title">{s.title}</div>
            {s.note && <div className="now-card-note">{s.note}</div>}
          </div>
        ))}
      </div>

      {n.listening && (
        <div className="now-block">
          <div className="now-label">on rotation</div>
          <div className="now-row">
            {n.listening.map((l, i) => <span key={i} className="now-chip">{l}</span>)}
          </div>
        </div>
      )}

      {n.thinking && (
        <div className="now-block">
          <div className="now-label">turning over</div>
          <p className="now-prose">{n.thinking}</p>
        </div>
      )}
    </div>
  );
}

// ==================== LEARNING (Timeline) ====================
function LearningArchive() {
  const items = DATA().learning;
  return (
    <div style={{ padding: '32px 40px', maxWidth: 620, margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--oxblood)', marginBottom: 10 }}>
        Commit Log · Learning
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.015em' }}>
        A <em style={{ color: 'var(--oxblood)', fontWeight: 300 }}>working archive</em>
      </h1>
      <p style={{ color: 'var(--ink-faint)', fontSize: 13, lineHeight: 1.6, margin: '0 0 28px' }}>
        Every project, thesis, and recognition that taught me something. Most recent first.
      </p>

      <div style={{ position: 'relative', paddingLeft: 20, borderLeft: '1px solid var(--paper-3)' }}>
        {items.map((it, i) => (
          <div key={it.hash} style={{ position: 'relative', marginBottom: 26 }}>
            <div style={{
              position: 'absolute', left: -25, top: 6,
              width: 9, height: 9, borderRadius: '50%',
              background: it.current ? 'var(--oxblood)' : 'var(--paper-deep)',
              border: it.current ? '2px solid var(--paper)' : 'none',
              boxShadow: it.current ? '0 0 0 3px rgba(110, 31, 46, 0.2)' : 'none',
            }} />
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 4, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ochre)', letterSpacing: '0.05em' }}>{it.hash}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.05em' }}>{it.date}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--sage)', letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid var(--paper-3)', padding: '1px 5px', borderRadius: 2 }}>{it.branch}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 4 }}>{it.msg}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== RESUME (PDF) ====================
function ResumeView() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#2a231e' }}>
      <object data="assets/resume.pdf" type="application/pdf" style={{ width: '100%', height: '100%' }}>
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--paper)' }}>
          <p>Your browser cannot display the PDF inline.</p>
          <a href="assets/resume.pdf" target="_blank" rel="noopener" style={{ color: 'var(--ochre)' }}>Open in a new tab</a>
        </div>
      </object>
    </div>
  );
}

Object.assign(window, {
  Icon, IndexCardHero, FinderSidebar, FinderContent, DocView, AboutDoc, LearningArchive, ResumeView, NowView,
});
