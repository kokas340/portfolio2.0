import React, { useEffect, useState } from "react";
import Timer from "../timer/Timer";
import Intro from "../Intro/Intro";
import "./Hero.css";
function Hero() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 6000);

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
      className="container-fluid d-flex flex-column justify-content-center container-fluid-pattern position-relative"
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center  paddingPhone">
        <div className="col-md-12">
          <Timer />
          
          <div className="text-center">
            <p>
              <span className="text-outside-span">Since my first</span>
              <span className="code-block">writeln('Hello, world.');</span>
              <span className="text-outside-span"> - Pascal</span>
            </p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <Intro />
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
