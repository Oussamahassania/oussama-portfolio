import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, type Certification } from "@/data/certifications";

function CertificateCard({
  certificate,
  index,
}: {
  certificate: Certification;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="card-surface group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.09),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.06] font-display text-sm font-semibold text-accent">
            {certificate.issuerMark}
          </div>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-muted-2">
            0{index + 1}
          </span>
        </div>

        <div className="mt-9 flex-1">
          <div className="mono-label text-accent/80">{certificate.issuer}</div>
          <h3 className="display mt-3 text-xl font-medium leading-snug text-fg md:text-2xl">
            {certificate.title}
          </h3>
          <p className="mt-4 text-xs leading-6 text-muted-2">{certificate.note}</p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-6">
          <div>
            <div className="mono-label mb-1.5">Issued</div>
            <div className="font-mono text-[0.72rem] text-fg/90">
              {certificate.issued}
            </div>
          </div>
          <div>
            <div className="mono-label mb-1.5">Credential</div>
            <div className="font-mono text-[0.72rem] text-fg/90">
              {certificate.credentialId}
            </div>
          </div>
        </div>

        <a
          href={certificate.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center justify-between rounded-full border border-line-strong px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg transition-all duration-300 hover:border-accent/60 hover:bg-accent/[0.06] hover:text-accent"
        >
          <span className="inline-flex items-center gap-2">
            <BadgeCheck size={14} />
            Verify credential
          </span>
          <ArrowUpRight size={13} />
        </a>
      </article>
    </Reveal>
  );
}

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative scroll-mt-20 py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Credentials"
          title={
            <>
              Continuous learning, <span className="text-violet">verified</span>.
            </>
          }
          description="Focused courses in deep learning, supervised learning and Java testing — each with a public verification record."
        />
        <div className="grid gap-5 md:grid-cols-3 md:items-start">
          {certifications.map((certificate, index) => (
            <div
              key={certificate.id}
              className={index === 1 ? "md:translate-y-8" : index === 2 ? "md:translate-y-16" : ""}
            >
              <CertificateCard certificate={certificate} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
