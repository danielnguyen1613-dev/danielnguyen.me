"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/features/sections/section-header";

type EducationItem = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

type CertificateItem = {
  name: string;
  issuer: string;
  year: string;
};

export function EducationSection() {
  const t = useTranslations("Education");
  const schools = t.raw("schools") as EducationItem[];
  const certificates = t.raw("certificates") as CertificateItem[];

  return (
    <section className="flex flex-col gap-10 py-2">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <div className="space-y-6">
        <h3 className="font-heading text-lg font-semibold text-surface-foreground">
          {t("schoolsTitle")}
        </h3>
        <ul className="space-y-6">
          {schools.map((item) => (
            <li key={item.school} className="space-y-1 border-l border-primary/40 pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-heading text-base font-semibold text-surface-foreground">
                  {item.school}
                </p>
                <p className="text-xs tracking-wide text-surface-foreground/50">
                  {item.period}
                </p>
              </div>
              <p className="text-sm text-primary">{item.degree}</p>
              <p className="text-sm leading-relaxed text-surface-foreground/65">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <h3 className="font-heading text-lg font-semibold text-surface-foreground">
          {t("certificatesTitle")}
        </h3>
        <ul className="space-y-4">
          {certificates.map((item) => (
            <li
              key={item.name}
              className="flex flex-wrap items-baseline justify-between gap-2"
            >
              <div>
                <p className="text-sm font-medium text-surface-foreground">
                  {item.name}
                </p>
                <p className="text-sm text-surface-foreground/55">{item.issuer}</p>
              </div>
              <p className="text-xs tracking-wide text-surface-foreground/50">
                {item.year}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
