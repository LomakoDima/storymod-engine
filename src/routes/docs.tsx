import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { TOOLS } from "@/lib/site";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — StoryModEngine" },
      { name: "description", content: "Guides and reference for StoryModEngine tools and SME Scripting." },
      { property: "og:title", content: "Documentation — StoryModEngine" },
      { property: "og:description", content: "Guides and reference for StoryModEngine tools and SME Scripting." },
    ],
  }),
  component: Docs,
});

const SECTIONS = [
  { title: "Getting started", items: ["Introduction", "Installation"] },
  { title: "Tools", items: TOOLS.map((t) => t.name) },
];

function Docs() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-32 md:grid-cols-[240px_1fr]">
      <aside className="md:sticky md:top-28 md:self-start space-y-6">
        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
          <Search size={14} className="text-muted-foreground" />
          <input placeholder="Search docs" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
        </div>
        <select className="w-full rounded-lg border bg-surface px-3 py-2 text-sm" aria-label="Version"><option>Latest</option></select>
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <p className="eyebrow mb-2">{s.title}</p>
            <ul className="space-y-1 border-l text-sm">
              {s.items.map((i, idx) => (
                <li key={i}><span className={`-ml-px block border-l px-3 py-1 ${idx === 0 && s.title === "Getting started" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>{i}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <article className="max-w-2xl">
        <p className="eyebrow">Getting started</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Introduction</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">StoryModEngine is an in-game content creation engine for Minecraft Java Edition 1.20.1. The documentation is being written and will grow with each release.</p>
      </article>
    </div>
  );
}
