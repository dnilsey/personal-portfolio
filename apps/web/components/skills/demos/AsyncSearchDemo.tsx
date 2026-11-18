"use client";

import { classNames } from "@/lib/classnames";
import { useEffect, useId, useRef, useState } from "react";
import { SKILL_AREAS } from "../data";

// --- Fake API ----------------------------------------------------------------

type SearchResult = { id: string; name: string; area: string; summary: string };
type IndexedSkill = SearchResult & { text: string };

const INDEX: IndexedSkill[] = SKILL_AREAS.flatMap((area) =>
  area.skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    area: area.label,
    summary: skill.summary,
    text: [skill.name, skill.summary, ...skill.highlights].join(" ").toLowerCase(),
  })),
);

class RequestError extends Error {}

// Behaves like fetch(): honours an AbortSignal and can fail.
const searchSkills = (
  query: string,
  { signal, latency, failRate }: { signal: AbortSignal; latency: number; failRate: number },
) =>
  new Promise<SearchResult[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new RequestError("503 Service Unavailable"));
        return;
      }
      const needle = query.toLowerCase();
      resolve(
        INDEX.filter((item) => item.text.includes(needle)).map(
          ({ id, name, area, summary }) => ({ id, name, area, summary }),
        ),
      );
    }, latency);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Request cancelled", "AbortError"));
    });
  });

// --- Hooks -------------------------------------------------------------------

const useDebouncedValue = <T,>(value: T, delay: number) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

// --- Component ---------------------------------------------------------------

type Outcome =
  | { key: string; kind: "ok"; results: SearchResult[] }
  | { key: string; kind: "error"; message: string };

type LogEntry = {
  id: number;
  query: string;
  status: "ok" | "error" | "cancelled";
  detail: string;
  ms: number;
};

const FAIL_RATES = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 0.3 },
  { label: "Always", value: 1 },
];

const DEBOUNCE_MS = 300;

const Highlight = ({ text, query }: { text: string; query: string }) => {
  const start = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || start === -1) return <>{text}</>;
  const end = start + query.length;
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded bg-primary/20 text-inherit">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
};

