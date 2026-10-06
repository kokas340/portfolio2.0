import React, { useEffect, useState } from "react";
import { Check, Copy, Github, Linkedin, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { person } from "../../data/profile";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <button type="button" className="btn btn-sm btn-on-brand" onClick={copy}>
      {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

export default function Contact() {
  const [user, domain] = person.email.split("@");
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact-card">
          <p className="eyebrow">04 / Contact</p>
          <h2 className="h2" id="contact-title">
            Let's build something together.
          </h2>
          <p className="contact-intro">Want to work together, or just talk shop? Email is the fastest way to reach me.</p>
          <div className="contact-email-row">
            <a className="contact-email" href={`mailto:${person.email}`}>
              {user}@<wbr />
              {domain}
            </a>
            <CopyEmail />
          </div>
          <div className="contact-links">
            <a className="btn btn-on-brand" href={person.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
            </a>
            <a className="btn btn-on-brand" href={person.links.github} target="_blank" rel="noreferrer">
              <Github size={16} aria-hidden="true" />
              GitHub
            </a>
            <a className="btn btn-on-brand" href={person.links.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={16} aria-hidden="true" />
              {person.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
