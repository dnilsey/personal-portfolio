import type { Reason } from "@/components/contact/data";
import type { Fields } from "@/components/contact/ContactForm";

export const buildEmail = (reason: Reason, fields: Fields) => {
  const from = fields.company.trim()
    ? `${fields.name.trim()} (${fields.company.trim()})`
    : fields.name.trim();
  const subject = `${reason} — from ${from}`;
  const body = `${fields.message.trim()}\n\n—\n${fields.name.trim()}\n${fields.email.trim()}${
    fields.company.trim() ? `\n${fields.company.trim()}` : ""
  }`;
  return { subject, body };
};
