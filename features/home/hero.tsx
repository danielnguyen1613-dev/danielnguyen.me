import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/features/home/hero-background";

const heroBaseGradient = `
  radial-gradient(ellipse 85% 70% at 16% 10%, #f06a3b 0%, transparent 56%),
  radial-gradient(ellipse 70% 60% at 86% 20%, #d95a32 0%, transparent 52%),
  radial-gradient(ellipse 90% 70% at 50% 108%, #b94324 0%, transparent 58%),
  radial-gradient(ellipse 55% 45% at 42% 48%, rgba(240, 106, 59, 0.35), transparent 62%),
  linear-gradient(160deg, #d95a32 0%, #f06a3b 36%, #d95a32 66%, #b94324 100%)
`;

const heroWashGradient = `
  radial-gradient(ellipse 50% 40% at 72% 28%, rgba(240, 106, 59, 0.18), transparent 65%),
  radial-gradient(ellipse 80% 55% at 18% 88%, rgba(185, 67, 36, 0.4), transparent 60%),
  linear-gradient(
    180deg,
    rgba(217, 90, 50, 0.28) 0%,
    rgba(185, 67, 36, 0.18) 50%,
    rgba(185, 67, 36, 0.38) 100%
  )
`;

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#D95A32]"
      style={{ backgroundImage: heroBaseGradient }}
    >
      <HeroBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ backgroundImage: heroWashGradient }}
      />

      <div className="relative z-[2] flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6">
          <p className="text-sm font-medium tracking-wide text-primary">
            {t("role")} · {t("location")}
          </p>
          <h1 className="text-h1 max-w-2xl text-foreground">{t("headline")}</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("bio")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button size="lg">{t("watchYoutube")}</Button>
            <Button size="lg" variant="outline">
              {t("viewProjects")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
