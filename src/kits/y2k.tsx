"use client";

import { DesignSystem } from "@/components/ds/DesignSystem";
import { look, type DesignSpec, type Force, type Kit } from "@/components/ds/types";
import { formatHour } from "@/lib/spots";

// Y2K: pills, 2px navy outlines, and hard sticker shadows that lift on hover
// and squash on press. Lime means "selected", hot pink means "do this".
// Focus is a navy ring with a lime halo.

const ring = "ring-[3px] ring-y2k-text ring-offset-2 ring-offset-y2k-lime";
const liveRing =
  "outline-none focus-visible:ring-[3px] focus-visible:ring-y2k-text focus-visible:ring-offset-2 focus-visible:ring-offset-y2k-lime";
const peerRing =
  "peer-focus-visible:ring-[3px] peer-focus-visible:ring-y2k-text peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-y2k-lime";
const groupRing =
  "group-focus-visible:ring-[3px] group-focus-visible:ring-y2k-text group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-y2k-lime";

// Sticker shadow: rests 3px, lifts to 5px on hover, flattens on press.
const lift = {
  rest: "shadow-[0_3px_0_#1b1446]",
  live: "hover:-translate-y-0.5 hover:shadow-[0_5px_0_#1b1446] active:translate-y-[3px] active:shadow-none",
  hover: "-translate-y-0.5 shadow-[0_5px_0_#1b1446]",
  pressed: "translate-y-[3px] shadow-none",
};
const gloss = "inset-shadow-[0_2px_0_rgba(255,255,255,.45)]";

function Check({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 6.5 5 9l4.5-6" />
    </svg>
  );
}

