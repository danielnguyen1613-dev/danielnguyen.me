import { SkillBar } from "@/components/sections/about/skill-bar";
import type { SkillGroup as SkillGroupData } from "@/data/about";
import { cn } from "@/lib/utils";

type SkillGroupProps = {
  group: SkillGroupData;
  className?: string;
};

export function SkillGroup({ group, className }: SkillGroupProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="font-heading text-sm font-semibold tracking-wide text-surface-foreground/60 uppercase">
        {group.title}
      </h4>
      <ul className="space-y-4">
        {group.skills.map((skill) => (
          <li key={skill.name}>
            <SkillBar skill={skill} />
          </li>
        ))}
      </ul>
    </div>
  );
}
