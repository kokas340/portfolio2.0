// Commands for the Dev Hub terminal easter egg. Every answer is built from
// data/profile.js, so the terminal never says anything the page doesn't.
//
// A line is an array of segments: { t: text, c?: class, href?: link }.

import { about, experience, featured, hero, moreProjects, person, toolbox } from "../../data/profile";
import storyline from "../Story/storyline.json";

const projects = [...featured, ...moreProjects];
const hasStory = (id) => storyline.some((s) => s.id === id);

const seg = (s) => (typeof s === "string" ? { t: s } : s);
const line = (...parts) => parts.map(seg);
const dim = (t) => ({ t, c: "dim" });
const ok = (t) => ({ t, c: "ok" });
const hl = (t) => ({ t, c: "hl" });
const err = (t) => ({ t, c: "err" });
const link = (t, href) => ({ t, href });
const pad = (text, width) => text.padEnd(width, " ");

export const PROMPT = { t: "›", c: "prompt" };

// What the window shows before anyone types.
export const BOOT_LINES = [
  line(PROMPT, " ", hl("new environment"), " pricing"),
  line(ok("✓ ports 5004 · 3104 reserved")),
  line(ok("✓ git worktree created")),
  line(ok("✓ database cloned from golden dump")),
  line(ok("✓ backend and frontend running")),
  line(dim("survives sleep · reconnect from phone")),
];

const FILES = ["about.txt", "contact.txt", "experience/", "projects/", "skills.txt"];
const OPEN_TARGETS = [...projects.map((p) => p.id), "github", "linkedin", "email"];

const contactLines = () => [
  line(pad("email", 10), link(person.email, `mailto:${person.email}`)),
  line(pad("linkedin", 10), link("linkedin.com/in/jack-spinola", person.links.linkedin)),
  line(pad("github", 10), link("github.com/kokas340", person.links.github)),
];

const projectLines = () => [
  ...projects.map((p) => line(dim(p.year + "  "), hl(pad(p.id, 13)), `${p.title} · ${p.context || p.role}`)),
  line(dim('type "open <name>" to read the case study')),
];

const skillLines = () => toolbox.flatMap((group) => [line(hl(group.label)), line(group.items.join(", "))]);

const experienceLines = () =>
  experience.flatMap((r) => [
    line(dim(pad(r.dates, 15)), hl(r.title), dim(" · " + r.company)),
    ...(r.ladder ? [line(pad("", 15), dim(r.ladder.map((s) => s.what).join(" → ")))] : []),
  ]);

const aboutLines = () => about.paragraphs.map((p) => line(p));

