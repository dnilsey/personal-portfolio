"use client";

import { classNames } from "@/lib/classnames";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ExternalLink from "../../shared/svgs/ExternalLink";
import { useRovingTabs } from "../useRovingTabs";
import { DEMOS, DemoId, sourceUrl } from "./meta";

const DemoLoading = () => (
  <div className="flex min-h-80 items-center justify-center text-sm text-muted-foreground">
    Loading demo…
  </div>
);

// Each demo is its own chunk, downloaded only when its tab is opened.
const DEMO_COMPONENTS: Record<DemoId, React.ComponentType> = {
  theme: dynamic(() => import("./ThemeEditorDemo"), { loading: DemoLoading }),
  performance: dynamic(() => import("./VirtualListDemo"), {
    loading: DemoLoading,
  }),
  search: dynamic(() => import("./AsyncSearchDemo"), { loading: DemoLoading }),
};

const isDemoId = (value: string): value is DemoId =>
  DEMOS.some((demo) => demo.id === value);

const LiveDemos = () => {
  const [activeId, setActiveId] = useState<DemoId>(DEMOS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const { getTabProps } = useRovingTabs(DEMOS.length, (index) =>
    setActiveId(DEMOS[index].id),
  );

  // "See it live" links on skills point to #demo-<id>.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace("#demo-", "");
      if (!isDemoId(id)) return;
      setActiveId(id);
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const active = DEMOS.find((demo) => demo.id === activeId) ?? DEMOS[0];
  const ActiveDemo = DEMO_COMPONENTS[active.id];

  return (
    <section
      ref={sectionRef}
      id="live-demos"
      aria-labelledby="live-demos-heading"
      className="mt-16 md:mt-24 scroll-mt-28"
    >
      <h2
        id="live-demos-heading"
        className="font-zalando-sans-expanded font-bold text-2xl sm:text-3xl"
      >
        Live demos
      </h2>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Small, working examples of the problems I solve day to day. Each one
        loads only when you open it.
      </p>

      <div
        role="tablist"
        aria-label="Live demos"
        className="mt-8 -mx-6 px-6 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {DEMOS.map((demo, index) => {
          const selected = demo.id === active.id;
          return (
            <button
              key={demo.id}
              id={`demo-tab-${demo.id}`}
              aria-controls="demo-panel"
              onClick={() => setActiveId(demo.id)}
              {...getTabProps(index, selected)}
              className={classNames(
                selected
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-primary",
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer",
              )}
            >
              {demo.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="demo-panel"
        aria-labelledby={`demo-tab-${active.id}`}
        className="mt-6 rounded-2xl border border-border bg-surface"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border p-6 sm:p-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold">{active.title}</h3>
            <p className="mt-2 max-w-prose leading-relaxed text-muted-foreground">
              {active.shows}
            </p>
          </div>
          <a
            href={sourceUrl(active.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover"
          >
            View source
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="p-6 sm:p-8">
          <ActiveDemo />
        </div>
      </div>
    </section>
  );
};

export default LiveDemos;
