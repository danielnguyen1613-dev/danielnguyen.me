import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-36 w-full resize-y rounded-lg border-2 border-surface-foreground/25 bg-transparent px-4 py-3 text-base text-surface-foreground transition-colors outline-none",
        "placeholder:text-surface-foreground/45",
        "focus-visible:border-primary focus-visible:ring-0",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
