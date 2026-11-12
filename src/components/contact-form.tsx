"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { sendContactMessage } from "@/app/actions/contact";
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
  sending: string;
  success: string;
  error: string;
  errorConfig: string;
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
  const [sending, setSending] = useState(false);
  const isLight = variant === "light";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);

    const result = await sendContactMessage(new FormData(form));
    setSending(false);

    if (result.ok) {
      toast.success(labels.success);
      form.reset();
      return;
    }

    toast.error(
      result.error === "config" ? labels.errorConfig : labels.error,
    );
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
          disabled={sending}
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
          disabled={sending}
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
          disabled={sending}
        />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
        <Button
          type="submit"
          size="lg"
          disabled={sending}
          className={
            isLight
              ? "border-primary font-semibold text-primary hover:bg-primary/10"
              : undefined
          }
        >
          {sending ? labels.sending : labels.submit}
        </Button>
      </div>
    </form>
  );
}

export type { ContactFormLabels };
