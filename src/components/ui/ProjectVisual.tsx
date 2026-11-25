import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import type { ProjectVisual as VisualKind } from "@/data/projects";

function Frame({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b1014]">
      <div className="signal-grid-fine absolute inset-0 opacity-40" />
      {children}
      <span className="absolute right-4 top-4 z-20 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-muted-2">
        {caption}
      </span>
      <div className="pointer-events-none absolute inset-0 z-20">
        <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-accent/40" />
        <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-accent/40" />
        <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-accent/40" />
        <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-accent/40" />
      </div>
    </div>
  );
}

function FormaVisual() {
  return (
    <Frame caption="Storefront study">
      <div className="absolute left-[9%] top-[13%] h-[68%] w-[50%] overflow-hidden rounded-md border border-white/10 shadow-2xl shadow-black/50">
        <Image
          src={withBasePath("/projects/forma/arc-charger.jpg")}
          alt="FORMA storefront product photography — arc charger"
          fill
          sizes="(max-width: 1024px) 45vw, 320px"
          className="object-cover"
        />
      </div>
      <div className="absolute right-[9%] top-[20%] h-[40%] w-[32%] overflow-hidden rounded-md border border-white/10 shadow-xl shadow-black/50">
        <Image
          src={withBasePath("/projects/forma/orbit-speaker.jpg")}
          alt="FORMA storefront product photography — orbit speaker"
          fill
          sizes="(max-width: 1024px) 25vw, 200px"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-[11%] right-[14%] h-[31%] w-[27%] overflow-hidden rounded-md border border-white/10 shadow-xl shadow-black/50">
        <Image
          src={withBasePath("/projects/forma/column-lamp.jpg")}
          alt="FORMA storefront product photography — column lamp"
          fill
          sizes="(max-width: 1024px) 22vw, 170px"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-[9%] left-[8%] z-10 rounded border border-accent/25 bg-ink/85 px-3 py-2 font-mono text-[0.57rem] tracking-wider text-accent backdrop-blur">
        GET /api/products → 200 OK
      </div>
    </Frame>
  );
}

function PpeVisual() {
  return (
    <Frame caption="Detection pipeline">
      <svg viewBox="0 0 600 450" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ppe-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 330 L600 330 L600 450 L0 450Z" fill="url(#ppe-floor)" />
        {[350, 375, 405, 440].map((y) => (
          <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#5eead4" strokeOpacity="0.09" />
        ))}
        {[60, 170, 280, 390, 500].map((x) => (
          <line key={x} x1={x} y1="330" x2={x * 1.35 - 100} y2="450" stroke="#5eead4" strokeOpacity="0.08" />
        ))}
        <g fill="none" stroke="#8aa39c" strokeOpacity="0.5" strokeWidth="2">
          <circle cx="300" cy="158" r="38" />
          <path d="M262 206 Q300 186 338 206 L356 320 Q300 338 244 320Z" />
          <path d="M262 224 L222 288 M338 224 L378 288" />
        </g>
        <g fill="none" stroke="#c6f26d" strokeWidth="1.6">
          <rect x="263" y="116" width="74" height="76" rx="3" />
          <rect x="242" y="204" width="116" height="122" rx="3" />
        </g>
        <g fontFamily="monospace" fontSize="12" letterSpacing="1.5">
          <rect x="263" y="98" width="70" height="20" fill="#c6f26d" />
          <text x="269" y="112" fill="#0b1014">HELMET</text>
          <rect x="242" y="330" width="58" height="20" fill="#c6f26d" />
          <text x="248" y="344" fill="#0b1014">VEST</text>
        </g>
        <g stroke="#5eead4" strokeOpacity="0.5" fill="none">
          <path d="M60 70 h40 M60 70 v40 M540 70 h-40 M540 70 v40 M60 380 h40 M60 380 v-40 M540 380 h-40 M540 380 v-40" />
        </g>
        <text x="48" y="424" fill="#788783" fontFamily="monospace" fontSize="11" letterSpacing="2">
          CAM_02 / ZONE B
        </text>
      </svg>
      <div className="scan-line pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-acid/70 to-transparent" />
    </Frame>
  );
}

function DrowsinessVisual() {
  return (
    <Frame caption="Signal extraction">
      <svg viewBox="0 0 600 450" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="drow-glow">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="225" r="190" fill="url(#drow-glow)" />
        <g fill="none" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.6">
          <path d="M300 68 C385 68 420 140 420 218 C420 310 365 380 300 380 C235 380 180 310 180 218 C180 140 215 68 300 68Z" />
          <path d="M220 205 Q252 184 284 205 M316 205 Q348 184 380 205" />
          <path d="M265 300 Q300 320 335 300" />
        </g>
        <g fill="#a78bfa">
          {[
            [220, 205], [236, 195], [252, 195], [268, 200], [284, 205],
            [316, 205], [332, 200], [348, 195], [364, 195], [380, 205],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 0 || i === 9 ? 3.2 : 2.2} />
          ))}
        </g>
        <g stroke="#5eead4" strokeOpacity="0.45" strokeDasharray="4 5" fill="none">
          <line x1="220" y1="205" x2="284" y2="205" />
          <line x1="316" y1="205" x2="380" y2="205" />
        </g>
        <text x="300" y="52" textAnchor="middle" fill="#5eead4" fontFamily="monospace" fontSize="13" letterSpacing="2">
          EAR / MAR ANALYSIS
        </text>
        <text x="300" y="420" textAnchor="middle" fill="#899793" fontFamily="monospace" fontSize="11" letterSpacing="1">
          geometric signal + learned classifier
        </text>
      </svg>
    </Frame>
  );
}

