/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./Project.css";

function Project({
  imageSrc,
  title,
  text,
  buttonText,
  buttonLink,
  technologies,
}) {
  return (
    <div className="container">
      <div className="row justify-content-center  ">
        {/* Left column for image */}
        <div className="col-xl-7 text-center">
          <img
            src={imageSrc}
            alt="Project Image"
            className="project-image"
            style={{ width: "100%" }}
          />
        </div>
        {/* Right column for title, subtitle, text, and button */}
        <div className="col-xl-5 pdlf d-flex align-items-center pbBig">
          <div className="text-md-left">
            <h2 className="title mb-3">{title}</h2>
            {/* Mapping through technologies array to render squares */}
            <div className="technologies">
              {technologies.map((tech, index) => (
                <span key={index} className="tech-square ">
                  {tech}
                </span>
              ))}
            </div>
            <p className="project-text mt-3">{text}</p>
            <a
              href={buttonLink}
              className="btn shadow-sm code-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
