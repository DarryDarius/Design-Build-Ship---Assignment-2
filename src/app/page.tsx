import Link from "next/link";

const styles = [
  {
    slug: "calm",
    name: "Calm",
    words: "Matte · Warm · Quiet",
    font: "font-calm-display",
    swatches: ["#f3ece1", "#2a231d", "#9a4426"],
  },
  {
    slug: "editorial",
    name: "Editorial",
    words: "Ink · Grid · Serif",
    font: "font-ed-display",
    swatches: ["#f7f5f0", "#121212", "#c21d17"],
  },
  {
    slug: "y2k",
    name: "Y2K",
    words: "Glossy · Pop · Chrome",
    font: "font-y2k-display",
    swatches: ["#eeebff", "#c8f55a", "#c0137a"],
  },
];

function StyleRow({
  href,
  name,
  words,
  font,
  swatches,
  showAa,
}: (typeof styles)[number] & { href: string; showAa?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-4 border-t border-calm-border py-4 outline-none transition-colors hover:bg-calm-surface focus-visible:bg-calm-surface focus-visible:ring-2 focus-visible:ring-calm-accent sm:px-3"
      >
        {showAa ? (
          <span
            aria-hidden
            className={`${font} flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-calm-border bg-calm-surface text-lg text-calm-text`}
          >
            Aa
          </span>
        ) : (
          <span aria-hidden className="flex h-10 w-10 shrink-0 overflow-hidden rounded-md border border-calm-border">
            {swatches.map((c) => (
              <span key={c} className="flex-1" style={{ background: c }} />
            ))}
          </span>
        )}
        <span className="flex-1">
          <span className="block font-calm-display text-xl text-calm-text">{name}</span>
          <span className="block text-sm text-calm-muted">{words}</span>
        </span>
        <span
          aria-hidden
          className="text-calm-muted transition-transform group-hover:translate-x-1 group-hover:text-calm-accent"
        >
          →
        </span>
      </Link>
    </li>
  );
}

function Section({ n, title, note, children }: { n: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 sm:grid-cols-[12rem_1fr] sm:gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-calm-muted">
          {String(n).padStart(2, "0")}
        </p>
        <h2 className="mt-1 font-calm-display text-2xl text-calm-text">{title}</h2>
        {note && <p className="mt-1 text-sm text-calm-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Hub() {
  return (
    <main className="calm-grain min-h-screen bg-calm-bg font-calm-body text-calm-text">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="mb-14 sm:mb-20">
          <p className="text-sm text-calm-muted">Design, Build, Ship · Assignment 2</p>
          <h1 className="mt-2 font-calm-display text-4xl leading-tight sm:text-5xl">
            UI/UX &amp; Visual Design
          </h1>
          <p className="mt-3 max-w-md text-calm-muted">
            Three styles explored, one picked, and a small guide to the cafés where I study in Hyde Park.
          </p>
        </header>

        <div className="space-y-14">
          <Section n={1} title="Mood boards">
            <ul className="border-b border-calm-border">
              {styles.map((s) => (
                <StyleRow key={s.slug} {...s} href={`/mood-boards/${s.slug}`} />
              ))}
            </ul>
          </Section>

          <Section n={2} title="Design systems" note="Each one built from its mood board">
            <ul className="border-b border-calm-border">
              {styles.map((s) => (
                <StyleRow key={s.slug} {...s} showAa href={`/design-systems/${s.slug}`} />
              ))}
            </ul>
          </Section>

          <Section n={3} title="My site" note="In the Calm style">
            <Link
              href="/study-spots"
              className="group block rounded-xl border border-calm-border bg-calm-surface p-6 outline-none transition-colors hover:border-calm-muted focus-visible:ring-2 focus-visible:ring-calm-accent focus-visible:ring-offset-2 focus-visible:ring-offset-calm-bg"
            >
              <span className="block font-calm-display text-3xl">Study Spots</span>
              <span className="mt-1 block text-calm-muted">
                Where to sit, sip, and get work done near campus.
              </span>
              <span className="mt-5 inline-flex items-center gap-2 rounded-md bg-calm-accent px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-calm-accent-hover">
                Open Study Spots <span aria-hidden>→</span>
              </span>
            </Link>
          </Section>
        </div>
      </div>
    </main>
  );
}
