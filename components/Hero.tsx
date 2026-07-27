"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import { Play } from "lucide-react";

interface Node {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
}

const nodes: Node[] = [
  { id: "sources", label: "Sources", detail: "Exam & marking data from multiple university systems.", x: 8, y: 78 },
  { id: "lake", label: "S3 Lake", detail: "Raw and curated zones on AWS S3, catalogued with Iceberg.", x: 29, y: 32 },
  { id: "airflow", label: "Airflow", detail: "20+ DAGs orchestrating ingestion into Hive & Impala.", x: 52, y: 74 },
  { id: "spark", label: "PySpark", detail: "PySpark + Hive SQL transforming 75k+ records per run.", x: 75, y: 28 },
  { id: "reports", label: "Reports", detail: "Self-serve dashboards — report time cut by ~85%.", x: 92, y: 74 },
];

const stats = [
  { value: "100k+", label: "messages / min" },
  { value: "75k+", label: "records per run" },
  { value: "−85%", label: "report turnaround" },
];

const TARGET_RECORDS = 75342;
const PARTICLE_COLORS = ["var(--accent)", "var(--ink)", "var(--muted)"];

interface Particle {
  id: number;
  tx: number;
  ty: number;
  color: string;
  size: number;
}

export default function Hero() {
  const [active, setActive] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runIndex, setRunIndex] = useState(-1);
  const [counter, setCounter] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const activeNode = nodes.find((n) => n.id === active);

  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => runPipeline(), 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runPipeline = () => {
    if (running) return;
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setShowSuccess(false);
    setRunning(true);
    setRunIndex(-1);
    setCounter(0);

    nodes.forEach((_, i) => {
      const t = setTimeout(() => setRunIndex(i), i * 260);
      timeouts.current.push(t);
    });

    const countStart = nodes.length * 260;
    const countDuration = 900;
    const steps = 24;
    for (let s = 1; s <= steps; s++) {
      const t = setTimeout(() => setCounter(Math.round((TARGET_RECORDS * s) / steps)), countStart + (s * countDuration) / steps);
      timeouts.current.push(t);
    }

    const finishT = setTimeout(() => {
      setCounter(TARGET_RECORDS);
      setShowSuccess(true);
      setRunning(false);
      const burst: Particle[] = Array.from({ length: 16 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
        const distance = 40 + Math.random() * 50;
        return { id: Date.now() + i, tx: Math.cos(angle) * distance, ty: Math.sin(angle) * distance, color: PARTICLE_COLORS[i % PARTICLE_COLORS.length], size: 4 + Math.random() * 3 };
      });
      setParticles(burst);
      timeouts.current.push(setTimeout(() => setParticles([]), 950));
      timeouts.current.push(setTimeout(() => setShowSuccess(false), 4200));
    }, countStart + countDuration + 80);
    timeouts.current.push(finishT);
  };

  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-content px-6 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
        <p className="hero-reveal hero-reveal-1 font-display text-[15px] italic text-muted">Data engineer — Kerala, India</p>
        <h1 className="hero-reveal hero-reveal-2 mt-5 max-w-2xl font-display text-[2.75rem] font-medium leading-[1.12] tracking-tight text-ink md:text-6xl">
          I turn scattered data into pipelines people can rely on.
        </h1>
        <p className="hero-reveal hero-reveal-3 mt-6 max-w-md text-[15px] leading-relaxed text-muted">
          Airflow, Spark, Kafka and AWS — building the systems that move data from
          messy and multi-sourced to trusted and queryable.
        </p>

        <div className="hero-reveal hero-reveal-4 mt-8 flex flex-wrap items-center gap-6">
          <a href="#pipeline" className="focus-ring rounded-full px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5 active:scale-95" style={{ backgroundColor: "var(--accent)" }}>View experience</a>
          <a href="#contact" className="focus-ring text-[14px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">Get in touch</a>
        </div>

        <div className="hero-reveal hero-reveal-5 relative mt-20 h-[280px] w-full select-none md:h-[320px]">
          <button onClick={runPipeline} disabled={running} className="focus-ring absolute right-0 top-0 z-30 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] text-muted transition-all hover:-translate-y-0.5 hover:text-ink disabled:opacity-60">
            <Play size={11} strokeWidth={2} className={running ? "animate-pulse" : ""} />
            {running ? "Running…" : "Run pipeline"}
          </button>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 320" preserveAspectRatio="none" aria-hidden="true">
            <path id="flowPath" d="M60,250 C160,190 220,140 290,110 C370,75 430,220 520,240 C610,260 650,110 750,80 C830,55 870,170 930,230" fill="none" stroke="var(--line)" strokeWidth="1.5" />
            {[0, -2.6, -5.2].map((delay, i) => (
              <circle key={i} r={running ? "4.5" : "3.5"} fill="var(--accent)" opacity={running ? 1 : 0.55} className="pipeline-packet">
                <animateMotion dur={running ? "2.4s" : "8s"} repeatCount="indefinite" begin={`${delay}s`}><mpath href="#flowPath" /></animateMotion>
              </circle>
            ))}
          </svg>

          {nodes.map((n, i) => {
            const isLit = running && runIndex >= i;
            return (
              <button key={n.id} onMouseEnter={() => setActive(n.id)} onMouseLeave={() => setActive((cur) => (cur === n.id ? null : cur))} onFocus={() => setActive(n.id)} onBlur={() => setActive((cur) => (cur === n.id ? null : cur))} style={{ left: `${n.x}%`, top: `${n.y}%` }} className="focus-ring absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 bg-transparent">
                <span className={`pipeline-node h-1.5 w-1.5 rounded-full transition-all duration-300 ${isLit ? "pipeline-node-active" : ""}`} style={{ backgroundColor: active === n.id || isLit ? "var(--accent)" : "var(--muted)", transform: active === n.id || isLit ? "scale(1.8)" : "scale(1)" }} />
                <span className={`font-mono text-[11px] tracking-wide transition-colors duration-300 ${isLit ? "text-ink" : "text-muted"}`}>{n.label}</span>
                {n.id === "reports" && particles.map((p) => <span key={p.id} className="confetti-particle pointer-events-none" style={{ left: 0, top: -6, width: p.size, height: p.size, backgroundColor: p.color, "--tx": `${p.tx}px`, "--ty": `${p.ty}px` } as CSSProperties} />)}
              </button>
            );
          })}

          {activeNode && !running && <div style={{ left: `${Math.min(Math.max(activeNode.x, 16), 84)}%`, top: `${activeNode.y > 50 ? activeNode.y - 22 : activeNode.y + 14}%` }} className="node-tooltip pointer-events-none absolute z-20 w-56 -translate-x-1/2 text-center text-[12px] leading-snug text-muted">{activeNode.detail}</div>}

          {(running || showSuccess) && <div className="pipeline-status absolute bottom-0 left-1/2 z-20 -translate-x-1/2 text-center font-mono text-[12px]">
            {running && <p className="text-muted">{counter.toLocaleString()} <span className="text-muted">records processed</span><span className="terminal-caret ml-1">▌</span></p>}
            {showSuccess && <p style={{ color: "var(--accent)" }}>✓ pipeline succeeded — {TARGET_RECORDS.toLocaleString()} records in 0.9s</p>}
          </div>}
        </div>

        <div className="hero-reveal hero-reveal-6 mt-4 grid grid-cols-3 divide-x divide-line border-t border-line pt-6">
          {stats.map((s, i) => <div key={s.label} className="stat-reveal px-4 first:pl-0" style={{ animationDelay: `${1.25 + i * 0.12}s` }}><p className="font-display text-xl font-medium text-ink">{s.value}</p><p className="mt-1 text-[12px] text-muted">{s.label}</p></div>)}
        </div>
      </div>
    </section>
  );
}
