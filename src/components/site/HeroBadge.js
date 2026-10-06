import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Hand } from "lucide-react";
import "./HeroBadge.css";

// three.js + rapier only download on wide screens that allow motion.
const Lanyard = lazy(() => import("../hero/Lanyard"));

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function alreadyGrabbed() {
  try {
    return sessionStorage.getItem("badge-grabbed") === "1";
  } catch {
    return false;
  }
}

export default function HeroBadge() {
  const wide = useMediaQuery("(min-width: 1180px)");
  const reduce = useReducedMotion();
  const layerRef = useRef(null);
  const [active, setActive] = useState(true);
  const [showHint] = useState(() => !alreadyGrabbed());
  const [grabbed, setGrabbed] = useState(false);

  // Stop rendering and simulating once the hero has scrolled away.
  useEffect(() => {
    const hero = layerRef.current && layerRef.current.closest(".hero");
    if (!hero) return undefined;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, [wide, reduce]);

  const onGrab = useCallback(() => {
    setGrabbed(true);
    try {
      sessionStorage.setItem("badge-grabbed", "1");
    } catch {
      /* the hint simply comes back next visit */
    }
  }, []);

  if (!wide || reduce) return null;

  return (
    <>
      <div className="lanyard-layer" aria-hidden="true" ref={layerRef}>
        <div className="lanyard-box">
          <Suspense fallback={null}>
            <Lanyard position={[0, 0, 30]} gravity={[0, -80, 0]} offsetX={2.6} offsetY={3} active={active} onGrab={onGrab} />
          </Suspense>
        </div>
      </div>
      {showHint && (
        <p className={`badge-hint${grabbed ? " is-gone" : ""}`} aria-hidden="true">
          <Hand size={14} />
          Go on, grab my badge
        </p>
      )}
    </>
  );
}
