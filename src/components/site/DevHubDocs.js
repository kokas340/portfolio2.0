import React from "react";
import { docSections } from "./terminalCommands";

// The docs session: README.md, shown the way it reads in an editor (raw
// markdown, lightly highlighted). Generated from the command registry, so it is
// always complete. Clicking a command runs it in the pricing session.
export default function DevHubDocs({ onRun }) {
  const sections = docSections();
  return (
    <div className="dh-docs">
      <div className="dh-docs-tab">
        <span className="md-badge" aria-hidden="true">
          M↓
        </span>
        README.md
      </div>
      <div className="dh-docs-body">
        <p className="md-h1">
          <span className="md-mark"># </span>Dev Hub terminal
        </p>
        <p className="md-text">
          Open the <b>pricing</b> session and type any command below, or click one to run it there.
        </p>
        {sections.map((section) => (
          <section key={section.title} aria-label={section.title}>
            <p className="md-h2">
              <span className="md-mark">## </span>
              {section.title}
            </p>
            {section.items.map((item) => (
              <p className="md-item" key={item.usage}>
                <span className="md-mark">- </span>
                <button type="button" className="md-code" onClick={() => onRun(item.run)} title={`Run "${item.run}" in the pricing session`}>
                  <span className="md-tick">`</span>
                  {item.usage}
                  <span className="md-tick">`</span>
                </button>
                <span className="md-text">
                  {" "}
                  {item.help}
                  {item.example && item.example !== item.usage && (
                    <>
                      {" "}
                      <span className="md-mark">e.g.</span> {item.example}
                    </>
                  )}
                </span>
              </p>
            ))}
          </section>
        ))}
        <p className="md-quote">
          <span className="md-mark">&gt; </span>A few commands are hidden. Try your luck.
        </p>
      </div>
    </div>
  );
}
