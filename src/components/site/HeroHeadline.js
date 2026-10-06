import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../../data/profile";

// Words rise into focus one after another; the second line lands a beat later.
const lineVariants = (delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
});
const wordVariants = {
  hidden: { y: "0.4em", opacity: 0, filter: "blur(12px)" },
  show: { y: "0em", opacity: 1, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.2, 0.7, 0.2, 1] } },
};

// The punch line's closing full stop is drawn in the accent colour.
function Word({ word, accent }) {
  if (!accent || !word.endsWith(".")) return word;
  return (
    <>
      {word.slice(0, -1)}
      <span className="accent-dot">.</span>
    </>
  );
}

function Line({ text, className, delay, reduce, accent = false }) {
  const words = text.split(" ");
  const last = words.length - 1;
  if (reduce) {
    return (
      <span className={className}>
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <Word word={word} accent={accent && i === last} />
            {i < last ? " " : null}
          </React.Fragment>
        ))}
      </span>
    );
  }
  return (
    <motion.span className={className} variants={lineVariants(delay)} initial="hidden" animate="show">
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span className="hw" variants={wordVariants}>
            <Word word={word} accent={accent && i === last} />
          </motion.span>
          {i < last ? " " : null}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

export default function HeroHeadline() {
  const reduce = useReducedMotion();
  const [first, second] = hero.title;
  return (
    <h1 className="h1 hero-title" id="hero-title">
      <Line text={first} className="hero-title-lead" delay={0.15} reduce={reduce} />
      <Line text={second} className="hero-title-punch" delay={0.75} reduce={reduce} accent />
    </h1>
  );
}
