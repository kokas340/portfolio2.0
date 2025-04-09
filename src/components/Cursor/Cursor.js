import React, { useEffect, useRef, useState } from "react";
import "./Cursor.css";
import cursorImg from "../../images/cursor.png"; // <-- adjust path if needed

function Cursor() {
    const cursorRef = useRef(null);
    const requestRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
  
    const [hovered, setHovered] = useState(false);
  
    useEffect(() => {
      const updateCursor = () => {
        if (cursorRef.current) {
          cursorRef.current.style.left = `${mousePos.current.x}px`;
          cursorRef.current.style.top = `${mousePos.current.y}px`;
        }
        requestRef.current = requestAnimationFrame(updateCursor);
      };
  
      const handleMouseMove = (e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
      };
  
      const handleMouseOver = (e) => {
        if (e.target.tagName === "A" || e.target.closest("button")) {
          setHovered(true);
        } else {
          setHovered(false);
        }
      };
  
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
      requestRef.current = requestAnimationFrame(updateCursor);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
        cancelAnimationFrame(requestRef.current);
      };
    }, []);
  
    return (
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovered ? "hovered" : ""}`}
        style={{ backgroundImage: `url(${cursorImg})` }}
      />
    );
  }
  
  export default Cursor;