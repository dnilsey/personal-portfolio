"use client";

import { classNames, inputClass } from "@/lib/classnames";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import ArrowRight from "../shared/svgs/ArrowRight";
import { CONTACT, Reason, REASONS, MESSAGE_MIN, MESSAGE_MAX } from "./data";
import { buildEmail } from "@/utils/buildEmail";
import { ErrorText } from "./ErrorText";

export type Fields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type FieldName = keyof Fields;

const EMPTY: Fields = { name: "", email: "", company: "", message: "" };
const FIELD_ORDER: FieldName[] = ["name", "email", "company", "message"];

const validate = (fields: Fields): Partial<Record<FieldName, string>> => {
  const errors: Partial<Record<FieldName, string>> = {};
  if (!fields.name.trim()) errors.name = "Enter your name";
  if (!fields.email.trim()) errors.email = "Enter your email address";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = "Enter a valid email address, like name@company.com";
  if (fields.message.trim().length < MESSAGE_MIN)
    errors.message = `Write at least ${MESSAGE_MIN} characters`;
  return errors;
};

const ContactForm = () => {
  const formId = useId();
  const [reason, setReason] = useState<Reason>(REASONS[0]);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRefs = useRef<
    Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>
  >({});
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  const errors = validate(fields);
  const visibleError = (name: FieldName) =>
    submitted || touched[name] ? errors[name] : undefined;

  const idFor = (name: FieldName) => `${formId}-${name}`;
  const errorIdFor = (name: FieldName) => `${formId}-${name}-error`;

  const update = (name: FieldName, value: string) =>
    setFields((current) => ({ ...current, [name]: value }));

  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    const firstInvalid = FIELD_ORDER.find((name) => errors[name]);
    if (firstInvalid) {
      inputRefs.current[firstInvalid]?.focus();
      return;
    }
    const { subject, body } = buildEmail(reason, fields);
    window.location.assign(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
  };

  const copyMessage = async () => {
    const { subject, body } = buildEmail(reason, fields);
    try {
      await navigator.clipboard.writeText(
        `To: ${CONTACT.email}\nSubject: ${subject}\n\n${body}`,
      );
      setCopied(true);
    } catch {
      // Clipboard blocked; the visitor can still email the address shown.
    }
  };

  const startOver = () => {
    setFields(EMPTY);
    setTouched({});
    setSubmitted(false);
    setSent(false);
    setCopied(false);
    setReason(REASONS[0]);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2
          ref={confirmationRef}
          tabIndex={-1}
          className="font-zalando-sans-expanded font-bold text-xl sm:text-2xl outline-none"
        >
          Your email is ready to send
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Your email app should have opened with the message filled in. Hit send
          there and I&apos;ll get back to you within a day or two.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Nothing opened? Copy the message and send it to{" "}
          <span className="font-semibold text-foreground">{CONTACT.email}</span>
          .
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copyMessage}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary-hover cursor-pointer"
          >
            {copied ? "Message copied" : "Copy message"}
          </button>
          <button
            type="button"
            onClick={startOver}
            className="inline-flex items-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-primary hover:text-primary cursor-pointer"
          >
            Write another
          </button>
          <span role="status" className="sr-only">
            {copied ? "Message copied to clipboard" : ""}
          </span>
        </div>
      </div>
    );
  }

  const textField = (
    name: Exclude<FieldName, "message">,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
    optional = false,
  ) => {
    const error = visibleError(name);
    return (
      <div>
        <label htmlFor={idFor(name)} className="text-sm font-medium">
          {label}
          {optional && (
            <span className="font-normal text-muted-foreground">
              {" "}
              (optional)
            </span>
          )}
        </label>
        <input
          ref={(element) => {
            inputRefs.current[name] = element;
          }}
          id={idFor(name)}
          name={name}
          value={fields[name]}
          onChange={(event) => update(name, event.target.value)}
          onBlur={() => setTouched((current) => ({ ...current, [name]: true }))}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorIdFor(name) : undefined}
          className={inputClass(Boolean(error))}
          {...props}
        />
        <ErrorText id={errorIdFor(name)} message={error} />
      </div>
    );
  };

  const messageError = visibleError("message");

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact form"
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <fieldset>
        <legend className="text-sm font-medium">What&apos;s this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {REASONS.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="reason"
                value={option}
                checked={reason === option}
                onChange={() => setReason(option)}
                className="peer sr-only"
              />
              <span
                className={classNames(
                  reason === option
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-primary",
                  "inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface",
                )}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {textField("name", "Name", {
          type: "text",
          autoComplete: "name",
          placeholder: "Jane Cruz",
        })}
        {textField("email", "Email", {
          type: "email",
          autoComplete: "email",
          inputMode: "email",
          placeholder: "jane@company.com",
        })}
      </div>

      <div className="mt-5">
        {textField(
          "company",
          "Company",
          {
            type: "text",
            autoComplete: "organization",
            placeholder: "Acme Inc.",
          },
          true,
        )}
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={idFor("message")} className="text-sm font-medium">
            Message
          </label>
          <span
            className={classNames(
              fields.message.length > MESSAGE_MAX * 0.9
                ? "text-primary"
                : "text-muted-foreground",
              "text-xs tabular-nums",
            )}
            aria-hidden="true"
          >
            {fields.message.length} / {MESSAGE_MAX}
          </span>
        </div>
        <textarea
          ref={(element) => {
            inputRefs.current.message = element;
          }}
          id={idFor("message")}
          name="message"
          rows={6}
          maxLength={MESSAGE_MAX}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          onBlur={() =>
            setTouched((current) => ({ ...current, message: true }))
          }
          aria-invalid={Boolean(messageError)}
          aria-describedby={messageError ? errorIdFor("message") : undefined}
          placeholder="Tell me about the role or project, timeline, and anything else that's useful."
          className={classNames(inputClass(Boolean(messageError)), "resize-y")}
        />
        <ErrorText id={errorIdFor("message")} message={messageError} />
      </div>

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Opens your email app with the message ready to send.
        </p>
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium tracking-wide text-primary-foreground shadow-sm transition-colors duration-200 hover:bg-primary-hover cursor-pointer"
        >
          Send message
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
