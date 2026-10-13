"use client";

import { DesignSystem } from "@/components/ds/DesignSystem";
import { look, type DesignSpec, type Kit } from "@/components/ds/types";
import { formatHour } from "@/lib/spots";

// Calm: one clay accent, reserved for the primary action. Everything else is
// espresso, oat, and 1px lines. No shadows.

const ring = "ring-2 ring-calm-accent ring-offset-2 ring-offset-calm-surface";
const liveRing = "outline-none focus-visible:ring-2 focus-visible:ring-calm-accent focus-visible:ring-offset-2 focus-visible:ring-offset-calm-surface";
const peerRing = "peer-focus-visible:ring-2 peer-focus-visible:ring-calm-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-calm-surface";

function Check({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M2.5 6.5 5 9l4.5-6" />
    </svg>
  );
}

const Button: Kit["Button"] = ({ variant = "primary", force, disabled, className = "", children, ...rest }) => {
  const m =
    variant === "primary"
      ? {
          rest: "bg-calm-accent text-white",
          live: `cursor-pointer hover:bg-calm-accent-hover active:bg-calm-accent-press active:translate-y-px ${liveRing}`,
          hover: "bg-calm-accent-hover text-white",
          pressed: "bg-calm-accent-press text-white translate-y-px",
          focus: ring,
          disabled: "cursor-not-allowed bg-calm-border text-calm-muted",
        }
      : {
          rest: "border border-calm-border bg-calm-surface text-calm-text",
          live: `cursor-pointer hover:border-calm-muted hover:bg-calm-bg active:bg-[#e9dfd0] active:translate-y-px ${liveRing}`,
          hover: "border border-calm-muted bg-calm-bg text-calm-text",
          pressed: "border border-calm-muted bg-[#e9dfd0] text-calm-text translate-y-px",
          focus: ring,
          disabled: "cursor-not-allowed border border-dashed border-calm-border text-calm-muted",
        };
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition ${look(force, disabled, m)} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

const TextLink: Kit["TextLink"] = ({ href, force, children }) => (
  <a
    href={href}
    className={`rounded-sm text-sm text-calm-text underline decoration-2 underline-offset-4 transition-colors ${look(force, false, {
      rest: "decoration-calm-border",
      live: `hover:decoration-calm-accent active:text-calm-accent-press ${liveRing}`,
      hover: "decoration-calm-accent",
      pressed: "decoration-calm-accent text-calm-accent-press",
      focus: ring,
    })}`}
  >
    {children}
  </a>
);

const field = {
  rest: "border-calm-border bg-white/70 text-calm-text",
  live: "hover:border-calm-muted focus:border-calm-accent focus:ring-2 focus:ring-calm-accent/25 outline-none",
  hover: "border-calm-muted bg-white/70 text-calm-text",
  focus: "border-calm-accent! ring-2 ring-calm-accent/25",
  disabled: "cursor-not-allowed border-dashed border-calm-border bg-calm-bg text-calm-muted",
};

const Label = ({ text, hide }: { text: string; hide?: boolean }) => (
  <span className={hide ? "sr-only" : "mb-1.5 block text-sm font-medium text-calm-text"}>{text}</span>
);

const TextInput: Kit["TextInput"] = ({ label, hideLabel, placeholder, value, onChange, force, disabled }) => (
  <label className="block">
    <Label text={label} hide={hideLabel} />
    <span className="relative block">
      <svg viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-calm-muted" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <circle cx="7" cy="7" r="4.5" />
        <path d="M10.5 10.5 14 14" />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        readOnly={!onChange}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full min-w-28 rounded-md border py-2 pr-3 pl-9 text-sm transition placeholder:text-calm-muted ${look(force, disabled, field)}`}
      />
    </span>
  </label>
);

const Select: Kit["Select"] = ({ label, hideLabel, options, value, onChange, force, disabled }) => (
  <label className="block">
    <Label text={label} hide={hideLabel} />
    <span className="relative block">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full min-w-28 cursor-pointer appearance-none rounded-md border py-2 pr-9 pl-3 text-sm transition ${look(force, disabled, field)}`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <svg viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-calm-muted" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="m4 6 4 4 4-4" />
      </svg>
    </span>
  </label>
);

// Shared visual for checkbox and radio: a box (or circle) next to its label.
function Mark({ kind, checked, force, disabled }: { kind: "checkbox" | "radio"; checked: boolean; force?: Parameters<typeof look>[0]; disabled?: boolean }) {
  const shape = kind === "checkbox" ? "rounded-[5px]" : "rounded-full";
  const m = checked
    ? {
        rest: "border-calm-text bg-calm-text text-calm-surface",
        live: `group-hover:bg-[#45392f] group-active:scale-90 ${peerRing}`,
        hover: "border-calm-text bg-[#45392f] text-calm-surface",
        pressed: "border-calm-text bg-calm-text text-calm-surface scale-90",
        focus: ring,
        disabled: "border-calm-border bg-calm-border text-calm-muted",
      }
    : {
        rest: "border-calm-muted bg-calm-surface",
        live: `group-hover:border-calm-text group-hover:bg-calm-bg group-active:scale-90 ${peerRing}`,
        hover: "border-calm-text bg-calm-bg",
        pressed: "border-calm-text bg-[#e9dfd0] scale-90",
        focus: ring,
        disabled: "border-calm-border bg-calm-bg",
      };
  return (
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center border transition ${shape} ${look(force, disabled, m)}`}>
      {checked && (kind === "checkbox" ? <Check /> : <span className="h-2 w-2 rounded-full bg-current" />)}
    </span>
  );
}

const choiceLabel = (disabled?: boolean) =>
  `group relative flex w-fit items-center gap-2.5 text-sm ${disabled ? "cursor-not-allowed text-calm-muted" : "cursor-pointer text-calm-text"}`;

const Checkbox: Kit["Checkbox"] = ({ label, checked, onChange, force, disabled }) => (
  <label className={choiceLabel(disabled || force === "disabled")}>
    <input type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
    <Mark kind="checkbox" checked={checked} force={force} disabled={disabled} />
    {label}
  </label>
);

const Radio: Kit["Radio"] = ({ label, name, checked, onChange, force, disabled }) => (
  <label className={choiceLabel(disabled || force === "disabled")}>
    <input type="radio" name={name} className="peer sr-only" checked={checked} disabled={disabled} onChange={() => onChange?.()} />
    <Mark kind="radio" checked={checked} force={force} disabled={disabled} />
    {label}
  </label>
);

const groupRing =
  "group-focus-visible:ring-2 group-focus-visible:ring-calm-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-calm-surface";

const Toggle: Kit["Toggle"] = ({ label, checked, onChange, force, disabled }) => {
  const off = disabled || force === "disabled";
  const pressed = force === "pressed";
  const track = checked
    ? {
        rest: "border-calm-sage bg-calm-sage",
        live: `group-hover:bg-[#43523b] ${groupRing}`,
        hover: "border-calm-sage bg-[#43523b]",
        pressed: "border-calm-sage bg-[#43523b]",
        focus: ring,
        disabled: "border-calm-border bg-calm-border",
      }
    : {
        rest: "border-calm-muted bg-calm-surface",
        live: `group-hover:border-calm-text group-hover:bg-calm-bg ${groupRing}`,
        hover: "border-calm-text bg-calm-bg",
        pressed: "border-calm-text bg-calm-bg",
        focus: ring,
        disabled: "border-calm-border bg-calm-bg",
      };
  // The knob stretches while pressed, like a finger pushing it.
  const knob = [
    pressed ? "w-5" : "w-4",
    checked ? (pressed ? "translate-x-4" : "translate-x-5") : "",
    force ? "" : checked ? "group-active:w-5 group-active:translate-x-4" : "group-active:w-5",
    checked ? "bg-calm-surface" : off ? "bg-calm-border" : "bg-calm-muted",
  ].join(" ");
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`group inline-flex items-center gap-3 text-sm outline-none ${off ? "cursor-not-allowed text-calm-muted" : "cursor-pointer text-calm-text"}`}
    >
      <span className={`relative h-6 w-11 shrink-0 rounded-full border transition ${look(force, disabled, track)}`}>
        <span className={`absolute top-[3px] left-[3px] h-4 rounded-full transition-all ${knob}`} />
      </span>
      {label}
    </button>
  );
};

