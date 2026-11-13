import { SkillGroup } from "@/components/sections/about/skill-group";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups } from "@/data/about";
import { cn } from "@/lib/utils";

type AboutSkillsProps = {
  className?: string;
};

export function AboutSkills({ className }: AboutSkillsProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <SectionHeading
        as="h3"
        lead="Technical"
        accent="Skills"
        className="text-xl sm:text-xl font-bold"
      />

      <div className="space-y-8">
        {skillGroups.map((group) => (
          <SkillGroup key={group.title} group={group} />
        ))}
      </div>
    </div>
  );
}
