import { SOCIAL_LINKS } from "@/constants/socials";
import { classNames } from "@/lib/classnames";

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={classNames("flex items-center gap-4", className)}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          <Icon className="w-7 h-7" />
        </a>
      ))}
    </div>
  );
}
