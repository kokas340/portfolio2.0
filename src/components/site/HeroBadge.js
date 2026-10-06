import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Hand } from "lucide-react";
import "./HeroBadge.css";

const loadLanyard = () => import("../hero/Lanyard");
const Lanyard = lazy(loadLanyard);

// Badge geometry. One world unit is 18.9% of the viewport height (the card is
// about 30vh x 42vh). The canvas is exactly one viewport tall, so the camera's
// vertical field of view is a constant, and the strap anchor sits ~32vh above
// the top of the page, out of sight behind the header.
const UNIT_VH = 0.18904;
const CAMERA_Z = 30;
const FOV = (2 * Math.atan(0.5 / UNIT_VH / CAMERA_Z) * 180) / Math.PI; // ~10.08deg
const ANCHOR_Y = (0.5 + 0.3233) / UNIT_VH; // world units above the canvas centre

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
  const enabled = wide && !reduce;
  const layerRef = useRef(null);
  const [box, setBox] = useState(null);
  const [start, setStart] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [showHint] = useState(() => !alreadyGrabbed());
  const [grabbed, setGrabbed] = useState(false);

  // Download and parse the 3D bundle straight away, but only mount it once the
  // headline has landed and the browser is idle, so the reveal never stutters.
  useEffect(() => {
    if (!enabled) return undefined;
    loadLanyard();
    let idle = 0;
    const timer = setTimeout(() => {
      const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
      idle = ric(() => setStart(true), { timeout: 700 });
    }, 1300);
    return () => {
      clearTimeout(timer);
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
    };
  }, [enabled]);

  // The canvas covers only the badge's playing field: one viewport tall, from
  // 0.75 viewport-heights left of the anchor (room for swings) to the window edge.
  // About a third of the pixels the old two-screen, full-width canvas drew.
  useLayoutEffect(() => {
    if (!enabled) return undefined;
    const measure = () => {
      const container = layerRef.current && layerRef.current.closest(".hero")?.querySelector(".container");
      if (!container) return;
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const right = container.getBoundingClientRect().right - parseFloat(getComputedStyle(container).paddingRight);
      // card (0.8 units = 15.1vh half-width) flush with the content's right edge
      const anchorX = right - 0.8 * UNIT_VH * vh;
      const left = Math.max(0, Math.round(anchorX - 0.75 * vh));
      const width = vw - left;
      setBox({ left, width, height: vh, anchorX, offsetX: (anchorX - (left + width / 2)) / (UNIT_VH * vh) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [enabled]);

  // Stop rendering and simulating once the hero has scrolled away.
  useEffect(() => {
    const hero = layerRef.current && layerRef.current.closest(".hero");
    if (!hero) return undefined;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, [enabled]);

  const onReady = useCallback(() => setReady(true), []);
  const onGrab = useCallback(() => {
    setGrabbed(true);
    try {
      sessionStorage.setItem("badge-grabbed", "1");
    } catch {
      /* the hint simply comes back next visit */
    }
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className={`lanyard-layer${ready ? " is-ready" : ""}`} aria-hidden="true" ref={layerRef}>
        {box && start && (
          <div className="lanyard-box" style={{ left: box.left, width: box.width, height: box.height }}>
            <Suspense fallback={null}>
              <Lanyard
                fov={FOV}
                position={[0, 0, CAMERA_Z]}
                gravity={[0, -80, 0]}
                offsetX={box.offsetX}
                offsetY={ANCHOR_Y - 4}
                active={active}
                running={ready && active}
                onReady={onReady}
                onGrab={onGrab}
              />
            </Suspense>
          </div>
        )}
      </div>
      {showHint && box && ready && (
        <p className={`badge-hint${grabbed ? " is-gone" : ""}`} style={{ left: box.anchorX }} aria-hidden="true">
          <Hand size={14} />
          Go on, grab my badge
        </p>
      )}
    </>
  );
}
