import React from "react";
import Reveal from "./Reveal";

export default function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h2" id={`${id}-title`}>
            {title}
          </h2>
          {intro && <p className="section-intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
