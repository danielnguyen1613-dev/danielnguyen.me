import { CommerceVisual } from "@/components/sections/services/commerce-visual";
import {
  ServiceCardCopy,
  ServiceCardMeta,
  ServiceCardShell,
} from "@/components/sections/services/service-card-shell";
import { ecommerceService } from "@/data/services";
import { cn } from "@/lib/utils";

export function EcommerceCard({ className }: { className?: string }) {
  const service = ecommerceService;

  return (
    <ServiceCardShell className={cn("flex-col", className)}>
      <ServiceCardMeta number={service.number} />
      <div className="flex flex-1 items-center justify-center py-5">
        <CommerceVisual className="opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
      </div>
      <div className="mt-auto">
        <ServiceCardCopy service={service} />
      </div>
    </ServiceCardShell>
  );
}
