export default function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto max-w-content px-6 py-20 md:px-8">
        <div className="grid gap-10 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <p className="font-display text-[15px] italic text-muted">About</p>
            <h2 className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-ink">
              Grounded in pipelines, not just talk about them
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-relaxed text-muted md:col-span-3">
            <p>
              I&apos;m a data engineer currently building education-domain pipelines at{" "}
              <span className="text-ink">Cognizant</span>, and previously worked on real-time
              sports-streaming infrastructure at <span className="text-ink">Infosys</span>. My
              work sits at the boundary between raw, messy source data and the moment someone can
              actually query it — or better, doesn&apos;t have to.
            </p>
            <p>
              Most of my time goes into three things: orchestrating ingestion with Airflow,
              writing PySpark and Hive SQL that scales past &ldquo;it works on my laptop,&rdquo;
              and keeping an eye on the pipeline once it&apos;s live — CloudWatch dashboards,
              retries, and the occasional schema surprise.
            </p>
            <p>
              I studied Computer Science at APJ Abdul Kalam Technological University, and I&apos;m
              fluent in English and Malayalam, with conversational Tamil and Hindi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
