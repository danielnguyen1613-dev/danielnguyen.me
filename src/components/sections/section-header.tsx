import { SectionHeading } from "@/components/sections/section-heading";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  intro: string;
};

export function SectionHeader({
  eyebrow,
  title,
  accent,
  intro,
}: SectionHeaderProps) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-primary">
          {eyebrow}
        </p>
      ) : null}
      <SectionHeading lead={title} accent={accent} />
      <p className="max-w-2xl text-base leading-relaxed text-surface-foreground/65">
        {intro}
      </p>
    </header>
  );
}
