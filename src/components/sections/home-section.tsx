import { getTranslations } from "next-intl/server";
import { getHashForSection } from "@/lib/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export async function HomeSection() {
  const t = await getTranslations("Home");
  const features = [
    t("features.experience"),
    t("features.fullstack"),
    t("features.creator"),
    t("features.plants"),
  ];

  return (
    <section className="flex min-h-full flex-col justify-center gap-8 py-4">
      <div className="space-y-4">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-surface-foreground sm:text-4xl md:text-5xl">
          {t("headline")}
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-surface-foreground/65">
          {t("bio")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          {t("viewGithub")}
        </a>
        <a
          href={getHashForSection("experience")}
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "border-white/15 bg-transparent text-surface-foreground hover:bg-white/10 hover:text-surface-foreground",
          )}
        >
          {t("viewProjects")}
        </a>
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
