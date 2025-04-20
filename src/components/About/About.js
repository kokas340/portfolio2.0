import React from "react";
import "./About.css";

function About() {
  const techStacks = {
    Frontend: [
      "React",
      "ReactNative",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
      "Redux",
      "Framer Motion",
      "Material UI",
    ],
    Backend: [
      "Java",
      "C#",
      ".NET",
      "SpringBoot",
      "PHP",
      "CodeIgniter",
      "Node.js",
      "Express.js",
      "MongoDB",
      "GraphQL",
      "Firebase",
      "Redis",
    ],
    DevOps: [
      "Docker",
      "Kubernetes",
      "Azure",
      "GitHub Actions",
      "Nginx",
      "Jenkins",
    ],
    Tools: [
      "Git",
      "Github",
      "YOLOv9",
      "PyTorch",
      "OpenCV",
      "SuperGradients",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "TQDM",
      "LabelImg",
      "PyQt5",
      "PostgreSQL",
    ],
  };

  return (
    <section id="about" className="about-section container-fluid-pattern2">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Text Section */}
          <div className="col-lg-6">
            <h2 className="about-title">About Me 👨🏻‍💻</h2>
            <p className="about-text mt-3">
              I'm a{" "}
              <strong>
                {new Date().getFullYear() -
                  2002 -
                  (new Date().getMonth() > 8 ? 0 : 1)}
                -year-old software engineer
              </strong>{" "}
              currently based in <strong>Aarhus, Denmark</strong>. My journey
              into tech began in high school with a focus on Informatics &
              Programming, and I'm now pursuing my Bachelor's degree in{" "}
              <strong>Software Engineering</strong> at VIA University College.
            </p>
            <p className="about-text mt-3">
              I’ve taken on a variety of roles in team projects including{" "}
              <strong>Team Leader</strong> and <strong>Scrum Master</strong>,
              contributing to full-stack apps and systems ranging from smart pet
              feeders to collaborative task management tools. These experiences
              have helped me grow not just technically, but also as a
              communicator and team player.
            </p>
            <p className="about-text mt-3">
              I value <strong>collaboration</strong> and believe that sharing
              knowledge and working toward a common goal is one of the most
              rewarding parts of software development. Outside of coding, I’m
              passionate about <strong>music, sports, and traveling</strong> —
              anything that sparks creativity or gets me moving.
            </p>
          </div>

          {/* Skills Section */}
          <div className="col-lg-6">
            <h4 className="skills-title">Tech Stack 💻</h4>
            {Object.entries(techStacks).map(([category, skills], idx) => (
              <div className="skill-group mb-3" key={idx}>
                <h6 className="skill-category">{category}</h6>
                <div className="skill-badges">
                  {skills.map((tech, i) => (
                    <span className="badge tech-badge" key={i}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
