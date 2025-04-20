/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef, useEffect, useState } from "react";

import "./Project.css";
import { useNavigate } from "react-router-dom";

function Project({
  id,
  imageSrc,
  title,
  text,
  buttonText,
  technologies,
  buttonLink,
  button,
  showGit,
  hasUrl,
  video,
}) {
  const navigate = useNavigate();
  const buttonRef = useRef();
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const hasFlashed = sessionStorage.getItem("buttonsFlashed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFlashed) {
          setFlash(true);
          sessionStorage.setItem("buttonsFlashed", "true"); // Mark all as flashed
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (buttonRef.current && !hasFlashed) {
      observer.observe(buttonRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container ">
      <div className="row justify-content-center  pbBig">
        {/* Left column for image */}
        <div className="col-xl-7 text-center mt-5">
          {hasUrl ? (
            <a href={`/portfolio2.0/story/${id}`} rel="noopener noreferrer">
              <img
                src={imageSrc}
                alt="Project"
                className="project-image mb-4"
                style={{ width: "100%" }}
              />
            </a>
          ) : (
            <img
              src={imageSrc}
              alt="Project Image"
              className="project-image mb-4"
              style={{ width: "100%" }}
            />
          )}
        </div>
        {/* Right column for title, subtitle, text, and button */}
        <div className="col-xl-5 pdlf d-flex align-items-center ">
          <div className="text-md-left technologies">
            <h2 className="title mb-3">{title}</h2>
            {/* Mapping through technologies array to render squares */}
            <div className="technologies row">
              {technologies.map((tech, index) => (
                <span key={index} className="tech-square col text-center m-1">
                  {tech}
                </span>
              ))}
            </div>
            <p className="project-text mt-3">{text}</p>
            <div className="d-flex gap-3 mt-4 flex-wrap">
              {button && (
                <button
                  ref={buttonRef}
                  className={`btn shadow-sm code-block ${flash ? "flash-once" : ""}`}
                  onClick={() => navigate(`/story/${id}`)}
                >
                  {video && (
                    <span role="img" aria-label="video" style={{ marginRight: "8px" }}>
                      🎥
                    </span>
                  )}
                  {buttonText}
                </button>
              )}
              {showGit && (
                <a
                  className="btn shadow-sm code-block"
                  href={buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
