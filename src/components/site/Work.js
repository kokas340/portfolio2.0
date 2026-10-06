import React from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectLink from "./ProjectLink";
import DevHubVisual from "./DevHubVisual";
import { featured, moreProjects, person } from "../../data/profile";

function Visual({ project }) {
  if (project.visual.kind === "devhub") return <DevHubVisual />;
  return (
    <figure className="frame" style={{ margin: 0 }}>
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>{project.title}</em>
      </div>
      <img
        className="frame-shot"
        src={project.visual.src}
        alt={project.visual.alt}
        width="1184"
        height="710"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="01 / Work"
      title="Things I've built and shipped."
      intro={
        <>
          A tool my team uses every day, an industry collaboration and a team I led. The rest lives on{" "}
          <a href={person.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </>
      }
    >
      <div className="projects">
        {featured.map((p) => (
          <Reveal as="article" className="project" key={p.id} aria-labelledby={`project-${p.id}`}>
            <div className="project-copy">
              <p className="meta">
                {p.year} · {p.context}
              </p>
              <h3 className="project-title" id={`project-${p.id}`}>
                {p.title}
              </h3>
              <p className="project-summary">{p.summary}</p>
              <ul className="points">
                {p.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="project-role">{p.role}</p>
              <ul className="tags" aria-label="Built with">
                {p.stack.map((s) => (
                  <li className="tag" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
              <div className="links">
                {p.links.map((l) => (
                  <ProjectLink key={l.label} link={l} />
                ))}
              </div>
            </div>
            <div className="project-visual">
              <Visual project={p} />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="more">
        <h3 className="subhead">More projects</h3>
        <ul className="more-list">
          {moreProjects.map((p) => (
            <li className="more-row" key={p.id}>
              <span className="more-year">{p.year}</span>
              <div>
                <h4 className="more-title">
                  {p.title}
                  <span className="more-role">{p.role}</span>
                </h4>
                <p className="more-summary">{p.summary}</p>
              </div>
              <div className="more-links">
                {p.links.map((l) => (
                  <ProjectLink key={l.label} link={l} />
                ))}
              </div>
              <img className="more-thumb" src={p.image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