const TabList: Kit["TabList"] = ({ className = "", ...rest }) => (
  <div className={`inline-flex gap-1 rounded-lg border border-calm-border bg-calm-bg p-1 ${className}`} {...rest} />
);

const Tab: Kit["Tab"] = ({ selected, force, className = "", children, ...rest }) => (
  <button
    type="button"
    className={`rounded-md px-3 py-1.5 text-sm transition ${look(force, false, selected
      ? { rest: "bg-calm-surface font-medium text-calm-text ring-1 ring-calm-border", live: `cursor-pointer ${liveRing}`, focus: ring }
      : {
          rest: "text-calm-muted",
          live: `cursor-pointer hover:bg-[#ebe2d5] hover:text-calm-text active:bg-[#e3d8c8] ${liveRing}`,
          hover: "bg-[#ebe2d5] text-calm-text",
          pressed: "bg-[#e3d8c8] text-calm-text",
          focus: ring,
        })} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

const Chip: Kit["Chip"] = ({ selected, force, disabled, className = "", children, ...rest }) => (
  <button
    type="button"
    disabled={disabled}
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm whitespace-nowrap transition ${look(force, disabled, selected
      ? {
          rest: "border-calm-text bg-calm-text text-calm-surface",
          live: `cursor-pointer hover:bg-[#45392f] active:scale-95 ${liveRing}`,
          hover: "border-calm-text bg-[#45392f] text-calm-surface",
          pressed: "border-calm-text bg-calm-text text-calm-surface scale-95",
          focus: ring,
          disabled: "cursor-not-allowed border-calm-border bg-calm-border text-calm-muted",
        }
      : {
          rest: "border-calm-border bg-calm-surface text-calm-text",
          live: `cursor-pointer hover:border-calm-muted hover:bg-calm-bg active:scale-95 ${liveRing}`,
          hover: "border-calm-muted bg-calm-bg text-calm-text",
          pressed: "border-calm-muted bg-[#e9dfd0] text-calm-text scale-95",
          focus: ring,
          disabled: "cursor-not-allowed border-dashed border-calm-border text-calm-muted",
        })} ${className}`}
    {...rest}
  >
    {selected && <Check />}
    {children}
  </button>
);

const Badge: Kit["Badge"] = ({ tone = "neutral", children }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
      { neutral: "border border-calm-border text-calm-muted", accent: "bg-[#f3e0d6] text-calm-accent-hover", success: "bg-[#e3e8dc] text-calm-sage" }[tone]
    }`}
  >
    {children}
  </span>
);

