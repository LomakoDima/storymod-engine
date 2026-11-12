import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteHeader";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Download — StoryModEngine" },
      { name: "description", content: "Download StoryModEngine for Minecraft Java Edition 1.20.1." },
      { property: "og:title", content: "Download — StoryModEngine" },
      { property: "og:description", content: "Download StoryModEngine for Minecraft Java Edition 1.20.1." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageHero eyebrow="Download" title="Get StoryModEngine.">Builds are published on GitHub Releases for Minecraft Java Edition 1.20.1. Installation steps coming soon.</PageHero>
  );
}
