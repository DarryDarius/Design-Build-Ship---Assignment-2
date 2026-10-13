"use client";

import { DesignSystem } from "@/components/ds/DesignSystem";
import { look, type DesignSpec, type Force, type Kit } from "@/components/ds/types";
import { formatHour } from "@/lib/spots";

// Editorial: ink on newsprint, square corners, hairline rules. Press red is the
// editor's pen: it marks the one action to take. Focus is a 2px ink outline.

const ring = "outline-2 outline-offset-2 outline-ed-text";
const liveRing = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ed-text";
const peerRing = "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ed-text";
const groupRing = "group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-ed-text";
const label = "text-[11px] font-semibold tracking-[0.18em] uppercase";

function Check({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
      <path d="M2.5 6.5 5 9l4.5-6" />
    </svg>
  );
}

const Button: Kit["Button"] = ({ variant = "primary", force, disabled, className = "", children, ...rest }) => {
  const m =
    variant === "primary"
      ? {
          rest: "border border-ed-accent bg-ed-accent text-white",
          live: `cursor-pointer hover:bg-ed-accent-hover hover:border-ed-accent-hover active:bg-ed-accent-press ${liveRing}`,
          hover: "border border-ed-accent-hover bg-ed-accent-hover text-white",
          pressed: "border border-ed-accent-press bg-ed-accent-press text-white",
          focus: ring,
          disabled: "cursor-not-allowed border border-ed-hair bg-ed-hair text-ed-muted",
        }
      : {
          rest: "border border-ed-text bg-ed-surface text-ed-text",
          live: `cursor-pointer hover:bg-ed-text hover:text-ed-bg active:bg-[#3a3936] active:text-ed-bg ${liveRing}`,
          hover: "border border-ed-text bg-ed-text text-ed-bg",
          pressed: "border border-ed-text bg-[#3a3936] text-ed-bg",
          focus: ring,
          disabled: "cursor-not-allowed border border-dashed border-ed-muted text-ed-muted",
        };
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${look(force, disabled, m)} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

const TextLink: Kit["TextLink"] = ({ href, force, children }) => (
  <a
    href={href}
    className={`text-sm font-semibold text-ed-text underline decoration-2 underline-offset-[5px] transition-colors ${look(force, false, {
      rest: "decoration-ed-text",
      live: `hover:decoration-ed-accent hover:text-ed-accent active:text-ed-accent-press ${liveRing}`,
      hover: "decoration-ed-accent text-ed-accent",
      pressed: "decoration-ed-accent-press text-ed-accent-press",
      focus: ring,
    })}`}
  >
    {children} →
  </a>
);

// Inputs are a single ink underline, like a form in a printed questionnaire.
const field = {
  rest: "border-ed-text bg-transparent text-ed-text",
  live: "hover:bg-ed-bg focus:bg-ed-surface focus:shadow-[inset_0_-2px_0_#121212] outline-none",
  hover: "border-ed-text bg-ed-bg text-ed-text",
  focus: "bg-ed-surface shadow-[inset_0_-2px_0_#121212]",
  disabled: "cursor-not-allowed border-dashed border-ed-muted bg-transparent text-ed-muted",
};

const Label = ({ text, hide }: { text: string; hide?: boolean }) => (
  <span className={hide ? "sr-only" : `mb-1 block text-ed-muted ${label}`}>{text}</span>
);

const TextInput: Kit["TextInput"] = ({ label: l, hideLabel, placeholder, value, onChange, force, disabled }) => (
  <label className="block">
    <Label text={l} hide={hideLabel} />
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      readOnly={!onChange}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={`w-full min-w-36 border-0 border-b px-1 py-2 text-base transition placeholder:text-ed-muted placeholder:italic ${look(force, disabled, field)}`}
    />
  </label>
);

const Select: Kit["Select"] = ({ label: l, hideLabel, options, value, onChange, force, disabled }) => (
  <label className="block">
    <Label text={l} hide={hideLabel} />
    <span className="relative block">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full min-w-32 cursor-pointer appearance-none border-0 border-b py-2 pr-8 pl-1 text-base transition ${look(force, disabled, field)}`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-xs text-ed-text">▼</span>
    </span>
  </label>
);

function Mark({ kind, checked, force, disabled }: { kind: "checkbox" | "radio"; checked: boolean; force?: Force; disabled?: boolean }) {
  const shape = kind === "checkbox" ? "" : "rounded-full";
  const m = checked
    ? {
        rest: "border-ed-text bg-ed-text text-ed-surface",
        live: `group-hover:bg-[#3a3936] group-active:scale-90 ${peerRing}`,
        hover: "border-ed-text bg-[#3a3936] text-ed-surface",
        pressed: "border-ed-text bg-ed-text text-ed-surface scale-90",
        focus: ring,
        disabled: "border-ed-hair bg-ed-hair text-ed-muted",
      }
    : {
        rest: "border-ed-text bg-ed-surface",
        live: `group-hover:bg-ed-bg group-hover:shadow-[inset_0_0_0_1px_#121212] group-active:scale-90 ${peerRing}`,
        hover: "border-ed-text bg-ed-bg shadow-[inset_0_0_0_1px_#121212]",
        pressed: "border-ed-text bg-ed-hair scale-90",
        focus: ring,
        disabled: "border-dashed border-ed-muted bg-transparent",
      };
  return (
    <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition ${shape} ${look(force, disabled, m)}`}>
      {checked && (kind === "checkbox" ? <Check /> : <span className="h-2 w-2 rounded-full bg-current" />)}
    </span>
  );
}

const choiceLabel = (disabled?: boolean) =>
  `group relative flex w-fit items-center gap-2.5 text-[15px] ${disabled ? "cursor-not-allowed text-ed-muted" : "cursor-pointer text-ed-text"}`;

const Checkbox: Kit["Checkbox"] = ({ label: l, checked, onChange, force, disabled }) => (
  <label className={choiceLabel(disabled || force === "disabled")}>
    <input type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} />
    <Mark kind="checkbox" checked={checked} force={force} disabled={disabled} />
    {l}
  </label>
);

const Radio: Kit["Radio"] = ({ label: l, name, checked, onChange, force, disabled }) => (
  <label className={choiceLabel(disabled || force === "disabled")}>
    <input type="radio" name={name} className="peer sr-only" checked={checked} disabled={disabled} onChange={() => onChange?.()} />
    <Mark kind="radio" checked={checked} force={force} disabled={disabled} />
    {l}
  </label>
);

// A square switch that spells out its state, like a printed form field.
const Toggle: Kit["Toggle"] = ({ label: l, checked, onChange, force, disabled }) => {
  const off = disabled || force === "disabled";
  const track = checked
    ? {
        rest: "border-ed-text bg-ed-text",
        live: `group-hover:bg-[#3a3936] ${groupRing}`,
        hover: "border-ed-text bg-[#3a3936]",
        pressed: "border-ed-text bg-[#3a3936]",
        focus: ring,
        disabled: "border-ed-hair bg-ed-hair",
      }
    : {
        rest: "border-ed-text bg-ed-surface",
        live: `group-hover:bg-ed-bg ${groupRing}`,
        hover: "border-ed-text bg-ed-bg",
        pressed: "border-ed-text bg-ed-hair",
        focus: ring,
        disabled: "border-dashed border-ed-muted bg-transparent",
      };
  const knob = [
    checked ? "translate-x-7" : "",
    force === "pressed" ? "scale-90" : force ? "" : "group-active:scale-90",
    checked ? "bg-ed-surface" : off ? "bg-ed-hair" : "bg-ed-text",
  ].join(" ");
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`group inline-flex items-center gap-3 text-[15px] outline-none ${off ? "cursor-not-allowed text-ed-muted" : "cursor-pointer text-ed-text"}`}
    >
      <span className={`relative flex h-6 w-14 shrink-0 items-center border transition-colors ${look(force, disabled, track)}`}>
        <span aria-hidden className={`absolute text-[9px] font-bold tracking-widest ${checked ? "left-1.5 text-ed-surface" : "right-1.5 text-ed-muted"} ${off && checked ? "text-ed-muted" : ""}`}>
          {checked ? "ON" : "OFF"}
        </span>
        <span className={`absolute top-[3px] left-[3px] h-4 w-5 transition-transform ${knob}`} />
      </span>
      {l}
    </button>
  );
};

