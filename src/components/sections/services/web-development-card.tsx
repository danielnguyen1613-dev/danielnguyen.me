import { BrowserVisual } from "@/components/sections/services/browser-visual";
import {
  ServiceCardCopy,
  ServiceCardMeta,
  ServiceCardShell,
} from "@/components/sections/services/service-card-shell";
import { webDevelopmentService } from "@/data/services";
import { cn } from "@/lib/utils";

export function WebDevelopmentCard({ className }: { className?: string }) {
  const service = webDevelopmentService;

  return (
    <ServiceCardShell
      className={cn(
        "flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8",
        className,
      )}
    >
      <div className="flex flex-1 items-center justify-center lg:max-w-[48%] lg:justify-end">
        <BrowserVisual className="max-w-[320px] opacity-90 transition-opacity duration-300 group-hover/card:opacity-100" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <ServiceCardMeta number={service.number} />
        <div className="mt-auto pt-8">
          <ServiceCardCopy service={service} />
        </div>
      </div>

     
    </ServiceCardShell>
  );
}
