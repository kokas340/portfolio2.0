import React from "react";

// A drawn impression of the Dev Hub client. It's an internal tool, so this is an
// illustration with generic session names, not a screenshot.
const sessions = [
  { name: "pricing", state: "run", meta: "$1.86", active: true },
  { name: "invoices", state: "wait", meta: "$0.92" },
  { name: "map-filters", state: "idle", meta: "idle" },
  { name: "docs", state: "idle", meta: "idle" },
];

export default function DevHubVisual() {
  return (
    <figure className="frame devhub" style={{ margin: 0 }} aria-label="Illustration of the Dev Hub client">
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>Dev Hub · office workstation</em>
      </div>
      <div className="dh-body" aria-hidden="true">
        <aside className="dh-side">
          <p className="dh-label">Sessions</p>
          {sessions.map((s) => (
            <div key={s.name} className={`dh-session${s.active ? " is-active" : ""}`}>
              <i className={s.state} />
              <span className="dh-name">{s.name}</span>
              <b>{s.meta}</b>
            </div>
          ))}
          <p className="dh-total">
            today <b>$2.78</b>
          </p>
        </aside>
        <div className="dh-term">
          <p>
            <span className="prompt">›</span> <span className="hl">new environment</span> pricing
          </p>
          <p className="ok">✓ ports 5004 · 3104 reserved</p>
          <p className="ok">✓ git worktree created</p>
          <p className="ok">✓ database cloned from golden dump</p>
          <p className="ok">✓ backend and frontend running</p>
          <p className="dim">survives sleep · reconnect from phone</p>
          <p>
            <span className="prompt">›</span> <span className="hl">claude</span>
            <span className="dh-cursor" />
          </p>
        </div>
      </div>
    </figure>
  );
}
