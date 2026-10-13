import type { ComponentProps, FC, ReactNode } from "react";
import type { Spot } from "@/lib/spots";

// A forced state renders a control frozen in that state, for documentation.
export type Force = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";

export type Look = {
  rest: string;
  live: string; // hover:, active:, focus-visible: variants used when not frozen
  hover?: string; // replaces rest
  pressed?: string; // replaces rest
  focus?: string; // added to rest
  disabled?: string; // replaces rest
};

/** Pick classes for a control: live, disabled, or frozen in one state. */
export function look(force: Force | undefined, disabled: boolean | undefined, m: Look) {
  if (disabled || force === "disabled") return m.disabled ?? m.rest;
  if (!force) return `${m.rest} ${m.live}`;
  if (force === "focus") return `${m.rest} ${m.focus ?? ""}`;
  if (force === "hover" || force === "pressed") return m[force] ?? m.rest;
  return m.rest;
}

type Btn = Omit<ComponentProps<"button">, "children"> & { force?: Force; children: ReactNode };

export type Kit = {
  Button: FC<Btn & { variant?: "primary" | "secondary" }>;
  TextLink: FC<{ href: string; force?: Force; children: ReactNode }>;
  TextInput: FC<{
    label: string;
    hideLabel?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (v: string) => void;
    force?: Force;
    disabled?: boolean;
  }>;
  Select: FC<{
    label: string;
    hideLabel?: boolean;
    options: string[];
    value?: string;
    onChange?: (v: string) => void;
    force?: Force;
    disabled?: boolean;
  }>;
  Checkbox: FC<{ label: string; checked: boolean; onChange?: (v: boolean) => void; force?: Force; disabled?: boolean }>;
  Radio: FC<{ label: string; name: string; checked: boolean; onChange?: () => void; force?: Force; disabled?: boolean }>;
  Toggle: FC<{ label: string; checked: boolean; onChange?: (v: boolean) => void; force?: Force; disabled?: boolean }>;
  TabList: FC<ComponentProps<"div">>;
  Tab: FC<Btn & { selected: boolean }>;
  Chip: FC<Btn & { selected: boolean }>;
  Badge: FC<{ tone?: "neutral" | "accent" | "success"; children: ReactNode }>;
  Card: FC<{ spot: Spot; onOpen?: () => void; force?: Force }>;
  ListRow: FC<{ spot: Spot; onOpen?: () => void; force?: Force }>;
  DetailPanel: FC<{ spot: Spot; saved: boolean; onSave: () => void; onClose?: () => void }>;
  dialogClass: string;
  UIState: FC<{ kind: "empty" | "loading" | "error" | "success"; onAction?: () => void }>;
};

export type ColorRole = {
  role: string;
  hex: string;
  use: string;
  /** [foreground, background, label] pairs to report contrast for */
  checks?: [string, string, string][];
};

export type TypeRole = { role: string; spec: string; className: string; sample: string };

export type Chrome = {
  page: string;
  title: string;
  muted: string;
  h2: string;
  label: string;
  panel: string;
  link: string;
  rule: string;
};

export type DesignSpec = {
  slug: string;
  name: string;
  words: string;
  intro: string;
  chrome: Chrome;
  colors: ColorRole[];
  type: TypeRole[];
  spacing: { scale: number[]; bar: string; radii: { label: string; className: string }[]; notes: string[] };
  kit: Kit;
};
