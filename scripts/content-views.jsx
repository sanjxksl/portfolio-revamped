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

// ==================== GALLERY GRID + LIGHTBOX ====================
function GalleryView() {
  const { useState: useS, useEffect: useE, useCallback: useC } = React;
  const captions = DATA().gallery || [];
  const [images, setImages] = useS([]);
  const [lightbox, setLightbox] = useS(null); // index or null

  useE(() => {
    const found = [];
    let i = 1;
    const tryNext = () => {
      if (i > 30) { setImages(found.slice()); return; }
      const num = String(i).padStart(2, '0');
      const img = new Image();
      img.onload = () => {
        found.push({ src: `images/gallery/${num}.jpeg`, caption: captions[i - 1] || '' });
        i++;
        tryNext();
      };
      img.onerror = () => setImages(found.slice());
      img.src = `images/gallery/${num}.jpeg`;
    };
    tryNext();
  }, []);

  const prev = useC(() => setLightbox((n) => (n - 1 + images.length) % images.length), [images.length]);
  const next = useC(() => setLightbox((n) => (n + 1) % images.length), [images.length]);

  useE(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, prev, next]);

  if (!images.length) {
    return (
      <div className="finder-content">
        <div className="finder-toolbar"><span>Gallery · everyday frames</span></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>loading images...</div>
      </div>
    );
  }

  return (
    <div className="finder-content" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="finder-toolbar">
        <span>Gallery · everyday frames</span>
        <span>{images.length} photos</span>
      </div>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div key={img.src} className="gallery-thumb" onClick={() => setLightbox(i)}>
            <img src={img.src} alt={img.caption} />
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery-lb-close" onClick={(e) => { e.stopPropagation(); setLightbox(null); }}>×</button>
          <button className="gallery-lb-nav gallery-lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }}>&#8249;</button>
          <div className="gallery-lb-stage" onClick={(e) => e.stopPropagation()}>
            <img src={images[lightbox].src} alt={images[lightbox].caption} />
            <div className="gallery-lb-caption">
              <span className="gallery-lb-num">{lightbox + 1} / {images.length}</span>
              {images[lightbox].caption}
            </div>
          </div>
          <button className="gallery-lb-nav gallery-lb-next" onClick={(e) => { e.stopPropagation(); next(); }}>&#8250;</button>
        </div>
      )}
    </div>
  );
}

