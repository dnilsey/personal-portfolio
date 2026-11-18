export const classNames = (
  ...classes: (string | undefined | null | false)[]
): string => classes.filter(Boolean).join(" ");