const hours = (open: number, close: number) => `${formatHour(open)} – ${formatHour(close)}`;

const Card: Kit["Card"] = ({ spot, onOpen, force, saved }) => (
  <article
    className={`relative h-full rounded-xl border p-5 transition ${look(force, false, {
      rest: "border-calm-border bg-calm-surface",
      live: "hover:border-calm-muted active:bg-calm-bg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-calm-accent has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-calm-bg",
      hover: "border-calm-muted bg-calm-surface",
      pressed: "border-calm-muted bg-calm-bg",
      focus: "ring-2 ring-calm-accent ring-offset-2 ring-offset-calm-bg",
    })}`}
  >
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-calm-display text-xl leading-tight text-calm-text">
        <button type="button" onClick={onOpen} className="cursor-pointer text-left outline-none after:absolute after:inset-0 after:rounded-xl">
          {spot.name}
        </button>
      </h3>
      <span className="text-sm whitespace-nowrap text-calm-muted tabular-nums">{spot.walk} min</span>
    </div>
    <p className="mt-0.5 text-sm text-calm-muted">{spot.where}</p>
    <p className="mt-3 text-[15px] leading-relaxed text-calm-text">{spot.note}</p>
    <div className="mt-4 flex flex-wrap gap-1.5">
      {saved && <Badge tone="accent">Saved</Badge>}
      <Badge tone={spot.noise === "Quiet" ? "success" : "neutral"}>{spot.noise}</Badge>
      {spot.outlets && <Badge>Outlets</Badge>}
      <Badge>{hours(spot.open, spot.close)}</Badge>
    </div>
  </article>
);

