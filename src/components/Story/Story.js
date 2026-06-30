import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import storylineData from "./storyline.json";
import "./Story.css"; // Add custom styles here
import Footer from "../Footer/Footer";
import { Button } from "@/components/ui/button";
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
      <div className="container-fluid-pattern77 w-full px-3">
        <div className="relative mx-auto w-full max-w-[1140px] px-3 pt-12">
          <Button
            variant="secondary"
            size="lg"
            className="absolute mt-6"
            style={{ top: "20px", left: "15px" }}
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>

          <div className="flex flex-wrap justify-center">
            <div className="w-full px-3 md:w-2/3">
              <div className="mb-12 flex flex-wrap items-center justify-center gap-12">
                <h2 className="mb-0 text-4xl font-light">{project.title}</h2>
                {project.link && (
                  <Button asChild variant="outline" size="lg">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                )}
              </div>

              {project.alert && (
                <div className="mb-2 text-center">
                  <p className="rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-amber-800 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-200">{project.alert}</p>
                </div>
              )}

              {project.note && (
                <div className="mb-12 text-center">
                  <p className="rounded-md border border-sky-300 bg-sky-100 px-4 py-3 text-sky-800 dark:border-sky-700/50 dark:bg-sky-950/40 dark:text-sky-200">{project.note}</p>
                </div>
              )}
              {project.report && (
                <div className="mb-12 text-center">
                  <Button asChild size="lg" className="mt-2">
                    <a
                      href={`/portfolio2.0/reports/${project.report}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Report
                    </a>
                  </Button>

                </div>
              )}

              {project.video && getYouTubeEmbedUrl(project.video) && (
                <div className="mb-12">
                  <h4 className="mb-4 text-center text-xl font-medium">🎬 Project Walkthrough</h4>
                  <div className="relative aspect-video w-full">
                    <iframe
                      className="absolute inset-0 h-full w-full"
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
