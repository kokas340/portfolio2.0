import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { about } from "../../data/profile";

export default function About() {
  return (
    <Section id="about" eyebrow="03 / About" title="A bit about me.">
      <div className="about">
        <Reveal className="about-text">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal as="dl" className="about-facts" delay={0.1}>
          {about.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