const ListRow: Kit["ListRow"] = ({ spot, onOpen, force }) => (
  <li className="border-b border-calm-border last:border-b-0">
    <button
      type="button"
      onClick={onOpen}
      className={`group flex w-full items-center gap-4 rounded-md px-2 py-3 text-left transition ${look(force, false, {
        rest: "",
        live: `cursor-pointer hover:bg-calm-bg active:bg-[#e9dfd0] ${liveRing}`,
        hover: "bg-calm-bg",
        pressed: "bg-[#e9dfd0]",
        focus: ring,
      })}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate font-calm-display text-lg text-calm-text">{spot.name}</span>
        <span className="block truncate text-sm text-calm-muted">{spot.where}</span>
      </span>
      <span className="text-sm text-calm-muted tabular-nums">{spot.walk} min</span>
      <span aria-hidden className={`text-calm-muted transition-transform ${force === "hover" ? "translate-x-0.5" : force ? "" : "group-hover:translate-x-0.5"}`}>→</span>
    </button>
  </li>
);

const DetailPanel: Kit["DetailPanel"] = ({ spot, saved, onSave, onClose }) => (
  <div className="rounded-xl border border-calm-border bg-calm-surface text-calm-text">
    <div className="flex items-start justify-between gap-4 p-6 pb-0">
      <div>
        <p className="text-xs font-medium tracking-[0.14em] text-calm-muted uppercase">
          {spot.walk} min walk · {spot.address}
        </p>
        <h3 className="mt-2 font-calm-display text-3xl leading-tight">{spot.name}</h3>
        <p className="text-sm text-calm-muted">{spot.where}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`-mt-1 -mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-calm-muted transition hover:bg-calm-bg hover:text-calm-text ${liveRing}`}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      )}
    </div>
    <p className="mx-6 mt-4 border-l-2 border-calm-border pl-3 font-calm-display text-lg leading-snug italic">{spot.note}</p>
    <dl className="mx-6 mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-calm-border pt-5 text-sm">
      {[
        ["Hours", hours(spot.open, spot.close)],
        ["Noise", spot.noise],
        ["Outlets", spot.outlets ? "Plenty" : "Few or none"],
        ["Wi‑Fi", spot.wifi ? "Yes" : "No"],
        ["Seats", spot.seats],
        ["My order", spot.order],
      ].map(([k, v]) => (
        <div key={k}>
          <dt className="text-xs font-medium tracking-[0.14em] text-calm-muted uppercase">{k}</dt>
          <dd className="mt-0.5">{v}</dd>
        </div>
      ))}
    </dl>
    <div className="mt-6 flex flex-wrap gap-3 border-t border-calm-border p-6">
      {saved ? (
        <Button variant="secondary" onClick={onSave} aria-pressed>
          <Check /> Saved
        </Button>
      ) : (
        <Button onClick={onSave} aria-pressed={false}>
          Save spot
        </Button>
      )}
      {onClose && (
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      )}
    </div>
  </div>
);

