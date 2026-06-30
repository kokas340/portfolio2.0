import { useEffect, useState } from "react";
import { SquareTerminal, Sun } from "lucide-react";
import "./ThemeToggle.css";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return "dark";
  // Light is the default; terminal mode is opt-in via the toggle.
  return "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to terminal mode"}
      title={isDark ? "Exit terminal mode" : "Enter terminal mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={18} /> : <SquareTerminal size={18} />}
    </button>
  );
}
