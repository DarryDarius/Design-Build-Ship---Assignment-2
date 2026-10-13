import type { Metadata } from "next";
import { MoodBoard, type Artifact } from "@/components/MoodBoard";

export const metadata: Metadata = { title: "Calm · Mood board" };

function Swatch({ hex, name, dark }: { hex: string; name: string; dark?: boolean }) {
  return (
    <div className="flex h-28 flex-col justify-end p-3" style={{ background: hex }}>
      <span className={`text-xs ${dark ? "text-[#fbf7f1]" : "text-calm-text"}`}>
        {name} · {hex}
      </span>
    </div>
  );
}

const artifacts: Artifact[] = [
  {
    kind: "Photo",
    label: "Morning window",
    node: (
      <svg viewBox="0 0 200 260" className="block w-full" role="img" aria-label="Sunlight through a window onto a wall">
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#efe2cf" />
            <stop offset="1" stopColor="#d9c3a5" />
          </linearGradient>
        </defs>
        <rect width="200" height="260" fill="url(#wall)" />
        <g fill="#fff6e6" opacity=".75" transform="skewX(-18) translate(70 30)">
          <rect x="0" y="0" width="44" height="80" />
          <rect x="52" y="0" width="44" height="80" />
          <rect x="0" y="88" width="44" height="80" />
          <rect x="52" y="88" width="44" height="80" />
        </g>
        <rect y="220" width="200" height="40" fill="#8a6a4c" />
        <rect y="220" width="200" height="3" fill="#6e523a" />
      </svg>
    ),
  },
  { kind: "Color", label: "Oat paper", node: <Swatch hex="#f3ece1" name="Oat paper" /> },
  { kind: "Type", label: "Fraunces, soft", node: (
    <div className="bg-calm-surface p-5">
      <p className="font-calm-display text-7xl leading-none text-calm-text" style={{ fontVariationSettings: "'SOFT' 100" }}>Aa</p>
      <p className="mt-3 text-xs text-calm-muted">Fraunces · soft, warm serif for display</p>
    </div>
  ) },
  { kind: "Color", label: "Espresso", node: <Swatch hex="#2a231d" name="Espresso" dark /> },
  {
    kind: "Texture",
    label: "Paper grain",
    node: (
      <div className="calm-grain-strong h-36 bg-calm-bg" />
    ),
  },
  {
    kind: "Photo",
    label: "Latte from above",
    node: (
      <svg viewBox="0 0 200 200" className="block w-full" role="img" aria-label="A latte seen from above on a wooden table">
        <rect width="200" height="200" fill="#a77d58" />
        <g stroke="#946b48" strokeWidth="2" opacity=".6">
          {[20, 50, 80, 110, 140, 170].map((y) => (
            <path key={y} d={`M0 ${y} Q100 ${y + 8} 200 ${y - 4}`} fill="none" />
          ))}
        </g>
        <circle cx="100" cy="100" r="70" fill="#f1e7d8" />
        <circle cx="100" cy="100" r="56" fill="#7a4a2b" />
        <path d="M100 62 C80 80 80 100 100 128 C120 100 120 80 100 62 Z" fill="#f3e3c7" />
        <path d="M100 74 C90 86 90 100 100 116 C110 100 110 86 100 74 Z" fill="#7a4a2b" />
        <path d="M170 100 h18 a10 10 0 0 1 0 20 h-18" fill="none" stroke="#f1e7d8" strokeWidth="8" />
      </svg>
    ),
  },
  { kind: "Color", label: "Clay", node: <Swatch hex="#9a4426" name="Clay" dark /> },
  {
    kind: "Word",
    label: "Mood word",
    node: (
      <div className="bg-calm-surface px-5 py-8">
        <p className="font-calm-display text-4xl italic text-calm-text">unhurried</p>
      </div>
    ),
  },
  {
    kind: "Interface",
    label: "Soft buttons",
    node: (
      <div className="flex flex-wrap gap-2 bg-calm-surface p-5">
        <span className="rounded-md bg-calm-accent px-4 py-2 text-sm font-medium text-white">Save spot</span>
        <span className="rounded-md border border-calm-border px-4 py-2 text-sm text-calm-text">Details</span>
      </div>
    ),
  },
  {
    kind: "Texture",
    label: "Linen weave",
    node: (
      <div
        className="h-28"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(120,96,70,.10) 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, rgba(120,96,70,.10) 0 1px, transparent 1px 4px), #ebe1d2",
        }}
      />
    ),
  },
  {
    kind: "Photo",
    label: "Stack of books",
    node: (
      <svg viewBox="0 0 200 170" className="block w-full" role="img" aria-label="A stack of books">
        <rect width="200" height="170" fill="#e9dccb" />
        <rect x="40" y="120" width="120" height="22" rx="2" fill="#4f6146" />
        <rect x="50" y="98" width="104" height="22" rx="2" fill="#c9a77f" />
        <rect x="36" y="78" width="118" height="20" rx="2" fill="#9a4426" />
        <rect x="56" y="58" width="96" height="20" rx="2" fill="#2a231d" />
        <rect x="40" y="142" width="120" height="4" fill="#bca78c" />
        <g stroke="#fbf7f1" strokeWidth="1.5" opacity=".7">
          <line x1="60" y1="131" x2="100" y2="131" />
          <line x1="66" y1="88" x2="96" y2="88" />
          <line x1="74" y1="68" x2="110" y2="68" />
        </g>
      </svg>
    ),
  },
  { kind: "Color", label: "Sage", node: <Swatch hex="#4f6146" name="Sage" dark /> },
  {
    kind: "Type",
    label: "DM Sans body",
    node: (
      <div className="bg-calm-surface p-5">
        <p className="text-base leading-relaxed text-calm-text">
          Long tables, good light, and a refill on the way back up. Quiet enough to read a whole chapter.
        </p>
        <p className="mt-3 text-xs text-calm-muted">DM Sans · 16/26 · body text</p>
      </div>
    ),
  },
  {
    kind: "Interface",
    label: "Filter chips",
    node: (
      <div className="flex flex-wrap gap-2 bg-calm-surface p-5 text-sm">
        <span className="rounded-full border border-calm-text bg-calm-text px-3 py-1 text-calm-surface">Quiet</span>
        <span className="rounded-full border border-calm-border px-3 py-1 text-calm-text">Outlets</span>
        <span className="rounded-full border border-calm-border px-3 py-1 text-calm-text">Open late</span>
      </div>
    ),
  },
  {
    kind: "Photo",
    label: "Desk lamp glow",
    node: (
      <svg viewBox="0 0 200 240" className="block w-full" role="img" aria-label="A desk lamp casting warm light">
        <defs>
          <radialGradient id="glow" cx=".55" cy=".6" r=".6">
            <stop offset="0" stopColor="#ffe3b0" />
            <stop offset="1" stopColor="#3b2e24" />
          </radialGradient>
        </defs>
        <rect width="200" height="240" fill="url(#glow)" />
        <path d="M70 70 L130 70 L150 110 L50 110 Z" fill="#2a231d" />
        <rect x="97" y="110" width="6" height="90" fill="#2a231d" />
        <ellipse cx="100" cy="204" rx="40" ry="8" fill="#2a231d" />
        <ellipse cx="100" cy="112" rx="40" ry="5" fill="#fff1d1" />
      </svg>
    ),
  },
  {
    kind: "Shape",
    label: "Corners 6 · 12",
    node: (
      <div className="flex items-end gap-3 bg-calm-surface p-5">
        <div className="h-14 w-14 rounded-[6px] border border-calm-text" />
        <div className="h-14 w-14 rounded-[12px] border border-calm-text" />
        <div className="h-14 w-14 rounded-full border border-calm-text" />
      </div>
    ),
  },
  {
    kind: "Word",
    label: "A line to aim for",
    node: (
      <blockquote className="bg-calm-bg p-5 font-calm-display text-xl leading-snug text-calm-text">
        “A good table, a warm cup, three quiet hours.”
      </blockquote>
    ),
  },
  {
    kind: "Texture",
    label: "Oak grain",
    node: (
      <div
        className="h-32"
        style={{
          background:
            "repeating-radial-gradient(ellipse 140% 40% at 20% 50%, #b48a62 0 3px, #a77d58 3px 9px, #9c7250 9px 12px)",
        }}
      />
    ),
  },
  {
    kind: "Interface",
    label: "Open now toggle",
    node: (
      <div className="flex items-center gap-3 bg-calm-surface p-5 text-sm text-calm-text">
        <span className="relative h-6 w-11 rounded-full bg-calm-sage">
          <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-calm-surface" />
        </span>
        Open now
      </div>
    ),
  },
  { kind: "Color", label: "Linen line", node: <Swatch hex="#dcd0bf" name="Linen line" /> },
  {
    kind: "Photo",
    label: "Plant on the sill",
    node: (
      <svg viewBox="0 0 200 220" className="block w-full" role="img" aria-label="A small potted plant">
        <rect width="200" height="220" fill="#ede3d4" />
        <g fill="#4f6146">
          <path d="M100 130 C70 110 60 80 72 60 C90 80 98 104 100 130 Z" />
          <path d="M100 130 C130 108 142 82 132 56 C112 78 102 104 100 130 Z" />
          <path d="M100 130 C96 96 100 64 112 44 C118 74 110 104 100 130 Z" opacity=".8" />
        </g>
        <path d="M70 130 H130 L122 180 H78 Z" fill="#b5653f" />
        <rect y="180" width="200" height="40" fill="#d6c4ab" />
      </svg>
    ),
  },
  {
    kind: "Interface",
    label: "Café card",
    node: (
      <div className="bg-calm-bg p-4">
        <div className="rounded-xl border border-calm-border bg-calm-surface p-4">
          <p className="font-calm-display text-lg text-calm-text">Ex Libris</p>
          <p className="text-sm text-calm-muted">Regenstein · 3 min walk</p>
          <p className="mt-3 inline-block rounded-full bg-[#e3e8dc] px-2 py-0.5 text-xs text-calm-sage">Quiet</p>
        </div>
      </div>
    ),
  },
  {
    kind: "Shape",
    label: "Glaze pebbles",
    node: (
      <svg viewBox="0 0 200 120" className="block w-full" role="img" aria-label="Soft ceramic pebble shapes">
        <rect width="200" height="120" fill="#f3ece1" />
        <ellipse cx="55" cy="66" rx="38" ry="28" fill="#c9a77f" />
        <ellipse cx="118" cy="58" rx="30" ry="34" fill="#9a4426" opacity=".85" />
        <ellipse cx="162" cy="74" rx="24" ry="20" fill="#4f6146" opacity=".85" />
      </svg>
    ),
  },
  {
    kind: "Interface",
    label: "Search field",
    node: (
      <div className="bg-calm-surface p-5">
        <div className="flex items-center gap-2 rounded-md border border-calm-border bg-white/60 px-3 py-2 text-sm text-calm-muted">
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 14 14" />
          </svg>
          Search cafés
        </div>
      </div>
    ),
  },
  {
    kind: "Shape",
    label: "Thin line icons",
    node: (
      <div className="grid grid-cols-4 gap-3 bg-calm-surface p-5 text-calm-text">
        {/* cup, outlet, wifi, clock */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5Z" /><path d="M16 11h1.5a2 2 0 0 1 0 4H16" /><path d="M9 3c0 2 2 2 2 4M12 3c0 2 2 2 2 4" /></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M10 9v3M14 9v3M12 15v1" /></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden><path d="M3 9a13 13 0 0 1 18 0M6 12.5a8.5 8.5 0 0 1 12 0M9 16a4 4 0 0 1 6 0" /><circle cx="12" cy="19" r=".8" fill="currentColor" /></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>
      </div>
    ),
  },
  {
    kind: "Texture",
    label: "Late afternoon",
    node: <div className="h-40" style={{ background: "linear-gradient(170deg, #f6d9a8 0%, #efe2cf 45%, #f3ece1 100%)" }} />,
  },
  {
    kind: "Shape",
    label: "A line, not a shadow",
    node: (
      <div className="space-y-3 bg-calm-surface p-5">
        <div className="h-px bg-calm-border" />
        <div className="h-px bg-calm-border" />
        <div className="h-px bg-calm-text" />
        <p className="text-xs text-calm-muted">1px rules separate. Nothing floats.</p>
      </div>
    ),
  },
  {
    kind: "Type",
    label: "Hours, in numerals",
    node: (
      <div className="bg-calm-bg p-5">
        <p className="font-calm-display text-3xl tabular-nums text-calm-text">8 am – 11 pm</p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-calm-muted">Label · 12 / medium / tracked</p>
      </div>
    ),
  },
];

export default function CalmBoard() {
  return (
    <MoodBoard
      name="Calm"
      words="Matte · Warm · Quiet"
      intro="The feeling of a café at 9 am before it fills up: warm paper, soft serif type, thin lines, and one clay accent saved for the thing that matters."
      artifacts={artifacts}
      theme={{
        page: "calm-grain bg-calm-bg font-calm-body text-calm-text",
        title: "mt-1 font-calm-display text-5xl sm:text-6xl",
        muted: "text-calm-muted",
        tile: "rounded-xl border border-calm-border",
        caption: "text-xs text-calm-muted",
        link: "text-calm-muted underline-offset-4 hover:text-calm-accent hover:underline focus-visible:outline-2 focus-visible:outline-calm-accent",
      }}
    />
  );
}
