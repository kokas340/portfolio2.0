import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../../lib/theme";
import { PROMPT, complete, runCommand } from "./terminalCommands";

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

// One Dev Hub session's terminal: typeable, with the commands in
// terminalCommands.js. Up/Down walk the history, Tab completes, Ctrl+L clears,
// Escape leaves the input. The parent can run a command through the ref (the
// docs session does this when a command is clicked).
const DevHubTerminal = forwardRef(function DevHubTerminal({ session, boot, active, onOpenSession }, ref) {
  const navigate = useNavigate();
  const [lines, setLines] = useState(boot);
  const [value, setValue] = useState("");
  const [browse, setBrowse] = useState(-1); // position while walking the history
  const history = useRef([]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToEnd = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };
  useEffect(scrollToEnd, [lines]);
  useEffect(() => {
    if (active) scrollToEnd();
  }, [active]);

  const append = (more) => setLines((current) => [...current, ...more].slice(-MAX_LINES));

  const execute = (raw) => {
    const input = raw.trim();
    const echo = [PROMPT, { t: " " + raw }];
    if (!input) {
      append([echo]);
      return;
    }
    history.current = [...history.current, input].slice(-50);
    const result = runCommand(input, { history: history.current, navigate, toggleTheme, openSession: onOpenSession });
    if (result.clear) setLines([]);
    else append([echo, ...result.lines]);
    if (result.after) result.after();
  };
  const latestExecute = useRef(execute);
  latestExecute.current = execute;

  useImperativeHandle(ref, () => ({
    run: (command) => latestExecute.current(command),
    focus: () => inputRef.current?.focus({ preventScroll: true }),
  }));

  const onKeyDown = (e) => {
    const past = history.current;
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = value;
      setValue("");
      setBrowse(-1);
      execute(raw);
    } else if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const i = browse === -1 ? past.length - 1 : Math.max(0, browse - 1);
      setBrowse(i);
      setValue(past[i]);
    } else if (e.key === "ArrowDown" && browse !== -1) {
      e.preventDefault();
      const i = browse + 1;
      if (i >= past.length) {
        setBrowse(-1);
        setValue("");
      } else {
        setBrowse(i);
        setValue(past[i]);
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
      <div role="log" aria-live="polite" aria-label={`${session} session output`}>
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
          aria-label={`${session} session. Type a command, for example "help" or "docs", and press Enter.`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="send"
        />
      </div>
    </div>
  );
});

export default DevHubTerminal;
