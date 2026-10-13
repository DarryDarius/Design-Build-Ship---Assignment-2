import type { Metadata } from "next";
import { MoodBoard, type Artifact } from "@/components/MoodBoard";

export const metadata: Metadata = { title: "Y2K · Mood board" };

function Swatch({ hex, name, dark }: { hex: string; name: string; dark?: boolean }) {
  return (
    <div className="flex h-28 items-end p-3" style={{ background: hex }}>
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${dark ? "bg-white/20 text-white" : "bg-white/70 text-y2k-text"}`}>
        {name} {hex}
      </span>
    </div>
  );
}

const gloss =
  "relative overflow-hidden before:pointer-events-none before:absolute before:inset-x-1 before:top-0.5 before:h-1/2 before:rounded-full before:bg-gradient-to-b before:from-white/70 before:to-white/0";

const chrome = "linear-gradient(180deg,#ffffff 0%,#c9c6dc 38%,#6f6a8f 50%,#e9e7f5 62%,#9a96b8 100%)";

const artifacts: Artifact[] = [
  {
    kind: "Type",
    label: "Chrome wordmark",
    node: (
      <div className="bg-y2k-text px-4 py-8 text-center">
        <p
          className="font-y2k-display text-5xl font-black tracking-tight"
          style={{ backgroundImage: chrome, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
        >
          STUDY
        </p>
      </div>
    ),
  },
  { kind: "Color", label: "Lilac sky", node: <Swatch hex="#eeebff" name="Lilac sky" /> },
  {
    kind: "Shape",
    label: "Glass orb",
    node: (
      <div className="flex h-44 items-center justify-center bg-y2k-surface">
        <div
          className="h-28 w-28 rounded-full shadow-[0_12px_30px_rgba(192,19,122,.35)]"
          style={{ background: "radial-gradient(circle at 32% 28%, #fff 0 8%, #ffb3dd 22%, #c0137a 70%, #6b0a44 100%)" }}
        />
      </div>
    ),
  },
  { kind: "Color", label: "Hot pink", node: <Swatch hex="#c0137a" name="Hot pink" dark /> },
  {
    kind: "Interface",
    label: "Gel buttons",
    node: (
      <div className="flex flex-wrap gap-2 bg-y2k-surface p-5">
        <span className={`${gloss} rounded-full bg-y2k-accent px-5 py-2 text-sm font-semibold text-white shadow-[inset_0_-3px_0_rgba(0,0,0,.2)]`}>Save spot ✦</span>
        <span className={`${gloss} rounded-full border-2 border-y2k-text bg-y2k-sky px-5 py-2 text-sm font-semibold text-y2k-text`}>Details</span>
      </div>
    ),
  },
  { kind: "Color", label: "Lime gel", node: <Swatch hex="#c8f55a" name="Lime gel" /> },
  {
    kind: "Texture",
    label: "Holographic foil",
    node: (
      <div
        className="h-36"
        style={{ background: "conic-gradient(from 200deg at 30% 60%, #8fdcff, #f5b8ff, #c8f55a, #fff3a6, #8fdcff)" }}
      />
    ),
  },
  {
    kind: "Photo",
    label: "Burned CD",
    node: (
      <svg viewBox="0 0 200 200" className="block w-full" role="img" aria-label="An iridescent compact disc">
        <defs>
          <radialGradient id="y2k-shine" cx=".35" cy=".3" r=".8">
            <stop offset="0" stopColor="#fff" stopOpacity=".9" />
            <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="#1b1446" />
        <foreignObject x="20" y="20" width="160" height="160">
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "conic-gradient(#c9c6dc, #8fdcff, #f5b8ff, #fff3a6, #c8f55a, #c9c6dc, #f5b8ff, #c9c6dc)" }} />
        </foreignObject>
        <circle cx="100" cy="100" r="80" fill="url(#y2k-shine)" />
        <circle cx="100" cy="100" r="18" fill="#1b1446" />
        <circle cx="100" cy="100" r="24" fill="none" stroke="#fff" strokeOpacity=".5" />
        <text x="62" y="150" fontSize="11" fill="#1b1446" fontFamily="cursive">study mix 03 ♡</text>
      </svg>
    ),
  },
  {
    kind: "Type",
    label: "Unbounded display",
    node: (
      <div className="bg-y2k-lime p-5">
        <p className="font-y2k-display text-6xl font-bold leading-none text-y2k-text">Aa</p>
        <p className="mt-3 text-xs font-medium text-y2k-text">Unbounded · round, wide, loud</p>
      </div>
    ),
  },
  {
    kind: "Shape",
    label: "Sparkles",
    node: (
      <div className="relative h-32 bg-y2k-text">
        {[["12%", "20%", "text-3xl text-y2k-lime"], ["60%", "15%", "text-5xl text-y2k-sky"], ["35%", "55%", "text-2xl text-white"], ["78%", "60%", "text-3xl text-[#f5b8ff]"]].map(([l, t, c]) => (
          <span key={l} className={`absolute ${c}`} style={{ left: l, top: t }} aria-hidden>✦</span>
        ))}
      </div>
    ),
  },
  {
    kind: "Interface",
    label: "Window chrome",
    node: (
      <div className="bg-y2k-bg p-4">
        <div className="overflow-hidden rounded-xl border-2 border-y2k-text bg-y2k-surface">
          <div className="flex items-center gap-1.5 bg-gradient-to-b from-[#b7e8ff] to-y2k-sky px-3 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-y2k-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-y2k-lime" />
            <span className="ml-2 text-xs font-semibold text-y2k-text">studyspots.exe</span>
          </div>
          <p className="p-3 text-sm text-y2k-text">3 cafés open near you!!</p>
        </div>
      </div>
    ),
  },
  { kind: "Color", label: "Baby blue", node: <Swatch hex="#8fdcff" name="Baby blue" /> },
  {
    kind: "Word",
    label: "Away message",
    node: (
      <p className="bg-y2k-surface p-5 font-mono text-sm text-y2k-text">
        brb studying @ ex libris :) <span className="text-y2k-accent">♡</span>
      </p>
    ),
  },
  {
    kind: "Interface",
    label: "Pill chips",
    node: (
      <div className="flex flex-wrap gap-2 bg-y2k-surface p-5 text-sm font-medium">
        <span className="rounded-full border-2 border-y2k-text bg-y2k-lime px-3 py-1 text-y2k-text">quiet ✓</span>
        <span className="rounded-full border-2 border-y2k-border px-3 py-1 text-y2k-text">outlets</span>
        <span className="rounded-full border-2 border-y2k-border px-3 py-1 text-y2k-text">open late</span>
      </div>
    ),
  },
  {
    kind: "Texture",
    label: "Checkerboard",
    node: (
      <div
        className="h-28"
        style={{ backgroundImage: "repeating-conic-gradient(#1b1446 0 25%, #c8f55a 0 50%)", backgroundSize: "20px 20px" }}
      />
    ),
  },
  {
    kind: "Photo",
    label: "Butterfly clip",
    node: (
      <svg viewBox="0 0 200 160" className="block w-full" role="img" aria-label="A glittery butterfly hair clip">
        <rect width="200" height="160" fill="#f5b8ff" />
        <g fill="#8fdcff" stroke="#1b1446" strokeWidth="3">
          <path d="M100 80 C70 30 30 40 40 80 C30 120 70 130 100 80 Z" />
          <path d="M100 80 C130 30 170 40 160 80 C170 120 130 130 100 80 Z" />
        </g>
        <rect x="96" y="50" width="8" height="64" rx="4" fill="#1b1446" />
        <g fill="#fff">
          <circle cx="60" cy="70" r="3" /><circle cx="140" cy="70" r="3" /><circle cx="70" cy="96" r="2" /><circle cx="130" cy="96" r="2" />
        </g>
      </svg>
    ),
  },
  {
    kind: "Interface",
    label: "Candy progress",
    node: (
      <div className="bg-y2k-surface p-5">
        <p className="mb-2 text-xs font-semibold text-y2k-text">loading cafés… 70%</p>
        <div className="h-5 overflow-hidden rounded-full border-2 border-y2k-text bg-y2k-bg">
          <div className="h-full w-[70%] rounded-full" style={{ background: "repeating-linear-gradient(45deg,#c0137a 0 8px,#e04aa0 8px 16px)" }} />
        </div>
      </div>
    ),
  },
  {
    kind: "Shape",
    label: "Starburst sticker",
    node: (
      <div className="flex h-40 items-center justify-center bg-y2k-bg">
        <div
          className="flex h-28 w-28 rotate-12 items-center justify-center bg-y2k-lime text-center font-y2k-display text-sm font-bold text-y2k-text"
          style={{ clipPath: "polygon(50% 0,61% 18%,82% 10%,80% 32%,100% 40%,85% 55%,96% 76%,74% 78%,68% 100%,50% 86%,32% 100%,26% 78%,4% 76%,15% 55%,0 40%,20% 32%,18% 10%,39% 18%)" }}
        >
          open<br />late!!
        </div>
      </div>
    ),
  },
  {
    kind: "Type",
    label: "Space Grotesk body",
    node: (
      <div className="bg-y2k-surface p-5">
        <p className="text-base leading-relaxed text-y2k-text">
          Booths, a pool table, and iced lattes until midnight. Bring friends, not flashcards.
        </p>
        <p className="mt-2 text-xs text-y2k-muted">Space Grotesk · 16/26</p>
      </div>
    ),
  },
  {
    kind: "Interface",
    label: "Glossy toggle",
    node: (
      <div className="flex items-center gap-3 bg-y2k-surface p-5 text-sm font-semibold text-y2k-text">
        <span className="relative h-7 w-12 rounded-full border-2 border-y2k-text bg-y2k-lime">
          <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-gradient-to-b from-white to-[#e4e1f5] shadow" />
        </span>
        open now
      </div>
    ),
  },
  {
    kind: "Texture",
    label: "Chrome bar",
    node: <div className="h-20" style={{ background: chrome }} />,
  },
  {
    kind: "Photo",
    label: "Flip phone text",
    node: (
      <svg viewBox="0 0 200 220" className="block w-full" role="img" aria-label="A flip phone showing a text message">
        <rect width="200" height="220" fill="#c8f55a" />
        <rect x="60" y="20" width="80" height="110" rx="14" fill="#c9c6dc" stroke="#1b1446" strokeWidth="3" />
        <rect x="70" y="32" width="60" height="70" rx="4" fill="#8fdcff" stroke="#1b1446" strokeWidth="2" />
        <text x="75" y="54" fontSize="9" fill="#1b1446" fontFamily="monospace">u at logan?</text>
        <text x="75" y="70" fontSize="9" fill="#1b1446" fontFamily="monospace">saved u a</text>
        <text x="75" y="82" fontSize="9" fill="#1b1446" fontFamily="monospace">seat :)</text>
        <rect x="60" y="134" width="80" height="70" rx="14" fill="#9a96b8" stroke="#1b1446" strokeWidth="3" />
        <g fill="#eeebff">
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={74 + c * 18} y={146 + r * 16} width="14" height="10" rx="3" />))}
        </g>
      </svg>
    ),
  },
  {
    kind: "Word",
    label: "Mood word",
    node: (
      <p className="bg-y2k-accent px-5 py-8 text-center font-y2k-display text-3xl font-bold text-white">
        ✦ sparkly ✦
      </p>
    ),
  },
  {
    kind: "Interface",
    label: "Speech bubble card",
    node: (
      <div className="bg-y2k-bg p-4">
        <div className="relative rounded-3xl border-2 border-y2k-text bg-y2k-surface p-4">
          <p className="font-y2k-display text-base font-bold text-y2k-text">Hallowed Grounds</p>
          <p className="text-sm text-y2k-muted">open till midnight ✦ 2 min</p>
          <span className="absolute -bottom-3 left-8 h-5 w-5 rotate-45 border-r-2 border-b-2 border-y2k-text bg-y2k-surface" />
        </div>
      </div>
    ),
  },
  {
    kind: "Shape",
    label: "Smiley",
    node: (
      <svg viewBox="0 0 200 140" className="block w-full" role="img" aria-label="A yellow smiley face">
        <rect width="200" height="140" fill="#8fdcff" />
        <circle cx="100" cy="70" r="46" fill="#fff3a6" stroke="#1b1446" strokeWidth="4" />
        <ellipse cx="84" cy="60" rx="5" ry="9" fill="#1b1446" />
        <ellipse cx="116" cy="60" rx="5" ry="9" fill="#1b1446" />
        <path d="M76 82 Q100 106 124 82" fill="none" stroke="#1b1446" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    kind: "Texture",
    label: "Perspective grid",
    node: (
      <svg viewBox="0 0 200 120" className="block w-full" role="img" aria-label="A pink perspective grid">
        <rect width="200" height="120" fill="#1b1446" />
        <g stroke="#f5b8ff" strokeWidth="1">
          {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((x) => <line key={x} x1="100" y1="40" x2={(x - 100) * 2.2 + 100} y2="120" />)}
          {[48, 60, 76, 96, 120].map((y) => <line key={y} x1="0" y1={y} x2="200" y2={y} />)}
        </g>
        <circle cx="100" cy="34" r="16" fill="#c8f55a" />
      </svg>
    ),
  },
  {
    kind: "Shape",
    label: "Pill corners",
    node: (
      <div className="flex items-end gap-3 bg-y2k-surface p-5">
        <div className="h-12 w-12 rounded-2xl border-2 border-y2k-text bg-y2k-sky" />
        <div className="h-12 w-20 rounded-full border-2 border-y2k-text bg-y2k-lime" />
        <div className="h-12 w-12 rounded-full border-2 border-y2k-text bg-[#f5b8ff]" />
      </div>
    ),
  },
];

export default function Y2KBoard() {
  return (
    <MoodBoard
      name="Y2K"
      words="Glossy · Pop · Chrome"
      intro="Studying like it's 2002: gel buttons, chrome type, holographic foil, away messages, and a burned CD of study songs."
      artifacts={artifacts}
      theme={{
        page: "bg-y2k-bg font-y2k-body text-y2k-text",
        title: "mt-1 font-y2k-display text-5xl font-black sm:text-6xl",
        muted: "text-y2k-muted",
        tile: "rounded-2xl border-2 border-y2k-text",
        caption: "text-xs font-medium text-y2k-muted",
        link: "font-semibold text-y2k-text underline decoration-y2k-accent decoration-2 underline-offset-4 hover:text-y2k-accent focus-visible:outline-2 focus-visible:outline-y2k-accent",
      }}
    />
  );
}
