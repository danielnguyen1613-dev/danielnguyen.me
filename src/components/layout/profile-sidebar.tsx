import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { SVGProps } from "react";
import { Button } from "@/components/ui/button";
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

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.66 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function ZaloIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.49 10.272v-.45h1.347v6.322h-.77a.576.576 0 0 1-.577-.573v.001a3.27 3.27 0 0 1-1.938.632a3.284 3.284 0 0 1-3.284-3.282a3.284 3.284 0 0 1 3.284-3.282a3.27 3.27 0 0 1 1.937.632zM6.919 7.79v.205c0 .382-.051.694-.3 1.06l-.03.034a8 8 0 0 0-.242.285L2.024 14.8h4.895v.768a.576.576 0 0 1-.577.576H0v-.362c0-.443.11-.641.25-.847L4.858 9.23H.192V7.79zm8.551 8.354a.48.48 0 0 1-.48-.48V7.79h1.441v8.354zM20.693 9.6a3.306 3.306 0 1 1 .002 6.612a3.306 3.306 0 0 1-.002-6.612m-10.14 5.253a1.932 1.932 0 1 0 0-3.863a1.932 1.932 0 0 0 0 3.863m10.14-.003a1.945 1.945 0 1 0 0-3.89a1.945 1.945 0 0 0 0 3.89" />
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
    href: siteConfig.socials.x,
    label: "X",
    icon: XIcon,
  },
  {
    href: siteConfig.socials.telegram,
    label: "Telegram",
    icon: TelegramIcon,
  },
  {
    href: siteConfig.socials.zalo,
    label: "Zalo",
    icon: ZaloIcon,
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
          "flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm",
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
          <p className="truncate font-heading text-base font-semibold text-foreground">
            {siteConfig.name}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {t("role")}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<a href={siteConfig.cvUrl} />}
          className="hidden shrink-0 rounded-full border-border bg-transparent text-foreground hover:bg-primary/10 sm:inline-flex"
        >
          {t("downloadCv")}
        </Button>
      </header>
    );
  }

  return (
    <aside
      data-shell="profile"
      className={cn(
        "flex h-full flex-col bg-white p-6 xl:p-8",
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
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
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
      </div>
    </aside>
  );
}
