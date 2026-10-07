// Commands and sessions for the Dev Hub terminal easter egg. Every answer is
// built from data/profile.js, so the terminal never says anything the page
// doesn't. The docs session (README.md) is generated from the same registry.
//
// A line is an array of segments: { t: text, c?: class, href?: link }.

import { about, experience, featured, hero, moreProjects, person, toolbox } from "../../data/profile";
import storyline from "../Story/storyline.json";

const projects = [...featured, ...moreProjects];
const hasStory = (id) => storyline.some((s) => s.id === id);
const wasteHero = experience.find((r) => r.company === "WasteHero");

// Look up a name the visitor typed without reaching Object.prototype
// ("constructor", "toString", ...).
const own = (table, key) => (Object.prototype.hasOwnProperty.call(table, key) ? table[key] : undefined);

const seg = (s) => (typeof s === "string" ? { t: s } : s);
const line = (...parts) => parts.map(seg);
const dim = (t) => ({ t, c: "dim" });
const ok = (t) => ({ t, c: "ok" });
const hl = (t) => ({ t, c: "hl" });
const err = (t) => ({ t, c: "err" });
const link = (t, href) => ({ t, href });
const pad = (text, width) => text.padEnd(width, " ");

export const PROMPT = { t: "›", c: "prompt" };

const PRICING_TESTS = [
  line(ok("✓ a price of zero is allowed")),
  line(ok("✓ negative prices are rejected")),
  line(ok("✓ the largest allowed price stays exact")),
];

// The sidebar sessions. The names are generic (Dev Hub is an internal tool);
// each terminal session opens with a short log of its own.
export const SESSIONS = [
  {
    id: "pricing",
    state: "run",
    meta: "$1.86",
    kind: "terminal",
    boot: [
      line(PROMPT, " ", hl("new environment"), " pricing"),
      line(ok("✓ ports 5004 · 3104 reserved")),
      line(ok("✓ git worktree created")),
      line(ok("✓ database cloned from golden dump")),
      line(ok("✓ backend and frontend running")),
      line(PROMPT, " ", hl("tests")),
      ...PRICING_TESTS,
      line(dim('see "docs" for everything this terminal can do')),
    ],
  },
  {
    id: "invoices",
    state: "wait",
    meta: "$0.92",
    kind: "terminal",
    boot: [
      line(PROMPT, " ", hl("new environment"), " invoices"),
      line(ok("✓ worktree and database ready")),
      line(PROMPT, " ", hl("bill this week's events"), dim(" --dry-run")),
      line(dim("events wait for each customer's billing rhythm: weekly, quarterly or yearly")),
      line(dim("waiting for review before anything is sent")),
    ],
  },
  {
    id: "map-filters",
    state: "idle",
    meta: "idle",
    kind: "terminal",
    boot: [
      line(dim("session idle since 09:41")),
      line(PROMPT, " ", hl("live vehicle tracking"), " on the route map"),
      line(dim("idle sessions stay alive · resume any time")),
    ],
  },
  { id: "docs", state: "doc", meta: "md", kind: "docs" },
];

const FILES = ["README.md", "about.txt", "contact.txt", "experience/", "projects/", "skills.txt"];
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

