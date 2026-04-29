/* global React */
// Terminal / Chatbot component — uses window.claude.complete
const { useState, useRef, useEffect } = React;

const SYSTEM_PROMPT = `You are Sanjana Kanchibotla's portfolio terminal assistant. You speak as her representative — warm, thoughtful, precise. Never verbose. Keep replies under 120 words. Use plain text, no markdown.

Context about Sanjana:
- Currently at CIBC (Jan 2026–present) designing an AI-driven exam-scoping assistant for AML examiners: a proactive AI agent + RAG over historical exam reports, inline chatbot for document Q&A, roadmap for Databricks ingestion and a news-trained insight LLM. Deployed in Streamlit.
- Master of Management Analytics, Rotman (2026). B.Tech Mechanical Engineering + Minor in Product Design, IIITDM (2025).
- Key projects: Credit risk with counterfactual explanations (88.8% AUC-ROC, DiCE, Platt calibration, fairness audit DIR 1.02); Evidence Engine (bias mitigation tool for PMs on Gemini); Aesthify (YOLOv8 + 101-person user study — simplicity r=0.68, symmetry r=-0.60); US Census income NN (85.6%, 0.91 AUC); Alumni career RF on 3,300+ unified records.
- Wins: 1st Koru Problem Hunt 2025 (ThirdPlace hobby marketplace), 1st Rotman MMA Datathon 2026 (causal inference, $75–90K reallocation), Finals Rotman Design Challenge 2026 (Compass for Manulife).
- Personality: cannot engage at surface level; starts with the question, not the method; earning technical depth before product authority. Reads poetry (T.S. Eliot, Mary Oliver), Russian classics, dances classical Indian, black pour-over coffee.
- Contact: sanjanakanchibotla@gmail.com; github.com/sanjxksl; linkedin.com/in/sanjanaksl; based in Toronto.

Rules:
- If asked "who are you" or "about you", answer as Sanjana in first person briefly.
- If asked for commands list: help, about, projects, work, learning, contact, clear, skills.
- If unclear, ask a short clarifying question.
- Never invent facts. If you don't know, say so and point to the Finder windows or her email.`;

