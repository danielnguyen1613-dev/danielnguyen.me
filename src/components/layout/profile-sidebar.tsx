import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { SVGProps } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProfileSidebarProps = {
  className?: string;
  compact?: boolean;
  /** Join visually with the main panel (no outer chrome). */
  connected?: boolean;
};

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.75c0-1.85-.03-4.22-2.57-4.22-2.57 0-2.96 2.01-2.96 4.09V24H8.34V8.25z" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.82.58A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: siteConfig.socials.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    href: siteConfig.socials.github,
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    href: siteConfig.socials.youtube,
    label: "YouTube",
    icon: YouTubeIcon,
  },
] as const;

export async function ProfileSidebar({
  className,
  compact = false,
  connected = false,
}: ProfileSidebarProps) {
  const t = await getTranslations("Profile");

  if (compact) {
    return (
      <header
        data-shell="profile"
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm",
          className,
        )}
      >
        <Image
          src={siteConfig.avatarUrl}
          alt={siteConfig.name}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full object-cover ring-2 ring-border"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-semibold text-card-foreground">
            {siteConfig.name}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {t("role")}
          </p>
        </div>
        <a
          href={siteConfig.cvUrl}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "hidden shrink-0 rounded-full border-border bg-transparent text-card-foreground hover:bg-primary/10 sm:inline-flex",
          )}
        >
          {t("downloadCv")}
        </a>
      </header>
    );
  }

  return (
    <aside
      data-shell="profile"
      className={cn(
        "flex h-full flex-col bg-card p-6 xl:p-8",
        connected
          ? "rounded-none border-0 shadow-none"
          : "rounded-xl border border-border shadow-sm",
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-full opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in srgb, var(--primary) 55%, var(--muted-foreground)) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />
          <Image
            src={siteConfig.avatarUrl}
            alt={siteConfig.name}
            width={128}
            height={128}
            priority
            className="relative size-28 rounded-full object-cover ring-4 ring-border xl:size-32"
          />
        </div>

        <div className="space-y-1.5">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-card-foreground">
            {siteConfig.name}
          </h1>
          <p className="text-sm text-muted-foreground">{t("role")}</p>
        </div>

        <ul className="flex items-center">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex size-10 items-center justify-center text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="size-4" width={16} height={16} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={siteConfig.cvUrl}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 rounded-full border-border bg-transparent px-6 text-card-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-card-foreground",
          )}
        >
          {t("downloadCv")}
        </a>
      </div>

      <p className="pt-6 text-center text-xs text-muted-foreground">
        {t("copyright")}
      </p>
    </aside>
  );
}