// Money as integer cents, so totals are exact (no floating point drift).
const MAX_PRICE_CENTS = 100_000_000 * 100; // 100 million
const toCents = (raw) => {
  const text = String(raw).replace(",", ".");
  if (!/^-?\d+(\.\d{1,2})?$/.test(text)) return null;
  const [whole, frac = ""] = text.replace("-", "").split(".");
  const cents = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  return text.startsWith("-") ? 0 - cents : cents; // 0 - 0 is +0, so "-0" prices as zero
};
const money = (cents) => (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// name -> { group?, usage?, help?, example?, run(args, ctx) -> { lines, clear?, after? } }
// Commands with a `group` appear in `help` and in the docs; the rest are hidden.
const COMMANDS = {
  whoami: {
    group: "Me",
    help: "who this is",
    run: () => ({ lines: [line(hl(person.name), dim(" · "), hero.eyebrow)] }),
  },
  about: { group: "Me", help: "a bit about me", run: () => ({ lines: aboutLines() }) },
  experience: { group: "Me", help: "where I've worked", run: () => ({ lines: experienceLines() }) },
  skills: { group: "Me", help: "tools I reach for", run: () => ({ lines: skillLines() }) },
  contact: { group: "Me", help: "how to reach me", run: () => ({ lines: contactLines() }) },

  projects: { group: "Work", help: "things I've built", run: () => ({ lines: projectLines() }) },
  open: {
    group: "Work",
    usage: "open <name>",
    example: "open smartvision",
    help: "open a case study",
    run: ([target], ctx) => {
      if (!target) return { lines: [line(err("usage: open <name>")), line(dim("try: open smartvision"))] };
      const name = target.toLowerCase();
      const url = own({ github: person.links.github, linkedin: person.links.linkedin }, name);
      if (url) {
        return { lines: [line(ok(`✓ opening ${name} in a new tab`))], after: () => window.open(url, "_blank", "noopener") };
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

  pricing: {
    group: "Pricing",
    help: "the products & pricing module I own",
    run: () => ({
      lines: [
        line(hl("products & pricing"), dim(` · ${wasteHero.company}`)),
        ...wasteHero.points.filter((p) => /pricing/i.test(p)).map((p) => line(p)),
        line(dim('try "price 140 3" or "tests"')),
      ],
    }),
  },
  price: {
    group: "Pricing",
    usage: "price <amount> [qty]",
    example: "price 140 3",
    help: "price a line the way an invoice would",
    run: ([amount, qty = "1"]) => {
      if (amount === undefined) return { lines: [line(err("usage: price <amount> [qty]")), line(dim("try: price 140 3"))] };
      const unit = toCents(amount);
      const count = /^\d+$/.test(qty) ? Number(qty) : NaN;
      if (unit === null || !Number.isInteger(count) || count < 1 || count > 1000) {
        return { lines: [line(err("price: amount like 140 or 19.95, quantity 1-1000"))] };
      }
      if (unit < 0) return { lines: [line(err("✗ negative prices are rejected"))] };
      if (unit > MAX_PRICE_CENTS) return { lines: [line(err("✗ above the largest allowed price"))] };
      const net = unit * count;
      const vat = Math.round(net * 0.25);
      return {
        lines: [
          ...(unit === 0 ? [line(ok("✓ a price of zero is allowed"))] : []),
          line(pad(`${count} × ${money(unit)}`, 22), money(net)),
          line(dim(pad("VAT 25%", 22)), dim(money(vat))),
          line(hl(pad("total", 22)), hl(money(net + vat))),
        ],
      };
    },
  },
  tests: { group: "Pricing", help: "run the pricing tests", run: () => ({ lines: PRICING_TESTS }) },

  docs: {
    group: "Terminal",
    help: "open README.md, the full list",
    run: (_, ctx) => ({ lines: [line(ok("✓ opening README.md"))], after: () => ctx.openSession?.("docs") }),
  },
  theme: {
    group: "Terminal",
    help: "toggle terminal mode for the whole site",
    run: (_, ctx) => {
      const next = ctx.toggleTheme();
      return { lines: [line(ok(next === "dark" ? "✓ terminal mode on" : "✓ back to light mode"))] };
    },
  },
  history: {
    group: "Terminal",
    help: "commands you've run",
    run: (_, ctx) => ({ lines: ctx.history.map((h, i) => line(dim(String(i + 1).padStart(3) + "  "), h)) }),
  },
  clear: { group: "Terminal", help: "clear the screen", run: () => ({ lines: [], clear: true }) },
  help: {
    group: "Terminal",
    help: "the short version of this list",
    run: () => ({
      lines: [
        ...Object.entries(COMMANDS)
          .filter(([, c]) => c.group)
          .map(([name, c]) => line(hl(pad(c.usage || name, 22)), c.help)),
        line(dim("…and a few hidden ones")),
      ],
    }),
  },

  // hidden
  ls: {
    run: ([dir]) => {
      if (dir && dir.replace(/\/$/, "") === "projects") return { lines: [line(projects.map((p) => p.id).join("  "))] };
      return { lines: [line(FILES.join("  "))] };
    },
  },
  cat: {
    run: ([file], ctx) => {
      if (!file) return { lines: [line(err("usage: cat <file>"))] };
      const read = own({ "about.txt": aboutLines, "contact.txt": contactLines, "skills.txt": skillLines }, file);
      if (read) return { lines: read() };
      if (file.toLowerCase() === "readme.md") return COMMANDS.docs.run([], ctx);
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
      const command = args[0] && own(COMMANDS, args[0].toLowerCase());
      if (command && command !== COMMANDS.sudo) return command.run(args.slice(1), ctx);
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
  const command = own(COMMANDS, name.toLowerCase());
  if (!command) return { lines: [line(err(`command not found: ${name}`), dim(' · try "help" or "docs"'))] };
  return command.run(args, ctx);
}

// README.md for the docs session: documented commands, grouped, in registry order.
export function docSections() {
  const groups = new Map();
  for (const [name, c] of Object.entries(COMMANDS)) {
    if (!c.group) continue;
    if (!groups.has(c.group)) groups.set(c.group, []);
    groups.get(c.group).push({ usage: c.usage || name, run: c.example || c.usage || name, help: c.help, example: c.example });
  }
  return [...groups].map(([title, items]) => ({ title, items }));
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
  const hits = pool.filter((w) => w.toLowerCase().startsWith(word.toLowerCase()));
  if (!hits.length) return null;
  if (hits.length === 1) return prefix + hits[0] + (hits[0].endsWith("/") ? "" : " ");
  return prefix + commonPrefix(hits);
}
