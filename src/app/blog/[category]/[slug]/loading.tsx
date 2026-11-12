export default function BlogPostLoading() {
  return (
    <main className="min-h-dvh bg-surface text-surface-foreground">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="h-10 w-40 animate-pulse bg-surface-foreground/10" />
        <div className="space-y-4">
          <div className="h-4 w-48 animate-pulse bg-surface-foreground/10" />
          <div className="h-12 w-full animate-pulse bg-surface-foreground/10" />
          <div className="h-20 w-full max-w-xl animate-pulse bg-surface-foreground/10" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-full animate-pulse bg-surface-foreground/10"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