function FinderContent({ folder, tag, activeFileId, onOpenFile }) {
  const d = DATA();

  // Gallery view
  if (folder === 'gallery' && !tag) {
    return <GalleryView />;
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

  // Split projects into headline + coursework groups
  const isProjects = !tag && folder === 'projects';
  const headline = isProjects ? items.filter((x) => !x.coursework) : items;
  const coursework = isProjects ? items.filter((x) => x.coursework) : [];

  const renderRow = (it) => {
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
  };

  return (
    <div className="finder-content">
      <div className="finder-toolbar">
        <span>{title} · {items.length} {items.length === 1 ? 'item' : 'items'}</span>
        <span>sorted · chronological</span>
      </div>
      <div className="file-list">
        {headline.map(renderRow)}
        {coursework.length > 0 && (
          <>
            <div style={{
              padding: '14px 14px 6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-faint)',
              borderTop: '1px solid var(--ink-faint)',
              marginTop: 8,
            }}>
              Coursework / Earlier
            </div>
            {coursework.map(renderRow)}
          </>
        )}
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

      {item.links?.github && (
        <a href={item.links.github} target="_blank" rel="noopener noreferrer" className="doc-github-link">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
          {item.links.github.replace('https://github.com/', '')}
        </a>
      )}

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

      {item.arch && (
        <div className="arch-diagram">
          {item.arch.map((step, i) => (
            <React.Fragment key={i}>
              <div className="arch-node">{step}</div>
              {i < item.arch.length - 1 && <div className="arch-arrow">›</div>}
            </React.Fragment>
          ))}
        </div>
      )}

      {window.ProjectDiagram && <window.ProjectDiagram id={item.id} />}

      {(item.body || []).map((b, i) => (
        <React.Fragment key={i}>
          {b.h && <h3>{b.h}</h3>}
          {b.p && <p>{b.p}</p>}
          {b.list && <ul>{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>}
        </React.Fragment>
      ))}

      {item.tableauPath && (
        <div className="tableau-embed" style={{ margin: '20px 0', border: '1px solid var(--ink-faint)', borderRadius: 4, overflow: 'hidden', background: '#fff' }}>
          <iframe
            src={`https://public.tableau.com/views/${item.tableauPath}?:embed=y&:showVizHome=no&:toolbar=top&:tabs=no`}
            style={{ width: '100%', height: 640, border: 0, display: 'block' }}
            title="Tableau dashboard"
            allowFullScreen
          />
          <div style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)', borderTop: '1px solid var(--ink-faint)', background: 'var(--paper-soft)' }}>
            Live Tableau Public dashboard. <a href={item.links?.tableau} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Open in Tableau Public ↗</a>
          </div>
        </div>
      )}

      {item.links?.tableau && !item.tableauPath && (
        <div style={{ margin: '24px 0 16px' }}>
          <a href={item.links.tableau} target="_blank" rel="noopener noreferrer"
             style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid var(--ink)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', background: 'var(--paper)' }}>
            Tableau ↗
          </a>
        </div>
      )}

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

// ==================== NOW (macOS Notes — dark mode) ====================
function NowView() {
  const { useState: useS } = React;
  const d = DATA();
  const n = d.now || {};
  const [sel, setSel] = useS(0);

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const notes = [
    {
      title: 'Currently Reading',
      preview: (n.reading || [])[0]?.title || '',
      date: today,
      content: (
        <div>
          {(n.reading || []).map((b, i) => (
            <div key={i} className="dnotes-entry">
              <div className="dnotes-entry-title">{b.title}</div>
              {b.author && <div className="dnotes-entry-by">— {b.author}</div>}
              {b.note && <p className="dnotes-entry-note">{b.note}</p>}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Currently Learning',
      preview: (n.studying || [])[0]?.title || '',
      date: today,
      content: (
        <div>
          {(n.studying || []).map((s, i) => (
            <div key={i} className="dnotes-entry">
              <div className="dnotes-entry-title">{s.title}</div>
              {s.note && <p className="dnotes-entry-note">{s.note}</p>}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Now Listening',
      preview: (n.listening || []).join(', '),
      date: today,
      content: (
        <ul className="dnotes-checklist">
          {(n.listening || []).map((l, i) => (
            <li key={i}><span className="dnotes-bullet">♪</span>{l}</li>
          ))}
        </ul>
      ),
    },
    ...(n.thinking ? [{
      title: 'Turning Over',
      preview: n.thinking.slice(0, 48) + (n.thinking.length > 48 ? '…' : ''),
      date: today,
      content: <p className="dnotes-thinking">{n.thinking}</p>,
    }] : []),
  ];

  return (
    <div className="dnotes-app">
      {/* Folders rail */}
      <div className="dnotes-rail">
        <div className="dnotes-rail-head">Folders</div>
        <div className="dnotes-rail-item active">
          <span className="dnotes-rail-ico">≡</span>
          <span>All Notes</span>
          <span className="dnotes-rail-count">{notes.length}</span>
        </div>
        <div className="dnotes-rail-item">
          <span className="dnotes-rail-ico">★</span>
          <span>Pinned</span>
        </div>
        <div className="dnotes-rail-item">
          <span className="dnotes-rail-ico">⌫</span>
          <span>Recently Deleted</span>
        </div>
      </div>

      {/* Notes list */}
      <div className="dnotes-list">
        <div className="dnotes-list-head">
          <input className="dnotes-search" placeholder="Search" readOnly />
        </div>
        {notes.map((note, i) => (
          <div key={i} className={`dnotes-item ${sel === i ? 'active' : ''}`} onClick={() => setSel(i)}>
            <div className="dnotes-item-title">{note.title}</div>
            <div className="dnotes-item-meta">
              <span className="dnotes-item-date">{note.date}</span>
              <span className="dnotes-item-preview">{note.preview}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Active note */}
      <div className="dnotes-content">
        <div className="dnotes-content-toolbar">
          <div className="dnotes-tools">
            <span className="dnotes-tool">Aa</span>
            <span className="dnotes-tool">☑</span>
            <span className="dnotes-tool">⊞</span>
            <span className="dnotes-tool">🔗</span>
          </div>
          <div className="dnotes-content-date">{notes[sel]?.date}</div>
        </div>
        <div className="dnotes-content-body">
          <h1 className="dnotes-content-title">{notes[sel]?.title}</h1>
          {notes[sel]?.content}
        </div>
      </div>
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
        Every project, course, and competition that taught me something. Most recent first.
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
  Icon, IndexCardHero, FinderSidebar, FinderContent, GalleryView, DocView, AboutDoc, LearningArchive, ResumeView, NowView,
});
