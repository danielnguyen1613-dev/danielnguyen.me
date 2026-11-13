import { getTranslations } from "next-intl/server";
import { AboutEducation } from "@/components/sections/about/about-education";
import { AboutExperience } from "@/components/sections/about/about-experience";
import { AboutSkills } from "@/components/sections/about/about-skills";
import { CertificatesSection } from "@/components/sections/about/certificates-section";
import { SectionHeading } from "@/components/section-heading";
import { personalInfo } from "@/data/about";
import { cn } from "@/lib/utils";

export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section className="relative flex flex-col gap-14 py-4 mt-6 sm:mt-8 lg:gap-16">
      {/* Section 1 — Intro */}
      <div className="space-y-10">
        <header>
          <SectionHeading
            lead={t("title")}
            accent={t("accent")}
            className="text-3xl sm:text-3xl font-bold"
          />
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-8 xl:gap-8">
          <p className="text-sm leading-[1.75] text-surface-foreground/65">
            {t("bio")}
          </p>

          <dl className="flex flex-col gap-4 self-start">
            {personalInfo.map((item) => (
              <div key={item.label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <dt className="font-heading text-sm font-bold text-primary">
                  {item.label}
                </dt>
                <dd className="text-sm text-surface-foreground">
                  {item.href ? (
                    <a
                      href={item.href}
                      className={cn(
                        "transition-colors duration-200",
                        "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                      )}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Section 2 — Experience, Education & Skills */}
      <div className="grid grid-cols-1 gap-12 border-surface-foreground/10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14 xl:gap-12">
        <div className="space-y-12">
          <AboutExperience />
          <AboutEducation />
        </div>
        <AboutSkills />
      </div>

      {/* Section 3 — Certificates */}
      <CertificatesSection className="border-surface-foreground/10" />
    </section>
  );
}
