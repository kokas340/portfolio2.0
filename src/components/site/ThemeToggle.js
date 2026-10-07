import React, { useEffect, useState } from "react";
import { SquareTerminal, Sun } from "lucide-react";
import { isDark as readIsDark, toggleTheme } from "../../lib/theme";

// Light is the default; terminal mode is an opt-in easter egg. The theme can also
// change from the Dev Hub terminal (`theme`), so this listens for `themechange`.
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(readIsDark);

  useEffect(() => {
    const sync = (e) => setIsDark(e.detail === "dark");
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={isDark ? "Leave terminal mode" : "Enter terminal mode"}
      title={isDark ? "Leave terminal mode" : "Terminal mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={18} /> : <SquareTerminal size={18} />}
    </button>
  );
}
