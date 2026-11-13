import { NetworkVisual } from "@/components/sections/services/network-visual";
import {
  ServiceCardCopy,
  ServiceCardMeta,
  ServiceCardShell,
} from "@/components/sections/services/service-card-shell";
import { aiRagService } from "@/data/services";
import { cn } from "@/lib/utils";

export function AiRagCard({ className }: { className?: string }) {
  const service = aiRagService;

  return (
    <ServiceCardShell className={cn("flex-col", className)}>
      <ServiceCardMeta number={service.number} />
      <div className="flex flex-1 items-center justify-center py-6">
        <NetworkVisual className="opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
      </div>
      <div className="mt-auto">
        <ServiceCardCopy service={service} />
      </div>
    </ServiceCardShell>
  );
}
