"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { contrast } from "@/lib/contrast";
import { spots } from "@/lib/spots";
import { Dialog, Tabs } from "./behavior";
import type { Chrome, DesignSpec, Force, Kit } from "./types";

const STATES: Force[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

function stateRows(k: Kit): { name: string; render: Partial<Record<Force, (f: Force) => ReactNode>> }[] {
  const all = (fn: (f: Force) => ReactNode) => Object.fromEntries(STATES.map((s) => [s, fn]));
  const without = (skip: Force[], fn: (f: Force) => ReactNode) =>
    Object.fromEntries(STATES.filter((s) => !skip.includes(s)).map((s) => [s, fn]));
  const off = (f: Force) => f === "disabled";
  const on = (f: Force) => f === "selected";

  return [
    { name: "Primary button", render: without(["selected"], (f) => <k.Button force={f} disabled={off(f)}>Save spot</k.Button>) },
    { name: "Secondary button", render: without(["selected"], (f) => <k.Button variant="secondary" force={f} disabled={off(f)}>Details</k.Button>) },
    { name: "Link", render: without(["selected", "disabled"], (f) => <k.TextLink href="#" force={f}>See all</k.TextLink>) },
    { name: "Text input", render: without(["pressed", "selected"], (f) => <div className="w-40"><k.TextInput label="Search" hideLabel placeholder="Search" force={f} disabled={off(f)} /></div>) },
    { name: "Select", render: without(["pressed", "selected"], (f) => <div className="w-36"><k.Select label="Sort" hideLabel options={["Closest"]} force={f} disabled={off(f)} /></div>) },
    { name: "Checkbox", render: all((f) => <k.Checkbox label="Outlets" checked={on(f)} force={f} disabled={off(f)} />) },
    { name: "Radio", render: all((f) => <k.Radio label="Quiet" name={`r-${f}`} checked={on(f)} force={f} disabled={off(f)} />) },
    { name: "Toggle", render: all((f) => <k.Toggle label="Open now" checked={on(f)} force={f} disabled={off(f)} />) },
    { name: "Tab", render: without(["disabled"], (f) => <k.Tab selected={on(f)} force={f}>Saved</k.Tab>) },
    { name: "Filter chip", render: all((f) => <k.Chip selected={on(f)} force={f} disabled={off(f)}>Quiet</k.Chip>) },
    { name: "List row", render: without(["selected", "disabled"], (f) => <ul className="w-44"><k.ListRow spot={spots[0]} force={f} /></ul>) },
  ];
}

function Section({ c, n, title, children }: { c: Chrome; n: number; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`s${n}`} className={`border-t pt-6 ${c.rule}`}>
      <h2 id={`s${n}`} className={c.h2}>
        <span className={c.muted}>{n} </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Cell({ c, label, children, wide }: { c: Chrome; label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`${c.panel} ${wide ? "md:col-span-2" : ""}`}>
      <p className={`mb-3 ${c.label}`}>{label}</p>
      {children}
    </div>
  );
}

export function DesignSystem({ spec }: { spec: DesignSpec }) {
  const { chrome: c, kit: k } = spec;
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Closest");
  const [outlets, setOutlets] = useState(true);
  const [wifi, setWifi] = useState(false);
  const [noise, setNoise] = useState("Quiet");
  const [openNow, setOpenNow] = useState(true);
  const [tab, setTab] = useState("All");
  const [chips, setChips] = useState<string[]>(["Quiet"]);
  const [detail, setDetail] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);

  const open = spots.find((s) => s.id === detail);
  const toggleSave = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <main className={`min-h-screen ${c.page}`}>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="flex flex-wrap justify-between gap-4 text-sm">
          <Link href="/" className={c.link}>← Hub</Link>
          <Link href={`/mood-boards/${spec.slug}`} className={c.link}>Built from the {spec.name} mood board →</Link>
        </nav>
        <header className="mt-8 mb-12">
          <p className={`text-sm ${c.muted}`}>Design system · {spec.words}</p>
          <h1 className={c.title}>{spec.name}</h1>
          <p className={`mt-3 max-w-xl ${c.muted}`}>{spec.intro}</p>
        </header>

        <div className="space-y-14">
          <Section c={c} n={1} title="Color roles">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {spec.colors.map((col) => (
                <li key={col.role} className={c.panel}>
                  <div className="mb-3 h-16 rounded-[inherit] border border-black/10" style={{ background: col.hex }} />
                  <p className="font-semibold">{col.role}</p>
                  <p className={`text-sm ${c.muted}`}>{col.hex} · {col.use}</p>
                  {col.checks?.map(([fg, back, label]) => {
                    const r = contrast(fg, back);
                    return (
                      <p key={label} className="mt-1 text-sm tabular-nums">
                        <strong>{r.toFixed(1)}:1</strong> <span className={c.muted}>{label} · {r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "decorative"}</span>
                      </p>
                    );
                  })}
                </li>
              ))}
            </ul>
          </Section>

          <Section c={c} n={2} title="Type roles">
            <ul className="space-y-6">
              {spec.type.map((t) => (
                <li key={t.role} className={`grid gap-1 border-b pb-6 md:grid-cols-[10rem_1fr] md:gap-6 ${c.rule}`}>
                  <div>
                    <p className={c.label}>{t.role}</p>
                    <p className={`text-sm ${c.muted}`}>{t.spec}</p>
                  </div>
                  <p className={t.className}>{t.sample}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section c={c} n={3} title="Spacing and shape">
            <div className="grid gap-4 md:grid-cols-3">
              <div className={c.panel}>
                <p className={`mb-3 ${c.label}`}>Spacing scale</p>
                <ul className="space-y-2">
                  {spec.spacing.scale.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-sm tabular-nums">
                      <span className="w-6 text-right">{s}</span>
                      <span className={spec.spacing.bar} style={{ width: s * 3, height: 10 }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={c.panel}>
                <p className={`mb-3 ${c.label}`}>Corners</p>
                <div className="flex flex-wrap gap-3">
                  {spec.spacing.radii.map((r) => (
                    <div key={r.label} className="text-center text-sm">
                      <div className={`h-14 w-14 ${r.className}`} />
                      <p className={`mt-1 ${c.muted}`}>{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={c.panel}>
                <p className={`mb-3 ${c.label}`}>Borders and shadow</p>
                <ul className="space-y-2 text-sm">
                  {spec.spacing.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section c={c} n={4} title="Components">
            <div className="grid gap-4 md:grid-cols-2">
              <Cell c={c} label="Buttons">
                <div className="flex flex-wrap gap-3">
                  <k.Button onClick={() => setDetail(spots[0].id)}>Save spot</k.Button>
                  <k.Button variant="secondary" onClick={() => setDetail(spots[0].id)}>Details</k.Button>
                </div>
              </Cell>
              <Cell c={c} label="Link">
                <k.TextLink href="#components-list">See all cafés</k.TextLink>
              </Cell>
              <Cell c={c} label="Text input">
                <k.TextInput label="Search cafés" placeholder="Name or street" value={query} onChange={setQuery} />
              </Cell>
              <Cell c={c} label="Select">
                <k.Select label="Sort by" options={["Closest", "Open latest", "Quietest"]} value={sort} onChange={setSort} />
              </Cell>
              <Cell c={c} label="Checkboxes and radios">
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <fieldset className="space-y-2">
                    <legend className={`mb-2 text-sm ${c.muted}`}>Must have</legend>
                    <k.Checkbox label="Outlets" checked={outlets} onChange={setOutlets} />
                    <k.Checkbox label="Wi‑Fi" checked={wifi} onChange={setWifi} />
                  </fieldset>
                  <fieldset className="space-y-2">
                    <legend className={`mb-2 text-sm ${c.muted}`}>Noise</legend>
                    {["Quiet", "Low hum", "Lively"].map((n) => (
                      <k.Radio key={n} label={n} name={`noise-${spec.slug}`} checked={noise === n} onChange={() => setNoise(n)} />
                    ))}
                  </fieldset>
                </div>
              </Cell>
              <Cell c={c} label="Toggle">
                <k.Toggle label="Open now" checked={openNow} onChange={setOpenNow} />
              </Cell>
              <Cell c={c} label="Tabs">
                <Tabs kit={k} label="Café lists" items={["All", "Saved", "Open late"]} value={tab} onChange={setTab} />
              </Cell>
              <Cell c={c} label="Filter chips">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
                  {["Quiet", "Outlets", "Under 5 min"].map((ch) => (
                    <k.Chip
                      key={ch}
                      selected={chips.includes(ch)}
                      aria-pressed={chips.includes(ch)}
                      onClick={() => setChips((s) => (s.includes(ch) ? s.filter((x) => x !== ch) : [...s, ch]))}
                    >
                      {ch}
                    </k.Chip>
                  ))}
                </div>
              </Cell>
              <Cell c={c} label="Badges">
                <div className="flex flex-wrap gap-2">
                  <k.Badge tone="success">Open now</k.Badge>
                  <k.Badge tone="accent">Saved</k.Badge>
                  <k.Badge>9 min walk</k.Badge>
                </div>
              </Cell>
              <Cell c={c} label="Card">
                <k.Card spot={spots[0]} onOpen={() => setDetail(spots[0].id)} />
              </Cell>
              <Cell c={c} label="List rows" wide>
                <ul id="components-list">
                  {spots.slice(1, 4).map((s) => (
                    <k.ListRow key={s.id} spot={s} onOpen={() => setDetail(s.id)} />
                  ))}
                </ul>
              </Cell>
              <Cell c={c} label="Detail panel (opens as a modal from a card, row, or button)" wide>
                <div className="max-w-md">
                  <k.DetailPanel spot={spots[4]} saved={saved.includes(spots[4].id)} onSave={() => toggleSave(spots[4].id)} />
                </div>
              </Cell>
            </div>
          </Section>

          <Section c={c} n={5} title="Control states">
            <div className="relative overflow-x-auto">
              {/* Frozen samples: inert so they stay out of the tab order */}
              <table inert className="w-full min-w-[60rem] border-separate border-spacing-y-2 text-left text-sm">
                <thead>
                  <tr>
                    <th className={`w-36 pr-4 font-normal ${c.label}`}>Control</th>
                    {STATES.map((s) => (
                      <th key={s} className={`pr-4 font-normal capitalize ${c.label}`}>{s}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stateRows(k).map((row) => (
                    <tr key={row.name}>
                      <th className="pr-4 font-normal">{row.name}</th>
                      {STATES.map((s) => (
                        <td key={s} className="py-1 pr-4 align-middle">
                          {row.render[s] ? row.render[s]!(s) : <span className={c.muted}>—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`mt-3 text-sm ${c.muted}`}>Frozen for reference. Every control in section 4 responds live to mouse and keyboard.</p>
          </Section>

          <Section c={c} n={6} title="UI states">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(["empty", "loading", "error", "success"] as const).map((kind) => (
                <Cell c={c} key={kind} label={kind[0].toUpperCase() + kind.slice(1)}>
                  <k.UIState kind={kind} onAction={() => {}} />
                </Cell>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <Dialog open={!!open} onClose={() => setDetail(null)} label={open?.name ?? "Café"} className={k.dialogClass}>
        {open && (
          <k.DetailPanel spot={open} saved={saved.includes(open.id)} onSave={() => toggleSave(open.id)} onClose={() => setDetail(null)} />
        )}
      </Dialog>
    </main>
  );
}
