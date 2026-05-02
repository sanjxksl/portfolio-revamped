/* global React, ReactDOM */
// Main app shell — desktop with scattered icons, big display title, native cursor.
const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// Boot sequence
// ============================================================
function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const script = [
      { t: '> initializing portfolio.os v6.0 ...', d: 140 },
      { t: '> mounting /work /projects /competitions /learning ...', d: 160, ok: true },
      { t: '> loading typography · fraunces + cormorant + inter', d: 180, ok: true },
      { t: '> setting palette · cream · brown · peony', d: 150, ok: true },
      { t: '> ready.', d: 240 },
    ];
    let acc = 0;
    script.forEach((s) => {
      acc += s.d;
      setTimeout(() => setLines((ls) => [...ls, s]), acc);
    });
    setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 500);
    }, acc + 280);
  }, [onDone]);

  return (
    <div className={`boot ${done ? 'done' : ''}`}>
      <div className="boot-lines">
        {lines.map((l, i) => (
          <div key={i} className="line">
            <span className="prompt">$</span>
            <span className="body">{l.t.replace(/^>\s*/, '')}</span>
            {l.ok && <span className="ok">ok</span>}
          </div>
        ))}
      </div>
      <button className="skip" onClick={() => { setDone(true); setTimeout(onDone, 200); }}>
        skip ⎋
      </button>
    </div>
  );
}

// ============================================================
// Display title (centered behind icons) + peony folder anchor
// ============================================================
function DisplayTitle() {
  // Cursor-reactive subtle parallax
  const ref = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5);
      const cy = (e.clientY / window.innerHeight - 0.5);
      if (ref.current) {
        ref.current.style.transform = `translate(calc(-50% + ${cx * -8}px), calc(-50% + ${cy * -6}px))`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div className="display-title" ref={ref} aria-hidden="true">
      <span className="designer">sanjana's</span>
      <span className="portfolio">portfolio</span>
      <span className="year">(2026)</span>
      <span className="dt-subtitle">user-centered data scientist</span>
    </div>
  );
}

// ============================================================
// Desktop Icons — scattered with default positions, draggable
// ============================================================
// no localStorage — positions always reset to defaults on refresh

// Folder SVG (blue, like macOS)
function FolderIcon({ color = 'blue' }) {
  const fills = color === 'peony'
    ? { back: '#c46a85', front: '#d68aa3' }
    : { back: '#4f86b8', front: '#6a9cc8' };
  return (
    <svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12 Q4 8 8 8 L24 8 L30 14 L56 14 Q60 14 60 18 L60 48 Q60 52 56 52 L8 52 Q4 52 4 48 Z" fill={fills.back} />
      <path d="M2 18 Q2 14 6 14 L58 14 Q62 14 62 18 L60 50 Q60 54 56 54 L6 54 Q2 54 2 50 Z" fill={fills.front} />
      <path d="M4 18 L60 18 L60 22 Q32 24 4 22 Z" fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}

// Doc/PDF icon
function DocIcon() {
  return (
    <svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6 L40 6 L52 18 L52 50 Q52 52 50 52 L14 52 Q12 52 12 50 L12 8 Q12 6 14 6 Z" fill="#f5efe1" stroke="#c9bda7" strokeWidth="1" />
      <path d="M40 6 L40 18 L52 18 Z" fill="#ddd1bb" />
      <line x1="20" y1="28" x2="44" y2="28" stroke="#c9bda7" strokeWidth="1.2" />
      <line x1="20" y1="33" x2="44" y2="33" stroke="#c9bda7" strokeWidth="1.2" />
      <line x1="20" y1="38" x2="38" y2="38" stroke="#c9bda7" strokeWidth="1.2" />
      <line x1="20" y1="43" x2="44" y2="43" stroke="#c9bda7" strokeWidth="1.2" />
    </svg>
  );
}

// App icons (terminal, mail, github)
function TerminalAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="56" height="52" rx="9" fill="#1a1410" />
      <rect x="4" y="6" width="56" height="14" rx="9" fill="#3d2c20" />
      <rect x="4" y="14" width="56" height="6" fill="#3d2c20" />
      <circle cx="11" cy="13" r="2" fill="#ec6a5e" />
      <circle cx="18" cy="13" r="2" fill="#f4bf4f" />
      <circle cx="25" cy="13" r="2" fill="#62c454" />
      <text x="14" y="38" fill="#d68aa3" fontFamily="monospace" fontSize="10" fontWeight="600">$ _</text>
    </svg>
  );
}

function MailAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="56" height="40" rx="6" fill="#f5efe1" stroke="#c9bda7" strokeWidth="1" />
      <path d="M4 18 L32 38 L60 18" fill="none" stroke="#9c4a64" strokeWidth="2" />
      <path d="M4 50 L24 32 M60 50 L40 32" fill="none" stroke="#c9bda7" strokeWidth="1" />
    </svg>
  );
}

// macOS Photos app — colour-wheel petals around a white core
function GalleryAppIcon() {
  const petals = [
    { a: 0,    f: '#fbbf24' }, // yellow
    { a: 45,   f: '#f97316' }, // orange
    { a: 90,   f: '#ef4444' }, // red
    { a: 135,  f: '#ec4899' }, // pink
    { a: 180,  f: '#a855f7' }, // purple
    { a: 225,  f: '#3b82f6' }, // blue
    { a: 270,  f: '#10b981' }, // teal
    { a: 315,  f: '#84cc16' }, // green
  ];
  const cx = 32, cy = 32, r1 = 9, r2 = 22, w = 12;
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {petals.map((p, i) => (
          <radialGradient key={i} id={`pg${i}`} cx="0.5" cy="0.5" r="0.6">
            <stop offset="0%" stopColor={p.f} stopOpacity="1" />
            <stop offset="100%" stopColor={p.f} stopOpacity="0.85" />
          </radialGradient>
        ))}
      </defs>
      {petals.map((p, i) => {
        const rad = (p.a - 90) * Math.PI / 180;
        const px = cx + Math.cos(rad) * (r1 + (r2 - r1) / 2);
        const py = cy + Math.sin(rad) * (r1 + (r2 - r1) / 2);
        return (
          <ellipse
            key={i}
            cx={px} cy={py}
            rx={(r2 - r1) / 2 + 2} ry={w / 2}
            fill={`url(#pg${i})`}
            transform={`rotate(${p.a} ${px} ${py})`}
            opacity="0.95"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r1 - 1} fill="#ffffff" />
    </svg>
  );
}

// macOS Finder — the classic two-tone happy-face mark
function FinderAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb3e8" />
          <stop offset="100%" stopColor="#4a85c4" />
        </linearGradient>
        <clipPath id="finderClip">
          <rect x="4" y="4" width="56" height="56" rx="11" />
        </clipPath>
      </defs>
      {/* Rounded square base */}
      <rect x="4" y="4" width="56" height="56" rx="11" fill="url(#finderBg)" />
      {/* Light-side face (left) */}
      <g clipPath="url(#finderClip)">
        <path d="M 4 4 L 32 4 L 32 60 L 4 60 Z" fill="#e8e8e8" />
        {/* Left eye */}
        <ellipse cx="22" cy="26" rx="2.6" ry="5.2" fill="#1a1a1a" />
        {/* Right eye on the dark side */}
        <ellipse cx="42" cy="26" rx="2.6" ry="5.2" fill="#1a1a1a" />
        {/* Smile spanning both halves */}
        <path d="M 18 42 Q 32 52 46 42" stroke="#1a1a1a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* Vertical seam between the two halves */}
        <line x1="32" y1="4" x2="32" y2="60" stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

function GithubAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="11" fill="#2b1e16" />
      <path d="M32 16 C22 16 14 24 14 34 C14 42 19 48 26 50 C27 50 27 50 27 49 C27 49 27 47 27 45 C22 46 21 43 21 43 C20 41 19 41 19 41 C18 40 19 40 19 40 C20 40 21 41 21 41 C22 43 25 43 26 42 C26 41 26 40 27 40 C23 39 19 38 19 32 C19 30 20 29 21 28 C21 28 20 26 21 23 C21 23 23 23 26 25 C28 24 30 24 32 24 C34 24 36 24 38 25 C41 23 43 23 43 23 C44 26 43 28 43 28 C44 29 45 30 45 32 C45 38 41 39 37 40 C38 40 38 41 38 43 C38 46 38 49 38 49 C38 50 38 50 39 50 C46 48 51 42 51 34 C51 24 43 16 32 16 Z"
            fill="#f5efe1" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 64 56" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4 L40 4 L52 16 L52 52 Q52 54 50 54 L14 54 Q12 54 12 52 L12 6 Q12 4 14 4 Z" fill="#f5efe1" stroke="#c9bda7" strokeWidth="1" />
      <path d="M40 4 L40 16 L52 16 Z" fill="#ddd1bb" />
      <text x="22" y="34" fill="#9c4a64" fontFamily="serif" fontWeight="700" fontSize="11" fontStyle="italic">CV</text>
      <line x1="18" y1="40" x2="46" y2="40" stroke="#c9bda7" strokeWidth="1" />
      <line x1="18" y1="44" x2="42" y2="44" stroke="#c9bda7" strokeWidth="1" />
      <line x1="18" y1="48" x2="38" y2="48" stroke="#c9bda7" strokeWidth="1" />
    </svg>
  );
}

function NotesAppIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="56" height="56" rx="10" fill="#ffd426" />
      <line x1="14" y1="21" x2="50" y2="21" stroke="#8a6300" strokeWidth="1.8" />
      <line x1="14" y1="30" x2="50" y2="30" stroke="#8a6300" strokeWidth="1.8" />
      <line x1="14" y1="39" x2="42" y2="39" stroke="#8a6300" strokeWidth="1.8" />
      <line x1="14" y1="48" x2="34" y2="48" stroke="#8a6300" strokeWidth="1.8" />
    </svg>
  );
}

function LearningLogIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" overflow="hidden">
      <rect x="0" y="0" width="64" height="64" rx="8" fill="#1a1410" />
      <rect x="0" y="0" width="64" height="16" rx="8" fill="#3d2c20" />
      <rect x="0" y="10" width="64" height="6" fill="#3d2c20" />
      <circle cx="11" cy="9" r="2" fill="#ec6a5e" />
      <circle cx="18" cy="9" r="2" fill="#f4bf4f" />
      <circle cx="25" cy="9" r="2" fill="#62c454" />
      <text x="7" y="29" fill="#d68aa3" fontFamily="monospace" fontSize="6" fontWeight="600">* a1f9d  QUANT</text>
      <text x="7" y="39" fill="#7a6552" fontFamily="monospace" fontSize="6">* b3c1e  MLOPS</text>
      <text x="7" y="49" fill="#7a6552" fontFamily="monospace" fontSize="6">* 7a2c1  PROD</text>
    </svg>
  );
}

// Default desktop icons & positions (percent-based for responsiveness)
// anchor_h: 'left'|'right'  anchor_v: 'top'|'bottom'
// dx/dy: px from that edge of the .desktop-icons container
function getDefaultIcons() {
  return [
    { id: 'work',         label: 'work',         kind: 'folder', color: 'blue',  anchor_h:'left', dx:32,   anchor_v:'top', dy:77,  action: { type: 'finder', folder: 'work' } },
    { id: 'notion',       label: 'Notes',        kind: 'notion',                 anchor_h:'left', dx:153,  anchor_v:'top', dy:320, action: { type: 'reading' } },
    { id: 'projects',     label: 'projects',     kind: 'folder', color: 'blue',  anchor_h:'left', dx:149,  anchor_v:'top', dy:80,  action: { type: 'finder', folder: 'projects' } },
    { id: 'headshot',     label: 'about.png',    kind: 'image', src: 'images/headshot.png', anchor_h:'left', dx:35, anchor_v:'top', dy:186, action: { type: 'about' } },
    { id: 'github',       label: 'github',       kind: 'app-github',             anchor_h:'left', dx:1062, anchor_v:'top', dy:114, action: { type: 'href', href: 'https://github.com/sanjxksl' } },
    { id: 'competitions', label: 'competitions', kind: 'folder', color: 'peony', anchor_h:'left', dx:34,   anchor_v:'top', dy:319, action: { type: 'finder', folder: 'competitions' } },
    { id: 'resume',       label: 'resume.pdf',   kind: 'resume',                 anchor_h:'left', dx:148,  anchor_v:'top', dy:191, action: { type: 'launch', id: 'resume' } },
  ];
}

