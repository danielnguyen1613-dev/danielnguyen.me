import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

export async function AboutSection() {
  const t = await getTranslations("About");
  const skills = t.raw("skills") as string[];
  const highlights = t.raw("highlights") as string[];

  return (
    <section className="flex flex-col gap-10 py-2">
      <header className="space-y-3">
        <SectionHeading lead={t("title")} accent={t("accent")} />
        <p className="max-w-2xl text-base leading-relaxed text-surface-foreground/65">
          {t("intro")}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-semibold text-surface-foreground">
            {t("profileTitle")}
          </h3>
          <p className="text-sm leading-relaxed text-surface-foreground/65">
            {t("profileBody")}
          </p>
          <p className="text-sm text-surface-foreground/55">
            {siteConfig.name} · {siteConfig.role}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading text-lg font-semibold text-surface-foreground">
            {t("summaryTitle")}
          </h3>
          <ul className="space-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-surface-foreground/65"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-heading text-lg font-semibold text-surface-foreground">
          {t("skillsTitle")}
        </h3>
        <p className="text-sm leading-relaxed text-surface-foreground/70">
          {skills.join(" · ")}
        </p>
      </div>
    </section>
  );
}
