import React, { useEffect, useRef, useState } from "react";
import { hero } from "../../data/profile";

// After the entrance, the developer line's last words walk through the job:
// "build it.", "test it.", "ship it.", "run it.". Each step holds, dissolves
// upward, and the next rises in letter by letter. The motion is CSS keyframes
// (compositor-driven, so it stays smooth next to the 3D badge); React only swaps
// the text.
const FIRST_HOLD_MS = 3800; // the entrance lands at ~1.7s; let it read first
const HOLD_MS = 2900; // per step, counted from when it starts rising in
const OUT_MS = 360; // the old step's exit, stagger included
const STEP_DELAY_MS = 890; // the first step follows "Then I" in the entrance

// Screen readers get the whole sentence once, not a word that keeps changing.
const spoken = `${hero.title} ${hero.then} ${hero.steps
  .map((s) => s.replace(/\.$/, ""))
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1")}.`;

// Words rise into focus one after another (CSS keyframes, so the entrance runs
// on the compositor and stays smooth while the 3D badge loads in the background).
function Words({ text, startMs }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <React.Fragment key={i}>
      <span className="hw" style={{ animationDelay: `${startMs + i * 70}ms` }}>
        {word}
      </span>
      {i < words.length - 1 ? " " : null}
    </React.Fragment>
  ));
}

// One step, letter by letter. Words stay unbreakable and the closing full stop
// is drawn in the accent colour.
function Step({ text, startMs, leaving }) {
  const words = text.split(" ");
  let n = 0;
  return (
    <span className={`hero-step${leaving ? " is-leaving" : ""}`}>
      {words.map((word, w) => (
        <React.Fragment key={w}>
          <span className="hero-step-word">
            {Array.from(word).map((ch, c) => {
              const i = n++;
              const dot = ch === "." && w === words.length - 1 && c === word.length - 1;
              return (
                <span key={c} className="hc" style={{ animationDelay: `${leaving ? i * 9 : startMs + i * 26}ms` }}>
                  {dot ? <span className="accent-dot">.</span> : ch}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function HeroHeadline() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("in"); // "in": showing, "out": dissolving
  const [first, setFirst] = useState(true);
  const [running, setRunning] = useState(false);

  // Cycle only while the headline is on screen, the tab is visible and the
  // visitor hasn't asked for reduced motion.
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = true;
    const update = () => setRunning(onScreen && !document.hidden && !calm.matches);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    io.observe(ref.current);
    document.addEventListener("visibilitychange", update);
    calm.addEventListener("change", update);
    update();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const advance = () => {
      setIndex((i) => (i + 1) % hero.steps.length);
      setFirst(false);
      setPhase("in");
    };
    if (!running) {
      if (phase === "out") advance(); // never park on a half-dissolved step
      return undefined;
    }
    const timer = phase === "in" ? setTimeout(() => setPhase("out"), first ? FIRST_HOLD_MS : HOLD_MS) : setTimeout(advance, OUT_MS);
    return () => clearTimeout(timer);
  }, [running, phase, first, index]);

  return (
    <h1 className="h1 hero-title" id="hero-title" ref={ref}>
      <span className="visually-hidden">{spoken}</span>
      <span aria-hidden="true">
        <span className="hero-title-lead">
          <Words text={hero.title} startMs={150} />
        </span>
        <span className="hero-title-punch">
          <Words text={hero.then} startMs={750} />{" "}
          <Step key={index} text={hero.steps[index]} startMs={first ? STEP_DELAY_MS : 0} leaving={phase === "out"} />
        </span>
      </span>
    </h1>
  );
}
