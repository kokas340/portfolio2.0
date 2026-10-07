import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

// Internal case studies route within the app; everything else opens in a new tab.
export default function ProjectLink({ link }) {
  if (link.story) {
    return (
      <Link className="link" to={`/story/${link.story}`}>
        {link.label}
        <ArrowRight size={15} className="icon-next" aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a className="link" href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
      <ArrowUpRight size={15} className="icon-out" aria-hidden="true" />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
