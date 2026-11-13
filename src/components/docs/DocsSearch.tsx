import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search, CornerDownLeft } from "lucide-react";
import { searchDocs, sectionTitle } from "@/lib/docs";

export function DocsSearch({ version }: { version: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const results = searchDocs(version, q);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(true); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 10); else setQ(""); }, [open]);
  useEffect(() => setSel(0), [q]);

  const go = (i: number) => {
    const r = results[i];
    if (!r) return;
    setOpen(false);
    navigate({ to: "/docs/$", params: { _splat: r.doc.id }, ...(r.heading ? { hash: r.heading.id } : {}) });
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="glass flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <Search size={14} />
        <span className="flex-1 text-left">Search docs</span>
        <kbd className="rounded border px-1.5 font-mono text-[10px]">Ctrl K</kbd>
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="glass w-full max-w-xl overflow-hidden rounded-2xl animate-rise" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search documentation">
            <div className="relative flex items-center gap-3 border-b px-4">
              <Search size={16} className="text-muted-foreground" />
              <input
                ref={input}
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                  if (e.key === "Enter") go(sel);
                }}
                placeholder="Search documentation…"
                className="h-14 w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
            <ul className="relative max-h-[50vh] overflow-y-auto p-2">
              {q && !results.length && <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results for “{q}”</li>}
              {!q && <li className="px-3 py-6 text-center text-sm text-muted-foreground">Type to search titles, headings and content.</li>}
              {results.map((r, i) => (
                <li key={r.doc.id}>
                  <button type="button" onMouseEnter={() => setSel(i)} onClick={() => go(i)} className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left ${sel === i ? "bg-foreground/10" : ""}`}>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground">{sectionTitle(r.doc.section)}</p>
                      <p className="text-sm font-medium">{r.doc.title}{r.heading && <span className="text-muted-foreground"> › {r.heading.text}</span>}</p>
                      <p className="truncate text-xs text-muted-foreground">{r.snippet}</p>
                    </div>
                    {sel === i && <CornerDownLeft size={14} className="mt-1 text-muted-foreground" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
