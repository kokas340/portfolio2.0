import React, { useEffect, useRef } from "react";

const RADIUS = 250;

// The CV's triangle pattern lights up in navy around the cursor, but only while
// the pointer is inside the window and over the hero. It moves purely with
// transforms (a circular window, with the pattern inside counter-moved so it stays
// pinned to the page), so following the mouse never repaints anything.
export default function HeroSpotlight() {
  const ref = useRef(null);
  const patternRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const pattern = patternRef.current;
    const hero = el && el.closest(".hero");
    if (!el || !pattern || !hero || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    let raf = 0;
    let x = 0;
    let y = 0;
    let present = false; // pointer is inside the window

    // Same box as the page background (body::before), so the triangles line up.
    const size = () => {
      pattern.style.width = `${document.documentElement.clientWidth}px`;
      pattern.style.height = `${window.innerHeight}px`;
    };
    const paint = () => {
      raf = 0;
      // Frozen while the badge is being dragged (see Lanyard): hidden by CSS and not
      // moved, so it never competes with the badge for the GPU.
      if (document.body.classList.contains("badge-dragging")) return;
      const r = hero.getBoundingClientRect();
      const overHero = present && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      el.style.transform = `translate3d(${x - RADIUS}px, ${y - RADIUS}px, 0)`;
      pattern.style.transform = `translate3d(${RADIUS - x}px, ${RADIUS - y}px, 0)`;
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
    const onResize = () => {
      size();
      schedule();
    };

    size();
    window.addEventListener("pointermove", onMove, { passive: true });
    // Scrolling moves the hero under a resting cursor, so re-check then too.
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-spotlight" aria-hidden="true">
      <div ref={patternRef} className="hero-spotlight-pattern" />
    </div>
  );
}
