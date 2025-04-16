import React from "react";
import "./About.css";

function About() {
  const technologies = [
    "Java",
    "C#",
    ".NET",
    "SpringBoot",
    "React",
    "ReactNative",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind",
    "Azure",
    "Docker",
    "Kubernetes",
    "PHP",
    "CodeIgniter",
    "Git",
    "Github",
  ];

  return (
    <div className=" container-fluid-pattern2">
      <div className="container">
        <div className="row justify-content-center pb-5">
          <div className="col-md-12 text-center mb-5">
            <p className="titleMain">About Me 👨🏻‍💻</p>
            <hr className="custom-hr mb-3" />
            <p className="subtitle2">
              Here you will find more information about me, what I do, and my
              current skills mostly in terms of programming and technologies.
            </p>
          </div>
        </div>
        <div className="row justify-content-center pb-5">
          <div className="col-md-6 ">
            <p className="subtitleAbout">Get to know me! 🧑🏻</p>
            <p className="w-100 experience-description mt-5">
              I'm a{" "}
              <b>
                {new Date().getFullYear() -
                  2002 -
                  (new Date().getMonth() > 8 ? 0 : 1)}
                -year-old programmer
              </b>{" "}
              currently living in <b>Aarhus, Denmark</b>. I started programming
              in <b>2018</b> and am currently in my <b></b>5th semester of{" "}
              <b>Software Engineering</b>. My objective is to obtain a
              challenging role as a Software Engineer where I can apply my{" "}
              <b>programming skills </b>and <b>gain experience</b> in the field.
              Let's grab a coffee sometime and discuss technology!
            </p>
          </div>
          <div className="col-xl-5 pdlf d-flex align-items-center ">
            <div className="text-md-left technologies">
              <p className="subtitleAbout">My Skills 📐</p>
              {/* Mapping through technologies array to render squares */}
              <div className="technologies row">
                {technologies.map((tech, index) => (
                  <span key={index} className="tech-square col text-center m-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
