"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

interface Node { id: string; label: string; detail: string; x: number; y: number; }
const nodes: Node[] = [
  { id: "sources", label: "Sources", detail: "Exam & marking data from multiple university systems.", x: 8, y: 78 },
  { id: "lake", label: "S3 Lake", detail: "Raw and curated zones on AWS S3, catalogued with Iceberg.", x: 29, y: 32 },
  { id: "airflow", label: "Airflow", detail: "20+ DAGs orchestrating ingestion into Hive & Impala.", x: 52, y: 74 },
  { id: "spark", label: "PySpark", detail: "PySpark + Hive SQL transforming 75k+ records per run.", x: 75, y: 28 },
  { id: "reports", label: "Reports", detail: "Self-serve dashboards — report time cut by ~85%.", x: 92, y: 74 },
];
const stats = [{ value: "100k+", label: "messages / min" }, { value: "75k+", label: "records per run" }, { value: "−85%", label: "report turnaround" }];
const TARGET_RECORDS = 75342;
const PARTICLE_COLORS = ["var(--accent)", "var(--ink)", "var(--muted)"];
interface Particle { id: number; tx: number; ty: number; color: string; size: number; }

export default function Hero() {
  const [active, setActive] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runIndex, setRunIndex] = useState(-1);
  const [counter, setCounter] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [muted, setMuted] = useState(false);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audio = useRef<AudioContext | null>(null);
  const activeNode = nodes.find((n) => n.id === active);

  useEffect(() => () => timeouts.current.forEach(clearTimeout), []);

  const tone = (frequency: number, duration = 0.07, delay = 0, type: OscillatorType = "sine", gain = 0.025) => {
    if (muted || typeof window === "undefined") return;
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    if (!audio.current) audio.current = new AudioCtx();
    const ctx = audio.current;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    const start = ctx.currentTime + delay;
    osc.type = type; osc.frequency.setValueAtTime(frequency, start);
    amp.gain.setValueAtTime(0.0001, start); amp.gain.exponentialRampToValueAtTime(gain, start + 0.008); amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(amp); amp.connect(ctx.destination); osc.start(start); osc.stop(start + duration + 0.02);
  };

  const runPipeline = () => {
    if (running) return;
    timeouts.current.forEach(clearTimeout); timeouts.current = [];
    setShowSuccess(false); setRunning(true); setRunIndex(-1); setCounter(0);
    tone(180, 0.12, 0, "sine", 0.035); tone(270, 0.1, 0.08, "sine", 0.025);
    nodes.forEach((n, i) => {
      const t = setTimeout(() => {
        setRunIndex(i);
        const pitches = [320, 410, 510, 620, 760];
        tone(pitches[i], 0.055, 0, i === 2 ? "square" : "sine", 0.018);
        if (n.id === "airflow") { tone(560, .04, .07, "square", .012); tone(620, .04, .14, "square", .012); }
      }, i * 360);
      timeouts.current.push(t);
    });
    const countStart = nodes.length * 360;
    const countDuration = 900;
    for (let s = 1; s <= 24; s++) timeouts.current.push(setTimeout(() => setCounter(Math.round((TARGET_RECORDS * s) / 24)), countStart + (s * countDuration) / 24));
    timeouts.current.push(setTimeout(() => {
      setCounter(TARGET_RECORDS); setShowSuccess(true); setRunning(false);
      tone(660, .12, 0, "sine", .025); tone(880, .18, .09, "sine", .025);
      const burst = Array.from({ length: 20 }, (_, i) => { const angle = Math.PI * 2 * i / 20 + Math.random() * .3; const distance = 40 + Math.random() * 55; return { id: Date.now() + i, tx: Math.cos(angle) * distance, ty: Math.sin(angle) * distance, color: PARTICLE_COLORS[i % 3], size: 3 + Math.random() * 4 }; });
      setParticles(burst); timeouts.current.push(setTimeout(() => setParticles([]), 950)); timeouts.current.push(setTimeout(() => setShowSuccess(false), 4200));
    }, countStart + countDuration + 80));
  };

  return <section id="top" className="relative"><div className="mx-auto max-w-content px-6 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
    <p className="hero-reveal hero-reveal-1 font-display text-[15px] italic text-muted">Data engineer — Kerala, India</p>
    <h1 className="hero-reveal hero-reveal-2 mt-5 max-w-2xl font-display text-[2.75rem] font-medium leading-[1.12] tracking-tight text-ink md:text-6xl">I turn scattered data into pipelines people can rely on.</h1>
    <p className="hero-reveal hero-reveal-3 mt-6 max-w-md text-[15px] leading-relaxed text-muted">Airflow, Spark, Kafka and AWS — building the systems that move data from messy and multi-sourced to trusted and queryable.</p>
    <div className="hero-reveal hero-reveal-4 mt-8 flex flex-wrap items-center gap-6"><a href="#pipeline" className="focus-ring rounded-full px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5 active:scale-95" style={{ backgroundColor: "var(--accent)" }}>View experience</a><a href="#contact" className="focus-ring text-[14px] font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink">Get in touch</a></div>
    <div className="hero-reveal hero-reveal-5 relative mt-20 h-[300px] w-full select-none md:h-[340px]">
      <div className="absolute right-0 top-0 z-30 flex items-center gap-2"><button onClick={() => setMuted(v => !v)} aria-label={muted ? "Enable pipeline sound" : "Mute pipeline sound"} className="focus-ring rounded-full border border-line p-2 text-muted transition-colors hover:text-ink">{muted ? <VolumeX size={13}/> : <Volume2 size={13}/>}</button><button onClick={runPipeline} disabled={running} className="focus-ring flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] text-muted transition-all hover:-translate-y-0.5 hover:text-ink disabled:opacity-60"><Play size={11} strokeWidth={2} className={running ? "animate-pulse" : ""}/>{running ? "Running…" : "Run pipeline"}</button></div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true"><path id="flowPath" d="M60,265 C160,200 220,145 290,115 C370,78 430,230 520,250 C610,270 650,112 750,82 C830,55 870,180 930,240" fill="none" stroke="var(--line)" strokeWidth="1.5"/>{[0,-.12,-.24,-.42,-.6].map((delay,i)=><circle key={i} r={running ? 3 + i%3 : 3} fill="var(--accent)" opacity={running ? .95 : .35} className="pipeline-packet"><animateMotion dur={running ? `${2.1+i*.08}s` : "8s"} repeatCount="indefinite" begin={`${delay}s`}><mpath href="#flowPath"/></animateMotion></circle>)}</svg>
      {nodes.map((n,i)=>{const isLit=running&&runIndex>=i; return <button key={n.id} onMouseEnter={()=>setActive(n.id)} onMouseLeave={()=>setActive(cur=>cur===n.id?null:cur)} onFocus={()=>setActive(n.id)} onBlur={()=>setActive(cur=>cur===n.id?null:cur)} style={{left:`${n.x}%`,top:`${n.y}%`}} className="focus-ring absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 bg-transparent"><span className={`pipeline-node h-1.5 w-1.5 rounded-full transition-all duration-300 ${isLit?"pipeline-node-active":""}`} style={{backgroundColor:active===n.id||isLit?"var(--accent)":"var(--muted)",transform:active===n.id||isLit?"scale(1.8)":"scale(1)"}}/><span className={`font-mono text-[11px] tracking-wide transition-colors ${isLit?"text-ink":"text-muted"}`}>{n.label}</span>{n.id==="airflow"&&runIndex===2&&running&&<span className="dag-burst absolute top-7 flex gap-1 font-mono text-[9px] text-muted"><i>ingest ✓</i><i>validate ✓</i><i>transform ◉</i></span>}{n.id==="spark"&&runIndex===3&&running&&<span className="spark-transform absolute top-7 whitespace-nowrap font-mono text-[9px] text-muted">••• → · · · → •••</span>}{n.id==="reports"&&particles.map(p=><span key={p.id} className="confetti-particle pointer-events-none" style={{left:0,top:-6,width:p.size,height:p.size,backgroundColor:p.color,"--tx":`${p.tx}px`,"--ty":`${p.ty}px`} as CSSProperties}/>)}</button>})}
      {activeNode&&!running&&<div style={{left:`${Math.min(Math.max(activeNode.x,16),84)}%`,top:`${activeNode.y>50?activeNode.y-22:activeNode.y+14}%`}} className="node-tooltip pointer-events-none absolute z-20 w-56 -translate-x-1/2 text-center text-[12px] leading-snug text-muted">{activeNode.detail}</div>}
      {(running||showSuccess)&&<div className="pipeline-status absolute bottom-0 left-1/2 z-20 -translate-x-1/2 text-center font-mono text-[12px]">{running&&<p className="text-muted">{counter.toLocaleString()} records processed<span className="terminal-caret ml-1">▌</span></p>}{showSuccess&&<p style={{color:"var(--accent)"}}>✓ pipeline succeeded — {TARGET_RECORDS.toLocaleString()} records in 0.9s</p>}</div>}
    </div>
    <div className="hero-reveal hero-reveal-6 mt-4 grid grid-cols-3 divide-x divide-line border-t border-line pt-6">{stats.map((s,i)=><div key={s.label} className="stat-reveal px-4 first:pl-0" style={{animationDelay:`${1.25+i*.12}s`}}><p className="font-display text-xl font-medium text-ink">{s.value}</p><p className="mt-1 text-[12px] text-muted">{s.label}</p></div>)}</div>
  </div></section>;
}
