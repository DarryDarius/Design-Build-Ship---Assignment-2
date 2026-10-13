"use client";

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import type { Kit } from "./types";

/** Native <dialog>: focus trap, Esc to close, click outside to close. */
export function Dialog({
  open,
  onClose,
  label,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={className}
    >
      {open && children}
    </dialog>
  );
}

/** Tabs with roving focus: arrow keys, Home and End move between tabs. */
export function Tabs({
  kit,
  label,
  items,
  value,
  onChange,
  renderLabel = (item) => item,
}: {
  kit: Pick<Kit, "TabList" | "Tab">;
  label: string;
  items: string[];
  value: string;
  onChange: (v: string) => void;
  renderLabel?: (item: string) => ReactNode;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent, i: number) {
    const last = items.length - 1;
    const next = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onChange(items[next]);
  }

  return (
    <kit.TabList role="tablist" aria-label={label}>
      {items.map((item, i) => (
        <kit.Tab
          key={item}
          ref={(el) => {
            refs.current[i] = el;
          }}
          role="tab"
          aria-selected={value === item}
          tabIndex={value === item ? 0 : -1}
          selected={value === item}
          onClick={() => onChange(item)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          {renderLabel(item)}
        </kit.Tab>
      ))}
    </kit.TabList>
  );
}
