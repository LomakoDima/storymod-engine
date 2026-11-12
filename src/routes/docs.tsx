import { createFileRoute, Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { DEFAULT_DOC, getDoc, getFlat, VERSIONS, VERSION_LABELS } from "@/lib/docs";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — StoryModEngine" },
      { name: "description", content: "Technical documentation for StoryModEngine." },
      { property: "og:title", content: "Documentation — StoryModEngine" },
      { property: "og:description", content: "Technical documentation for StoryModEngine." },
    ],
  }),
  component: DocsLayout,
});

function DocsLayout() {
  const { _splat } = useParams({ strict: false }) as { _splat?: string };
  const current = _splat?.replace(/\/$/, "");
  const version = current?.split("/")[0] ?? VERSIONS[0] ?? "latest";
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const switchVersion = (v: string) => {
    const rest = current?.split("/").slice(1).join("/");
    const target = rest && getDoc(`${v}/${rest}`) ? `${v}/${rest}` : getFlat(v)[0]?.id ?? DEFAULT_DOC;
    navigate({ to: "/docs/$", params: { _splat: target } });
  };

  const controls = (
    <div className="space-y-3">
      <DocsSearch version={version} />
      <label className="block">
        <span className="sr-only">Documentation version</span>
        <select value={version} onChange={(e) => switchVersion(e.target.value)} className="w-full rounded-lg border bg-surface px-3 py-2 text-sm">
          {VERSIONS.map((v) => <option key={v} value={v}>{VERSION_LABELS[v] ?? v}</option>)}
        </select>
      </label>
    </div>
  );

  return (
    <div className="mx-auto max-w-[90rem] px-4 pt-24 md:px-6 lg:pt-28">
      <div className="mb-6 flex items-center gap-3 lg:hidden">
        <button type="button" onClick={() => setMobileOpen(true)} className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
          <Menu size={16} /> Menu
        </button>
        <div className="flex-1"><DocsSearch version={version} /></div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-background/70 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="glass h-full w-80 max-w-[85vw] overflow-y-auto rounded-r-2xl p-5 animate-rise" onClick={(e) => e.stopPropagation()}>
            <div className="relative mb-5 flex items-center justify-between">
              <span className="font-medium">Documentation</span>
              <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X size={18} /></button>
            </div>
            <div className="relative space-y-6">
              <select value={version} onChange={(e) => switchVersion(e.target.value)} className="w-full rounded-lg border bg-surface px-3 py-2 text-sm" aria-label="Documentation version">
                {VERSIONS.map((v) => <option key={v} value={v}>{VERSION_LABELS[v] ?? v}</option>)}
              </select>
              <DocsSidebar version={version} current={current} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] space-y-6 overflow-y-auto pb-10 pr-2">
            {controls}
            <DocsSidebar version={version} current={current} />
          </div>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}