const TabList: Kit["TabList"] = ({ className = "", ...rest }) => (
  <div className={`flex gap-6 border-b border-ed-hair ${className}`} {...rest} />
);

const Tab: Kit["Tab"] = ({ selected, force, className = "", children, ...rest }) => (
  <button
    type="button"
    className={`-mb-px border-b-2 pt-1 pb-2 transition-colors ${label} ${look(force, false, selected
      ? { rest: "border-ed-text text-ed-text", live: `cursor-pointer ${liveRing}`, focus: ring }
      : {
          rest: "border-transparent text-ed-muted",
          live: `cursor-pointer hover:border-ed-hair hover:text-ed-text active:border-ed-muted ${liveRing}`,
          hover: "border-ed-hair text-ed-text",
          pressed: "border-ed-muted text-ed-text",
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
    className={`inline-flex items-center gap-1.5 border px-2.5 py-1 whitespace-nowrap transition-colors ${label} ${look(force, disabled, selected
      ? {
          rest: "border-ed-text bg-ed-text text-ed-bg",
          live: `cursor-pointer hover:bg-[#3a3936] active:bg-ed-muted ${liveRing}`,
          hover: "border-ed-text bg-[#3a3936] text-ed-bg",
          pressed: "border-ed-text bg-ed-muted text-ed-bg",
          focus: ring,
          disabled: "cursor-not-allowed border-ed-hair bg-ed-hair text-ed-muted",
        }
      : {
          rest: "border-ed-text bg-ed-surface text-ed-text",
          live: `cursor-pointer hover:bg-ed-bg hover:shadow-[inset_0_0_0_1px_#121212] active:bg-ed-hair ${liveRing}`,
          hover: "border-ed-text bg-ed-bg text-ed-text shadow-[inset_0_0_0_1px_#121212]",
          pressed: "border-ed-text bg-ed-hair text-ed-text",
          focus: ring,
          disabled: "cursor-not-allowed border-dashed border-ed-muted text-ed-muted",
        })} ${className}`}
    {...rest}
  >
    {selected && <Check className="h-2.5 w-2.5" />}
    {children}
  </button>
);

const Badge: Kit["Badge"] = ({ tone = "neutral", children }) => (
  <span
    className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] uppercase ${
      { neutral: "border border-ed-hair text-ed-muted", accent: "border border-ed-accent text-ed-accent", success: "bg-ed-success text-white" }[tone]
    }`}
  >
    {children}
  </span>
);