function PhishingVisual() {
  return (
    <Frame caption="Inference service">
      <div className="absolute inset-x-[12%] top-[14%] rounded-lg border border-white/10 bg-[#111820] p-6 shadow-2xl shadow-black/40">
        <div className="mb-5 flex items-center gap-2 font-mono text-[0.6rem] tracking-wider text-muted-2">
          <span className="h-2 w-2 rounded-full bg-acid/70" />
          /predict · line 04
        </div>
        {[
          { text: "Hello, please review the attached document.", hot: false },
          { text: "Verify your account within 24 hours.", hot: true },
          { text: "http://secure-login.example", hot: true },
          { text: "Best regards, the team", hot: false },
        ].map((line, i) => (
          <div
            key={i}
            className={`mb-3 border-l-2 pl-3 font-mono text-[0.68rem] leading-5 ${
              line.hot
                ? "border-acid/60 bg-acid/[0.06] text-acid"
                : "border-white/10 text-muted"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>
      <div className="absolute bottom-[12%] left-[12%] flex items-center gap-3 rounded-md border border-line bg-ink/80 px-4 py-2.5 font-mono text-[0.6rem] tracking-wider text-muted">
        <span className="text-accent">weighted aggregation</span>
        <span className="text-muted-2">→</span>
        <span className="text-fg">email verdict</span>
      </div>
    </Frame>
  );
}

function ChurnVisual() {
  const rows = [
    { label: "Contract", width: "82%" },
    { label: "Tenure", width: "61%" },
    { label: "MonthlyCharges", width: "47%" },
    { label: "PaymentMethod", width: "34%" },
    { label: "OnlineSecurity", width: "24%" },
  ];
  return (
    <Frame caption="Explanation study">
      <div className="absolute inset-x-[11%] top-[16%]">
        <div className="mono-label mb-7">feature signals / illustrative</div>
        {rows.map((row, i) => (
          <div key={row.label} className="mb-5">
            <div className="mb-2 flex items-center justify-between font-mono text-[0.63rem] tracking-wide text-muted">
              <span>{row.label}</span>
              <span className="text-muted-2">0{i + 1}</span>
            </div>
            <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-acid/80 to-accent/30"
                style={{ width: row.width }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[12%] left-[11%] rounded border border-acid/20 bg-acid/[0.05] px-3 py-2 font-mono text-[0.57rem] tracking-wider text-acid">
        explain(model) → feature contribution
      </div>
    </Frame>
  );
}

export function ProjectVisual({ visual }: { visual: VisualKind }) {
  switch (visual) {
    case "forma":
      return <FormaVisual />;
    case "ppe":
      return <PpeVisual />;
    case "drowsiness":
      return <DrowsinessVisual />;
    case "phishing":
      return <PhishingVisual />;
    case "churn":
      return <ChurnVisual />;
  }
}
