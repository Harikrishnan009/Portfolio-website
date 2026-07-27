import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#pipeline", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#certs", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-6 md:px-8">
        <a href="#top" className="focus-ring font-display text-base font-medium text-ink">
          Harikrishnan
        </a>
        <ul className="hidden items-center gap-8 text-[13px] text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="focus-ring transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
