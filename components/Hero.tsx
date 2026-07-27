"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

const nodes = [
  { id:"sources", label:"Sources", detail:"Exam & marking data from multiple university systems.", x:8, y:78 },
  { id:"lake", label:"S3 Lake", detail:"Raw and curated zones on AWS S3, catalogued with Iceberg.", x:29, y:32 },
  { id:"airflow", label:"Airflow", detail:"20+ DAGs orchestrating ingestion into Hive & Impala.", x:52, y:74 },
  { id:"spark", label:"PySpark", detail:"PySpark + Hive SQL transforming 75k+ records per run.", x:75, y:28 },
  { id:"reports", label:"Reports", detail:"Self-serve dashboards — report time cut by ~85%.", x:92, y:74 },
];
const TARGET_RECORDS=75342;
const colors=["var(--accent)","var(--ink)","var(--muted)"];
interface Burst { id:number; tx:number; ty:number; color:string; size:number }

function Metric({target,suffix="",prefix=""}:{target:number;suffix?:string;prefix?:string}){
  const [value,setValue]=useState(0);
  useEffect(()=>{let n=0;const t=setInterval(()=>{n++;setValue(n<15?Math.max(0,Math.round(target*(n/15)+(Math.random()-.5)*target*.13)):target);if(n>=15)clearInterval(t)},55);return()=>clearInterval(t)},[target]);
  return <>{prefix}{value.toLocaleString()}{suffix}</>;
}

