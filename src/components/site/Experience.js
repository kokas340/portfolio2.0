import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { education, experience, tenure, toolbox } from "../../data/profile";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 / Experience"
      title="Where I've grown."
      intro="Three years at WasteHero took me from testing the product to owning a core part of it. Before that, a full-stack internship in Portugal."
    >
      <div className="roles">
        {experience.map((r) => (
          <Reveal as="article" className="role" key={r.company} aria-labelledby={`role-${r.company}`}>
            <p className="side-col">
              {r.dates}
              <span>{tenure(r.start, r.end)}</span>
            </p>
            <div>
              <div className="role-head">
                <img className="role-logo" src={r.logo} alt="" aria-hidden="true" />
                <div>
                  <h3 className="role-title" id={`role-${r.company}`}>
                    {r.title}
                  </h3>
                  <p className="role-company">
                    {r.company} · {r.place}
                  </p>
                </div>
              </div>

              {r.ladder && (
                <ol className="ladder" aria-label={`Progression at ${r.company}`}>
                  {r.ladder.map((step, i) => (
                    <li key={step.what} className={i === r.ladder.length - 1 ? "is-now" : undefined}>
                      <small>{step.when}</small>
                      {step.what}
                    </li>
                  ))}
                </ol>
              )}

              <ul className="points">
                {r.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ul className="tags" aria-label="Stack">
                {r.stack.map((s) => (
                  <li className="tag" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="toolbox">
        <h3 className="subhead">Toolbox</h3>
        <div className="rows">
          {toolbox.map((group) => (
            <div className="row" key={group.label}>
              <p className="row-label">{group.label}</p>
              <ul className="inline-list">
                {group.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="edu">
        <h3 className="subhead">Education</h3>
        <div className="rows">
          {education.map((e) => (
            <div className="row" key={e.school}>
              <p className="row-label">{e.place}</p>
              <div>
                <p className="edu-school">{e.school}</p>
                <p className="edu-degree">{e.degree}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
