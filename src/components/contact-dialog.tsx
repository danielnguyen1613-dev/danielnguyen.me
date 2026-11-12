"use client";

import {
  ContactForm,
  type ContactFormLabels,
} from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ContactDialogProps = {
  triggerLabel: string;
  title: string;
  description: string;
  labels: ContactFormLabels;
  triggerClassName?: string;
};

export function ContactDialog({
  triggerLabel,
  title,
  description,
  labels,
  triggerClassName,
}: ContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "mt-12 rounded-full border-border bg-transparent text-foreground shadow-sm hover:bg-primary/10 hover:shadow-md",
              triggerClassName,
            )}
          />
        }
      >
        {triggerLabel}
      </DialogTrigger>

      <DialogContent className="gap-5 sm:max-w-lg">
        <DialogHeader className="pr-10">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription className="w-full text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <ContactForm
          labels={labels}
          variant="light"
          idPrefix="contact-dialog"
        />
      </DialogContent>
    </Dialog>
  );
}
