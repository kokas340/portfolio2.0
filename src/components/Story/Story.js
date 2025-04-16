import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import storylineData from "./storyline.json";
import "./Story.css"; // Add custom styles here
import Footer from "../Footer/Footer";
function Story() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProject = storylineData.find((proj) => proj.id === id);
    setProject(foundProject);
  }, [id]);

  if (!project) {
    return <div className="text-center">Project not found.</div>;
  }
  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  return (
    <>
      <div className="container-fluid  container-fluid-pattern3">
        <div className="container  py-5 ">
          <button
            className="btn btn-secondary mb-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="d-flex justify-content-center align-items-center mb-5 flex-wrap gap-5">
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
              {project.video && getYouTubeEmbedUrl(project.video) && (
                <div className="mb-5">
                  <h4 className="mb-3 text-center">🎬 Project Walkthrough</h4>
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={getYouTubeEmbedUrl(project.video)}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  </div>
                </div>
              )}
              <div className="timeline">
                <ul className="timeline-list">
                  {project.events.map((event, index) => (
                    <li key={index} className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h5 className="timeline-date">{event.date}</h5>
                        <h6 className="timeline-milestone">
                          {event.milestone}
                        </h6>
                        <p>{event.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Story;
