import React from "react";
import { hero } from "../../data/profile";

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

// Words rise into focus one after another (CSS keyframes, so the animation runs
// on the compositor and stays smooth while the 3D badge loads in the background).
function Line({ text, className, startMs, accent = false }) {
  const words = text.split(" ");
  const last = words.length - 1;
  return (
    <span className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="hw" style={{ animationDelay: `${startMs + i * 70}ms` }}>
            <Word word={word} accent={accent && i === last} />
          </span>
          {i < last ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function HeroHeadline() {
  const [first, second] = hero.title;
  return (
    <h1 className="h1 hero-title" id="hero-title">
      <Line text={first} className="hero-title-lead" startMs={150} />
      <Line text={second} className="hero-title-punch" startMs={750} accent />
    </h1>
  );
}
