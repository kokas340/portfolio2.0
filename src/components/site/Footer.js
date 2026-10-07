import React from "react";
import { Github } from "lucide-react";
import { person } from "../../data/profile";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <p>
            © {new Date().getFullYear()} {person.name}. No rights reserved.
          </p>
          <a className="footer-source" href={person.links.source} target="_blank" rel="noopener noreferrer">
            <Github size={15} aria-hidden="true" />
            View source
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