const Button: Kit["Button"] = ({ variant = "primary", force, disabled, className = "", children, ...rest }) => {
  const fill = variant === "primary" ? "bg-y2k-accent text-white" : "bg-y2k-sky text-y2k-text";
  const m = {
    rest: `${fill} ${lift.rest}`,
    live: `cursor-pointer ${variant === "primary" ? "hover:bg-y2k-accent-hover active:bg-y2k-accent-press" : "hover:bg-[#a6e4ff] active:bg-[#74cdf5]"} ${lift.live} ${liveRing}`,
    hover: `${variant === "primary" ? "bg-y2k-accent-hover text-white" : "bg-[#a6e4ff] text-y2k-text"} ${lift.hover}`,
    pressed: `${variant === "primary" ? "bg-y2k-accent-press text-white" : "bg-[#74cdf5] text-y2k-text"} ${lift.pressed}`,
    focus: ring,
    disabled: "cursor-not-allowed border-dashed border-y2k-muted bg-transparent text-y2k-muted shadow-none",
  };
  return (
    <button
      type="button"
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2 rounded-full border-2 border-y2k-text px-5 py-2 text-sm font-bold whitespace-nowrap transition ${look(force, disabled, m)} ${disabled || force === "disabled" ? "" : gloss} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

const TextLink: Kit["TextLink"] = ({ href, force, children }) => (
  <a
    href={href}
    className={`rounded-full px-1 text-sm font-bold text-y2k-text underline decoration-y2k-accent decoration-wavy decoration-2 underline-offset-4 transition ${look(force, false, {
      rest: "",
      live: `hover:bg-y2k-lime active:bg-[#b4e33f] ${liveRing}`,
      hover: "bg-y2k-lime",
      pressed: "bg-[#b4e33f]",
      focus: ring,
    })}`}
  >
    {children} ✦
  </a>
);

const field = {
  rest: "border-y2k-text bg-y2k-surface text-y2k-text",
  live: "hover:shadow-[0_3px_0_#1b1446] focus:shadow-[0_3px_0_#1b1446] focus:ring-[3px] focus:ring-y2k-text focus:ring-offset-2 focus:ring-offset-y2k-lime outline-none",
  hover: "border-y2k-text bg-y2k-surface text-y2k-text shadow-[0_3px_0_#1b1446]",
  focus: `shadow-[0_3px_0_#1b1446] ${ring}`,
  disabled: "cursor-not-allowed border-dashed border-y2k-muted bg-transparent text-y2k-muted",
};

const Label = ({ text, hide }: { text: string; hide?: boolean }) => (
  <span className={hide ? "sr-only" : "mb-1.5 block pl-3 text-sm font-bold text-y2k-text"}>{text}</span>
);

const TextInput: Kit["TextInput"] = ({ label, hideLabel, placeholder, value, onChange, force, disabled }) => (
  <label className="block">
    <Label text={label} hide={hideLabel} />
    <span className="relative block">
      <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-y2k-accent">✦</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        readOnly={!onChange}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full min-w-28 rounded-full border-2 py-2 pr-4 pl-10 text-sm transition placeholder:text-y2k-muted ${look(force, disabled, field)}`}
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
        className={`w-full min-w-28 cursor-pointer appearance-none rounded-full border-2 py-2 pr-11 pl-4 text-sm font-medium transition ${look(force, disabled, field)}`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1/2 right-1.5 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] ${disabled || force === "disabled" ? "border-y2k-muted text-y2k-muted" : "border-y2k-text bg-y2k-lime text-y2k-text"}`}
      >
        ▼
      </span>
    </span>
  </label>
);

function Mark({ kind, checked, force, disabled }: { kind: "checkbox" | "radio"; checked: boolean; force?: Force; disabled?: boolean }) {
  const shape = kind === "checkbox" ? "rounded-md" : "rounded-full";
  const m = checked
    ? {
        rest: "border-y2k-text bg-y2k-lime text-y2k-text",
        live: `group-hover:bg-[#d6fa7c] group-active:scale-90 ${peerRing}`,
        hover: "border-y2k-text bg-[#d6fa7c] text-y2k-text",
        pressed: "border-y2k-text bg-y2k-lime text-y2k-text scale-90",
        focus: ring,
        disabled: "border-dashed border-y2k-muted bg-y2k-border text-y2k-muted",
      }
    : {
        rest: "border-y2k-text bg-y2k-surface",
        live: `group-hover:bg-y2k-bg group-hover:shadow-[0_2px_0_#1b1446] group-active:scale-90 ${peerRing}`,
        hover: "border-y2k-text bg-y2k-bg shadow-[0_2px_0_#1b1446]",
        pressed: "border-y2k-text bg-y2k-border scale-90",
        focus: ring,
        disabled: "border-dashed border-y2k-muted bg-transparent",
      };
  return (
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center border-2 transition ${shape} ${look(force, disabled, m)}`}>
      {checked && (kind === "checkbox" ? <Check /> : <span className="h-2 w-2 rounded-full bg-current" />)}
    </span>
  );
}

const choiceLabel = (disabled?: boolean) =>
  `group relative flex w-fit items-center gap-2.5 text-sm font-medium ${disabled ? "cursor-not-allowed text-y2k-muted" : "cursor-pointer text-y2k-text"}`;

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

const Toggle: Kit["Toggle"] = ({ label, checked, onChange, force, disabled }) => {
  const off = disabled || force === "disabled";
  const track = checked
    ? {
        rest: "border-y2k-text bg-y2k-lime",
        live: `group-hover:bg-[#d6fa7c] ${groupRing}`,
        hover: "border-y2k-text bg-[#d6fa7c]",
        pressed: "border-y2k-text bg-y2k-lime",
        focus: ring,
        disabled: "border-dashed border-y2k-muted bg-y2k-border",
      }
    : {
        rest: "border-y2k-text bg-y2k-surface",
        live: `group-hover:bg-y2k-bg ${groupRing}`,
        hover: "border-y2k-text bg-y2k-bg",
        pressed: "border-y2k-text bg-y2k-border",
        focus: ring,
        disabled: "border-dashed border-y2k-muted bg-transparent",
      };
  const knob = [
    force === "pressed" ? "w-6" : "w-5",
    checked ? (force === "pressed" ? "translate-x-4" : "translate-x-5") : "",
    force ? "" : checked ? "group-active:w-6 group-active:translate-x-4" : "group-active:w-6",
    off ? "border-y2k-muted bg-y2k-bg" : "border-y2k-text bg-gradient-to-b from-white to-[#dcd8f5]",
  ].join(" ");
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`group inline-flex items-center gap-3 text-sm font-bold outline-none ${off ? "cursor-not-allowed text-y2k-muted" : "cursor-pointer text-y2k-text"}`}
    >
      <span className={`relative h-7 w-12 shrink-0 rounded-full border-2 transition ${look(force, disabled, track)}`}>
        <span className={`absolute top-0.5 left-0.5 h-5 rounded-full border-2 transition-all ${knob}`} />
      </span>
      {label}
    </button>
  );
};

const TabList: Kit["TabList"] = ({ className = "", ...rest }) => (
  <div className={`inline-flex gap-1 rounded-full border-2 border-y2k-text bg-y2k-surface p-1 ${className}`} {...rest} />
);

const Tab: Kit["Tab"] = ({ selected, force, className = "", children, ...rest }) => (
  <button
    type="button"
    className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${look(force, false, selected
      ? { rest: `bg-y2k-text text-white ${gloss}`, live: `cursor-pointer ${liveRing}`, focus: ring }
      : {
          rest: "text-y2k-muted",
          live: `cursor-pointer hover:bg-y2k-bg hover:text-y2k-text active:bg-y2k-border ${liveRing}`,
          hover: "bg-y2k-bg text-y2k-text",
          pressed: "bg-y2k-border text-y2k-text",
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
    className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3.5 py-1 text-sm font-bold whitespace-nowrap transition ${look(force, disabled, {
      rest: `border-y2k-text ${selected ? "bg-y2k-lime" : "bg-y2k-surface"} text-y2k-text shadow-[0_2px_0_#1b1446]`,
      live: `cursor-pointer ${selected ? "hover:bg-[#d6fa7c]" : "hover:bg-y2k-bg"} hover:-translate-y-0.5 hover:shadow-[0_4px_0_#1b1446] active:translate-y-0.5 active:shadow-none ${liveRing}`,
      hover: `border-y2k-text ${selected ? "bg-[#d6fa7c]" : "bg-y2k-bg"} text-y2k-text -translate-y-0.5 shadow-[0_4px_0_#1b1446]`,
      pressed: `border-y2k-text ${selected ? "bg-y2k-lime" : "bg-y2k-border"} text-y2k-text translate-y-0.5`,
      focus: ring,
      disabled: "cursor-not-allowed border-dashed border-y2k-muted text-y2k-muted",
    })} ${className}`}
    {...rest}
  >
    {selected && <Check />}
    {children}
  </button>
);

const Badge: Kit["Badge"] = ({ tone = "neutral", children }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
      {
        neutral: "border-2 border-y2k-border bg-y2k-surface text-y2k-muted",
        accent: "border-2 border-y2k-accent bg-y2k-accent text-white",
        success: "border-2 border-y2k-text bg-y2k-lime text-y2k-text",
      }[tone]
    }`}
  >
    {tone === "success" && "✦"} {children}
  </span>
);

const hours = (open: number, close: number) => `${formatHour(open)} – ${formatHour(close)}`;
const slug = (id: string) => `${id}.exe`;

function WindowBar({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 border-b-2 border-y2k-text bg-gradient-to-b from-[#c4ecff] to-y2k-sky px-3 py-1.5">
      <span className="h-2.5 w-2.5 rounded-full border border-y2k-text bg-y2k-accent" />
      <span className="h-2.5 w-2.5 rounded-full border border-y2k-text bg-y2k-lime" />
      <span className="ml-1.5 flex-1 truncate text-xs font-bold text-y2k-text">{title}</span>
      {children}
    </div>
  );
}

const Card: Kit["Card"] = ({ spot, onOpen, force, saved }) => (
  <article
    className={`relative overflow-hidden rounded-3xl border-2 border-y2k-text bg-y2k-surface transition ${look(force, false, {
      rest: "shadow-[0_4px_0_#1b1446]",
      live: "hover:-translate-y-1 hover:shadow-[0_8px_0_#1b1446] active:translate-y-0.5 active:shadow-[0_1px_0_#1b1446] has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-y2k-text has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-y2k-lime",
      hover: "-translate-y-1 shadow-[0_8px_0_#1b1446]",
      pressed: "translate-y-0.5 shadow-[0_1px_0_#1b1446]",
      focus: `shadow-[0_4px_0_#1b1446] ${ring}`,
    })}`}
  >
    <WindowBar title={slug(spot.id)}>
      <span className="text-xs font-bold text-y2k-text tabular-nums">{spot.walk} min</span>
    </WindowBar>
    <div className="p-4">
      <h3 className="font-y2k-display text-lg leading-tight font-bold text-y2k-text">
        <button type="button" onClick={onOpen} className="cursor-pointer text-left outline-none after:absolute after:inset-0">
          {spot.name}
        </button>
      </h3>
      <p className="mt-0.5 text-sm text-y2k-muted">{spot.where}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-y2k-text">{spot.note}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {saved && <Badge tone="accent">Saved ♡</Badge>}
        <Badge tone={spot.noise === "Quiet" ? "success" : "neutral"}>{spot.noise.toLowerCase()}</Badge>
        <Badge>{hours(spot.open, spot.close)}</Badge>
      </div>
    </div>
  </article>
);

const ListRow: Kit["ListRow"] = ({ spot, onOpen, force }) => (
  <li className="py-1">
    <button
      type="button"
      onClick={onOpen}
      className={`group flex w-full items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left transition ${look(force, false, {
        rest: "border-transparent",
        live: `cursor-pointer hover:border-y2k-text hover:bg-y2k-bg active:bg-y2k-border ${liveRing}`,
        hover: "border-y2k-text bg-y2k-bg",
        pressed: "border-y2k-text bg-y2k-border",
        focus: `border-transparent ${ring}`,
      })}`}
    >
      <span aria-hidden className="text-y2k-accent">✦</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-y2k-display text-sm font-bold text-y2k-text">{spot.name}</span>
        <span className="block truncate text-sm text-y2k-muted">{spot.where}</span>
      </span>
      <span className="rounded-full border-2 border-y2k-text bg-y2k-sky px-2 py-0.5 text-xs font-bold text-y2k-text tabular-nums">{spot.walk} min</span>
    </button>
  </li>
);

const DetailPanel: Kit["DetailPanel"] = ({ spot, saved, onSave, onClose }) => (
  <div className="overflow-hidden rounded-3xl border-2 border-y2k-text bg-y2k-surface text-y2k-text shadow-[0_6px_0_#1b1446]">
    <WindowBar title={slug(spot.id)}>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-y2k-text bg-y2k-surface text-xs font-bold transition hover:bg-y2k-lime active:scale-90 ${liveRing}`}
        >
          ✕
        </button>
      )}
    </WindowBar>
    <div className="p-6">
      <p className="text-sm font-bold text-y2k-accent-press">
        ✦ {spot.walk} min walk · {spot.address}
      </p>
      <h3 className="mt-1 font-y2k-display text-3xl leading-tight font-black">{spot.name}</h3>
      <p className="text-sm text-y2k-muted">{spot.where}</p>
      <p className="relative mt-4 rounded-2xl border-2 border-y2k-text bg-y2k-bg px-4 py-3 text-[15px] font-medium">
        “{spot.note}”
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-2 text-sm">
        {[
          ["hours", hours(spot.open, spot.close)],
          ["noise", spot.noise],
          ["outlets", spot.outlets ? "plenty" : "few or none"],
          ["wi‑fi", spot.wifi ? "yes" : "no"],
          ["seats", spot.seats],
          ["my order", spot.order],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border-2 border-y2k-border px-3 py-2">
            <dt className="text-xs font-bold text-y2k-muted">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        {saved ? (
          <Button variant="secondary" onClick={onSave} aria-pressed>
            <Check /> Saved ♡
          </Button>
        ) : (
          <Button onClick={onSave} aria-pressed={false}>
            Save spot ✦
          </Button>
        )}
      </div>
    </div>
  </div>
);

const UIState: Kit["UIState"] = ({ kind, onAction, title, body, actionLabel }) => {
  if (kind === "loading")
    return (
      <div role="status" className="space-y-3">
        <div className="h-6 overflow-hidden rounded-full border-2 border-y2k-text bg-y2k-surface">
          <div
            className="animate-stripes h-full w-2/3 rounded-full border-r-2 border-y2k-text"
            style={{ background: "repeating-linear-gradient(45deg,#c0137a 0 8px,#e04aa0 8px 16px)", backgroundSize: "32px 100%" }}
          />
        </div>
        <p className="text-sm font-bold text-y2k-text">loading cafés… brb</p>
      </div>
    );
  const copy = {
    empty: ["No cafés match :(", "Try removing a filter.", "Clear filters"],
    error: ["Couldn’t load hours!!", "Check your connection and try again.", "Try again"],
    success: ["Saved to your spots ♡", "Find it under the Saved tab.", ""],
  }[kind];
  copy[0] = title ?? copy[0];
  copy[1] = body ?? copy[1];
  copy[2] = actionLabel ?? copy[2];
  const sticker = {
    empty: "bg-y2k-surface text-y2k-text",
    error: "bg-y2k-error text-white",
    success: "bg-y2k-lime text-y2k-text",
  }[kind];
  return (
    <div className="space-y-2">
      <span
        aria-hidden
        className={`flex h-11 w-11 -rotate-6 items-center justify-center rounded-full border-2 border-y2k-text font-y2k-display text-sm font-black shadow-[0_3px_0_#1b1446] ${sticker}`}
      >
        {kind === "empty" ? ":/" : kind === "error" ? "!!" : "✦"}
      </span>
      <p className={`font-y2k-display text-base font-bold ${kind === "error" ? "text-y2k-error" : "text-y2k-text"}`}>{copy[0]}</p>
      <p className="text-sm text-y2k-muted">{copy[1]}</p>
      {copy[2] && (
        <Button variant="secondary" onClick={onAction} className="mt-1">
          {copy[2]}
        </Button>
      )}
    </div>
  );
};

export const y2kKit: Kit = {
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
    "m-auto w-[min(32rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto bg-transparent p-0 pb-2 backdrop:bg-y2k-text/50 backdrop:backdrop-blur-sm",
  UIState,
};

const y2kSpec: DesignSpec = {
  slug: "y2k",
  name: "Y2K",
  words: "Glossy · Pop · Chrome",
  intro:
    "Studying like it’s 2002. Pills, navy outlines, and sticker shadows that lift when you hover and squash when you press. Lime means selected; hot pink means do this.",
  chrome: {
    page: "bg-y2k-bg font-y2k-body text-y2k-text",
    title: "mt-1 font-y2k-display text-5xl font-black sm:text-6xl",
    muted: "text-y2k-muted",
    h2: "font-y2k-display text-2xl font-bold",
    label: "text-xs font-bold text-y2k-muted",
    panel: "rounded-3xl border-2 border-y2k-text bg-y2k-surface p-5",
    link: `rounded-full px-1 font-bold text-y2k-text underline decoration-y2k-accent decoration-wavy decoration-2 underline-offset-4 hover:bg-y2k-lime ${liveRing}`,
    rule: "border-y2k-text",
  },
  colors: [
    { role: "Background", hex: "#eeebff", use: "lilac sky, page" },
    { role: "Surface", hex: "#ffffff", use: "windows, cards, fields" },
    { role: "Text", hex: "#1b1446", use: "navy, text and every outline", checks: [["#1b1446", "#eeebff", "on background"]] },
    { role: "Muted text", hex: "#564e86", use: "meta, labels, placeholders", checks: [["#564e86", "#eeebff", "on background"]] },
    { role: "Border", hex: "#c9c2f2", use: "soft dividers inside panels", checks: [["#c9c2f2", "#ffffff", "on surface"]] },
    {
      role: "Accent",
      hex: "#c0137a",
      use: "hot pink, primary action only",
      checks: [
        ["#c0137a", "#eeebff", "on background"],
        ["#ffffff", "#c0137a", "white on accent"],
      ],
    },
    { role: "Selected", hex: "#c8f55a", use: "lime, selected and on", checks: [["#1b1446", "#c8f55a", "navy on lime"]] },
    { role: "Secondary", hex: "#8fdcff", use: "baby blue, secondary buttons", checks: [["#1b1446", "#8fdcff", "navy on blue"]] },
    { role: "Error", hex: "#b42318", use: "failed loads", checks: [["#b42318", "#ffffff", "on surface"]] },
  ],
  type: [
    { role: "Display", spec: "Unbounded 52/56 · 900", className: "font-y2k-display text-4xl leading-[1.08] font-black sm:text-[52px]", sample: "8 cafés open near u" },
    { role: "Heading", spec: "Unbounded 20/26 · 700", className: "font-y2k-display text-xl leading-[1.3] font-bold", sample: "Hallowed Grounds" },
    {
      role: "Body",
      spec: "Space Grotesk 16/26 · 400",
      className: "max-w-prose text-base leading-[1.625]",
      sample: "Booths, a pool table, and iced lattes until midnight. Bring friends, not flashcards.",
    },
    { role: "Label", spec: "Space Grotesk 12/16 · 700 · lowercase", className: "text-xs font-bold", sample: "open till midnight ✦ 2 min walk" },
  ],
  spacing: {
    scale: [4, 8, 12, 16, 24, 32, 48],
    bar: "rounded-full border-2 border-y2k-text bg-y2k-lime",
    radii: [
      { label: "6 · checkbox", className: "rounded-md border-2 border-y2k-text bg-y2k-sky" },
      { label: "24 · cards", className: "rounded-3xl border-2 border-y2k-text bg-y2k-surface" },
      { label: "full · pills", className: "rounded-full border-2 border-y2k-text bg-y2k-lime" },
    ],
    notes: [
      "2px navy outline on every control and card.",
      "Hard sticker shadow, 0 3px 0 navy. No blur.",
      "Hover lifts 2px; pressed drops 3px and loses its shadow.",
      "Focus: 3px navy ring on a lime halo.",
    ],
  },
  kit: y2kKit,
};

export function Y2KDesignSystem() {
  return <DesignSystem spec={y2kSpec} />;
}
