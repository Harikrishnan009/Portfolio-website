"use client";

import { useEffect, useRef, useState } from "react";

export default function Projects() {
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLive(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="projects" className="border-t border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:px-8">
        <p className="font-display text-[15px] italic text-muted">Projects</p>
        <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-ink">University project</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3">
            <h3 className="font-display text-lg font-medium text-ink">Recycle Sorter — camera-based waste sorter</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">A computer-vision system that identifies waste material through a camera feed and sorts it into recyclable or non-recyclable streams. Designed and built the user interface used to operate and monitor the sorter, alongside the classification pipeline.</p>
            <p className="mt-4 text-[13px] text-muted">Computer vision · UI design · Classification</p>

            <div className={`classifier mt-9 ${live ? "classifier-live" : ""}`} aria-hidden="true">
              <div className="classifier-input"><span>record</span><i/><i/><i/><i/><i/></div>
              <div className="classifier-line" />
              <div className="classifier-core"><span>classifier</span><b>CV</b></div>
              <div className="classifier-branches"><div className="branch branch-up"/><div className="branch branch-down"/></div>
              <div className="classifier-output output-up"><i/><i/><i/><span>recyclable</span></div>
              <div className="classifier-output output-down"><i/><i/><span>non-recyclable</span></div>
            </div>
          </div>
          <div className="md:col-span-2 md:border-l md:border-line md:pl-10">
            <p className="font-display text-[13px] italic text-muted">Education</p>
            <p className="mt-2 text-[14px] text-ink">B.Tech, Computer Science</p>
            <p className="mt-1 text-[13px] text-muted">APJ Abdul Kalam Technological University</p>
            <p className="mt-1 text-[13px] text-muted">2017 — 2021</p>
          </div>
        </div>
      </div>
    </section>
  );
}
