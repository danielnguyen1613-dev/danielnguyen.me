import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/section-heading";
import { AiRagCard } from "@/components/sections/services/ai-rag-card";
import { BackendApiCard } from "@/components/sections/services/backend-api-card";
import { EcommerceCard } from "@/components/sections/services/ecommerce-card";
import { PerformanceCard } from "@/components/sections/services/performance-card";
import { WebDevelopmentCard } from "@/components/sections/services/web-development-card";

export async function ServicesSection() {
  const t = await getTranslations("Services");

  return (
    <section className="relative flex flex-col gap-8 py-4 mt-6 sm:mt-8">
      <header className="relative z-10 max-w-2xl space-y-3">
        <SectionHeading
          lead={t("title")}
          accent={t("accent")}
          className="text-3xl sm:text-3xl font-bold"
        />
        <p className="max-w-xl text-base my-2 mt-4 leading-relaxed text-surface-foreground/55">
          {t("subtitle")}
        </p>
      </header>

      <div className="relative isolate pt-1">
        <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <WebDevelopmentCard className="col-span-1 min-h-[300px] lg:col-span-2 lg:min-h-[320px]" />
          <AiRagCard className="col-span-1 min-h-[280px]" />
          <BackendApiCard className="col-span-1 min-h-[280px]" />
          <EcommerceCard className="col-span-1 min-h-[280px]" />
          <PerformanceCard className="col-span-1 min-h-[280px]" />
        </div>
      </div>
    </section>
  );
}
