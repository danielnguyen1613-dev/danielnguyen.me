import { MetricsVisual } from "@/components/sections/services/metrics-visual";
import {
  ServiceCardCopy,
  ServiceCardMeta,
  ServiceCardShell,
} from "@/components/sections/services/service-card-shell";
import { performanceService } from "@/data/services";
import { cn } from "@/lib/utils";

export function PerformanceCard({ className }: { className?: string }) {
  const service = performanceService;

  return (
    <ServiceCardShell className={cn("flex-col", className)}>
      <ServiceCardMeta number={service.number} />
      <div className="flex flex-1 items-center justify-center py-5">
        <MetricsVisual className="opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
      </div>
      <div className="mt-auto">
        <ServiceCardCopy service={service} />
      </div>
    </ServiceCardShell>
  );
}
