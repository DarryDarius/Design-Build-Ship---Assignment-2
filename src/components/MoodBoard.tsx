import Link from "next/link";
import type { ReactNode } from "react";

export type Artifact = {
  kind: "Photo" | "Color" | "Type" | "Texture" | "Interface" | "Shape" | "Word";
  label: string;
  node: ReactNode;
};

type Theme = {
  page: string; // background, text color, body font
  title: string; // display font + size treatment
  muted: string;
  tile: string; // frame around each artifact
  caption: string;
  link: string;
};

export function MoodBoard({
  name,
  words,
  intro,
  theme,
  artifacts,
}: {
  name: string;
  words: string;
  intro: string;
  theme: Theme;
  artifacts: Artifact[];
}) {
  return (
    <main className={`min-h-screen ${theme.page}`}>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <Link href="/" className={`inline-block text-sm ${theme.link}`}>
          ← Hub
        </Link>
        <header className="mt-8 mb-10 grid gap-4 sm:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className={`text-sm ${theme.muted}`}>Mood board</p>
            <h1 className={theme.title}>{name}</h1>
            <p className={`mt-3 max-w-lg ${theme.muted}`}>{intro}</p>
          </div>
          <p className={`text-sm ${theme.muted}`}>
            {words} · {artifacts.length} artifacts, generated with CSS and SVG
          </p>
        </header>

        <ol className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {artifacts.map((a, i) => (
            <li key={a.label} className="mb-4 break-inside-avoid">
              <figure>
                <div className={`overflow-hidden ${theme.tile}`}>{a.node}</div>
                <figcaption className={`mt-1.5 ${theme.caption}`}>
                  {String(i + 1).padStart(2, "0")} · {a.kind} · {a.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
