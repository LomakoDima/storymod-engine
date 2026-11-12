import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Box, Users, Sparkles, Code2 } from "lucide-react";
import hero from "@/assets/hero-scene.jpg";
import { SITE, TOOLS } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StoryModEngine — In-game content creation for Minecraft 1.20.1" },
      { name: "description", content: "StoryModEngine is an in-game content creation engine for Minecraft Java Edition 1.20.1 with level, NPC and VFX editors and SME Scripting." },
      { property: "og:title", content: "StoryModEngine" },
      { property: "og:description", content: "Build stories, characters and effects inside Minecraft Java Edition 1.20.1." },
    ],
  }),
  component: Index,
});

const ICONS = { level: Box, npc: Users, vfx: Sparkles, sme: Code2 } as const;

function Index() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 md:pt-48">
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground animate-rise">
            <span className="size-1.5 rounded-full bg-primary" /> For {SITE.mcVersion}
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-semibold tracking-tighter md:text-7xl animate-rise [animation-delay:80ms]">
            Create stories <span className="text-primary">inside</span> the game.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground animate-rise [animation-delay:160ms]">
            StoryModEngine is an in-game content creation engine — level, NPC and VFX editors, connected by SME Scripting.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 animate-rise [animation-delay:240ms]">
            <Link to="/download" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 glow-primary">
              Download <ArrowRight size={16} />
            </Link>
            <Link to="/docs" className="glass inline-flex items-center rounded-xl px-5 py-3 font-medium transition-colors hover:bg-foreground/10">Read the docs</Link>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-6xl px-6 animate-rise [animation-delay:320ms]">
          <div className="glass rounded-2xl p-2">
            <img src={hero} alt="StoryModEngine level editor in game" width={1600} height={912} className="w-full rounded-xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow">The engine</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">One toolkit. No leaving the world.</h2>
          </div>
          <p className="text-lg text-muted-foreground">Every editor runs in-game, so you build, test and iterate on your content where players will experience it.</p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
          {TOOLS.map((t) => {
            const Icon = ICONS[t.key as keyof typeof ICONS];
            return (
              <Link key={t.key} to="/features" className="group bg-background p-8 transition-colors hover:bg-surface">
                <Icon className="text-primary" size={22} />
                <h3 className="mt-6 text-xl font-semibold">{t.name}</h3>
                <p className="mt-2 text-muted-foreground">{t.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-primary">Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border bg-surface p-10 md:p-16">
          <div className="grid-bg absolute inset-0" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Start building.</h2>
              <p className="mt-2 text-muted-foreground">Install StoryModEngine for {SITE.mcVersion}.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/download" className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground glow-primary">Download</Link>
              <Link to="/changelog" className="glass rounded-xl px-5 py-3 font-medium">Changelog</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