// name -> { help?: shown in `help`, run(args, ctx) -> { lines, clear?, after? } }
const COMMANDS = {
  help: {
    help: "list commands",
    run: () => ({
      lines: [
        ...Object.entries(COMMANDS)
          .filter(([, c]) => c.help)
          .map(([name, c]) => line(hl(pad(c.usage || name, 13)), c.help)),
        line(dim("…and a few hidden ones")),
      ],
    }),
  },
  whoami: {
    help: "who is this",
    run: () => ({ lines: [line(hl(person.name), dim(" · "), hero.eyebrow)] }),
  },
  about: { help: "a bit about me", run: () => ({ lines: aboutLines() }) },
  projects: { help: "things I've built", run: () => ({ lines: projectLines() }) },
  open: {
    usage: "open <name>",
    help: "open a case study",
    run: ([target], ctx) => {
      if (!target) return { lines: [line(err("usage: open <name>")), line(dim("try: open smartvision"))] };
      const name = target.toLowerCase();
      const external = { github: person.links.github, linkedin: person.links.linkedin };
      if (external[name]) {
        return { lines: [line(ok(`✓ opening ${name} in a new tab`))], after: () => window.open(external[name], "_blank", "noopener") };
      }
      if (name === "email") {
        return { lines: [line(ok("✓ opening your mail app"))], after: () => (window.location.href = `mailto:${person.email}`) };
      }
      const project = projects.find((p) => p.id === name);
      if (project && hasStory(project.id)) {
        return { lines: [line(ok(`✓ opening ${project.title}`))], after: () => setTimeout(() => ctx.navigate(`/story/${project.id}`), 350) };
      }
      return { lines: [line(err(`open: no such project: ${target}`)), line(dim('try "projects"'))] };
    },
  },
  experience: { help: "where I've worked", run: () => ({ lines: experienceLines() }) },
  skills: { help: "tools I reach for", run: () => ({ lines: skillLines() }) },
  contact: { help: "how to reach me", run: () => ({ lines: contactLines() }) },
  theme: {
    help: "toggle terminal mode",
    run: (_, ctx) => {
      const next = ctx.toggleTheme();
      return { lines: [line(ok(next === "dark" ? "✓ terminal mode on" : "✓ back to light mode"))] };
    },
  },
  history: {
    help: "commands you've run",
    run: (_, ctx) => ({ lines: ctx.history.map((h, i) => line(dim(String(i + 1).padStart(3) + "  "), h)) }),
  },
  clear: { help: "clear the screen", run: () => ({ lines: [], clear: true }) },

  // hidden
  ls: {
    run: ([dir]) => {
      if (dir && dir.replace(/\/$/, "") === "projects") return { lines: [line(projects.map((p) => p.id).join("  "))] };
      return { lines: [line(FILES.join("  "))] };
    },
  },
  cat: {
    run: ([file]) => {
      const files = { "about.txt": aboutLines, "contact.txt": contactLines, "skills.txt": skillLines };
      if (!file) return { lines: [line(err("usage: cat <file>"))] };
      if (files[file]) return { lines: files[file]() };
      const name = file.replace(/\/$/, "");
      if (name === "projects" || name === "experience") return { lines: [line(err(`cat: ${name}: Is a directory`))] };
      return { lines: [line(err(`cat: ${file}: No such file`))] };
    },
  },
  cd: { run: () => ({ lines: [line(dim('this is a portfolio, not a real shell. try "open <name>"'))] }) },
  pwd: { run: () => ({ lines: [line("/home/jack/portfolio")] }) },
  date: { run: () => ({ lines: [line(new Date().toString().replace(/ \(.*\)$/, ""))] }) },
  echo: { run: (args) => ({ lines: [line(args.join(" "))] }) },
  hire: {
    run: () => ({ lines: [line(ok("✓ great choice")), line("best next step: ", link(person.email, `mailto:${person.email}`))] }),
  },
  sudo: {
    run: (args, ctx) => {
      if (args.join(" ").toLowerCase() === "hire jack") {
        return { lines: [line(ok("✓ permission granted")), line("best next step: ", link(person.email, `mailto:${person.email}`))] };
      }
      if (args[0] && COMMANDS[args[0]] && args[0] !== "sudo") return COMMANDS[args[0]].run(args.slice(1), ctx);
      return { lines: [line(err("jack is not in the sudoers file. This incident will be reported."))] };
    },
  },
  rm: {
    run: (args) =>
      args.includes("-rf") || args.includes("-fr")
        ? { lines: [line(err("nice try. everything here is in production."))] }
        : { lines: [line(err("rm: permission denied"))] },
  },
  exit: { run: () => ({ lines: [line(dim('there is no exit. try "contact" instead.'))] }) },
  claude: { run: () => ({ lines: [line(dim("no agent in this demo. the real Dev Hub runs on an office workstation."))] }) },
};

export function runCommand(input, ctx) {
  const [name, ...args] = input.trim().split(/\s+/);
  const command = COMMANDS[name.toLowerCase()];
  if (!command) return { lines: [line(err(`command not found: ${name}`), dim(' · try "help"'))] };
  return command.run(args, ctx);
}

function commonPrefix(words) {
  return words.reduce((a, b) => {
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    return a.slice(0, i);
  });
}

// Tab completion for command names, `open <name>` targets and `cat <file>` files.
export function complete(value) {
  const match = value.match(/^(\s*)(\S*)(?:(\s+)(\S*))?$/);
  if (!match) return null;
  const [, lead, first, gap, second] = match;
  let pool;
  let word;
  let prefix;
  if (gap === undefined) {
    pool = Object.keys(COMMANDS);
    word = first;
    prefix = lead;
  } else if (first === "open") {
    pool = OPEN_TARGETS;
    word = second || "";
    prefix = `${lead}${first}${gap}`;
  } else if (first === "cat" || first === "ls") {
    pool = FILES;
    word = second || "";
    prefix = `${lead}${first}${gap}`;
  } else {
    return null;
  }
  const hits = pool.filter((w) => w.startsWith(word.toLowerCase()));
  if (!hits.length) return null;
  if (hits.length === 1) return prefix + hits[0] + (hits[0].endsWith("/") ? "" : " ");
  return prefix + commonPrefix(hits);
}
