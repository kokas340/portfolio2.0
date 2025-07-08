import React, { useEffect, useState } from "react";
import Timer from "../timer/Timer";
import Intro from "../Intro/Intro";
import jack from "../../images/jack.svg";
import jackIrl from "../../images/jack.jpg";

import "./Hero.css";
function Hero() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 4500);

    const handleScroll = () => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        const projectsTop = projectsSection.getBoundingClientRect().top;
        if (projectsTop <= window.innerHeight * 0.5) {
          setShowArrow(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleArrowClick = () => {
    setShowArrow(false); // Hide the arrow after click
    const targetSection = document.getElementById("projects");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center container-fluid-pattern position-relative text-center hero-wrapper"
      style={{ minHeight: "100vh" }}
    >
      <div className="hero-content">
        <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <img
                src={jack}
                alt="Jack Spinola"
                className="hero-avatar mb-3"
              />
            </div>
            <div className="back">
              <img
                src={jackIrl}
                alt="Jack Spinola"
                className="hero-avatar mb-3"
              />
            </div>
          </div>
        </div>



        <h1 className="hero-title">
          Hi there! I’m Jack Spinola <span role="img" aria-label="waving hand">👋</span>
        </h1>

        <h2 className="hero-subtitle">
          I’m a Full-Stack Developer who enjoys turning ideas into real software.
        </h2>

        <p className="hero-description">
          Let’s build something people will love to use.
        </p>

        <div className="hero-buttons mb-4">
          <button
            className="btn btn-outline-secondary"
            onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
          >
            🚀 View My Projects
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => document.getElementById("education").scrollIntoView({ behavior: "smooth" })}
          >
            🎓 Education
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
          >
            📖 About Me
          </button>
        </div>


        <Timer />
        <div className="hero-timer-note ">
           since my first line of code...
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