const hours = (open: number, close: number) => `${formatHour(open)} – ${formatHour(close)}`;

const Card: Kit["Card"] = ({ spot, onOpen, force, saved }) => (
  <article
    className={`group relative border-t-4 border-ed-text pt-3 pb-4 transition-colors ${look(force, false, {
      rest: "bg-transparent",
      live: "hover:bg-ed-bg active:bg-ed-hair/50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ed-text",
      hover: "bg-ed-bg",
      pressed: "bg-ed-hair/50",
      focus: "outline-2 outline-offset-4 outline-ed-text",
    })}`}
  >
    <div className="flex items-baseline justify-between gap-3">
      <p className={`text-ed-accent ${label}`}>
        {spot.noise}
        {saved && <span className="text-ed-text"> · Saved</span>}
      </p>
      <p className={`text-ed-muted tabular-nums ${label}`}>{spot.walk} min walk</p>
    </div>
    <h3 className="mt-2 font-ed-display text-3xl leading-[1.05] text-ed-text">
      <button
        type="button"
        onClick={onOpen}
        className={`cursor-pointer text-left underline-offset-4 outline-none after:absolute after:inset-0 ${force === "hover" ? "underline" : force ? "" : "group-hover:underline"}`}
      >
        {spot.name}
      </button>
    </h3>
    <p className="mt-2 text-[15px] leading-relaxed text-ed-text">{spot.note}</p>
    <p className="mt-3 text-xs text-ed-muted">
      {spot.where} · {hours(spot.open, spot.close)}
    </p>
  </article>
);

