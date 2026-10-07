import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CircleAlert, Info } from "lucide-react";
import storylineData from "./storyline.json";
import ProjectLink from "../site/ProjectLink";
import { featured, moreProjects } from "../../data/profile";

const projects = [...featured, ...moreProjects];

// Deterministic 7-char pseudo "commit hash" from a string (stable across
// renders). Only surfaced in terminal / git-log mode.
function shortHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
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
 * Process timeline. A numbered timeline in normal mode and a `git log --graph`
 * panel in terminal mode. Both share the same scroll-driven progress logic
 * (spine fills, nodes activate, current one highlighted). Re-mounted by a `key`
 * on theme change so the scroll tracking re-initializes.
 */
function ProcessTimeline({ events, projectId, isDark }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const itemRefs = useRef([]);

  // Activate each node as its dot crosses a fixed reveal line in the viewport,
  // and size the fill bar to match.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const update = () => {
      const nodes = itemRefs.current.filter(Boolean);
      if (!nodes.length) return;
      // At the bottom of the page the timeline is complete, even if the last
      // nodes sit below the reveal line with no room left to scroll.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
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
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [events, isDark]);

  if (isDark) {
    return (
      <div className="gitlog" ref={rootRef}>
        <div className="gitlog-chrome">
          <span className="gitlog-dot gitlog-dot--r" />
          <span className="gitlog-dot" />
          <span className="gitlog-dot" />
          <span className="gitlog-title">jack@portfolio: ~/projects/{projectId}</span>
        </div>
        <div className="gitlog-body">
          <div className="gitlog-cmd">
            <span className="gitlog-prompt">$</span>
            git log --graph --oneline {projectId}
          </div>
          <div className="gitlog-list">
            <div className="gitlog-progress" ref={barRef} />
            {events.map((event, index) => (
              <div key={index} className="gitlog-commit" ref={(el) => (itemRefs.current[index] = el)}>
                <span className="gitlog-node" />
                <div className="gitlog-entry">
                  <div className="gitlog-line">
                    <span className="gitlog-hash">{shortHash(event.milestone + event.date)}</span>
                    <span className="gitlog-date">{event.date}</span>
                    {index === events.length - 1 && <span className="gitlog-ref">(HEAD -&gt; main)</span>}
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

  return (
    <div className="ptl" ref={rootRef}>
      <div className="ptl-progress" ref={barRef} aria-hidden="true" />
      <ol className="ptl-list">
        {events.map((event, index) => (
          <li key={index} className="ptl-item" ref={(el) => (itemRefs.current[index] = el)}>
            <span className="ptl-node" aria-hidden="true">
              {index + 1}
            </span>
            <div className="ptl-card">
              <span className="ptl-date">{formatDate(event.date)}</span>
              <h3 className="ptl-milestone">{event.milestone}</h3>
              <p className="ptl-desc">{event.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function youTubeEmbed(url) {
  const match = String(url).match(/^https?:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+)/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[2]}` : null;
}

export default function Story() {
  const { id } = useParams();
  const isDark = useIsDark();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];
  const story = storylineData.find((s) => s.id === id);

  useEffect(() => {
    document.title = project ? `${project.title} · Jack Spinola` : "Project not found · Jack Spinola";
  }, [project]);

  if (!project || !story) {
    return (
      <section className="story">
        <div className="container story-wrap">
          <Link to="/#work" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <div className="story-head">
            <h1 className="h1">Project not found.</h1>
          </div>
        </div>
      </section>
    );
  }

  const withStory = projects.filter((p) => storylineData.some((s) => s.id === p.id));
  const next = withStory[(withStory.findIndex((p) => p.id === id) + 1) % withStory.length];
  const external = project.links.filter((l) => l.href);
  const embed = story.video && youTubeEmbed(story.video);

  return (
    <article className="story">
      <div className="container story-wrap">
        <Link to="/#work" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" /> All work
        </Link>

        <header className="story-head">
          <p className="meta">
            {project.year} · {project.context || project.role}
          </p>
          <h1 className="h1">{project.title}</h1>
          <p className="lede">{project.summary}</p>

          <dl className="story-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            {project.stack && (
              <div>
                <dt>Built with</dt>
                <dd>{project.stack.join(" · ")}</dd>
              </div>
            )}
          </dl>

          {external.length > 0 && (
            <div className="links">
              {external.map((l) => (
                <ProjectLink key={l.label} link={l} />
              ))}
            </div>
          )}

          {story.alert && (
            <p className="callout">
              <CircleAlert size={16} aria-hidden="true" />
              <span>{story.alert}</span>
            </p>
          )}
          {story.note && (
            <p className="callout">
              <Info size={16} aria-hidden="true" />
              <span>{story.note}</span>
            </p>
          )}
        </header>

        {embed && (
          <section className="story-section" aria-labelledby="walkthrough">
            <h2 className="subhead" id="walkthrough">
              Walkthrough
            </h2>
            <div className="frame video-frame">
              <iframe
                src={embed}
                title={`${project.title} walkthrough video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section className="story-section" aria-labelledby="process">
          <h2 className="subhead" id="process">
            How it came together
          </h2>
          <ProcessTimeline key={isDark ? "terminal" : "standard"} events={story.events} projectId={project.id} isDark={isDark} />
        </section>

        {next && next.id !== project.id && (
          <nav className="story-section story-next" aria-label="Next project">
            <p className="subhead">Next project</p>
            <Link to={`/story/${next.id}`} className="story-next-link">
              <span>{next.title}</span>
              <ArrowRight size={22} aria-hidden="true" />
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
