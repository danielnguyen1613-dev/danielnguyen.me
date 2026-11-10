"use client";

import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type HomeSectionProps = {
  onViewExperience?: () => void;
};

export function HomeSection({ onViewExperience }: HomeSectionProps) {
  const t = useTranslations("Home");
  const features = [
    t("features.experience"),
    t("features.fullstack"),
    t("features.creator"),
    t("features.plants"),
  ];

  return (
    <section className="flex min-h-full flex-col justify-center gap-8 py-4">
      <div className="space-y-4">
        <p className="text-sm font-medium tracking-wide text-primary">
          {t("role")} · {t("location")}
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-surface-foreground sm:text-4xl md:text-5xl">
          {t("headline")}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-surface-foreground/65">
          {t("bio")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={siteConfig.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          {t("watchYoutube")}
        </a>
        <Button
          size="lg"
          variant="outline"
          className="border-white/15 bg-transparent text-surface-foreground hover:bg-white/10 hover:text-surface-foreground"
          onClick={onViewExperience}
        >
          {t("viewProjects")}
        </Button>
      </div>

      <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-surface-foreground/55">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}
