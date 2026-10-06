import React from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { facts, hero, person } from "../../data/profile";
import HeroBadge from "./HeroBadge";
import HeroHeadline from "./HeroHeadline";
import HeroSpotlight from "./HeroSpotlight";

// The entrance is plain CSS (.hero-in keyframes) so it runs on the compositor:
// eyebrow first, then the headline, then the rest once the punch line has landed.
const delay = (ms) => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroSpotlight />
      <div className="container">
        <div className="hero-copy">
          <p className="eyebrow hero-in">{hero.eyebrow}</p>
          <HeroHeadline />
          <p className="lede hero-in" style={delay(1250)}>
            {hero.lede}
          </p>

          <div className="hero-actions hero-in" style={delay(1350)}>
            <a className="btn btn-primary" href="#work">
              See my work
              <ArrowDown size={16} className="icon-down" aria-hidden="true" />
            </a>
            <a className="btn btn-secondary" href={`mailto:${person.email}`}>
              <Mail size={16} aria-hidden="true" />
              Email me
            </a>
            <div className="hero-social">
              <a className="icon-btn" href={person.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a className="icon-btn" href={person.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>

          <dl className="facts hero-in" style={delay(1450)}>
            {facts.map((f) => (
              <div className="fact" key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <HeroBadge />
      <a className="scroll-cue" href="#work" aria-label="Scroll to my work">
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