const AsyncSearchDemo = () => {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [latency, setLatency] = useState(800);
  const [failRate, setFailRate] = useState(0);

  // Settings are read when a request starts; changing them shouldn't refetch.
  const settings = useRef({ latency, failRate });
  const nextLogId = useRef(1);

  const trimmed = useDebouncedValue(query.trim(), DEBOUNCE_MS);
  const requestKey = `${trimmed}#${attempt}`;

  useEffect(() => {
    if (!trimmed) return;
    const controller = new AbortController();
    const startedAt = performance.now();
    const addLog = (status: LogEntry["status"], detail: string) =>
      setLog((entries) =>
        [
          {
            id: nextLogId.current++,
            query: trimmed,
            status,
            detail,
            ms: Math.round(performance.now() - startedAt),
          },
          ...entries,
        ].slice(0, 6),
      );

    searchSkills(trimmed, { signal: controller.signal, ...settings.current })
      .then((results) => {
        setOutcome({ key: requestKey, kind: "ok", results });
        addLog("ok", `${results.length} result${results.length === 1 ? "" : "s"}`);
      })
      .catch((error: Error) => {
        if (error.name === "AbortError") {
          addLog("cancelled", "superseded");
          return;
        }
        setOutcome({ key: requestKey, kind: "error", message: error.message });
        addLog("error", error.message);
      });

    // A newer query (or unmount) cancels this request so stale results never land.
    return () => controller.abort();
  }, [trimmed, requestKey]);

  // Derived UI state: no separate "loading" flag to keep in sync.
  const typing = query.trim() !== trimmed;
  const current = outcome?.key === requestKey ? outcome : null;
  const loading = Boolean(trimmed) && !current;

  let statusMessage = "";
  if (!trimmed) statusMessage = "";
  else if (loading) statusMessage = "Searching…";
  else if (current?.kind === "error") statusMessage = "Search failed.";
  else if (current?.kind === "ok")
    statusMessage = `${current.results.length} result${current.results.length === 1 ? "" : "s"} for "${trimmed}".`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8">
      {/* Search */}
      <div>
        <label htmlFor={inputId} className="text-sm uppercase tracking-widest text-muted-foreground">
          Search my skills
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “api”, “team”, or “react”"
          autoComplete="off"
          className="mt-3 w-full rounded-full border border-border bg-background px-5 py-3 text-base outline-none transition-colors duration-200 placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        />
        <p className="mt-2 h-5 text-xs text-muted-foreground">
          {typing ? `Waiting ${DEBOUNCE_MS} ms for you to stop typing…` : ""}
        </p>

        <p role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </p>

        <div className="mt-2 min-h-64">
          {!trimmed && (
            <p className="rounded-xl bg-surface-muted p-5 text-sm text-muted-foreground">
              Start typing to search. Type quickly to see earlier requests
              cancelled in the request log.
            </p>
          )}

          {loading && (
            <ul aria-hidden="true" className="space-y-3">
              {[0, 1, 2].map((item) => (
                <li key={item} className="rounded-xl border border-border p-4 motion-safe:animate-pulse">
                  <div className="h-4 w-1/3 rounded bg-surface-muted" />
                  <div className="mt-3 h-3 w-5/6 rounded bg-surface-muted" />
                </li>
              ))}
            </ul>
          )}

          {current?.kind === "error" && (
            <div className="rounded-xl border border-border p-5">
              <p className="font-medium">Couldn&apos;t load results</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The server responded with {current.message}.
              </p>
              <button
                type="button"
                onClick={() => setAttempt((count) => count + 1)}
                className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover cursor-pointer"
              >
                Try again
              </button>
            </div>
          )}

          {current?.kind === "ok" && current.results.length === 0 && (
            <p className="rounded-xl bg-surface-muted p-5 text-sm text-muted-foreground">
              No skills match &ldquo;{trimmed}&rdquo;. Try a broader word like
              &ldquo;web&rdquo;.
            </p>
          )}

          {current?.kind === "ok" && current.results.length > 0 && (
            <ul className="space-y-3">
              {current.results.map((result) => (
                <li key={result.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-medium">
                      <Highlight text={result.name} query={trimmed} />
                    </span>
                    <span className="text-xs text-muted-foreground">{result.area}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{result.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Network controls and log */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-muted-foreground">
          Network conditions
        </h4>
        <div className="mt-4 space-y-5 rounded-xl bg-surface-muted p-5">
          <label className="block text-sm">
            <span className="flex justify-between">
              <span>Response time</span>
              <span className="font-mono tabular-nums">{latency} ms</span>
            </span>
            <input
              type="range"
              min={0}
              max={2000}
              step={100}
              value={latency}
              onChange={(event) => {
                const value = Number(event.target.value);
                setLatency(value);
                settings.current.latency = value;
              }}
              className="mt-2 w-full accent-primary"
            />
          </label>

          <fieldset>
            <legend className="text-sm">Server errors</legend>
            <div className="mt-2 flex gap-2">
              {FAIL_RATES.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={failRate === option.value}
                  onClick={() => {
                    setFailRate(option.value);
                    settings.current.failRate = option.value;
                  }}
                  className={classNames(
                    failRate === option.value
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-surface border-border text-muted-foreground hover:text-foreground",
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <h4 className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
          Request log
        </h4>
        {log.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No requests yet.</p>
        ) : (
          <ol className="mt-3 divide-y divide-border font-mono text-xs">
            {log.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-3 py-2">
                <span className="truncate">GET ?q={entry.query}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="text-muted-foreground tabular-nums">{entry.ms} ms</span>
                  <span
                    className={classNames(
                      entry.status === "ok" && "bg-primary text-primary-foreground",
                      entry.status === "error" && "border border-foreground",
                      entry.status === "cancelled" && "bg-surface-muted text-muted-foreground line-through",
                      "rounded-full px-2 py-0.5",
                    )}
                  >
                    {entry.status === "ok" ? entry.detail : entry.status}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default AsyncSearchDemo;
