"use client";

import { classNames } from "@/lib/classnames";
import { useEffect, useState, useSyncExternalStore } from "react";

const PRESETS = [
  { name: "Terracotta", value: "#b4532a" },
  { name: "Coral", value: "#f08a5d" },
  { name: "Forest", value: "#2f6f4f" },
  { name: "Indigo", value: "#4f46e5" },
  { name: "Plum", value: "#8e3b8a" },
  { name: "Mustard", value: "#d9a400" },
];

const LIGHT_TEXT = "#ffffff";
const DARK_TEXT = "#161311";
const OVERRIDDEN_VARS = ["--primary", "--primary-hover", "--primary-foreground"];

// --- WCAG 2.x contrast ------------------------------------------------------

const parseHex = (hex: string): [number, number, number] | null => {
  const match = hex.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;
  const digits =
    match[1].length === 3
      ? match[1].split("").map((d) => d + d).join("")
      : match[1];
  return [0, 2, 4].map((i) => parseInt(digits.slice(i, i + 2), 16)) as [
    number,
    number,
    number,
  ];
};

const luminance = (hex: string) => {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a: string, b: string) => {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
};

const rate = (ratio: number | null) => {
  if (ratio === null) return { label: "—", tone: "muted" as const };
  if (ratio >= 7) return { label: "AAA", tone: "pass" as const };
  if (ratio >= 4.5) return { label: "AA", tone: "pass" as const };
  if (ratio >= 3) return { label: "Large text only", tone: "warn" as const };
  return { label: "Fails", tone: "fail" as const };
};

// Pick whichever text color reads best on the chosen accent.
const bestTextColor = (accent: string) =>
  (contrastRatio(accent, LIGHT_TEXT) ?? 0) >=
  (contrastRatio(accent, DARK_TEXT) ?? 0)
    ? LIGHT_TEXT
    : DARK_TEXT;

// --- Read the live theme tokens --------------------------------------------

// Re-read the tokens whenever <html> changes class (theme toggle) or style
// (our overrides), so the contrast numbers always match what's on screen.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });
  return () => observer.disconnect();
};

const readTokens = () => {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  return [read("--primary"), read("--primary-foreground"), read("--background")].join("|");
};

const useThemeTokens = () => {
  const snapshot = useSyncExternalStore(subscribe, readTokens, () => "||");
  const [primary, primaryForeground, background] = snapshot.split("|");
  return { primary, primaryForeground, background };
};

// --- Component ---------------------------------------------------------------

const ContrastRow = ({
  label,
  ratio,
}: {
  label: string;
  ratio: number | null;
}) => {
  const rating = rate(ratio);
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm">{label}</span>
      <span className="flex items-center gap-3">
        <span className="font-mono text-sm tabular-nums">
          {ratio === null ? "—" : `${ratio.toFixed(2)}:1`}
        </span>
        <span
          className={classNames(
            rating.tone === "pass" && "bg-primary text-primary-foreground",
            rating.tone === "warn" && "bg-surface-muted text-foreground",
            rating.tone === "fail" && "border border-foreground text-foreground",
            rating.tone === "muted" && "text-muted-foreground",
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
          )}
        >
          {rating.label}
        </span>
      </span>
    </div>
  );
};

const ThemeEditorDemo = () => {
  const [custom, setCustom] = useState<string | null>(null);
  const { primary, primaryForeground, background } = useThemeTokens();

  const applyAccent = (color: string) => {
    const root = document.documentElement.style;
    root.setProperty("--primary", color);
    root.setProperty(
      "--primary-hover",
      `color-mix(in srgb, ${color} 85%, ${bestTextColor(color) === LIGHT_TEXT ? "black" : "white"})`,
    );
    root.setProperty("--primary-foreground", bestTextColor(color));
    setCustom(color);
  };

  const reset = () => {
    OVERRIDDEN_VARS.forEach((name) =>
      document.documentElement.style.removeProperty(name),
    );
    setCustom(null);
  };

  // Don't let the custom accent leak onto other pages.
  useEffect(
    () => () =>
      OVERRIDDEN_VARS.forEach((name) =>
        document.documentElement.style.removeProperty(name),
      ),
    [],
  );

  const buttonRatio = contrastRatio(primary, primaryForeground);
  const textRatio = contrastRatio(primary, background);
  const pickerValue = parseHex(primary) ? primary : "#b4532a";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h4 className="text-sm uppercase tracking-widest text-muted-foreground">
          Pick an accent
        </h4>
        <div
          role="group"
          aria-label="Accent color presets"
          className="mt-4 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-3"
        >
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => applyAccent(preset.value)}
              aria-pressed={custom === preset.value}
              className={classNames(
                custom === preset.value
                  ? "border-foreground"
                  : "border-border hover:border-primary",
                "flex flex-col items-center gap-2 rounded-xl border p-3 text-xs transition-colors duration-200 cursor-pointer",
              )}
            >
              <span
                aria-hidden="true"
                className="h-8 w-8 rounded-full border border-border"
                style={{ backgroundColor: preset.value }}
              />
              {preset.name}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-3 text-sm font-medium cursor-pointer">
            <input
              type="color"
              value={pickerValue}
              onChange={(event) => applyAccent(event.target.value)}
              className="h-10 w-12 cursor-pointer rounded-lg border border-border bg-surface p-1"
            />
            Custom color
          </label>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
          >
            Reset to original
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          This changes one CSS variable on the page root. Scroll up: the nav,
          tabs, and badges all follow, with no component code involved. Button
          text switches between light and dark automatically for the best
          contrast.
        </p>
      </div>

      <div>
        <h4 className="text-sm uppercase tracking-widest text-muted-foreground">
          Preview
        </h4>
        <div className="mt-4 rounded-xl border border-border bg-background p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
              Primary button
            </span>
            <span className="text-sm font-medium text-primary">Accent link</span>
            <span className="rounded-full bg-surface-muted px-3 py-1 text-xs text-primary">
              Tag
            </span>
          </div>
        </div>

        <h4 className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
          WCAG contrast
        </h4>
        <div className="mt-2 divide-y divide-border" aria-live="polite">
          <ContrastRow label="Button text on accent" ratio={buttonRatio} />
          <ContrastRow label="Accent text on page" ratio={textRatio} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          AA needs 4.5:1 for body text and 3:1 for large text. Try Mustard, then
          switch the site to dark mode.
        </p>
      </div>
    </div>
  );
};

export default ThemeEditorDemo;
