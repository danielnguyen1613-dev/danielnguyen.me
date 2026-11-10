type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export function SectionHeader({ eyebrow, title, intro }: SectionHeaderProps) {
  return (
    <header className="space-y-3">
      <p className="text-sm font-medium tracking-wide text-primary">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-surface-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-relaxed text-surface-foreground/65">
        {intro}
      </p>
    </header>
  );
}
