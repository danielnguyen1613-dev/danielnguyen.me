import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BlogContentProps = {
  children: ReactNode;
  className?: string;
};

export function BlogContent({ children, className }: BlogContentProps) {
  return (
    <div
      className={cn(
        "blog-prose max-w-none text-surface-foreground/80",
        className,
      )}
    >
      {children}
    </div>
  );
}
