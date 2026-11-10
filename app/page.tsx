import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const t = await getTranslations("Home");

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-24">
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
    </main>
  );
}
