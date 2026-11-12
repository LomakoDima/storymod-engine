import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/SiteHeader";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — StoryModEngine" },
      { name: "description", content: "Release history and updates for StoryModEngine." },
      { property: "og:title", content: "Changelog — StoryModEngine" },
      { property: "og:description", content: "Release history and updates for StoryModEngine." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageHero eyebrow="Changelog" title="What's new.">Release notes will appear here as versions ship.</PageHero>
  );
}
