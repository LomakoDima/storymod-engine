import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Markdown } from "@/components/docs/Markdown";
import { DocsToc } from "@/components/docs/DocsToc";
import { getDoc, getFlat, sectionTitle, VERSION_LABELS } from "@/lib/docs";

export const Route = createFileRoute("/docs/$")({
  loader: ({ params }) => {
    const doc = getDoc(params._splat ?? "");
    if (!doc) throw notFound();
    return { id: doc.id, title: doc.title, description: doc.description };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — StoryModEngine Docs` : "Unavailable — StoryModEngine Docs";
    const description = loaderData?.description ?? "StoryModEngine documentation.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-20">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">This documentation page does not exist in the selected version.</p>
      <Link to="/docs" className="mt-6 inline-block text-primary">Go to documentation home</Link>
    </div>
  ),
  component: DocPage,
});

function DocPage() {
  const { id } = Route.useLoaderData();
  const doc = getDoc(id)!;
  const flat = getFlat(doc.version);
  const i = flat.findIndex((d) => d.id === doc.id);
  const prev = flat[i - 1];
  const next = flat[i + 1];

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-12">
      <article className="min-w-0 max-w-3xl pb-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/docs" className="hover:text-foreground">Docs</Link>
          <ChevronRight size={13} />
          <span>{VERSION_LABELS[doc.version] ?? doc.version}</span>
          <ChevronRight size={13} />
          <span>{sectionTitle(doc.section)}</span>
          <ChevronRight size={13} />
          <span className="text-foreground">{doc.title}</span>
        </nav>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{doc.title}</h1>
        {doc.description && <p className="mt-3 text-lg text-muted-foreground">{doc.description}</p>}
        <div className="mt-8 border-t pt-2">
          <Markdown source={doc.body} />
        </div>
        <div className="mt-14 grid gap-3 border-t pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to="/docs/$" params={{ _splat: prev.id }} className="group rounded-xl border p-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><ChevronLeft size={13} /> Previous</span>
              <span className="mt-1 block font-medium group-hover:text-primary">{prev.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link to="/docs/$" params={{ _splat: next.id }} className="group rounded-xl border p-4 text-right transition-colors hover:border-primary/50">
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next <ChevronRight size={13} /></span>
              <span className="mt-1 block font-medium group-hover:text-primary">{next.title}</span>
            </Link>
          )}
        </div>
      </article>
      <aside className="hidden xl:block">
        <div className="sticky top-28"><DocsToc headings={doc.headings} /></div>
      </aside>
    </div>
  );
}
