import type { Metadata } from "next";
import { MoodBoard, type Artifact } from "@/components/MoodBoard";

export const metadata: Metadata = { title: "Editorial · Mood board" };

function Swatch({ hex, name, dark }: { hex: string; name: string; dark?: boolean }) {
  return (
    <div className="flex h-24 items-end p-3" style={{ background: hex }}>
      <span className={`text-[11px] uppercase tracking-[0.12em] ${dark ? "text-white" : "text-ed-text"}`}>
        {name} {hex}
      </span>
    </div>
  );
}

const halftone = (color: string, size = 8) => ({
  backgroundImage: `radial-gradient(${color} 30%, transparent 32%)`,
  backgroundSize: `${size}px ${size}px`,
});

const artifacts: Artifact[] = [
  {
    kind: "Type",
    label: "Masthead",
    node: (
      <div className="bg-ed-surface p-4 text-center">
        <p className="border-y-4 border-double border-ed-text py-2 font-ed-display text-4xl text-ed-text">The Quad Review</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ed-muted">No. 57 · The Study Issue</p>
      </div>
    ),
  },
  { kind: "Color", label: "Newsprint", node: <Swatch hex="#f7f5f0" name="Newsprint" /> },
  {
    kind: "Photo",
    label: "Regenstein, duotone",
    node: (
      <svg viewBox="0 0 200 240" className="block w-full" role="img" aria-label="A brutalist library facade in black and red">
        <rect width="200" height="240" fill="#f2d6d3" />
        <path d="M20 240 V90 L60 70 V240 Z" fill="#121212" />
        <path d="M60 240 V70 H140 V240 Z" fill="#2b2b2b" />
        <path d="M140 240 V70 L180 90 V240 Z" fill="#121212" />
        <g fill="#c21d17">
          {[90, 120, 150, 180, 210].map((y) => (
            <rect key={y} x="68" y={y} width="64" height="10" />
          ))}
        </g>
        <rect x="0" y="0" width="200" height="240" fill="url(#ed-dots)" opacity=".18" />
        <defs>
          <pattern id="ed-dots" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.4" fill="#121212" />
          </pattern>
        </defs>
      </svg>
    ),
  },
  { kind: "Color", label: "Ink", node: <Swatch hex="#121212" name="Ink" dark /> },
  {
    kind: "Type",
    label: "Instrument Serif italic",
    node: (
      <div className="bg-ed-surface p-5">
        <p className="font-ed-display text-6xl italic leading-none text-ed-text">Quiet</p>
        <p className="font-ed-display text-6xl leading-none text-ed-text">Corners</p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-ed-muted">Instrument Serif · display</p>
      </div>
    ),
  },
  { kind: "Color", label: "Press red", node: <Swatch hex="#c21d17" name="Press red" dark /> },
  {
    kind: "Texture",
    label: "Halftone",
    node: <div className="h-32 bg-ed-bg" style={halftone("#121212", 7)} />,
  },
  {
    kind: "Type",
    label: "Drop cap",
    node: (
      <p className="bg-ed-surface p-5 text-sm leading-relaxed text-ed-text">
        <span className="float-left mr-2 font-ed-display text-6xl leading-[0.8] text-ed-accent">T</span>
        he best seat in the library is the one by the third window, where the light holds until four and nobody walks past.
      </p>
    ),
  },
  {
    kind: "Shape",
    label: "Column grid",
    node: (
      <div className="grid h-36 grid-cols-6 gap-1.5 bg-ed-surface p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-[#f2d6d3]" />
        ))}
      </div>
    ),
  },
  {
    kind: "Word",
    label: "Pull quote",
    node: (
      <blockquote className="border-t-4 border-ed-text bg-ed-surface p-5 font-ed-display text-2xl leading-tight text-ed-text">
        “Every campus has one table that feels like it was saved for you.”
      </blockquote>
    ),
  },
  {
    kind: "Interface",
    label: "Index list",
    node: (
      <ol className="divide-y divide-ed-hair bg-ed-surface px-5 py-2 text-sm text-ed-text">
        {[["Ex Libris", 3], ["Grounds of Being", 2], ["Café Logan", 9]].map(([n, m], i) => (
          <li key={n} className="flex gap-3 py-2">
            <span className="w-4 text-ed-muted tabular-nums">{i + 1}</span>
            <span className="flex-1">{n}</span>
            <span className="tabular-nums text-ed-muted">{m} min</span>
          </li>
        ))}
      </ol>
    ),
  },
  { kind: "Color", label: "Hairline", node: <Swatch hex="#d9d5cc" name="Hairline" /> },
  {
    kind: "Type",
    label: "Kicker label",
    node: (
      <div className="bg-ed-surface p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ed-accent">Field notes</p>
        <p className="mt-1 font-ed-display text-2xl text-ed-text">Eight cafés, ranked by silence</p>
        <p className="mt-2 text-xs text-ed-muted">By a second-year who has tried them all</p>
      </div>
    ),
  },
  {
    kind: "Shape",
    label: "Rules, thick and thin",
    node: (
      <div className="space-y-2 bg-ed-surface p-5">
        <div className="h-1 bg-ed-text" />
        <div className="h-px bg-ed-text" />
        <div className="h-px bg-ed-hair" />
        <div className="h-0.5 bg-ed-accent" />
      </div>
    ),
  },
  {
    kind: "Photo",
    label: "Cup, high contrast",
    node: (
      <svg viewBox="0 0 200 180" className="block w-full" role="img" aria-label="A black and white coffee cup">
        <rect width="200" height="180" fill="#121212" />
        <ellipse cx="100" cy="150" rx="70" ry="10" fill="#2a2a2a" />
        <path d="M55 70 H145 V112 A45 40 0 0 1 55 112 Z" fill="#f7f5f0" />
        <path d="M145 82 h12 a14 14 0 0 1 0 28 h-14" fill="none" stroke="#f7f5f0" strokeWidth="7" />
        <ellipse cx="100" cy="70" rx="45" ry="7" fill="#d9d5cc" />
        <path d="M86 52 c-6 -10 6 -14 0 -26 M104 52 c-6 -10 6 -14 0 -26" stroke="#f7f5f0" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    kind: "Interface",
    label: "Underlined tabs",
    node: (
      <div className="flex gap-5 border-b border-ed-hair bg-ed-surface px-5 pt-4 text-sm">
        <span className="border-b-2 border-ed-text pb-2 font-semibold text-ed-text">All</span>
        <span className="pb-2 text-ed-muted">Quiet</span>
        <span className="pb-2 text-ed-muted">Open late</span>
      </div>
    ),
  },
  {
    kind: "Type",
    label: "Folio numerals",
    node: (
      <div className="flex items-baseline justify-between bg-ed-surface p-5">
        <span className="font-ed-display text-7xl leading-none text-ed-text">08</span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-ed-muted">Cafés</span>
      </div>
    ),
  },
  {
    kind: "Interface",
    label: "Sharp buttons",
    node: (
      <div className="flex flex-wrap gap-2 bg-ed-surface p-5 text-sm">
        <span className="bg-ed-accent px-4 py-2 font-semibold text-white">Save spot</span>
        <span className="border border-ed-text px-4 py-2 text-ed-text">Read more</span>
      </div>
    ),
  },
  {
    kind: "Texture",
    label: "Red halftone fade",
    node: (
      <div
        className="h-28"
        style={{
          backgroundImage: "radial-gradient(#c21d17 35%, transparent 37%)",
          backgroundSize: "9px 9px",
          maskImage: "linear-gradient(90deg, black, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, black, transparent)",
        }}
      />
    ),
  },
  {
    kind: "Photo",
    label: "Map of 57th Street",
    node: (
      <svg viewBox="0 0 200 160" className="block w-full" role="img" aria-label="A line map of 57th Street">
        <rect width="200" height="160" fill="#f7f5f0" />
        <g stroke="#121212" strokeWidth="1">
          {[30, 70, 110, 150].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="160" />)}
          <line x1="0" y1="50" x2="200" y2="50" />
          <line x1="0" y1="120" x2="200" y2="120" />
        </g>
        <line x1="0" y1="86" x2="200" y2="86" stroke="#121212" strokeWidth="4" />
        <rect x="34" y="70" width="50" height="12" fill="#f7f5f0" />
        <text x="36" y="79" fontSize="9" fill="#121212" fontFamily="var(--font-inter-tight)" letterSpacing="1.5">E 57TH ST</text>
        <circle cx="70" cy="86" r="6" fill="#c21d17" />
        <circle cx="150" cy="86" r="6" fill="#c21d17" />
      </svg>
    ),
  },
  {
    kind: "Type",
    label: "Caption style",
    node: (
      <div className="bg-ed-surface p-5">
        <div className="h-20" style={halftone("#595751", 5)} />
        <p className="mt-2 border-l-2 border-ed-accent pl-2 text-xs leading-snug text-ed-muted">
          The reading room at 4 pm. Photograph by the author.
        </p>
      </div>
    ),
  },
  {
    kind: "Word",
    label: "Asterism",
    node: <p className="bg-ed-surface py-8 text-center font-ed-display text-5xl text-ed-accent">⁂</p>,
  },
  {
    kind: "Interface",
    label: "Data table",
    node: (
      <table className="w-full bg-ed-surface text-left text-xs text-ed-text">
        <thead>
          <tr className="border-b-2 border-ed-text">
            <th className="p-2 font-semibold uppercase tracking-wider">Café</th>
            <th className="p-2 font-semibold uppercase tracking-wider">Noise</th>
            <th className="p-2 font-semibold uppercase tracking-wider">Plugs</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ed-hair">
          <tr><td className="p-2">Ex Libris</td><td className="p-2">Quiet</td><td className="p-2">Yes</td></tr>
          <tr><td className="p-2">Plein Air</td><td className="p-2">Lively</td><td className="p-2">No</td></tr>
        </tbody>
      </table>
    ),
  },
  {
    kind: "Shape",
    label: "Crossword corner",
    node: (
      <div className="grid grid-cols-5 gap-px bg-ed-text p-px">
        {"CAFE#H###LA###AI###TRIDGE".split("").map((c, i) => (
          <div key={i} className={`flex aspect-square items-center justify-center text-xs font-semibold ${c === "#" ? "bg-ed-text" : "bg-ed-surface text-ed-text"}`}>
            {c === "#" ? "" : c}
          </div>
        ))}
      </div>
    ),
  },
  {
    kind: "Interface",
    label: "Link, underlined",
    node: (
      <p className="bg-ed-surface p-5 text-sm text-ed-text">
        Continue to the <span className="underline decoration-ed-accent decoration-2 underline-offset-4">full guide</span> →
      </p>
    ),
  },
  {
    kind: "Type",
    label: "Inter Tight body",
    node: (
      <div className="bg-ed-surface p-5">
        <p className="text-[15px] leading-relaxed text-ed-text">
          Open eight to eleven. Long tables, steady Wi‑Fi, and an outlet under nearly every seat.
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-ed-muted">Inter Tight · 15/24</p>
      </div>
    ),
  },
  {
    kind: "Word",
    label: "Mood word",
    node: (
      <p className="bg-ed-text px-5 py-8 font-ed-display text-4xl italic text-ed-bg">considered.</p>
    ),
  },
];

export default function EditorialBoard() {
  return (
    <MoodBoard
      name="Editorial"
      words="Ink · Grid · Serif"
      intro="A campus paper's weekend section: big serif headlines, strict columns, hairline rules, halftone photos, and red used like an editor's pen."
      artifacts={artifacts}
      theme={{
        page: "bg-ed-bg font-ed-body text-ed-text",
        title: "mt-1 border-b-4 border-ed-text pb-2 font-ed-display text-6xl italic sm:text-7xl",
        muted: "text-ed-muted",
        tile: "border border-ed-text",
        caption: "text-[11px] uppercase tracking-[0.1em] text-ed-muted",
        link: "uppercase tracking-[0.12em] text-ed-text underline decoration-ed-accent decoration-2 underline-offset-4 hover:text-ed-accent focus-visible:outline-2 focus-visible:outline-ed-accent",
      }}
    />
  );
}
