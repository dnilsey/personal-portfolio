import { useState } from "react";
import { CONTACT } from "./data";
import { ContactCard } from "./ContactCard";
import Email from "../shared/svgs/Email";
const actionClass =
  "text-sm font-medium text-primary hover:text-primary-hover cursor-pointer";
export const EmailCard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the address is still visible to copy by hand.
    }
  };

  return (
    <ContactCard icon={<Email className="w-5 h-5" />} label="Email">
      <div className="font-semibold break-all">{CONTACT.email}</div>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button type="button" onClick={copy} className={actionClass}>
          {copied ? "Copied" : "Copy address"}
        </button>
        <a href={`mailto:${CONTACT.email}`} className={actionClass}>
          Open mail app
        </a>
        <span role="status" className="sr-only">
          {copied ? "Email address copied" : ""}
        </span>
      </div>
    </ContactCard>
  );
};
