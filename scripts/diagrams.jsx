/* global React */
// Simplified, clean project diagrams. One per project. No clutter.
const { useEffect, useRef, useState } = React;

function useReveal(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function CountUp({ to, dur = 900, decimals = 0, suffix = '', prefix = '' }) {
  const [ref, seen] = useReveal(0.4);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [seen, to, dur]);
  return <span ref={ref}>{prefix}{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()}{suffix}</span>;
}

// Common diagram shell
function DiaShell({ caption, note, children }) {
  const [ref, seen] = useReveal(0.2);
  return (
    <div className="dia" ref={ref}>
      {caption && <div className="dia-caption">{caption}</div>}
      <svg viewBox="0 0 480 200" className={`dia-svg ${seen ? 'seen' : ''}`} preserveAspectRatio="xMidYMid meet">
        {children}
      </svg>
      {note && <div className="dia-note">{note}</div>}
    </div>
  );
}

// ============================================================
// 1. CIBC — clean three-stage flow
// ============================================================
function CIBCDiagram() {
  return (
    <DiaShell caption="how the agent answers a scoping question" note={<>three sources of truth fold into <em>one draft</em>.</>}>
      <defs>
        <marker id="ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9c4a64"/>
        </marker>
      </defs>
      {/* three input rows on left */}
      {[
        { y: 50,  l: 'historical exams' },
        { y: 100, l: 'examiner question' },
        { y: 150, l: 'live news' },
      ].map((r, i) => (
        <g key={i} className="step" style={{ '--i': i }}>
          <rect x="40" y={r.y - 15} width="160" height="30" rx="15" fill="#f5efe1" stroke="#c9bda7" strokeWidth="1"/>
          <text x="120" y={r.y + 4} textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="14" fontStyle="italic" fill="#2b1e16">{r.l}</text>
          <line x1="200" y1={r.y} x2="270" y2="100" stroke="#c46a85" strokeWidth="1.2" markerEnd="url(#ar1)" fill="none"/>
        </g>
      ))}
      {/* center: synthesis */}
      <g className="step" style={{ '--i': 3 }}>
        <circle cx="290" cy="100" r="40" fill="#fef0e8" stroke="#9c4a64" strokeWidth="1.5"/>
        <text x="290" y="98" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="13" fontStyle="italic" fill="#2b1e16">synthesise</text>
        <text x="290" y="114" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#9c4a64">+ chatbot</text>
      </g>
      {/* arrow to draft */}
      <line x1="330" y1="100" x2="380" y2="100" stroke="#9c4a64" strokeWidth="1.5" markerEnd="url(#ar1)"/>
      <g className="step" style={{ '--i': 4 }}>
        <rect x="380" y="80" width="80" height="40" rx="6" fill="#d68aa3"/>
        <text x="420" y="98" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="14" fontStyle="italic" fill="#fff">scope</text>
        <text x="420" y="113" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#fff">draft</text>
      </g>
    </DiaShell>
  );
}

// ============================================================
// 2. Credit Risk — before / after counterfactual, side by side
// ============================================================
function CreditRiskDiagram() {
  return (
    <DiaShell caption="a declined application, after counterfactual search" note={<>2.2 changes on average to <em>flip</em> a rejection.</>}>
      {/* Before */}
      <g className="step" style={{ '--i': 0 }}>
        <rect x="30" y="30" width="180" height="140" rx="6" fill="#fef0e8" stroke="#c9bda7"/>
        <text x="120" y="56" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="14" fontStyle="italic" fill="#9c4a64">declined</text>
        <text x="120" y="92" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="22" fill="#9c4a64">0.78</text>
        <text x="120" y="108" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7560">P(default)</text>
        <text x="120" y="138" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#5a4434">LTV 92% · DTIR 51%</text>
        <text x="120" y="154" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#5a4434">term 240 mo</text>
      </g>
      {/* Arrow */}
      <g className="step" style={{ '--i': 1 }}>
        <text x="240" y="98" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#8a7560">DiCE</text>
        <path d="M 220 110 L 260 110" stroke="#9c4a64" strokeWidth="1.5" markerEnd="url(#ar2)"/>
      </g>
      <defs>
        <marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9c4a64"/>
        </marker>
      </defs>
      {/* After */}
      <g className="step" style={{ '--i': 2 }}>
        <rect x="270" y="30" width="180" height="140" rx="6" fill="#f0f4ec" stroke="#9bbf8e"/>
        <text x="360" y="56" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="14" fontStyle="italic" fill="#5a7a3a">approved</text>
        <text x="360" y="92" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="22" fill="#5a7a3a">0.34</text>
        <text x="360" y="108" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7560">P(default)</text>
        <text x="360" y="138" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#5a4434">LTV 80% · DTIR 42%</text>
        <text x="360" y="154" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#5a4434">term 360 mo</text>
      </g>
    </DiaShell>
  );
}

