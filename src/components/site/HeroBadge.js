import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./HeroBadge.css";

const loadLanyard = () => import("../hero/Lanyard");
const Lanyard = lazy(loadLanyard);

// Badge geometry. At full size one world unit is 18.9% of the viewport height
// (the card is about 30vh x 42vh). The canvas is exactly one viewport tall and
// the camera's field of view sets the scale; the strap anchor sits above the top
// of the page, out of sight behind the header.
const UNIT_VH = 0.18904;
const CAMERA_Z = 30;
const ANCHOR_Y = (0.5 + 0.3233) / UNIT_VH; // world units above the canvas centre
const CARD_W = 1.6; // card width in world units (its collider's half-width is 0.8)
// The text column stops growing at the container width but the card grows with
// the window's height, so on a tall window it shrinks to keep at least GAP px
// clear of the text. Below MIN_SCALE the anchor would slide into view.
const GAP = 72;
const MIN_SCALE = 0.6;
// A wider view draws the whole rig smaller, around the canvas centre.
const fovFor = (scale) => (2 * Math.atan(0.5 / (scale * UNIT_VH) / CAMERA_Z) * 180) / Math.PI; // ~10.08deg at full size

// Where the hero text ends: the headline and lede text themselves (their block
// boxes run the column's full width), the buttons, and the facts row's rule.
function textEdge(copy) {
  const range = document.createRange();
  let edge = copy.getBoundingClientRect().left;
  for (const el of copy.querySelectorAll(".hero-title-lead, .hero-title-punch, .lede")) {
    range.selectNodeContents(el);
    edge = Math.max(edge, range.getBoundingClientRect().right);
  }
  for (const el of copy.querySelectorAll(".hero-actions > *, .facts")) edge = Math.max(edge, el.getBoundingClientRect().right);
  return edge;
}

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

export default function HeroBadge() {
  const wide = useMediaQuery("(min-width: 1180px)");
  const reduce = useReducedMotion();
  const enabled = wide && !reduce;
  const layerRef = useRef(null);
  const [box, setBox] = useState(null);
  const [start, setStart] = useState(false);
  const [readyKey, setReadyKey] = useState(null); // the geometry whose scene has rendered
  const [active, setActive] = useState(true);
  const ready = !!box && readyKey === box.key;

  // The canvas spans the window's width and one viewport's height, so the card
  // can be dragged (and the strap stretched) anywhere in the hero without being
  // cut off at an edge.
  const measure = useCallback(() => {
    const hero = layerRef.current && layerRef.current.closest(".hero");
    const container = hero && hero.querySelector(".container");
    const copy = hero && hero.querySelector(".hero-copy");
    if (!container || !copy) return;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const right = container.getBoundingClientRect().right - parseFloat(getComputedStyle(container).paddingRight);
    const scale = Math.min(1, Math.max(MIN_SCALE, (right - textEdge(copy) - GAP) / (CARD_W * UNIT_VH * vh)));
    const unit = scale * UNIT_VH * vh; // px per world unit
    const anchorX = right - (CARD_W / 2) * unit; // card flush with the content's right edge
    const left = 0;
    const width = vw;
    const key = `${left}:${width}:${vh}:${Math.round(scale * 1000)}`;
    setBox((prev) => (prev && prev.key === key ? prev : { key, left, width, height: vh, scale, offsetX: (anchorX - (left + width / 2)) / unit }));
  }, []);

  // Download and parse the 3D bundle straight away, but only mount it once the
  // headline has landed, the web fonts are in (the text's width sets the badge's
  // size) and the browser is idle, so the reveal never stutters.
  useEffect(() => {
    if (!enabled) return undefined;
    loadLanyard();
    let cancelled = false;
    let idle = 0;
    const fonts = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 2500))]);
    const timer = setTimeout(() => {
      fonts.then(() => {
        if (cancelled) return;
        const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 50));
        idle = ric(
          () => {
            if (cancelled) return;
            measure();
            setStart(true);
          },
          { timeout: 700 }
        );
      });
    }, 1300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
    };
  }, [enabled, measure]);

  // Re-measure once a resize (or zoom) settles. A new geometry rebuilds the
  // scene (the key below): rapier would otherwise teleport the rig back to its
  // starting pose, and a sleeping badge would not even redraw.
  useLayoutEffect(() => {
    if (!enabled) return undefined;
    measure();
    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [enabled, measure]);

  // Stop rendering and simulating once the hero has scrolled away.
  useEffect(() => {
    const hero = layerRef.current && layerRef.current.closest(".hero");
    if (!hero) return undefined;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`lanyard-layer${ready ? " is-ready" : ""}`} aria-hidden="true" ref={layerRef}>
      {box && start && (
        <div key={box.key} className="lanyard-box" style={{ left: box.left, width: box.width, height: box.height }}>
          <Suspense fallback={null}>
            <Lanyard
              fov={fovFor(box.scale)}
              position={[0, 0, CAMERA_Z]}
              gravity={[0, -80, 0]}
              offsetX={box.offsetX}
              offsetY={ANCHOR_Y - 4}
              active={active}
              running={ready && active}
              onReady={() => setReadyKey(box.key)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
