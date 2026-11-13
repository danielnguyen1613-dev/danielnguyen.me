import { ApiVisual } from "@/components/sections/services/api-visual";
import {
  ServiceCardCopy,
  ServiceCardMeta,
  ServiceCardShell,
} from "@/components/sections/services/service-card-shell";
import { backendApiService } from "@/data/services";
import { cn } from "@/lib/utils";

export function BackendApiCard({ className }: { className?: string }) {
  const service = backendApiService;

  return (
    <ServiceCardShell className={cn("flex-col", className)}>
      <ServiceCardMeta number={service.number} />
      <div className="flex flex-1 items-center justify-center py-5">
        <ApiVisual className="opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
      </div>
      <div className="mt-auto">
        <ServiceCardCopy service={service} />
      </div>
    </ServiceCardShell>
  );
}
