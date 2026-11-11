import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SkillTagsProps = {
  tags: string[];
  className?: string;
};

export function SkillTags({ tags, className }: SkillTagsProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {tags.map((tag) => (
        <li key={tag}>
          <Badge>{tag}</Badge>
        </li>
      ))}
    </ul>
  );
}