const ListRow: Kit["ListRow"] = ({ spot, onOpen, force }) => (
  <li className="border-b border-ed-hair last:border-b-0">
    <button
      type="button"
      onClick={onOpen}
      className={`group flex w-full items-baseline gap-4 px-1 py-3 text-left transition-colors ${look(force, false, {
        rest: "",
        live: `cursor-pointer hover:bg-ed-bg active:bg-ed-hair/60 ${liveRing}`,
        hover: "bg-ed-bg",
        pressed: "bg-ed-hair/60",
        focus: ring,
      })}`}
    >
      <span className="min-w-0 flex-1">
        <span className={`block truncate font-ed-display text-xl text-ed-text underline-offset-4 ${force === "hover" ? "underline" : force ? "" : "group-hover:underline"}`}>
          {spot.name}
        </span>
        <span className="block truncate text-sm text-ed-muted">{spot.where}</span>
      </span>
      <span className="text-sm text-ed-text tabular-nums">{spot.walk} min</span>
    </button>
  </li>
);

const DetailPanel: Kit["DetailPanel"] = ({ spot, saved, onSave, onClose }) => (
  <div className="border border-ed-text bg-ed-surface text-ed-text">
    <div className="flex items-center justify-between border-b border-ed-text px-6 py-2">
      <p className={`text-ed-muted ${label}`}>
        {spot.address} · {spot.walk} min walk
      </p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`-mr-2 flex h-8 w-8 cursor-pointer items-center justify-center text-ed-text transition-colors hover:bg-ed-text hover:text-ed-bg ${liveRing}`}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M3 3l10 10M13 3 3 13" />
          </svg>
        </button>
      )}
    </div>
    <div className="px-6 pt-5">
      <p className={`text-ed-accent ${label}`}>{spot.noise}</p>
      <h3 className="mt-1 font-ed-display text-5xl leading-none">{spot.name}</h3>
      <p className="mt-3 font-ed-display text-xl leading-snug italic">{spot.note}</p>
    </div>
    <dl className="mx-6 mt-5 border-t-2 border-ed-text text-sm">
      {[
        ["Hours", hours(spot.open, spot.close)],
        ["Outlets", spot.outlets ? "Plenty" : "Few or none"],
        ["Wi‑Fi", spot.wifi ? "Yes" : "No"],
        ["Seats", spot.seats],
        ["My order", spot.order],
      ].map(([k, v]) => (
        <div key={k} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-ed-hair py-2">
          <dt className={`pt-0.5 text-ed-muted ${label}`}>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
    <div className="flex flex-wrap gap-3 p-6">
      {saved ? (
        <Button variant="secondary" onClick={onSave} aria-pressed>
          <Check /> Saved
        </Button>
      ) : (
        <Button onClick={onSave} aria-pressed={false}>
          Save spot
        </Button>
      )}
    </div>
  </div>
);

const UIState: Kit["UIState"] = ({ kind, onAction, title, body, actionLabel }) => {
  if (kind === "loading")
    return (
      <div role="status" className="space-y-3">
        <div className="animate-pulse-soft space-y-2">
          <div className="h-5 w-4/5 bg-ed-hair" />
          <div className="h-px w-full bg-ed-text" />
          <div className="h-2.5 w-full bg-ed-hair" />
          <div className="h-2.5 w-2/3 bg-ed-hair" />
        </div>
        <p className="text-sm text-ed-muted italic">Setting the page…</p>
      </div>
    );
  const copy = {
    empty: ["No cafés match", "Nothing fits all of those filters. Remove one to widen the search.", "Clear filters"],
    error: ["Couldn’t load hours", "The listing didn’t arrive. Check your connection and try again.", "Try again"],
    success: ["Saved to your spots", "Find it under the Saved tab.", ""],
  }[kind];
  copy[0] = title ?? copy[0];
  copy[1] = body ?? copy[1];
  copy[2] = actionLabel ?? copy[2];
  const kicker = { empty: "No results", error: "Error", success: "Saved" }[kind];
  const tone = { empty: "text-ed-muted", error: "text-ed-accent", success: "text-ed-success" }[kind];
  return (
    <div className={`space-y-2 ${kind === "error" ? "border-l-2 border-ed-accent pl-3" : kind === "success" ? "border-l-2 border-ed-success pl-3" : ""}`}>
      <p className={`flex items-center gap-1.5 ${tone} ${label}`}>
        {kind === "success" && <Check className="h-3 w-3" />}
        {kicker}
      </p>
      <p className="font-ed-display text-2xl leading-tight text-ed-text">{copy[0]}</p>
      <p className="text-sm text-ed-muted">{copy[1]}</p>
      {copy[2] && (
        <Button variant="secondary" onClick={onAction} className="mt-1">
          {copy[2]}
        </Button>
      )}
    </div>
  );
};

export const editorialKit: Kit = {
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
  dialogClass: "m-auto w-[min(34rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto bg-transparent p-0 backdrop:bg-ed-text/60",
  UIState,
};

const editorialSpec: DesignSpec = {
  slug: "editorial",
  name: "Editorial",
  words: "Ink · Grid · Serif",
  intro:
    "A campus paper’s weekend section. Big serif headlines, square corners, hairline rules, and press red used like an editor’s pen: only where you should act.",
  chrome: {
    page: "bg-ed-bg font-ed-body text-ed-text",
    title: "mt-1 border-b-4 border-ed-text pb-2 font-ed-display text-6xl italic sm:text-7xl",
    muted: "text-ed-muted",
    h2: "font-ed-display text-3xl",
    label: `text-ed-muted ${label}`,
    panel: "border border-ed-text bg-ed-surface p-5",
    link: `font-semibold tracking-[0.12em] text-ed-text uppercase underline decoration-ed-accent decoration-2 underline-offset-4 hover:text-ed-accent ${liveRing}`,
    rule: "border-ed-text",
  },
  colors: [
    { role: "Background", hex: "#f7f5f0", use: "newsprint, page" },
    { role: "Surface", hex: "#ffffff", use: "panels, cards, dialogs" },
    { role: "Text", hex: "#121212", use: "ink, body, headlines, control borders", checks: [["#121212", "#f7f5f0", "on background"]] },
    { role: "Muted text", hex: "#595751", use: "bylines, meta, labels", checks: [["#595751", "#f7f5f0", "on background"]] },
    { role: "Hairline", hex: "#d9d5cc", use: "dividers only, never a control edge", checks: [["#d9d5cc", "#ffffff", "on surface"]] },
    {
      role: "Accent",
      hex: "#c21d17",
      use: "press red, primary action and corrections",
      checks: [
        ["#c21d17", "#f7f5f0", "on background"],
        ["#ffffff", "#c21d17", "white on accent"],
      ],
    },
    { role: "Success", hex: "#1d6b3c", use: "confirmation only", checks: [["#ffffff", "#1d6b3c", "white on success"]] },
  ],
  type: [
    { role: "Display", spec: "Instrument Serif 64/64 · italic", className: "font-ed-display text-5xl leading-none italic sm:text-[64px]", sample: "Eight cafés, ranked by silence" },
    { role: "Heading", spec: "Instrument Serif 30/32 · regular", className: "font-ed-display text-[30px] leading-[1.07]", sample: "Ex Libris" },
    {
      role: "Body",
      spec: "Inter Tight 16/26 · 400",
      className: "max-w-prose text-base leading-[1.625]",
      sample: "The default. Grab a cup at the counter, then head upstairs where the only sound is pages turning.",
    },
    { role: "Label", spec: "Inter Tight 11/16 · 600 · +18% tracking", className: label, sample: "Quiet · 3 min walk · Open until 11 pm" },
  ],
  spacing: {
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    bar: "bg-ed-text",
    radii: [
      { label: "0 · everything", className: "border border-ed-text" },
      { label: "full · radio only", className: "rounded-full border border-ed-text" },
    ],
    notes: [
      "1px ink border on every control.",
      "4px ink rule over each card and section, like a column head.",
      "Hairlines only divide rows. No shadows.",
      "Focus: 2px ink outline, 2px offset. Hover fills with ink.",
    ],
  },
  kit: editorialKit,
};

export function EditorialDesignSystem() {
  return <DesignSystem spec={editorialSpec} />;
}
