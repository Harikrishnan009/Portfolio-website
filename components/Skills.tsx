"use client";

import { useEffect, useRef, useState } from "react";

interface Cluster {
  name: string;
  items: string[];
}

const clusters: Cluster[] = [
  { name: "Orchestration", items: ["Airflow", "ETL design", "Agile / Scrum", "Jira", "Confluence"] },
  { name: "Processing & storage", items: ["PySpark", "Hive", "Iceberg", "SQL", "PostgreSQL", "Cloudera"] },
  { name: "Cloud & monitoring", items: ["AWS", "S3", "CloudWatch", "Azure", "Azure EventHub"] },
  { name: "Streaming", items: ["Kafka", "Apache Flink", "RabbitMQ", "Ververica"] },
];

const languages = ["English (Fluent)", "Malayalam (Fluent)", "Tamil (Conversational)", "Hindi (Conversational)"];

const rows: { name: string; items: string[] }[] = [
  ...clusters,
  { name: "Languages", items: languages },
];

function DataChip({ label, index, revealed }: { label: string; index: number; revealed: boolean }) {
  const delay = index * 55;
  return (
    <span className="relative inline-flex items-center justify-center px-1">
      <span
        className="absolute h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: "var(--accent)",
          transition: `transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, opacity 220ms ease-out ${delay + 360}ms`,
          opacity: revealed ? 0 : 1,
          transform: revealed ? "translateY(0) scale(0.2)" : "translateY(-40px) scale(1)",
        }}
      />
      <span
        className="text-[14px] text-ink transition-all ease-out"
        style={{
          transitionDuration: "380ms",
          transitionDelay: `${delay + 420}ms`,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0) scale(1)" : "translateY(4px) scale(0.85)",
        }}
      >
        {label}
      </span>
    </span>
  );
}

export default function Skills() {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  let runningIndex = 0;

  return (
    <section id="skills" className="border-t border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:px-8">
        <p className="font-display text-[15px] italic text-muted">Skills</p>
        <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-ink">
          The stack, grouped by what it does
        </h2>

        <div ref={sectionRef} className="mt-12 divide-y divide-line border-t border-line">
          {rows.map((row) => (
            <div
              key={row.name}
              className="grid gap-2 py-6 md:grid-cols-4 md:items-baseline md:gap-6"
            >
              <p className="text-[13px] text-muted md:col-span-1">{row.name}</p>
              <p className="text-[14px] md:col-span-3">
                {row.items.map((item, i) => {
                  const idx = runningIndex++;
                  return (
                    <span key={item}>
                      <DataChip label={item} index={idx} revealed={revealed} />
                      {i < row.items.length - 1 ? <span className="text-muted"> · </span> : null}
                    </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
