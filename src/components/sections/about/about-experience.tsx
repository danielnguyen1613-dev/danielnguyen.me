import { AboutTimeline } from "@/components/sections/about/about-timeline";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/data/about";
import { cn } from "@/lib/utils";

type AboutExperienceProps = {
  className?: string;
};

export function AboutExperience({ className }: AboutExperienceProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <SectionHeading
        as="h3"
        lead="Experience"
        className="text-xl sm:text-xl font-bold"
      />
      <AboutTimeline
        items={experience.map((item) => ({
          period: item.period,
          title: item.title,
          subtitle: item.company,
          detail: item.description,
        }))}
      />
    </div>
  );
}
