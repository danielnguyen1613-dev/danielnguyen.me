"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const fieldClassName =
  "h-11 w-full rounded-lg border border-white/12 bg-transparent px-3 text-sm text-surface-foreground outline-none transition-colors placeholder:text-surface-foreground/35 focus:border-primary/50";

const textareaClassName =
  "w-full resize-y rounded-lg border border-white/12 bg-transparent px-3 py-2.5 text-sm text-surface-foreground outline-none transition-colors placeholder:text-surface-foreground/35 focus:border-primary/50";

const labelClassName = "text-sm text-surface-foreground/70";

type ContactFormLabels = {
  nameLabel: string;
  namePlaceholder: string;
  emailFieldLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  success: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
};

export function ContactForm({ labels }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="contact-name" className={labelClassName}>
          {labels.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          className={fieldClassName}
          placeholder={labels.namePlaceholder}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className={labelClassName}>
          {labels.emailFieldLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClassName}
          placeholder={labels.emailPlaceholder}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className={labelClassName}>
          {labels.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={textareaClassName}
          placeholder={labels.messagePlaceholder}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" size="lg">
          {labels.submit}
        </Button>
        {submitted ? (
          <p className="text-sm text-primary">{labels.success}</p>
        ) : null}
      </div>
    </form>
  );
}
