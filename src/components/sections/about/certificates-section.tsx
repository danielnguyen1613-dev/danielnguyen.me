import { CertificateCard } from "@/components/sections/about/certificate-card";
import { SectionHeading } from "@/components/section-heading";
import { certificates } from "@/data/about";
import { cn } from "@/lib/utils";

type CertificatesSectionProps = {
  className?: string;
};

export function CertificatesSection({ className }: CertificatesSectionProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <SectionHeading
        as="h3"
        lead="Certificates"
        className="text-xl sm:text-xl font-bold"
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {certificates.map((certificate) => (
          <li key={certificate.title}>
            <CertificateCard certificate={certificate} />
          </li>
        ))}
      </ul>
    </div>
  );
}
