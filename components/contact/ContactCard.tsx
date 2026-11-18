export const ContactCard = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-primary">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </div>
    <div className="mt-2">{children}</div>
  </div>
);
