"use client";

import { classNames } from "@/lib/classnames";
import { useLayoutEffect, useRef, useState } from "react";

const ROW_COUNT = 10_000;
const ROW_HEIGHT = 48;
const VIEWPORT_HEIGHT = 420;
const OVERSCAN = 5; // extra rows above and below so fast scrolling never shows gaps

const NAMES = ["Ava", "Ben", "Chloe", "Diego", "Elena", "Farah", "Gabe", "Hana"];
const STATUSES = ["Shipped", "In review", "Draft", "Merged"];

type Row = { id: number; title: string; owner: string; status: string };

// Deterministic fake data, built once per page load.
const ROWS: Row[] = Array.from({ length: ROW_COUNT }, (_, index) => ({
  id: index + 1,
  title: `Pull request #${(index + 1).toString().padStart(5, "0")}`,
  owner: NAMES[(index * 7) % NAMES.length],
  status: STATUSES[(index * 3) % STATUSES.length],
}));

const RowView = ({ row, style }: { row: Row; style?: React.CSSProperties }) => (
  <div
    role="listitem"
    aria-setsize={ROW_COUNT}
    aria-posinset={row.id}
    style={{ height: ROW_HEIGHT, ...style }}
    className="flex items-center justify-between gap-4 border-b border-border px-4 text-sm"
  >
    <span className="truncate font-medium">{row.title}</span>
    <span className="flex shrink-0 items-center gap-3 text-muted-foreground">
      <span className="hidden sm:inline">{row.owner}</span>
      <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs">
        {row.status}
      </span>
    </span>
  </div>
);

const Stat = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl bg-surface-muted p-4">
    <div className="text-xs uppercase tracking-widest text-muted-foreground">
      {label}
    </div>
    <div className="mt-1 font-zalando-sans-expanded font-bold text-xl sm:text-2xl text-primary tabular-nums">
      {children}
    </div>
  </div>
);

const VirtualListDemo = () => {
  const [virtualized, setVirtualized] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const domRowsRef = useRef<HTMLSpanElement>(null);
  const renderTimeRef = useRef<HTMLSpanElement>(null);
  const toggleStartedAt = useRef<number | null>(null);

  // Runs after React commits to the DOM, so it measures the real cost of the
  // switch. Written straight to the DOM to avoid an extra render.
  useLayoutEffect(() => {
    const rendered =
      viewportRef.current?.querySelectorAll('[role="listitem"]').length ?? 0;
    if (domRowsRef.current) {
      domRowsRef.current.textContent = rendered.toLocaleString();
    }
    if (toggleStartedAt.current !== null && renderTimeRef.current) {
      const ms = performance.now() - toggleStartedAt.current;
      renderTimeRef.current.textContent = `${Math.round(ms)} ms`;
      toggleStartedAt.current = null;
    }
  });

  // event.timeStamp shares performance.now()'s clock, so this measures from
  // the click to the committed DOM.
  const toggle = (next: boolean, clickedAt: number) => {
    if (next === virtualized) return;
    toggleStartedAt.current = clickedAt;
    setScrollTop(viewportRef.current?.scrollTop ?? 0);
    setVirtualized(next);
  };

  const first = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const last = Math.min(
    ROW_COUNT,
    Math.ceil((scrollTop + VIEWPORT_HEIGHT) / ROW_HEIGHT) + OVERSCAN,
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          role="radiogroup"
          aria-label="Rendering mode"
          className="inline-flex self-start rounded-full border border-border p-1"
        >
          {[
            { value: true, label: "Virtualized" },
            { value: false, label: "Render all 10,000" },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={virtualized === option.value}
              onClick={(event) => toggle(option.value, event.timeStamp)}
              className={classNames(
                virtualized === option.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Switch modes, then scroll the list.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Stat label="Rows in data">{ROW_COUNT.toLocaleString()}</Stat>
        <Stat label="Rows in the DOM">
          <span ref={domRowsRef}>—</span>
        </Stat>
        <Stat label="Last switch took">
          <span ref={renderTimeRef} className="text-muted-foreground">
            —
          </span>
        </Stat>
      </div>

      <div
        ref={viewportRef}
        role="list"
        aria-label="Pull requests"
        tabIndex={0}
        onScroll={(event) => {
          if (virtualized) setScrollTop(event.currentTarget.scrollTop);
        }}
        style={{ height: VIEWPORT_HEIGHT }}
        className="mt-6 overflow-y-auto rounded-xl border border-border bg-background"
      >
        {virtualized ? (
          // A spacer as tall as the full list keeps the scrollbar honest;
          // only the visible window of rows is positioned inside it.
          <div style={{ height: ROW_COUNT * ROW_HEIGHT, position: "relative" }}>
            {ROWS.slice(first, last).map((row, offset) => (
              <RowView
                key={row.id}
                row={row}
                style={{
                  position: "absolute",
                  top: (first + offset) * ROW_HEIGHT,
                  left: 0,
                  right: 0,
                }}
              />
            ))}
          </div>
        ) : (
          ROWS.map((row) => <RowView key={row.id} row={row} />)
        )}
      </div>
    </div>
  );
};

export default VirtualListDemo;
