import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { getNav } from "@/lib/docs";

export function DocsSidebar({ version, current, onNavigate }: { version: string; current?: string | undefined; onNavigate?: (() => void) | undefined }) {
  const nav = getNav(version);
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  return (
    <nav aria-label="Documentation" className="space-y-5 text-sm">
      {nav.map((s) => {
        const isClosed = closed[s.key];
        return (
          <div key={s.key}>
            <button
              type="button"
              onClick={() => setClosed({ ...closed, [s.key]: !isClosed })}
              className="flex w-full items-center justify-between py-1 font-medium text-foreground"
              aria-expanded={!isClosed}
            >
              {s.title}
              <ChevronRight size={14} className={`text-muted-foreground transition-transform ${isClosed ? "" : "rotate-90"}`} />
            </button>
            {!isClosed && (
              <ul className="mt-1.5 space-y-0.5 border-l">
                {s.docs.map((d) => {
                  const active = d.id === current;
                  return (
                    <li key={d.id}>
                      <Link
                        to="/docs/$"
                        params={{ _splat: d.id }}
                        onClick={onNavigate}
                        className={`-ml-px flex items-center justify-between gap-2 border-l py-1.5 pl-3 pr-1 transition-colors ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`}
                      >
                        <span>{d.title}</span>
                        {d.status === "pending" && <span className="size-1.5 shrink-0 rounded-full bg-muted-foreground/40" title="Pending documentation" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
