import type { Skill } from "@/data/about";
import { cn } from "@/lib/utils";

type SkillBarProps = {
  skill: Skill;
  className?: string;
};

export function SkillBar({ skill, className }: SkillBarProps) {
  const clamped = Math.min(100, Math.max(0, skill.level));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm font-bold text-surface-foreground sm:text-sm">
          {skill.name}
        </span>
        <span className="font-mono text-xs tracking-wide text-surface-foreground/45 tabular-nums">
          {clamped}%
        </span>
      </div>

      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-foreground/10"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