function DesktopIcons({ onAction }) {
  const [icons] = useState(getDefaultIcons);
  const [selected, setSelected] = useState(null);
  const [pos, setPos] = useState({});  // drag overrides only; resets on refresh
  const dragRef = useRef(null);

  // Returns CSS style using anchor edges, falling back to drag position if set
  const getIconStyle = (icon) => {
    const p = pos[icon.id];
    if (p) return { left: p.x, top: p.y };
    return {
      [icon.anchor_h]: icon.dx,
      [icon.anchor_v]: icon.dy,
    };
  };

  const handleDragStart = (e, icon) => {
    e.preventDefault();
    setSelected(icon.id);
    const startX = e.clientX, startY = e.clientY;
    // Resolve current pixel top-left so dragging starts from the right spot
    let ox, oy;
    const saved = pos[icon.id];
    if (saved) {
      ox = saved.x; oy = saved.y;
    } else {
      const cw = window.innerWidth - 60;
      const ch = window.innerHeight - 130;
      ox = icon.anchor_h === 'right' ? cw - icon.dx - 86 : icon.dx;
      oy = icon.anchor_v === 'bottom' ? ch - icon.dy - 86 : icon.dy;
    }
    dragRef.current = { id: icon.id, sx: startX, sy: startY, ox, oy, moved: false };

    const onMove = (ev) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = ev.clientX - d.sx, dy = ev.clientY - d.sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
      setPos((p) => ({ ...p, [d.id]: { x: d.ox + dx, y: d.oy + dy } }));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      dragRef.current = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleDoubleClick = (icon) => onAction(icon.action);

  useEffect(() => {
    const onClick = (e) => { if (!e.target.closest('.di')) setSelected(null); };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);


  return (
    <div className="desktop-icons">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`di ${selected === icon.id ? 'selected' : ''}`}
          style={getIconStyle(icon)}
          onMouseDown={(e) => handleDragStart(e, icon)}
          onDoubleClick={() => handleDoubleClick(icon)}
        >
          <div className={`icon-art ${icon.kind === 'image' ? 'image-thumb' : ''}`}>
            {icon.kind === 'folder' && <FolderIcon color={icon.color} />}
            {icon.kind === 'doc' && <DocIcon />}
            {icon.kind === 'resume' && <ResumeIcon />}
            {icon.kind === 'image' && <img src={icon.src} alt={icon.label} draggable="false" />}
            {icon.kind === 'app-terminal' && <TerminalAppIcon />}
            {icon.kind === 'app-mail' && <MailAppIcon />}
            {icon.kind === 'app-github' && <GithubAppIcon />}
            {icon.kind === 'notion' && <NotesAppIcon />}
          </div>
          <span className="label">{icon.label}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Menubar
// ============================================================
function Menubar({ activeApp }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(i);
  }, []);
  const fmt = now.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
  return (
    <div className="menubar">
      <span className="apple"></span>
      <span className="app-name">{activeApp}</span>
      <span className="menu-item">File</span>
      <span className="menu-item">Edit</span>
      <span className="menu-item">View</span>
      <span className="menu-item">Window</span>
      <span className="right">
        <span className="hint">⌘K</span>
        <span>{fmt}</span>
      </span>
    </div>
  );
}

// ============================================================
// Dock
// ============================================================
function Dock({ openApps, onLaunch }) {
  const [pos, setPos] = useState(null);
  const dragRef = useRef(null);
  const dockRef = useRef(null);

  // Temp: expose dock position for console capture
  useEffect(() => { window.__dockPos = pos; }, [pos]);

  const onDockMouseDown = (e) => {
    if (e.target.closest('.dock-item') || e.target.closest('.dock-sep')) return;
    const rect = dockRef.current.getBoundingClientRect();
    dragRef.current = { ox: rect.left + rect.width / 2, oy: rect.top, mx: e.clientX, my: e.clientY };
    const move = (ev) => {
      const d = dragRef.current;
      const cx = d.ox + (ev.clientX - d.mx);
      const cy = d.oy + (ev.clientY - d.my);
      const p = { x: Math.round(cx), y: Math.round(cy) };
      setPos(p);
      window.__dockPos = p;
    };
    const up = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const dockStyle = pos
    ? { left: pos.x, top: pos.y, bottom: 'auto', transform: 'translateX(-50%)' }
    : {};

  const items = [
    { id: 'finder',   label: 'Finder',        render: () => <FinderAppIcon /> },
    { id: 'gallery',  label: 'Gallery',       render: () => <GalleryAppIcon />, galleryAction: true },
    { sep: true },
    { id: 'learning', label: 'Logs',           render: () => <LearningLogIcon /> },
    { id: 'resume',   label: 'Resume',        render: () => <ResumeIcon /> },
    { sep: true },
    { id: 'mail',     label: 'Contact',  render: () => <MailAppIcon />, href: 'mailto:sanjanakanchibotla@gmail.com' },
    { id: 'github',   label: 'GitHub',   render: () => <GithubAppIcon />, href: 'https://github.com/sanjxksl' },
  ];
  return (
    <div className="dock" ref={dockRef} style={dockStyle} onMouseDown={onDockMouseDown}>
      {items.map((it, i) => {
        if (it.sep) return <div key={i} className="dock-sep" />;
        const isOpen = openApps.includes(it.id);
        const inner = (<>
          {it.render()}
          <span className="tip">{it.label}</span>
        </>);
        if (it.href) {
          return (
            <a key={it.id} href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="dock-item">
              {inner}
            </a>
          );
        }
        if (it.galleryAction) {
          return (
            <div key={it.id} className={`dock-item ${isOpen ? 'open' : ''}`} onClick={() => onLaunch('finder', 'gallery')}>
              {inner}
            </div>
          );
        }
        return (
          <div key={it.id} className={`dock-item ${isOpen ? 'open' : ''}`} onClick={() => onLaunch(it.id)}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Spotlight (⌘K)
// ============================================================
function Spotlight({ open, onClose, onLaunch, onOpenFile }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  useEffect(() => { setQ(''); setSel(0); }, [open]);

  if (!open) return null;
  const d = window.PORTFOLIO;
  const all = [
    { kind: 'app', name: 'Finder', k: 'App', go: () => onLaunch('finder') },
    { kind: 'app', name: 'Terminal', k: 'App', go: () => onLaunch('terminal') },
    { kind: 'app', name: 'About', k: 'App', go: () => onLaunch('about') },
    { kind: 'app', name: 'Learning Log', k: 'App', go: () => onLaunch('learning') },
    { kind: 'app', name: 'Resume.pdf', k: 'File', go: () => onLaunch('resume') },
    { kind: 'app', name: 'Gallery', k: 'App', go: () => { onLaunch('finder'); } },
    ...[...d.work, ...d.projects, ...d.competitions].map((p) => ({
      kind: 'doc', name: p.name, k: p.type, item: p, go: () => onOpenFile(p),
    })),
  ];
  const results = q
    ? all.filter((r) => (r.name + ' ' + r.k).toLowerCase().includes(q.toLowerCase())).slice(0, 9)
    : all.slice(0, 9);

  const onKey = (e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { setSel((s) => Math.min(s + 1, results.length - 1)); e.preventDefault(); }
    if (e.key === 'ArrowUp') { setSel((s) => Math.max(s - 1, 0)); e.preventDefault(); }
    if (e.key === 'Enter' && results[sel]) { results[sel].go(); onClose(); }
  };

  return (
    <div className="spotlight-bg" onClick={onClose}>
      <div className="spotlight" onClick={(e) => e.stopPropagation()}>
        <div className="sp-input-row">
          <span className="sigil">§</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setSel(0); }}
            onKeyDown={onKey}
            placeholder="search the archive…"
          />
        </div>
        <div className="sp-results">
          {results.length === 0 && (
            <div style={{ padding: '18px 18px', color: 'var(--ink-faint)', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
              no matches in this edition.
            </div>
          )}
          {results.map((r, i) => (
            <div key={i} className={`sp-item ${i === sel ? 'sel' : ''}`}
                 onMouseEnter={() => setSel(i)}
                 onClick={() => { r.go(); onClose(); }}>
              <span className="name">{r.name}</span>
              <span className="k">{r.k}</span>
            </div>
          ))}
        </div>
        <div className="sp-hint">
          <span>↑↓ navigate · ⏎ open</span>
          <span>⎋ close</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// App
// ============================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "skipBoot": false
}/*EDITMODE-END*/;

function App() {
  const wm = useWindowManager();
  const [booted, setBooted] = useState(TWEAK_DEFAULTS.skipBoot);
  const [folderOpen, setFolderOpen] = useState('about');
  const [activeTag, setActiveTag] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [spotOpen, setSpotOpen] = useState(false);

  // ⌘K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Auto-open terminal as a widget after boot
  useEffect(() => {
    if (!booted) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const w = 500, h = 270;
    wm.openWindow({
      id: 'terminal',
      title: 'Terminal — guest@portfolio.os',
      x: Math.round(vw * 0.52),
      y: Math.round(vh * 0.50),
      w, h,
      kind: 'terminal',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  // Tag click events
  useEffect(() => {
    const h = (e) => {
      setActiveTag(e.detail);
      setFolderOpen('work');
      launch('finder');
    };
    window.addEventListener('open-tag', h);
    return () => window.removeEventListener('open-tag', h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const launch = useCallback((id, arg) => {
    const existing = wm.windows.find((w) => w.id === id);
    if (existing) { wm.focusWindow(id); return; }
    const vw = window.innerWidth, vh = window.innerHeight;
    const specs = {
      finder:   { title: 'Finder',                          w: 800, h: 540, kind: 'finder' },
      terminal: { title: 'Terminal — guest@portfolio.os',   w: 620, h: 380, kind: 'terminal' },
      about:    { title: 'about.md',                        w: 660, h: 620, kind: 'about' },
      learning: { title: 'learning.log',                    w: 700, h: 600, kind: 'learning' },
      resume:   { title: 'resume.pdf',                      w: 720, h: 620, kind: 'resume' },
      reading:  { title: 'Notes',                          w: 720, h: 520, kind: 'reading' },
    };
    const s = specs[id];
    if (!s) return;
    const offset = wm.windows.length * 22;
    const w = Math.min(s.w, vw - 40);
    const h = Math.min(s.h, vh - 80);
    const x = Math.max(20, Math.round((vw - w) / 2) + offset);
    const y = Math.max(32, Math.round((vh - h) / 2) - 10 + offset);
    wm.openWindow({ id, x, y, w, h, kind: s.kind, title: s.title });
    if (id === 'finder' && arg) { setFolderOpen(arg); setActiveTag(null); }
    else if (id === 'finder' && !arg) { setFolderOpen('about'); setActiveTag(null); }
  }, [wm]);

  const openFile = (item) => {
    if (item._kind === 'about' || item.id === 'about') { launch('about'); return; }
    if (item._kind === 'resume' || item.id === 'resume') { launch('resume'); return; }
    setActiveFile(item.id);
    const id = `doc-${item.id}`;
    const vw = window.innerWidth, vh = window.innerHeight;
    if (wm.windows.find((w) => w.id === id)) { wm.focusWindow(id); return; }
    const offset = wm.windows.length * 18;
    wm.openWindow({
      id,
      title: item.name,
      x: Math.max(30, Math.round((vw - 680) / 2) + offset),
      y: Math.max(40, 80 + offset),
      w: 680, h: Math.min(640, Math.round(vh * 0.8)),
      kind: 'doc',
      item,
    });
  };

  // Action dispatch from desktop icons
  const handleIconAction = useCallback((action) => {
    if (!action) return;
    if (action.type === 'finder') {
      launch('finder', action.folder);
    } else if (action.type === 'gallery') {
      launch('finder', 'gallery');
    } else if (action.type === 'about') {
      launch('about');
    } else if (action.type === 'reading') {
      launch('reading');
    } else if (action.type === 'launch') {
      launch(action.id);
    } else if (action.type === 'href') {
      window.open(action.href, action.href.startsWith('http') ? '_blank' : '_self');
    }
  }, [launch]);

  // Temp: expose window positions for console capture
  useEffect(() => { window.__windows = wm.windows; }, [wm.windows]);

  const openApps = wm.windows.filter((w) => !w.minimized).map((w) => w.id);
  const focused = wm.windows.find((w) => w.id === wm.focusId);
  let activeApp = 'Finder';
  if (focused) {
    activeApp = ({
      finder: 'Finder', terminal: 'Terminal',
      about: 'About', learning: 'Learning', doc: 'Preview', resume: 'Preview', reading: 'Notes',
    })[focused.kind] || 'Finder';
  }

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}

      <div className="wallpaper" />
      <DisplayTitle />
      <DesktopIcons onAction={handleIconAction} />

      <Menubar activeApp={activeApp} />

      {wm.windows.map((w) => (
        <Window
          key={w.id}
          win={w}
          focused={wm.focusId === w.id}
          onClose={() => wm.closeWindow(w.id)}
          onMinimize={() => wm.minimizeWindow(w.id)}
          onFocus={() => wm.focusWindow(w.id)}
          onMove={(p) => wm.updateWindow(w.id, p)}
        >
          {w.kind === 'finder' && (
            <div className="finder">
              <FinderSidebar
                activeFolder={folderOpen}
                onOpenFolder={(f) => { setFolderOpen(f); setActiveTag(null); }}
                activeTag={activeTag}
                onOpenTag={setActiveTag}
              />
              <FinderContent
                folder={folderOpen}
                tag={activeTag}
                activeFileId={activeFile}
                onOpenFile={openFile}
              />
            </div>
          )}
          {w.kind === 'terminal' && (
            <Terminal onCommand={(c) => {
              if (c === 'open-learning') launch('learning');
              if (c === 'open-about') launch('about');
              if (c === 'open-projects') launch('finder');
              if (c === 'open-resume') launch('resume');
            }} />
          )}
          {w.kind === 'learning' && <LearningArchive />}
          {w.kind === 'about' && <AboutDoc />}
          {w.kind === 'doc' && <DocView item={w.item} />}
          {w.kind === 'resume' && <ResumeView />}
          {w.kind === 'reading' && <NowView />}
        </Window>
      ))}

      <Dock openApps={openApps} onLaunch={launch} />

      <Spotlight
        open={spotOpen}
        onClose={() => setSpotOpen(false)}
        onLaunch={launch}
        onOpenFile={openFile}
      />

      <div className="mobile-warning">
        <h1>This is a desktop portfolio.</h1>
        <p>It's built as a small operating system. Try it on a laptop.</p>
        <p style={{ fontFamily: 'var(--font-mono)', opacity: 0.6, fontSize: 12, marginTop: 14 }}>sanjanakanchibotla@gmail.com</p>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