export default function Hero(){
  const[active,setActive]=useState<string|null>(null);const[running,setRunning]=useState(false);const[stage,setStage]=useState(-1);const[dagStep,setDagStep]=useState(-1);const[counter,setCounter]=useState(0);const[success,setSuccess]=useState(false);const[burst,setBurst]=useState<Burst[]>([]);const[muted,setMuted]=useState(false);
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);const audio=useRef<AudioContext|null>(null);const activeNode=nodes.find(n=>n.id===active);
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  const tone=(f:number,d=.07,delay=0,type:OscillatorType="sine",gain=.025)=>{if(muted||typeof window==="undefined")return;const Ctx=window.AudioContext||(window as typeof window&{webkitAudioContext?:typeof AudioContext}).webkitAudioContext;if(!Ctx)return;if(!audio.current)audio.current=new Ctx();const c=audio.current,o=c.createOscillator(),g=c.createGain(),s=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(f,s);g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(gain,s+.008);g.gain.exponentialRampToValueAtTime(.0001,s+d);o.connect(g);g.connect(c.destination);o.start(s);o.stop(s+d+.02)};
  const run=()=>{if(running)return;timers.current.forEach(clearTimeout);timers.current=[];setRunning(true);setSuccess(false);setStage(0);setDagStep(-1);setCounter(0);tone(180,.12);tone(270,.1,.08);
    [0,1,2,3,4].forEach((s)=>timers.current.push(setTimeout(()=>{setStage(s);tone([300,390,500,620,780][s],.06,0,s===2?"square":"sine",.018)},s*850)));
    [0,1,2,3].forEach((s)=>timers.current.push(setTimeout(()=>{setDagStep(s);tone(520+s*70,.045,0,"square",.012)},1700+s*180)));
    for(let i=1;i<=30;i++)timers.current.push(setTimeout(()=>setCounter(Math.round(TARGET_RECORDS*i/30)),3400+i*30));
    timers.current.push(setTimeout(()=>{setCounter(TARGET_RECORDS);setRunning(false);setSuccess(true);tone(660,.12);tone(880,.18,.09);setBurst(Array.from({length:22},(_,i)=>{const a=Math.PI*2*i/22,d=35+Math.random()*60;return{id:Date.now()+i,tx:Math.cos(a)*d,ty:Math.sin(a)*d,color:colors[i%3],size:3+Math.random()*4}}));timers.current.push(setTimeout(()=>setBurst([]),1000));timers.current.push(setTimeout(()=>setSuccess(false),4200))},4400));
  };
  return <section id="top" className="relative"><div className="mx-auto max-w-content px-6 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
    <p className="hero-reveal hero-reveal-1 font-display text-[15px] italic text-muted">Data engineer — Kerala, India</p><h1 className="hero-reveal hero-reveal-2 mt-5 max-w-2xl font-display text-[2.75rem] font-medium leading-[1.12] tracking-tight text-ink md:text-6xl">I turn scattered data into pipelines people can rely on.</h1><p className="hero-reveal hero-reveal-3 mt-6 max-w-md text-[15px] leading-relaxed text-muted">Airflow, Spark, Kafka and AWS — building the systems that move data from messy and multi-sourced to trusted and queryable.</p>
    <div className="hero-reveal hero-reveal-4 mt-8 flex flex-wrap items-center gap-6"><a href="#pipeline" className="focus-ring rounded-full px-5 py-2.5 text-[14px] font-medium text-bg transition-transform hover:-translate-y-0.5 active:scale-95" style={{backgroundColor:"var(--accent)"}}>View experience</a><a href="#contact" className="focus-ring text-[14px] font-medium text-ink underline decoration-line underline-offset-4">Get in touch</a></div>
    <div className={`physical-pipeline hero-reveal hero-reveal-5 relative mt-20 h-[330px] w-full select-none md:h-[370px] stage-${stage} ${running?"is-running":""}`}>
      <div className="absolute right-0 top-0 z-40 flex gap-2"><button onClick={()=>setMuted(v=>!v)} className="focus-ring rounded-full border border-line p-2 text-muted" aria-label="Toggle pipeline sound">{muted?<VolumeX size={13}/>:<Volume2 size={13}/>}</button><button onClick={run} disabled={running} className="focus-ring flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] text-muted hover:text-ink disabled:opacity-60"><Play size={11}/>{running?"Running…":"Run pipeline"}</button></div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 370" preserveAspectRatio="none" aria-hidden="true"><path d="M60,285 C160,215 220,155 290,120 C370,82 430,250 520,270 C610,288 650,118 750,88 C830,62 870,195 930,258" fill="none" stroke="var(--line)" strokeWidth="1.5"/></svg>
      {running&&Array.from({length:14},(_,i)=><span key={i} className="physical-packet" style={{"--packet-delay":`${i*.075}s`,"--packet-size":`${3+i%4}px`} as CSSProperties}/>) }
      <div className={`s3-buffer ${stage===1?"buffering":""}`}>{Array.from({length:9},(_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</div>
      {stage===2&&<div className="airflow-dag"><div className="dag-title">DAG run</div>{["ingest","validate","transform","load"].map((x,i)=><div key={x} className={`dag-mini ${dagStep===i?"processing":dagStep>i?"done":"waiting"}`}><span>{dagStep>i?"✓":dagStep===i?"◉":"○"}</span>{x}</div>)}</div>}
      {stage===3&&<div className="spark-chamber">{Array.from({length:12},(_,i)=><i key={i} className={`spark-bit bit-${i%6}`}/>) }<span>transform</span></div>}
      {nodes.map((n,i)=>{const lit=stage>=i;return <button key={n.id} onMouseEnter={()=>setActive(n.id)} onMouseLeave={()=>setActive(null)} style={{left:`${n.x}%`,top:`${n.y}%`}} className="focus-ring absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 bg-transparent"><span className={`pipeline-node h-1.5 w-1.5 rounded-full ${lit?"pipeline-node-active":""}`} style={{backgroundColor:lit?"var(--accent)":"var(--muted)",transform:lit?"scale(1.8)":"scale(1)"}}/><span className={`font-mono text-[11px] ${lit?"text-ink":"text-muted"}`}>{n.label}</span>{n.id==="reports"&&burst.map(p=><span key={p.id} className="confetti-particle" style={{left:0,top:-6,width:p.size,height:p.size,backgroundColor:p.color,"--tx":`${p.tx}px`,"--ty":`${p.ty}px`} as CSSProperties}/>)}</button>})}
      {activeNode&&!running&&<div style={{left:`${Math.min(Math.max(activeNode.x,16),84)}%`,top:`${activeNode.y>50?activeNode.y-20:activeNode.y+13}%`}} className="node-tooltip pointer-events-none absolute z-30 w-56 -translate-x-1/2 text-center text-[12px] text-muted">{activeNode.detail}</div>}
      {(running||success)&&<div className="pipeline-status absolute bottom-0 left-1/2 z-30 -translate-x-1/2 font-mono text-[12px]">{running?<span className="text-muted">{counter.toLocaleString()} records processed <b className="terminal-caret">▌</b></span>:<span style={{color:"var(--accent)"}}>✓ pipeline succeeded — {TARGET_RECORDS.toLocaleString()} records in 0.9s</span>}</div>}
    </div>
    <div className="hero-reveal hero-reveal-6 mt-4 grid grid-cols-3 divide-x divide-line border-t border-line pt-6"><div className="px-4 first:pl-0"><p className="font-display text-xl font-medium text-ink"><Metric target={100} suffix="k+"/></p><p className="mt-1 text-[12px] text-muted">messages / min</p></div><div className="px-4"><p className="font-display text-xl font-medium text-ink"><Metric target={75} suffix="k+"/></p><p className="mt-1 text-[12px] text-muted">records per run</p></div><div className="px-4"><p className="font-display text-xl font-medium text-ink"><Metric target={85} prefix="−" suffix="%"/></p><p className="mt-1 text-[12px] text-muted">report turnaround</p></div></div>
  </div></section>
}
