import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertTriangle, Info } from "lucide-react";
import storylineData from "./storyline.json";
import "./Story.css"; // Add custom styles here
import Footer from "../Footer/Footer";
import { Button } from "@/components/ui/button";

// Deterministic 7-char pseudo "commit hash" from a string (no randomness, so
// it stays stable across renders). Only surfaced in terminal / git-log mode.
function shortHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2024-02" -> "Feb 2024";  "2024-12-10" -> "Dec 10, 2024"
function formatDate(raw) {
  const parts = String(raw).split("-");
  const year = parts[0];
  const month = MONTHS[parseInt(parts[1], 10) - 1] || "";
  if (parts.length >= 3) return `${month} ${parseInt(parts[2], 10)}, ${year}`;
  if (parts.length === 2) return `${month} ${year}`;
  return raw;
}

// Track the terminal-mode toggle (the `.dark` class on <html>).
function useIsDark() {
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setIsDark(el.classList.contains("dark"));
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    sync();
    return () => obs.disconnect();
  }, []);
  return isDark;
}

/**
 * Process timeline. Renders two entirely different structures depending on
 * theme — a clean, recruiter-friendly stepped timeline in normal mode, and a
 * `git log --graph` terminal panel in terminal mode. Both share the same
 * scroll-driven progress logic (spine fills, nodes activate, current pulses).
 * Re-mounted by a `key` on theme change so the scroll tracking re-initializes.
 */
function ProcessTimeline({ events, projectId, isDark }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const itemRefs = useRef([]);

  // Activate each node as its dot crosses a fixed reveal line in the viewport,
  // and size the fill bar to match. Driven off the real on-screen position of
  // each node (not container-relative fractions) so the last node reliably
  // lights up even when the page can't scroll far past it.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const nodes = itemRefs.current.filter(Boolean);
      if (!nodes.length) return;
      // At the bottom of the page the timeline is complete — the last node(s)
      // may sit below the reveal line with no room left to scroll, so treat the
      // line as unbounded once we've hit the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const line = atBottom ? Infinity : window.innerHeight * 0.55;
      const centerOf = (item) => {
        const dot = item.firstElementChild || item;
        const r = dot.getBoundingClientRect();
        return r.top + r.height / 2;
      };
      const centers = nodes.map(centerOf);

      let current = -1;
      nodes.forEach((el, i) => {
        const reached = centers[i] <= line;
        el.classList.toggle("is-reached", reached);
        if (reached) current = i;
      });
      nodes.forEach((el, i) => el.classList.toggle("is-current", i === current));

      // Fill bar runs from the first node down to the reveal line, clamped to
      // the last node so it stops exactly on the final commit. `top` is set
      // relative to the bar's own positioned parent (differs per variant).
      const bar = barRef.current;
      if (bar) {
        const parentTop = (bar.offsetParent || root).getBoundingClientRect().top;
        const first = centers[0];
        const last = centers[centers.length - 1];
        const clamped = Math.max(first, Math.min(line, last));
        bar.style.top = `${first - parentTop}px`;
        bar.style.height = `${Math.max(0, clamped - first)}px`;
      }
    };

    update();
    const raf = requestAnimationFrame(update); // re-measure after layout settles
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [events, isDark]);

  // ---- Terminal mode: git log --graph ----
  if (isDark) {
    return (
      <div className="gitlog" ref={rootRef}>
        <div className="gitlog-chrome">
          <span className="gitlog-dot gitlog-dot--r" />
          <span className="gitlog-dot gitlog-dot--y" />
          <span className="gitlog-dot gitlog-dot--g" />
          <span className="gitlog-title">
            jack@portfolio: ~/projects/{projectId}
          </span>
        </div>
        <div className="gitlog-body">
          <div className="gitlog-cmd">
            <span className="gitlog-prompt">$</span>
            git log --graph --oneline {projectId}
          </div>
          <div className="gitlog-list">
            <div className="gitlog-progress" ref={barRef} />
            {events.map((event, index) => (
              <div
                key={index}
                className="gitlog-commit"
                ref={(el) => (itemRefs.current[index] = el)}
              >
                <span className="gitlog-node" />
                <div className="gitlog-entry">
                  <div className="gitlog-line">
                    <span className="gitlog-hash">
                      {shortHash(event.milestone + event.date)}
                    </span>
                    <span className="gitlog-date">{event.date}</span>
                    {index === events.length - 1 && (
                      <span className="gitlog-ref">(HEAD -&gt; main)</span>
                    )}
                  </div>
                  <div className="gitlog-milestone">{event.milestone}</div>
                  <p className="gitlog-desc">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---- Normal mode: clean stepped timeline ----
  return (
    <div className="ptl" ref={rootRef}>
      <div className="ptl-progress" ref={barRef} />
      {events.map((event, index) => (
        <div
          key={index}
          className="ptl-item"
          ref={(el) => (itemRefs.current[index] = el)}
        >
          <span className="ptl-node">{index + 1}</span>
          <div className="ptl-card">
            <span className="ptl-date">{formatDate(event.date)}</span>
            <h3 className="ptl-milestone">{event.milestone}</h3>
            <p className="ptl-desc">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Story() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();
  const isDark = useIsDark();

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
                <div className="story-callout story-callout--warn" role="note">
                  <AlertTriangle className="story-callout-icon" size={20} aria-hidden="true" />
                  <span>{project.alert}</span>
                </div>
              )}

              {project.note && (
                <div className="story-callout story-callout--info" role="note">
                  <Info className="story-callout-icon" size={20} aria-hidden="true" />
                  <span>{project.note}</span>
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

              <ProcessTimeline
                key={isDark ? "terminal" : "standard"}
                events={project.events}
                projectId={project.id}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Story;
