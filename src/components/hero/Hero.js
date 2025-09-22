import React, { useEffect, useState, useRef } from "react";
import Timer from "../timer/Timer";
import VariableProximity from "./VariableProximity";
import Lanyard from "./Lanyard";
import "./Hero.css";

function Hero() {
  const [showArrow, setShowArrow] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => setShowArrow(true), 4500);
    const onScroll = () => {
      const el = document.getElementById("projects");
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.5) setShowArrow(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const handleArrowClick = () => {
    setShowArrow(false);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 992px)').matches;

  return (
    <div className="hero-wrapper container-fluid-pattern d-flex align-items-center" style={{ minHeight: "100vh" }}>
      {/* CONTENT (left) */}
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-12 col-lg-8 hero-content-col">
            <div className="hero-content text-lg-start text-center">
              <div className="hero-heading">
                <div
                  ref={containerRef}
                  style={{ position: 'relative' }}
                >
                  <VariableProximity
                    style={{ fontSize: '3.5rem', fontWeight: 400, lineHeight: 1.1 }}
                    label={'I’m Jack Spinola.'}
                    className={'variable-proximity-demo'}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={100}
                    falloff='linear'
                  />
                </div>
              </div>

              <h2 className="hero-subtitle mt-2">
                A Full-Stack Developer who enjoys turning ideas into real software.
              </h2>
              <p className="hero-description">Let’s build something people will love to use.</p>

              <div className="hero-buttons mb-4 d-flex flex-wrap gap-3 justify-content-lg-start justify-content-center">
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>🚀 View My Projects</button>
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("educations")?.scrollIntoView({ behavior: "smooth" })}>🎓 Education</button>
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>💼 Work</button>
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>📖 About Me</button>
              </div>

              <Timer />
              <div className="hero-timer-note">since my first line of code...</div>
            </div>
          </div>
        </div>
      </div>

      {/* LANYARD OVERLAY (right, full-bleed so it never clips) */}
      <div className="lanyard-layer">
        <div className="lanyard-stage">
          <div className="lanyard-box">
            <Lanyard position={[0, 0, 14]} gravity={[0, -40, 0]} offsetX={isDesktop ? 3 : 0} />
          </div>
        </div>
      </div>

      {showArrow && (
        <div className="scroll-down-arrow text-center" onClick={handleArrowClick}>
          <span className="arrow">&#x2193;</span>
        </div>
      )}
    </div>
  );
}

export default Hero;
