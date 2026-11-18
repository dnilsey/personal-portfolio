export const TechTags = ({ tech }: { tech: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {tech.map((item) => (
      <li
        key={item}
        className="rounded-full bg-surface-muted px-3 py-1 text-xs sm:text-sm text-foreground"
      >
        {item}
      </li>
    ))}
  </ul>
);
