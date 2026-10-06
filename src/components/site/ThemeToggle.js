import React, { useEffect, useState } from "react";
import { SquareTerminal, Sun } from "lucide-react";

function getInitialTheme() {
  try {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

// Light is the default; terminal mode is an opt-in easter egg.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode: the toggle still works for this visit */
    }
  }, [theme, isDark]);

  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={isDark ? "Leave terminal mode" : "Enter terminal mode"}
      title={isDark ? "Leave terminal mode" : "Terminal mode"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={18} /> : <SquareTerminal size={18} />}
    </button>
  );
}
