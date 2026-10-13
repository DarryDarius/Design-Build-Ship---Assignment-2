"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Dialog, Tabs } from "@/components/ds/behavior";
import { calmKit as k } from "@/kits/calm";
import { formatHour, isOpenAt, spots, type Noise } from "@/lib/spots";

const SORTS = ["Closest", "Open latest", "Quietest"] as const;
const FILTERS = ["Quiet", "Outlets", "Under 5 min", "Open late"] as const;
type Filter = (typeof FILTERS)[number];

const noiseRank: Record<Noise, number> = { Quiet: 0, "Low hum": 1, Lively: 2 };

const matches: Record<Filter, (s: (typeof spots)[number]) => boolean> = {
  Quiet: (s) => s.noise === "Quiet",
  Outlets: (s) => s.outlets,
  "Under 5 min": (s) => s.walk < 5,
  "Open late": (s) => s.close >= 21,
};

const focusRing =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-calm-accent focus-visible:ring-offset-2 focus-visible:ring-offset-calm-bg";

export function StudySpots() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<string>("Closest");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [openNow, setOpenNow] = useState(false);
  const [tab, setTab] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [detail, setDetail] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  // Read the clock only when "Open now" is on, so the first render matches the server.
  const hour = openNow ? new Date().getHours() : null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = spots.filter(
      (s) =>
        (tab === "All" || saved.includes(s.id)) &&
        (!q || `${s.name} ${s.where} ${s.address}`.toLowerCase().includes(q)) &&
        filters.every((f) => matches[f](s)) &&
        (hour === null || isOpenAt(s, hour)),
    );
    const by = {
      Closest: (a: (typeof spots)[number], b: (typeof spots)[number]) => a.walk - b.walk,
      "Open latest": (a: (typeof spots)[number], b: (typeof spots)[number]) => b.close - a.close || a.walk - b.walk,
      Quietest: (a: (typeof spots)[number], b: (typeof spots)[number]) => noiseRank[a.noise] - noiseRank[b.noise] || a.walk - b.walk,
    }[sort as (typeof SORTS)[number]];
    return [...list].sort(by);
  }, [query, sort, filters, hour, tab, saved]);

  const filtered = query !== "" || filters.length > 0 || openNow;
  const open = spots.find((s) => s.id === detail);

  function clearFilters() {
    setQuery("");
    setFilters([]);
    setOpenNow(false);
  }

  function toggleSave(id: string) {
    const name = spots.find((s) => s.id === id)!.name;
    const isSaved = saved.includes(id);
    setSaved((s) => (isSaved ? s.filter((x) => x !== id) : [...s, id]));
    setAnnouncement(isSaved ? `Removed ${name} from your spots.` : `Saved ${name} to your spots.`);
  }

  function emptyState() {
    if (tab === "Saved" && saved.length === 0)
      return <k.UIState kind="empty" title="No saved spots yet" body="Open a café and press Save spot to keep it here." actionLabel="See all cafés" onAction={() => setTab("All")} />;
    if (openNow && hour !== null && !query && filters.length === 0)
      return (
        <k.UIState
          kind="empty"
          title={`Nothing is open at ${formatHour(hour)}`}
          body="Every café on this list is closed right now. Turn off Open now to plan ahead."
          actionLabel="Show all hours"
          onAction={() => setOpenNow(false)}
        />
      );
    return <k.UIState kind="empty" title="No cafés match" body="Try removing a filter or searching for something shorter." actionLabel="Clear filters" onAction={clearFilters} />;
  }

  return (
    <div className="calm-grain min-h-screen bg-calm-bg font-calm-body text-calm-text">
      <header className="border-b border-calm-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/study-spots" className={`font-calm-display text-xl ${focusRing}`}>
            Study Spots
          </Link>
          <nav aria-label="Site" className="flex gap-5 text-sm text-calm-muted">
            <a href="#about" className={`hover:text-calm-text ${focusRing}`}>
              About
            </a>
            <Link href="/" className={`hover:text-calm-text ${focusRing}`}>
              Hub
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <section className="py-10 sm:py-16">
          <p className="text-xs font-medium tracking-[0.14em] text-calm-muted uppercase">Hyde Park · {spots.length} cafés</p>
          <h1 className="mt-3 max-w-3xl font-calm-display text-4xl leading-[1.08] sm:text-[56px]">Where to study near the quad</h1>
          <p className="mt-4 max-w-xl text-calm-muted">
            My notes on the cafés around campus: how loud they get, whether you’ll find an outlet, and how late you can stay.
          </p>
        </section>

        <section aria-label="Find a spot" className="space-y-4 rounded-xl border border-calm-border bg-calm-surface p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-[1fr_13rem]">
            <k.TextInput label="Search" placeholder="Café, building, or street" value={query} onChange={setQuery} />
            <k.Select label="Sort by" options={[...SORTS]} value={sort} onChange={setSort} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-calm-border pt-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
              {FILTERS.map((f) => (
                <k.Chip
                  key={f}
                  selected={filters.includes(f)}
                  aria-pressed={filters.includes(f)}
                  onClick={() => setFilters((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]))}
                >
                  {f}
                </k.Chip>
              ))}
            </div>
            <k.Toggle label="Open now" checked={openNow} onChange={setOpenNow} />
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Tabs
            kit={k}
            label="Lists"
            items={["All", "Saved"]}
            value={tab}
            onChange={setTab}
            renderLabel={(t) => (t === "Saved" ? `Saved · ${saved.length}` : `All · ${spots.length}`)}
          />
          <p className="flex items-center gap-3 text-sm text-calm-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "café" : "cafés"}
            {filtered && (
              <button type="button" onClick={clearFilters} className={`cursor-pointer text-calm-text underline decoration-calm-border decoration-2 underline-offset-4 hover:decoration-calm-accent ${focusRing}`}>
                Clear filters
              </button>
            )}
          </p>
        </div>

        <div role="tabpanel" aria-label={`${tab} cafés`} className="mt-5">
          {results.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((s) => (
                <li key={s.id}>
                  <k.Card spot={s} saved={saved.includes(s.id)} onOpen={() => setDetail(s.id)} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-calm-border px-6 py-12 sm:px-10">{emptyState()}</div>
          )}
        </div>

        <section id="about" aria-labelledby="about-h" className="mt-20 grid gap-3 border-t border-calm-border pt-8 sm:grid-cols-[12rem_1fr] sm:gap-8">
          <h2 id="about-h" className="font-calm-display text-2xl">
            About
          </h2>
          <p className="max-w-xl text-calm-muted">
            Hours and notes are my own, from studying around campus, so check before you go. Nothing is saved: your list resets when you leave the page.
          </p>
        </section>
      </main>

      <p className="sr-only" role="status">
        {announcement}
      </p>

      <Dialog open={!!open} onClose={() => setDetail(null)} label={open?.name ?? "Café"} className={k.dialogClass}>
        {open && <k.DetailPanel spot={open} saved={saved.includes(open.id)} onSave={() => toggleSave(open.id)} onClose={() => setDetail(null)} />}
      </Dialog>
    </div>
  );
}
