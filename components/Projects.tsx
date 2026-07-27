export default function Projects() {
  return (
    <section id="projects" className="border-t border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:px-8">
        <p className="font-display text-[15px] italic text-muted">Projects</p>
        <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-ink">
          University project
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3">
            <h3 className="font-display text-lg font-medium text-ink">
              Recycle Sorter — camera-based waste sorter
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              A computer-vision system that identifies waste material through a camera feed and
              sorts it into recyclable or non-recyclable streams. Designed and built the user
              interface used to operate and monitor the sorter, alongside the classification
              pipeline.
            </p>
            <p className="mt-4 text-[13px] text-muted">
              Computer vision · UI design · Classification
            </p>
          </div>

          <div className="md:col-span-2 md:border-l md:border-line md:pl-10">
            <p className="font-display text-[13px] italic text-muted">Education</p>
            <p className="mt-2 text-[14px] text-ink">B.Tech, Computer Science</p>
            <p className="mt-1 text-[13px] text-muted">
              APJ Abdul Kalam Technological University
            </p>
            <p className="mt-1 text-[13px] text-muted">2017 — 2021</p>
          </div>
        </div>
      </div>
    </section>
  );
}