function StateIcon({ kind }: { kind: "empty" | "error" | "success" }) {
  const tone = { empty: "border-calm-border text-calm-muted", error: "border-calm-error/30 text-calm-error", success: "border-calm-sage/30 text-calm-sage" }[kind];
  return (
    <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${tone}`} aria-hidden>
      {kind === "empty" && (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5Z" /><path d="M16 11h1.5a2 2 0 0 1 0 4H16" /></svg>
      )}
      {kind === "error" && <span className="font-calm-display text-lg">!</span>}
      {kind === "success" && <Check className="h-4 w-4" />}
    </span>
  );
}

const UIState: Kit["UIState"] = ({ kind, onAction, title, body, actionLabel }) => {
  if (kind === "loading")
    return (
      <div role="status" className="space-y-3">
        <div className="animate-pulse-soft space-y-2">
          <div className="h-4 w-3/4 rounded bg-calm-border" />
          <div className="h-3 w-1/2 rounded bg-calm-border" />
          <div className="h-3 w-2/3 rounded bg-calm-border" />
        </div>
        <p className="text-sm text-calm-muted">Finding open tables…</p>
      </div>
    );
  const copy = {
    empty: ["No cafés match", "Try removing a filter.", "Clear filters"],
    error: ["Couldn’t load hours", "Check your connection and try again.", "Try again"],
    success: ["Saved to your spots", "Find it under the Saved tab.", ""],
  }[kind];
  copy[0] = title ?? copy[0];
  copy[1] = body ?? copy[1];
  copy[2] = actionLabel ?? copy[2];
  return (
    <div className="space-y-2">
      <StateIcon kind={kind} />
      <p className={`font-calm-display text-lg ${kind === "error" ? "text-calm-error" : kind === "success" ? "text-calm-sage" : "text-calm-text"}`}>{copy[0]}</p>
      <p className="text-sm text-calm-muted">{copy[1]}</p>
      {copy[2] && (
        <Button variant="secondary" onClick={onAction} className="mt-1">
          {copy[2]}
        </Button>
      )}
    </div>
  );
};

export const calmKit: Kit = {
  Button,
  TextLink,
  TextInput,
  Select,
  Checkbox,
  Radio,
  Toggle,
  TabList,
  Tab,
  Chip,
  Badge,
  Card,
  ListRow,
  DetailPanel,
  dialogClass:
    "m-auto w-[min(32rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl bg-transparent p-0 backdrop:bg-calm-text/40",
  UIState,
};

const calmSpec: DesignSpec = {
  slug: "calm",
  name: "Calm",
  words: "Matte · Warm · Quiet",
  intro:
    "Warm paper, a soft serif, and thin lines instead of shadows. Clay is the only loud color, and it is saved for the one thing you came to do: save a spot.",
  chrome: {
    page: "calm-grain bg-calm-bg font-calm-body text-calm-text",
    title: "mt-1 font-calm-display text-5xl sm:text-6xl",
    muted: "text-calm-muted",
    h2: "font-calm-display text-2xl",
    label: "text-xs font-medium tracking-[0.14em] text-calm-muted uppercase",
    panel: "rounded-xl border border-calm-border bg-calm-surface p-5",
    link: `rounded-sm text-calm-muted underline-offset-4 hover:text-calm-text hover:underline ${liveRing}`,
    rule: "border-calm-border",
  },
  colors: [
    { role: "Background", hex: "#f3ece1", use: "oat paper, page" },
    { role: "Surface", hex: "#fbf7f1", use: "cards, panels, inputs" },
    { role: "Text", hex: "#2a231d", use: "espresso, body and headings", checks: [["#2a231d", "#f3ece1", "on background"]] },
    { role: "Muted text", hex: "#6b5f54", use: "meta, labels, placeholders", checks: [["#6b5f54", "#f3ece1", "on background"]] },
    { role: "Border", hex: "#dcd0bf", use: "1px lines, dividers", checks: [["#dcd0bf", "#f3ece1", "on background"]] },
    {
      role: "Accent",
      hex: "#9a4426",
      use: "clay, primary action only",
      checks: [
        ["#9a4426", "#f3ece1", "on background"],
        ["#ffffff", "#9a4426", "white on accent"],
      ],
    },
    { role: "Success", hex: "#4f6146", use: "sage, open / on / saved", checks: [["#4f6146", "#e3e8dc", "on its tint"]] },
    { role: "Error", hex: "#9b2c2c", use: "failed loads", checks: [["#9b2c2c", "#fbf7f1", "on surface"]] },
  ],
  type: [
    { role: "Display", spec: "Fraunces 56/60 · 400 · soft", className: "font-calm-display text-5xl leading-[1.07] sm:text-[56px]", sample: "Eight quiet tables" },
    { role: "Heading", spec: "Fraunces 24/30 · 400", className: "font-calm-display text-2xl leading-[1.25]", sample: "Ex Libris" },
    {
      role: "Body",
      spec: "DM Sans 16/26 · 400",
      className: "max-w-prose text-base leading-[1.625]",
      sample: "The default. Grab a cup at the counter, then head upstairs where the only sound is pages turning.",
    },
    { role: "Label", spec: "DM Sans 12/16 · 500 · +14% tracking", className: "text-xs font-medium tracking-[0.14em] uppercase", sample: "Open until 11 pm · 3 min walk" },
  ],
  spacing: {
    scale: [4, 8, 12, 16, 24, 32, 48],
    bar: "rounded-sm bg-calm-accent/70",
    radii: [
      { label: "6 · controls", className: "rounded-md border border-calm-text" },
      { label: "12 · cards", className: "rounded-xl border border-calm-text" },
      { label: "full · chips", className: "rounded-full border border-calm-text" },
    ],
    notes: [
      "1px border in Border color on every surface.",
      "No shadows anywhere: a thin line separates instead.",
      "Focus: 2px clay ring, 2px offset.",
      "Hover darkens one step; pressed nudges down 1px.",
    ],
  },
  kit: calmKit,
};

export function CalmDesignSystem() {
  return <DesignSystem spec={calmSpec} />;
}
