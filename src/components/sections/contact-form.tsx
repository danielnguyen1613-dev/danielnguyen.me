"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        <Input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          placeholder={labels.namePlaceholder}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-email" className={labelClassName}>
          {labels.emailFieldLabel}
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={labels.emailPlaceholder}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className={labelClassName}>
          {labels.messageLabel}
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
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
