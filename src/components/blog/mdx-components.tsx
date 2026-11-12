import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

type CalloutProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

function CalloutShell({
  title,
  children,
  className,
  label,
}: CalloutProps & { label: string }) {
  return (
    <aside
      className={cn(
        "my-6 rounded-lg border border-surface-foreground/15 bg-surface-foreground/5 px-4 py-3 text-sm leading-relaxed text-surface-foreground/85",
        className,
      )}
    >
      <p className="mb-1 font-semibold text-surface-foreground">
        {title ?? label}
      </p>
      <div className="[&>p]:m-0">{children}</div>
    </aside>
  );
}

export function Note(props: CalloutProps) {
  return (
    <CalloutShell
      {...props}
      label="Note"
      className="border-sky-400/30 bg-sky-400/10"
    />
  );
}

export function Tip(props: CalloutProps) {
  return (
    <CalloutShell
      {...props}
      label="Tip"
      className="border-emerald-400/30 bg-emerald-400/10"
    />
  );
}

export function Warning(props: CalloutProps) {
  return (
    <CalloutShell
      {...props}
      label="Warning"
      className="border-amber-400/35 bg-amber-400/10"
    />
  );
}

export function Callout(props: CalloutProps) {
  return <CalloutShell {...props} label="Callout" />;
}

function Pre({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border border-surface-foreground/12 bg-[#0d1117] p-4 text-sm leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function Code({ className, ...props }: ComponentPropsWithoutRef<"code">) {
  const isBlock = className?.includes("language-") || className?.includes("code-highlight");

  return (
    <code
      className={cn(
        isBlock
          ? "font-mono text-[0.9em]"
          : "rounded bg-surface-foreground/10 px-1.5 py-0.5 font-mono text-[0.9em] text-primary",
        className,
      )}
      {...props}
    />
  );
}

function Anchor({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "font-medium text-primary underline decoration-primary/40 underline-offset-3 transition-colors hover:decoration-primary",
        className,
      )}
      {...props}
    />
  );
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        "mt-10 mb-4 font-heading text-3xl font-bold tracking-tight text-surface-foreground sm:text-4xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-10 mb-3 scroll-mt-24 font-heading text-2xl font-bold tracking-tight text-surface-foreground",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 mb-2 scroll-mt-24 font-heading text-xl font-semibold text-surface-foreground",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        "mt-6 mb-2 font-heading text-lg font-semibold text-surface-foreground",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "my-4 text-base leading-7 text-surface-foreground/80",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-4 list-disc space-y-2 pl-6 text-surface-foreground/80",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-4 list-decimal space-y-2 pl-6 text-surface-foreground/80",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 border-l-2 border-primary/70 pl-4 text-surface-foreground/70 italic",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("my-10 border-surface-foreground/15", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className={cn(
          "w-full border-collapse text-left text-sm text-surface-foreground/80",
          className,
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-b border-surface-foreground/20 px-3 py-2 font-semibold text-surface-foreground",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-b border-surface-foreground/10 px-3 py-2 align-top",
        className,
      )}
      {...props}
    />
  ),
  a: Anchor,
  pre: Pre,
  code: Code,
  Note,
  Tip,
  Warning,
  Callout,
};
