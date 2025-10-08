import React, { useEffect, useState, useRef } from "react";
import Timer from "../timer/Timer";
import VariableProximity from "./VariableProximity";
import Lanyard from "./Lanyard";
import "./Hero.css";

function Hero() {
  const [showArrow, setShowArrow] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false); // 👈 track ≥992px
  const containerRef = useRef(null);

  // show/hide scroll arrow
  useEffect(() => {
    const t = setTimeout(() => setShowArrow(true), 4500);
    const onScroll = () => {
      const el = document.getElementById("projects");
      if (!el) return;
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.5) setShowArrow(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  // matchMedia listener for lg breakpoint (992px)
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(min-width: 1200px)");
    const apply = () => setIsDesktop(mql.matches);
    apply();
    // modern browsers
    mql.addEventListener?.("change", apply);
    // fallback (Safari <14)
    mql.addListener?.(apply);
    return () => {
      mql.removeEventListener?.("change", apply);
      mql.removeListener?.(apply);
    };
  }, []);

  const handleArrowClick = () => {
    setShowArrow(false);
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero-wrapper container-fluid-pattern d-flex align-items-center" style={{ minHeight: "100vh" }}>
      {/* CONTENT (left) */}
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-12 col-xl-9 hero-content-col mx-auto mx-xl-0" style={{ position: "relative", zIndex: 50 }}>
            {/* Center <1200; left >=1200 */}
            <div className="hero-content text-center text-xl-start">
              <div className="hero-heading">
                <div ref={containerRef} style={{ position: "relative" }}>
                  <VariableProximity
                    style={{ fontSize: "3.5rem", fontWeight: 400, lineHeight: 1.1 }}
                    label={"I’m Jack Spinola."}
                    className={"variable-proximity-demo"}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef}
                    radius={100}
                    falloff="linear"
                  />
                </div>
              </div>

              <VariableProximity
                style={{ fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.1 }}
                label={"A Software Engineer who enjoys turning ideas into real software."}
                className={"variable-proximity-demo"}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />
              <br />
              <VariableProximity
                style={{ fontSize: "1.2rem", fontWeight: 400, lineHeight: 1.1 }}
                label={"Let’s build something people will love to use."}
                className={"variable-proximity-demo hero-description"}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff="linear"
              />


              {/* Buttons: center <xl; left >=xl */}
              <div className="hero-buttons mb-4 d-flex flex-wrap gap-3 justify-content-center justify-content-xl-start">
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>🚀 View My Projects</button>
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("educations")?.scrollIntoView({ behavior: "smooth" })}>🎓 Education</button>
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>💼 Work</button>
                <button className="btn btn-outline-secondary" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>📖 About Me</button>
              </div>

              {/* Timer: center <xl; left >=xl */}
              <div className="d-flex justify-content-center justify-content-xl-start">
                <Timer />
              </div>
              <div className="hero-timer-note text-center">since my first line of code...</div>
            </div>
          </div>
        </div>
      </div>


      {/* LANYARD OVERLAY (only render on desktop; unmount on mobile) */}
      {isDesktop && (
        <div className="lanyard-layer">
          <div className="lanyard-stage">
            <div className="lanyard-box">
              <Lanyard
                key="lanyard-desktop"       // remount cleanly when toggling
                position={[0, 0, 30]}
                gravity={[0, -60, 0]}
                offsetX={2.6}
                offsetY={2.5}
              />
            </div>
          </div>
        </div>
      )}

      {showArrow && (
        <div className="scroll-down-arrow text-center" onClick={handleArrowClick}>
          <span className="arrow">&#x2193;</span>
        </div>
      )}
    </div>
  );
}

export default Hero;
