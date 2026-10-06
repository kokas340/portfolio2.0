import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/site/Hero";
import Work from "../components/site/Work";
import Experience from "../components/site/Experience";
import About from "../components/site/About";
import Contact from "../components/site/Contact";
import { person } from "../data/profile";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = `${person.name} · Product Owner & Developer`;
  }, []);

  // Arriving from a case study with /#section: scroll to it once rendered.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [hash]);

  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
