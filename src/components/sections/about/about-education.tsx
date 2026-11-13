import { AboutTimeline } from "@/components/sections/about/about-timeline";
import { SectionHeading } from "@/components/section-heading";
import { education } from "@/data/about";
import { cn } from "@/lib/utils";

type AboutEducationProps = {
  className?: string;
};

export function AboutEducation({ className }: AboutEducationProps) {
  const timelineItems = education.map((item) => ({
    period: item.year,
    title: item.degree,
    subtitle: item.institution,
    detail: `GPA: ${item.gpa}`,
    emphasizeDetail: true,
  }));

  return (
    <div className={cn("space-y-8", className)}>
      <SectionHeading
        as="h3"
        lead="Education"
        className="text-xl sm:text-xl font-bold"
      />

      <AboutTimeline items={timelineItems} />
    </div>
  );
}
