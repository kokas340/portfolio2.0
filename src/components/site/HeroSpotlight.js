import React, { useEffect, useRef } from "react";

// The CV's triangle pattern lights up in navy around the cursor, but only
// while the pointer is inside the browser window and over the hero itself.
// Mouse users only; costs one CSS mask.
export default function HeroSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const hero = el && el.closest(".hero");
    if (!el || !hero || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    let raf = 0;
    let x = 0;
    let y = 0;
    let present = false; // pointer is inside the window

    const paint = () => {
      raf = 0;
      const r = hero.getBoundingClientRect();
      const overHero = present && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.classList.toggle("is-on", overHero);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      present = true;
      schedule();
    };
    const onLeave = () => {
      present = false;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // Scrolling moves the hero under a resting cursor, so re-check then too.
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="hero-spotlight" aria-hidden="true" />;
}
