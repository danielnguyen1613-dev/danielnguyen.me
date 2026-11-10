import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/features/home/hero-background";

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, #f8ebe3 0%, #f4d9cb 52%, #efcbb8 100%)",
      }}
    >
      <HeroBackground />

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
