import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { nav, person } from "../../data/profile";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [frosted, setFrosted] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // glass blur only once the hero's 3D badge is no longer behind the bar
      setFrosted(window.scrollY > window.innerHeight * 0.95);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mark the nav item for the section crossing the middle of the viewport.
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return undefined;
    }
    const sections = nav.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  // On the home page anchors scroll in place; elsewhere they route home first.
  // Both element types are stable references, so links never remount.
  const Anchor = onHome ? "a" : Link;
  const target = (id) => (onHome ? { href: `#${id}` } : { to: `/#${id}` });

  return (
    <header className={`site-header${scrolled || !onHome ? " is-scrolled" : ""}${frosted || !onHome ? " is-frosted" : ""}`}>
      <div className="container header-inner">
        <Link
          to="/"
          className="brand"
          aria-label={`${person.name}, home`}
          onClick={() => onHome && window.scrollTo({ top: 0 })}
        >
          <span className="brand-mark" aria-hidden="true">
            JS
          </span>
          <span className="brand-name">{person.name}</span>
        </Link>

        <nav className="nav" aria-label="Sections">
          {nav.map((item) => (
            <Anchor key={item.id} {...target(item.id)} aria-current={active === item.id ? "true" : undefined}>
              {item.label}
            </Anchor>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Anchor {...target("contact")} className="btn btn-primary btn-sm">
            Get in touch
          </Anchor>
        </div>
      </div>
    </header>
  );
}
