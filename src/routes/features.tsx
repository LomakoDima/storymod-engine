import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteHeader";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — StoryModEngine" },
      { name: "description", content: "Level Editor, NPC Editor, VFX Editor, SME Scripting and more tools in StoryModEngine." },
      { property: "og:title", content: "Features — StoryModEngine" },
      { property: "og:description", content: "Level Editor, NPC Editor, VFX Editor, SME Scripting and more tools in StoryModEngine." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageHero eyebrow="Features" title="Every tool you need, in-game.">Detailed tool pages are coming soon.</PageHero>
  );
}
