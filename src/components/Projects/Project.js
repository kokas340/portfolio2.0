/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef, useEffect, useState } from "react";

import "./Project.css";
import { useNavigate } from "react-router-dom";

// Vite replacement for webpack's require(): eagerly resolve every image in
// the folder to its built URL, then look one up by filename at render time.
const projectImages = import.meta.glob("../../images/*", {
  eager: true,
  query: "?url",
  import: "default",
});
const imageUrl = (name) => projectImages[`../../images/${name}`];

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
    <div className="mx-auto w-full max-w-[1140px] px-3">
      <div className="flex flex-wrap justify-center pbBig">
        {/* Left column for image */}
        <div className="w-full px-3 text-center mt-12 xl:w-7/12">
          {hasUrl ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a rel="noopener noreferrer">
              <img
                src={imageUrl(imageSrc)}
                alt="Project"
                className="project-image mb-6"
                style={{ width: "100%" }}
              />
            </a>
          ) : (
            <img
              src={imageUrl(imageSrc)}
              alt="Project Image"
              className="project-image mb-6"
              style={{ width: "100%" }}
            />
          )}
        </div>
        {/* Right column for title, subtitle, text, and button */}
        <div className="pdlf flex w-full items-center px-3 xl:w-5/12">
          <div className="technologies md:text-left">
            <h2 className="title mb-4">{title}</h2>
            {/* Mapping through technologies array to render squares */}
            <div className="technologies flex flex-wrap">
              {technologies.map((tech, index) => (
                <span key={index} className="tech-square flex-1 text-center m-1">
                  {tech}
                </span>
              ))}
            </div>
            <p className="project-text mt-4">{text}</p>
            <div className="flex flex-wrap gap-4 mt-6">
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