function Terminal({ onCommand }) {
  const [lines, setLines] = useState([
    { kind: 'sys', text: "sanjana.os 4.0 · portfolio terminal" },
    { kind: 'sys', text: "type 'help' for commands · or ask anything in plain english" },
    { kind: 'sys', text: "" },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const [thinking, setThinking] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines, thinking]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  const push = (ls) => setLines((prev) => [...prev, ...ls]);

  const handleLocal = (cmd) => {
    const c = cmd.trim().toLowerCase();
    if (c === 'clear' || c === 'cls') {
      setLines([]);
      return true;
    }
    if (c === 'help' || c === '?') {
      push([
        { kind: 'sys', text: "commands:" },
        { kind: 'assistant', text: "  help          — this message" },
        { kind: 'assistant', text: "  about         — who is sanjana" },
        { kind: 'assistant', text: "  projects      — list data science / ML projects" },
        { kind: 'assistant', text: "  work          — current role at CIBC" },
        { kind: 'assistant', text: "  competitions  — case comp placements" },
        { kind: 'assistant', text: "  learning      — the commit log of how i got here" },
        { kind: 'assistant', text: "  skills        — tools, methods, tech" },
        { kind: 'assistant', text: "  contact       — email & links" },
        { kind: 'assistant', text: "  clear         — clear the screen" },
        { kind: 'sys', text: "or just ask a question in english." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'about') {
      push([
        { kind: 'assistant', text: "i'm sanjana — a data scientist starting in finance. i train models, but i care more about what happens when a rejected borrower reads the result. i came from mechanical engineering, pivoted through product design, and landed at rotman for analytics. sequence is deliberate: earn the technical depth first." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'projects') {
      const list = DATA().projects.map((p) => `  - ${p.name.padEnd(22)}  ${p.kicker}`);
      push([
        { kind: 'assistant', text: "projects in /Projects:" },
        ...list.map((t) => ({ kind: 'assistant', text: t })),
        { kind: 'sys', text: "(double-click a file in finder to read the full dossier)" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'work') {
      push([
        { kind: 'assistant', text: "CIBC · Global Methodology Programs & Strategy · Jan 2026 — present" },
        { kind: 'assistant', text: "building an AI-driven exam-scoping assistant for AML examiners." },
        { kind: 'assistant', text: "RAG over historical reports + inline chatbot + roadmap for databricks ingestion and a news-trained insight layer. deployed in streamlit." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'competitions' || c === 'comp') {
      push([
        { kind: 'assistant', text: "1st · Koru Problem Hunt 2025 (ThirdPlace marketplace)" },
        { kind: 'assistant', text: "1st · Rotman MMA Datathon 2026 (causal inference, paid search)" },
        { kind: 'assistant', text: "finals · Rotman Design Challenge 2026 (Compass for Manulife)" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'learning') {
      push([
        { kind: 'assistant', text: "see /Learning — it's rendered as a git commit log." },
        { kind: 'sys', text: "" },
      ]);
      if (onCommand) onCommand('open-learning');
      return true;
    }
    if (c === 'skills') {
      push([
        { kind: 'assistant', text: "languages:   python, sql, javascript" },
        { kind: 'assistant', text: "ml/dl:       pytorch, keras, scikit-learn, xgboost, dice" },
        { kind: 'assistant', text: "data:        pandas, numpy, databricks, streamlit" },
        { kind: 'assistant', text: "llm:         gemini, claude, prompt eng., rag" },
        { kind: 'assistant', text: "cv:          yolov8, opencv, roboflow" },
        { kind: 'assistant', text: "research:    mixed-methods, causal inference, fairness audits" },
        { kind: 'assistant', text: "product:     user interviews, hypothesis registers, journey maps" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'contact') {
      push([
        { kind: 'assistant', text: "email:    sanjanakanchibotla@gmail.com" },
        { kind: 'assistant', text: "github:   github.com/sanjxksl" },
        { kind: 'assistant', text: "linkedin: linkedin.com/in/sanjanaksl" },
        { kind: 'assistant', text: "based in toronto, on" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'sudo hire sanjana' || c === 'hire sanjana') {
      push([
        { kind: 'sys', text: "[sudo] authenticating..." },
        { kind: 'sys', text: "[sudo] credentials: exceptional" },
        { kind: 'assistant', text: "" },
        { kind: 'assistant', text: "  ┌─────────────────────────────────────────┐" },
        { kind: 'assistant', text: "  │  offer drafted. awaiting sign-off.       │" },
        { kind: 'assistant', text: "  │  next step: sanjanakanchibotla@gmail.com │" },
        { kind: 'assistant', text: "  └─────────────────────────────────────────┘" },
        { kind: 'assistant', text: "" },
        { kind: 'sys', text: "process exited with code 0." },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    if (c === 'sudo rm -rf /' || c.startsWith('sudo')) {
      push([{ kind: 'err', text: "nice try." }, { kind: 'sys', text: "" }]);
      return true;
    }
    if (c === 'whoami') {
      push([{ kind: 'assistant', text: "guest@sanjana.os" }, { kind: 'sys', text: "" }]);
      return true;
    }
    if (c === 'ls' || c === 'ls ~') {
      push([
        { kind: 'assistant', text: "Work/  Projects/  Competitions/  Learning/  About_Me/  resume.pdf" },
        { kind: 'sys', text: "" },
      ]);
      return true;
    }
    return false;
  };

  const askClaude = async (q) => {
    setThinking(true);
    try {
      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content: `${SYSTEM_PROMPT}\n\nVisitor asks: ${q}` }
        ],
      });
      setThinking(false);
      const text = (reply || "").trim();
      const chunks = text.split(/\n+/).filter(Boolean);
      push([
        ...chunks.map((t) => ({ kind: 'assistant', text: t })),
        { kind: 'sys', text: "" },
      ]);
    } catch (e) {
      setThinking(false);
      push([
        { kind: 'err', text: "terminal offline — can't reach the model right now." },
        { kind: 'sys', text: "try: help · or email sanjanakanchibotla@gmail.com" },
        { kind: 'sys', text: "" },
      ]);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const v = input.trim();
    if (!v || busy) return;
    setHistory((h) => [...h, v]);
    setHIdx(-1);
    push([{ kind: 'user', text: v, prompt: true }]);
    setInput('');
    if (handleLocal(v)) return;
    setBusy(true);
    await askClaude(v);
    setBusy(false);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const ni = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(ni);
      setInput(history[ni]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIdx < 0) return;
      const ni = hIdx + 1;
      if (ni >= history.length) { setHIdx(-1); setInput(''); }
      else { setHIdx(ni); setInput(history[ni]); }
    }
  };

  return (
    <div className="terminal" ref={bodyRef} onClick={() => inputRef.current && inputRef.current.focus()}>
      {lines.map((l, i) => {
        if (l.kind === 'user') {
          return (
            <div key={i} className="t-line">
              <span className="t-prompt">guest@sanjana.os:~$ </span>
              <span className="t-user">{l.text}</span>
            </div>
          );
        }
        const cls = l.kind === 'err' ? 't-err' : l.kind === 'sys' ? 't-sys' : 't-assistant';
        return <div key={i} className={`t-line ${cls}`}>{l.text}</div>;
      })}
      {thinking && (
        <div className="t-line t-sys"><span className="t-thinking">· · ·</span> thinking</div>
      )}
      <form onSubmit={submit} className="t-input-row" style={{ marginTop: 4 }}>
        <span className="t-prompt">guest@sanjana.os:~$</span>
        <input
          ref={inputRef}
          className="t-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          disabled={busy}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

Object.assign(window, { Terminal });
