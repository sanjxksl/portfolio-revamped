/* global React, ReactDOM */
// Window system — draggable windows, genie close, focus stack
const { useState, useRef, useEffect, useCallback } = React;

function useWindowManager() {
  const [windows, setWindows] = useState([]);
  const [focusId, setFocusId] = useState(null);
  const [zCounter, setZCounter] = useState(100);

  const openWindow = useCallback((spec) => {
    setWindows((ws) => {
      const existing = ws.find((w) => w.id === spec.id);
      if (existing) {
        setZCounter((z) => z + 1);
        setFocusId(spec.id);
        return ws.map((w) =>
          w.id === spec.id ? { ...w, minimized: false, closing: false, z: zCounter + 1 } : w
        );
      }
      setZCounter((z) => z + 1);
      setFocusId(spec.id);
      return [...ws, { ...spec, minimized: false, closing: false, opening: true, z: zCounter + 1 }];
    });
  }, [zCounter]);

  const closeWindow = useCallback((id) => {
    // Mark closing first, then remove after animation
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, closing: true } : w)));
    setTimeout(() => {
      setWindows((ws) => ws.filter((w) => w.id !== id));
    }, 420);
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const focusWindow = useCallback((id) => {
    setZCounter((z) => {
      const nz = z + 1;
      setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: nz, minimized: false } : w)));
      setFocusId(id);
      return nz;
    });
  }, []);

  const updateWindow = useCallback((id, patch) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }, []);

  return { windows, focusId, openWindow, closeWindow, minimizeWindow, focusWindow, updateWindow };
}

function Window({ win, onClose, onMinimize, onFocus, onMove, onResize, focused, children }) {
  const ref = useRef(null);
  const dragState = useRef(null);

  // Clear opening class after first paint
  useEffect(() => {
    if (win.opening) {
      const t = setTimeout(() => {
        // no need to mutate state — CSS animation is one-shot
      }, 350);
      return () => clearTimeout(t);
    }
  }, [win.opening]);

  const onTitleMouseDown = (e) => {
    if (e.target.closest('.light')) return;
    onFocus();
    const rect = ref.current.getBoundingClientRect();
    dragState.current = {
      offX: e.clientX - rect.left,
      offY: e.clientY - rect.top,
    };
    ref.current.classList.add('dragging');
    const move = (ev) => {
      const nx = Math.max(0, Math.min(window.innerWidth - 120, ev.clientX - dragState.current.offX));
      const ny = Math.max(28, Math.min(window.innerHeight - 80, ev.clientY - dragState.current.offY));
      onMove({ x: nx, y: ny });
    };
    const up = () => {
      ref.current && ref.current.classList.remove('dragging');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const cls = [
    'window',
    focused ? 'focused' : '',
    win.minimized ? 'minimized' : '',
    win.closing ? 'closing' : '',
    win.opening ? 'opening' : '',
    win.kind ? `kind-${win.kind}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={cls}
      style={{
        left: win.x, top: win.y,
        width: win.w, height: win.h,
        zIndex: win.z,
      }}
      onMouseDown={onFocus}
      data-screen-label={win.title}
    >
      <div className="titlebar" onMouseDown={onTitleMouseDown}>
        <div className="lights">
          <div className="light close" onClick={(e) => { e.stopPropagation(); onClose(); }} />
          <div className="light min" onClick={(e) => { e.stopPropagation(); onMinimize(); }} />
          <div className="light max" />
        </div>
        <div className="title">{win.title}</div>
      </div>
      <div className="window-body">{children}</div>
      <div
        className="window-resize"
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX, startY = e.clientY;
          const startW = win.w, startH = win.h;
          const move = (ev) => {
            onResize({
              w: Math.max(320, startW + ev.clientX - startX),
              h: Math.max(200, startH + ev.clientY - startY),
            });
          };
          const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
          };
          window.addEventListener('mousemove', move);
          window.addEventListener('mouseup', up);
        }}
      />
    </div>
  );
}

Object.assign(window, { useWindowManager, Window });
