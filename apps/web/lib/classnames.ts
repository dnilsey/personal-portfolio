export const classNames = (
  ...classes: (string | undefined | null | false)[]
): string => classes.filter(Boolean).join(" ");

export const inputClass = (invalid: boolean) =>
  classNames(
    invalid
      ? "border-danger"
      : "border-border hover:border-muted-foreground focus:border-primary",
    "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30",
  );