// ============================================================
// 3. Aesthify — clean horizontal bar chart, top three only
// ============================================================
function AesthifyDiagram() {
  const data = [
    { k: 'simplicity', v:  0.68 },
    { k: 'harmony',    v:  0.41 },
    { k: 'balance',    v:  0.22 },
    { k: 'symmetry',   v: -0.60 },
  ];
  const max = 0.7;
  return (
    <DiaShell caption="design score vs. user preference (n=101)" note={<>simplicity wins. people prefer <em>asymmetric</em> rooms.</>}>
      <line x1="240" y1="20" x2="240" y2="180" stroke="#c9bda7" strokeDasharray="2 3"/>
      {data.map((d, i) => {
        const y = 36 + i * 36;
        const len = (d.v / max) * 160;
        const x = d.v >= 0 ? 240 : 240 + len;
        const w = Math.abs(len);
        const fill = d.v >= 0 ? '#7a8868' : '#c46a85';
        return (
          <g key={d.k} className="bar" style={{ '--i': i }}>
            <text x="232" y={y + 5} textAnchor="end" fontFamily="Cormorant Garamond" fontSize="14" fontStyle="italic" fill="#2b1e16">{d.k}</text>
            <rect className="b" x={d.v >= 0 ? 240 : x} y={y - 7} width={w} height="14" fill={fill} rx="2"/>
            <text x={d.v >= 0 ? 240 + w + 8 : x - 8} y={y + 5} textAnchor={d.v >= 0 ? 'start' : 'end'} fontFamily="JetBrains Mono" fontSize="10" fill="#5a4434">
              {d.v > 0 ? '+' : ''}{d.v.toFixed(2)}
            </text>
          </g>
        );
      })}
    </DiaShell>
  );
}

// ============================================================
// 4. PEAD — two simple lines diverging
// ============================================================
function PEADDiagram() {
  const months = Array.from({ length: 13 }, (_, i) => i);
  const high = months.map((m) => 0.5 + 0.45 * Math.log(m + 1));
  const low  = months.map((m) => -0.4 - 0.35 * Math.log(m + 1));
  const path = (arr) => arr.map((y, i) => `${i === 0 ? 'M' : 'L'} ${60 + (i / 12) * 360} ${100 - y * 38}`).join(' ');
  return (
    <DiaShell caption="post-earnings drift, by SUE decile" note={<>drift concentrates in <em>small firms</em>.</>}>
      <line x1="60" y1="100" x2="420" y2="100" stroke="#c9bda7"/>
      <text x="60" y="184" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7560">0</text>
      <text x="420" y="184" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7560">12 months</text>
      <path className="curve" d={path(high)} stroke="#7a8868" strokeWidth="2" fill="none"/>
      <path className="curve" d={path(low)} stroke="#c46a85" strokeWidth="2" fill="none"/>
      <text x="425" y={100 - high[12] * 38 + 4} fontFamily="Cormorant Garamond" fontSize="13" fontStyle="italic" fill="#5a7a3a">high SUE</text>
      <text x="425" y={100 - low[12] * 38 + 4} fontFamily="Cormorant Garamond" fontSize="13" fontStyle="italic" fill="#9c4a64">low SUE</text>
    </DiaShell>
  );
}

// ============================================================
// 5. Anomaly — quadrant, severity vs frequency
// ============================================================
function AnomalyDiagram() {
  const points = [
    { i: 'Forest Products',  x: 0.36, y: 0.62, hi: true },
    { i: 'Brewers',          x: 0.32, y: 0.48, hi: true },
    { i: 'Industrial Gases', x: 0.28, y: 0.44, hi: true },
    { i: 'Software',         x: 0.18, y: 0.78 },
    { i: 'REITs',            x: 0.14, y: 0.72 },
    { i: 'Banks',            x: 0.62, y: 0.26 },
    { i: 'Restaurants',      x: 0.40, y: 0.30 },
    { i: 'Pharma',           x: 0.46, y: 0.22 },
    { i: 'Retail',           x: 0.50, y: 0.18 },
  ];
  return (
    <DiaShell caption="anomaly rate × severity, by industry" note={<>three small sectors carry an <em>outsized severity</em>.</>}>
      <line x1="60" y1="170" x2="430" y2="170" stroke="#c9bda7"/>
      <line x1="60" y1="20" x2="60" y2="170" stroke="#c9bda7"/>
      <text x="245" y="190" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7560">rate →</text>
      <text x="50" y="95" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="#8a7560" transform="rotate(-90 50 95)">severity →</text>
      {points.map((p, i) => (
        <g key={p.i} className="pt" style={{ '--i': i }}>
          <circle
            cx={60 + p.x * 370}
            cy={170 - p.y * 150}
            r={p.hi ? 7 : 5}
            fill={p.hi ? '#c46a85' : '#6a9cc8'}
            fillOpacity={p.hi ? 0.7 : 0.3}
            stroke={p.hi ? '#9c4a64' : '#356597'}
            strokeWidth="1"
          />
          {p.hi && (
            <text x={60 + p.x * 370 + 11} y={170 - p.y * 150 + 4} fontFamily="Cormorant Garamond" fontSize="12" fontStyle="italic" fill="#9c4a64">{p.i}</text>
          )}
        </g>
      ))}
    </DiaShell>
  );
}

