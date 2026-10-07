import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../../lib/theme";
import { BOOT_LINES, PROMPT, complete, runCommand } from "./terminalCommands";

const MAX_LINES = 200;

function Segment({ s }) {
  if (s.href) {
    const external = /^https?:/.test(s.href);
    return (
      <a href={s.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {s.t}
      </a>
    );
  }
  return s.c ? <span className={s.c}>{s.t}</span> : s.t;
}

// The Dev Hub window's terminal pane, typeable: an easter egg with a handful of
// commands about me (see terminalCommands.js). Up/Down walk the history, Tab
// completes, Ctrl+L clears, Escape leaves the input.
export default function DevHubTerminal() {
  const navigate = useNavigate();
  const [lines, setLines] = useState(BOOT_LINES);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [browse, setBrowse] = useState(-1); // position while walking the history
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const append = (more) => setLines((current) => [...current, ...more].slice(-MAX_LINES));

  const submit = () => {
    const input = value.trim();
    const echo = [PROMPT, { t: " " + value }];
    setValue("");
    setBrowse(-1);
    if (!input) {
      append([echo]);
      return;
    }
    const nextHistory = [...history, input].slice(-50);
    setHistory(nextHistory);
    const result = runCommand(input, { history: nextHistory, navigate, toggleTheme });
    if (result.clear) setLines([]);
    else append([echo, ...result.lines]);
    if (result.after) result.after();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = browse === -1 ? history.length - 1 : Math.max(0, browse - 1);
      setBrowse(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown" && browse !== -1) {
      e.preventDefault();
      const i = browse + 1;
      if (i >= history.length) {
        setBrowse(-1);
        setValue("");
      } else {
        setBrowse(i);
        setValue(history[i]);
      }
    } else if (e.key === "Tab") {
      const completed = complete(value);
      if (completed !== null) {
        e.preventDefault();
        setValue(completed);
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "Escape") {
      inputRef.current.blur();
    }
  };

  // Clicking anywhere in the pane focuses the prompt, unless the visitor is
  // selecting text (to copy the email, say).
  const focusPrompt = () => {
    if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className="dh-term" ref={scrollRef} onClick={focusPrompt}>
      <div role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((segments, i) => (
          <p key={i}>
            {segments.map((s, j) => (
              <Segment key={j} s={s} />
            ))}
          </p>
        ))}
      </div>
      <div className="dh-input-line">
        <span className="prompt" aria-hidden="true">
          ›
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setBrowse(-1);
          }}
          onKeyDown={onKeyDown}
          placeholder='try "help"'
          aria-label='Dev Hub terminal. Type a command, for example "help", and press Enter.'
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
        />
      </div>
    </div>
  );
}
