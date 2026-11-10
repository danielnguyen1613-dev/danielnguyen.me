"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/features/sections/section-header";
import { siteConfig } from "@/lib/site";

const fieldClassName =
  "h-11 w-full rounded-lg border border-white/12 bg-transparent px-3 text-sm text-surface-foreground outline-none transition-colors placeholder:text-surface-foreground/35 focus:border-primary/50";

const textareaClassName =
  "w-full resize-y rounded-lg border border-white/12 bg-transparent px-3 py-2.5 text-sm text-surface-foreground outline-none transition-colors placeholder:text-surface-foreground/35 focus:border-primary/50";

const labelClassName = "text-sm text-surface-foreground/70";

export function ContactSection() {
  const t = useTranslations("Contact");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className={labelClassName}>
              {t("nameLabel")}
            </label>
            <input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              className={fieldClassName}
              placeholder={t("namePlaceholder")}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className={labelClassName}>
              {t("emailFieldLabel")}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={fieldClassName}
              placeholder={t("emailPlaceholder")}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contact-message" className={labelClassName}>
              {t("messageLabel")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className={textareaClassName}
              placeholder={t("messagePlaceholder")}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button type="submit" size="lg">
              {t("submit")}
            </Button>
            {submitted ? (
              <p className="text-sm text-primary">{t("success")}</p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
