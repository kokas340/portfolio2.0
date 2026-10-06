import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { facts, hero, person } from "../../data/profile";
import HeroBadge from "./HeroBadge";
import HeroHeadline from "./HeroHeadline";
import HeroSpotlight from "./HeroSpotlight";

const ease = [0.2, 0.7, 0.2, 1];
// Everything under the headline follows once its second line has landed.
const rest = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 1.25 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const group = reduce ? {} : { variants: rest, initial: "hidden", animate: "show" };
  const item = reduce ? {} : { variants: rise };
  const eyebrowMotion = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease } };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroSpotlight />
      <div className="container">
        <div className="hero-copy">
          <motion.p className="eyebrow" {...eyebrowMotion}>
            {hero.eyebrow}
          </motion.p>
          <HeroHeadline />
          <motion.div {...group}>
            <motion.p className="lede" {...item}>
              {hero.lede}
            </motion.p>

            <motion.div className="hero-actions" {...item}>
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
            </motion.div>

            <motion.dl className="facts" {...item}>
              {facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
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
