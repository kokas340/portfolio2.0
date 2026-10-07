import React, { useCallback, useRef, useState } from "react";
import DevHubDocs from "./DevHubDocs";
import DevHubTerminal from "./DevHubTerminal";
import { SESSIONS } from "./terminalCommands";

// A drawn impression of the Dev Hub client (an internal tool, so the sessions
// are generic) that doubles as an easter egg: the sessions are tabs, each
// terminal is typeable, and "docs" shows README.md with every command.
// Inactive panels stay mounted (just hidden), so each keeps its history.
export default function DevHubVisual() {
  const [active, setActive] = useState(SESSIONS[0].id);
  const terminals = useRef({});
  const tabs = useRef({});

  const focusTerminalSoon = (id) => {
    // focus only with a mouse/trackpad; on phones it would pop the keyboard up
    if (window.matchMedia("(pointer: fine)").matches) requestAnimationFrame(() => terminals.current[id]?.focus());
  };

  const select = (id) => {
    setActive(id);
    focusTerminalSoon(id);
  };

  const openSession = useCallback((id) => setActive(id), []);

  const runInPricing = useCallback((command) => {
    setActive("pricing");
    requestAnimationFrame(() => {
      terminals.current.pricing?.run(command);
      if (window.matchMedia("(pointer: fine)").matches) terminals.current.pricing?.focus();
    });
  }, []);

  // Arrow keys move between tabs (roving tabindex), as in any tab list.
  const onTabKey = (e, index) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = SESSIONS[(index + step + SESSIONS.length) % SESSIONS.length].id;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <figure className="frame devhub" style={{ margin: 0 }} aria-label="Dev Hub client: click a session, type a command">
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>Dev Hub · office workstation</em>
      </div>
      <div className="dh-body">
        <aside className="dh-side">
          <p className="dh-label" aria-hidden="true">
            Sessions
          </p>
          <div className="dh-tabs" role="tablist" aria-orientation="vertical" aria-label="Dev Hub sessions">
            {SESSIONS.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => (tabs.current[s.id] = el)}
                type="button"
                role="tab"
                id={`dh-tab-${s.id}`}
                aria-selected={active === s.id}
                aria-controls={`dh-panel-${s.id}`}
                tabIndex={active === s.id ? 0 : -1}
                className={`dh-session${active === s.id ? " is-active" : ""}`}
                onClick={() => select(s.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                <i className={s.state} aria-hidden="true" />
                <span className="dh-name">{s.id}</span>
                <b aria-hidden="true">{s.meta}</b>
              </button>
            ))}
          </div>
          <p className="dh-total" aria-hidden="true">
            today <b>$2.78</b>
          </p>
        </aside>
        {SESSIONS.map((s) => (
          <div key={s.id} className="dh-panel" role="tabpanel" id={`dh-panel-${s.id}`} aria-labelledby={`dh-tab-${s.id}`} hidden={active !== s.id}>
            {s.kind === "docs" ? (
              <DevHubDocs onRun={runInPricing} />
            ) : (
              <DevHubTerminal
                ref={(el) => (terminals.current[s.id] = el)}
                session={s.id}
                boot={s.boot}
                active={active === s.id}
                onOpenSession={openSession}
              />
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}
