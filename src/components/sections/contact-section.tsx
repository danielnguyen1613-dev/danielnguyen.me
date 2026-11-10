import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeader } from "@/components/sections/section-header";
import { siteConfig } from "@/lib/site";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section className="flex flex-col gap-10 py-2">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-surface-foreground/45">{t("emailLabel")}</p>
            <a
              href="mailto:hello@danielnguyen.me"
              className="text-surface-foreground transition-colors hover:text-primary"
            >
              hello@danielnguyen.me
            </a>
          </div>
          <div>
            <p className="text-surface-foreground/45">{t("locationLabel")}</p>
            <p className="text-surface-foreground">{t("location")}</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground/70 transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground/70 transition-colors hover:text-primary"
            >
              GitHub
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground/70 transition-colors hover:text-primary"
            >
              YouTube
            </a>
          </div>
        </div>

        <ContactForm
          labels={{
            nameLabel: t("nameLabel"),
            namePlaceholder: t("namePlaceholder"),
            emailFieldLabel: t("emailFieldLabel"),
            emailPlaceholder: t("emailPlaceholder"),
            messageLabel: t("messageLabel"),
            messagePlaceholder: t("messagePlaceholder"),
            submit: t("submit"),
            success: t("success"),
          }}
        />
      </div>
    </section>
  );
}
