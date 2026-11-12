import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground font-mono text-xs font-bold">S</span>
      <span>StoryModEngine</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-lg px-3 py-1.5 text-sm text-foreground bg-foreground/5" }}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a href={SITE.github} target="_blank" rel="noreferrer" className="px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">GitHub</a>
          <Link to="/download" className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-px glow-primary">Download</Link>
        </div>
        <button className="md:hidden p-1" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 flex max-w-6xl flex-col rounded-2xl p-2 md:hidden animate-rise">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-foreground/5">{n.label}</Link>
          ))}
          <a href={SITE.github} className="rounded-lg px-3 py-2.5 text-sm hover:bg-foreground/5">GitHub</a>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">In-game content creation engine for {SITE.mcVersion}.</p>
        </div>
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Product</span>
            {NAV.map((n) => <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-foreground">{n.label}</Link>)}
          </div>
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Source</span>
            <a href={SITE.github} className="text-muted-foreground hover:text-foreground">GitHub</a>
            <a href={`${SITE.github}`} className="text-muted-foreground hover:text-foreground">Releases</a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground">Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-6 animate-rise">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