// ============================================================
// 6. ESG — coefficient stages, single metric
// ============================================================
function ESGDiagram() {
  const models = [
    { k: 'no controls',     v:  0.42 },
    { k: '+ firm controls', v:  0.31 },
    { k: '+ industry FE',   v:  0.04 },
    { k: '+ earnings news', v: -0.02 },
  ];
  return (
    <DiaShell caption="leverage coefficient, as controls are added" note={<>once you control for fundamentals, the ESG signal <em>collapses</em>.</>}>
      <line x1="60" y1="100" x2="430" y2="100" stroke="#c9bda7" strokeDasharray="2 3"/>
      {models.map((m, i) => {
        const x = 110 + i * 90;
        const h = m.v * 140;
        return (
          <g key={m.k} className="bar" style={{ '--i': i }}>
            <rect className="b" x={x - 18} y={h > 0 ? 100 - h : 100} width="36" height={Math.abs(h)} fill="#c46a85" rx="2"/>
            <text x={x} y={h > 0 ? 100 - h - 6 : 100 - h + 14} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="#5a4434">{m.v.toFixed(2)}</text>
            <text x={x} y="180" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="11" fontStyle="italic" fill="#5a4434">{m.k}</text>
          </g>
        );
      })}
    </DiaShell>
  );
}

// ============================================================
// 7. Evidence Engine — five intent modes
// ============================================================
function EvidenceDiagram() {
  const modes = ['hypothesis', 'pattern', 'confidence', 'reporting', 'assumption'];
  return (
    <DiaShell caption="five intent routes, one verdict with traces" note={<>every verdict carries its <em>supporting and counter</em> evidence.</>}>
      <defs>
        <marker id="arev" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c46a85"/>
        </marker>
      </defs>
      <circle cx="240" cy="100" r="38" fill="#fef0e8" stroke="#9c4a64" strokeWidth="1.5"/>
      <text x="240" y="96" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="14" fontStyle="italic" fill="#2b1e16">intent</text>
      <text x="240" y="112" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#9c4a64">classifier</text>
      {modes.map((m, i) => {
        const ang = (-Math.PI / 2) + (i / modes.length) * Math.PI * 2;
        const x = 240 + Math.cos(ang) * 130;
        const y = 100 + Math.sin(ang) * 75;
        return (
          <g key={m} className="step" style={{ '--i': i }}>
            <line x1={240 + Math.cos(ang) * 40} y1={100 + Math.sin(ang) * 40} x2={x - Math.cos(ang) * 30} y2={y - Math.sin(ang) * 12} stroke="#c46a85" strokeWidth="1" markerEnd="url(#arev)"/>
            <rect x={x - 38} y={y - 11} width="76" height="22" rx="11" fill="#f5efe1" stroke="#c46a85"/>
            <text x={x} y={y + 4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9.5" fill="#5a4434">{m}</text>
          </g>
        );
      })}
    </DiaShell>
  );
}

// Generic metric strip with count-up
function MetricStrip({ items }) {
  return (
    <div className="metrics">
      {items.map((m, i) => {
        const match = String(m.v).match(/^([+-]?\d+(?:\.\d+)?)([\D].*)?$/);
        return (
          <div className="metric" key={i}>
            <div className="v">
              {match ? (
                <>
                  <CountUp to={parseFloat(match[1])} decimals={match[1].includes('.') ? (match[1].split('.')[1].length) : 0} />
                  {match[2] || ''}
                </>
              ) : m.v}
            </div>
            <div className="l">{m.l}</div>
          </div>
        );
      })}
    </div>
  );
}

function ProjectDiagram({ id }) {
  if (id === 'cibc')           return <CIBCDiagram />;
  if (id === 'credit-risk')    return <CreditRiskDiagram />;
  if (id === 'aesthify')       return <AesthifyDiagram />;
  if (id === 'pead')           return <PEADDiagram />;
  if (id === 'exec-anomaly')   return <AnomalyDiagram />;
  if (id === 'esg-returns')    return <ESGDiagram />;
  if (id === 'evidence-engine')return <EvidenceDiagram />;
  return null;
}

Object.assign(window, { ProjectDiagram, MetricStrip, CountUp, useReveal });
