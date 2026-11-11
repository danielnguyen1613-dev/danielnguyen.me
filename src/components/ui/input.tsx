import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg border-2 border-surface-foreground/25 bg-transparent px-4 py-3 text-base text-surface-foreground transition-colors outline-none",
        "placeholder:text-surface-foreground/45",
        "focus-visible:border-primary focus-visible:ring-0",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-surface-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
