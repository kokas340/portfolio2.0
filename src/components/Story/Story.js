import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storylineData from "./storyline.json";
import "./Story.css";  // Add custom styles here

function Story() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = storylineData.find((proj) => proj.id === id);
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return <div className="text-center">Project not found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          
          <div className="d-flex justify-content-center align-items-center mb-4 flex-wrap gap-2">
            <h2 className="display-5 mb-0">{project.title}</h2>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary"
              >
                View Project
              </a>
            )}
          </div>

          {project.alert && (
            <div className="text-center mb-5">
              <p className="alert alert-warning">{project.alert}</p>
            </div>
          )}

          {project.note && (
            <div className="text-center mb-5">
              <p className="alert alert-info">{project.note}</p>
            </div>
          )}

          <div className="timeline">
            <ul className="timeline-list">
              {project.events.map((event, index) => (
                <li key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h5 className="timeline-date">{event.date}</h5>
                    <h6 className="timeline-milestone">{event.milestone}</h6>
                    <p>{event.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Story;
