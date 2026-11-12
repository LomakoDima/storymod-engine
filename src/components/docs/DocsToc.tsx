import { useEffect, useState } from "react";
import type { Heading } from "@/lib/docs";

export function DocsToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>();
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [headings]);
  if (!headings.length) return null;
  return (
    <div className="text-sm">
      <p className="mb-3 font-medium">On this page</p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-3" : ""}>
            <a href={`#${h.id}`} className={`block transition-colors ${active === h.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
