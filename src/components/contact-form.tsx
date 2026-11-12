"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
  /** `surface` for dark panels; `light` for white dialogs/cards. */
  variant?: "surface" | "light";
  idPrefix?: string;
  className?: string;
};

export function ContactForm({
  labels,
  variant = "surface",
  idPrefix = "contact",
  className,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const isLight = variant === "light";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const labelClassName = isLight
    ? "text-foreground/70"
    : "font-normal text-surface-foreground/70";

  const fieldClassName = cn(
    "rounded text-sm",
    isLight && "border-border text-foreground placeholder:text-muted-foreground",
  );

  const nameId = `${idPrefix}-name`;
  const emailId = `${idPrefix}-email`;
  const messageId = `${idPrefix}-message`;

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-1.5">
        <Label htmlFor={nameId} className={labelClassName}>
          {labels.nameLabel}
        </Label>
        <Input
          id={nameId}
          name="name"
          required
          autoComplete="name"
          placeholder={labels.namePlaceholder}
          className={fieldClassName}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={emailId} className={labelClassName}>
          {labels.emailFieldLabel}
        </Label>
        <Input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={labels.emailPlaceholder}
          className={fieldClassName}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={messageId} className={labelClassName}>
          {labels.messageLabel}
        </Label>
        <Textarea
          id={messageId}
          name="message"
          required
          rows={5}
          placeholder={labels.messagePlaceholder}
          className={fieldClassName}
        />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
        {submitted ? (
          <p className="mr-auto text-sm text-primary">{labels.success}</p>
        ) : null}
        <Button
          type="submit"
          size="lg"
          className={
            isLight
              ? "border-primary font-semibold text-primary hover:bg-primary/10"
              : undefined
          }
        >
          {labels.submit}
        </Button>
      </div>
    </form>
  );
}

export type { ContactFormLabels };
