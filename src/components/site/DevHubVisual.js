import React from "react";
import DevHubTerminal from "./DevHubTerminal";

// A drawn impression of the Dev Hub client. It's an internal tool, so the session
// list is an illustration with generic names; the terminal pane is a small,
// typeable easter egg (DevHubTerminal).
const sessions = [
  { name: "pricing", state: "run", meta: "$1.86", active: true },
  { name: "invoices", state: "wait", meta: "$0.92" },
  { name: "map-filters", state: "idle", meta: "idle" },
  { name: "docs", state: "idle", meta: "idle" },
];

export default function DevHubVisual() {
  return (
    <figure className="frame devhub" style={{ margin: 0 }} aria-label="Dev Hub client, with a terminal you can type in">
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>Dev Hub · office workstation</em>
      </div>
      <div className="dh-body">
        <aside className="dh-side" aria-hidden="true">
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
        <DevHubTerminal />
      </div>
    </figure>
  );
}
