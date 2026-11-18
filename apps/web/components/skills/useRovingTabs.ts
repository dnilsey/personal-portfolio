import { KeyboardEvent, useRef } from "react";

/**
 * Keyboard support for the WAI-ARIA tabs pattern with a roving tabindex:
 * only the selected tab is in the Tab order, and arrow keys / Home / End
 * move focus and selection between tabs.
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export function useRovingTabs(count: number, onSelect: (index: number) => void) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusAndSelect = (index: number) => {
    tabRefs.current[index]?.focus();
    onSelect(index);
  };

  const getTabProps = (index: number, selected: boolean) => ({
    ref: (element: HTMLButtonElement | null) => {
      tabRefs.current[index] = element;
    },
    role: "tab" as const,
    "aria-selected": selected,
    tabIndex: selected ? 0 : -1,
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
      const keyActions: Record<string, number> = {
        ArrowRight: (index + 1) % count,
        ArrowDown: (index + 1) % count,
        ArrowLeft: (index - 1 + count) % count,
        ArrowUp: (index - 1 + count) % count,
        Home: 0,
        End: count - 1,
      };
      const next = keyActions[event.key];
      if (next === undefined) return;
      event.preventDefault();
      focusAndSelect(next);
    },
  });

  return { getTabProps };
}
