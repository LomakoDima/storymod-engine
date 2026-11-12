import GithubSlugger from "github-slugger";

export const SECTIONS = [
  { key: "getting-started", title: "Getting Started" },
  { key: "editors", title: "Editors" },
  { key: "sme-scripting", title: "SME Scripting" },
  { key: "guides", title: "Guides" },
  { key: "api-reference", title: "API Reference" },
  { key: "troubleshooting", title: "Troubleshooting" },
] as const;

export const VERSION_LABELS: Record<string, string> = { latest: "Latest" };

export type Heading = { depth: number; text: string; id: string };
export type Doc = {
  id: string; // version/section/slug
  version: string;
  section: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  status?: string;
  body: string;
  headings: Heading[];
  plain: string;
};

const files = import.meta.glob("/src/content/docs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parse(path: string, raw: string): Doc {
  const [version, section, file] = path.replace("/src/content/docs/", "").split("/");
  const slug = file.replace(/\.md$/, "");
  const meta: Record<string, string> = {};
  let body = raw;
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fm) {
    body = raw.slice(fm[0].length);
    for (const line of fm[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
    }
  }
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inCode = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!m) continue;
    const text = m[2].replace(/[`*_]/g, "");
    const id = slugger.slug(text);
    if (m[1].length === 2 || m[1].length === 3) headings.push({ depth: m[1].length, text, id });
  }
  const plain = body.replace(/```[\s\S]*?```/g, " ").replace(/[#>*`|\-[\]!]/g, " ").replace(/\s+/g, " ");
  return {
    id: `${version}/${section}/${slug}`,
    version, section, slug,
    title: meta.title ?? slug,
    description: meta.description ?? "",
    order: Number(meta.order ?? 99),
    status: meta.status,
    body, headings, plain,
  };
}

export const DOCS: Doc[] = Object.entries(files).map(([p, r]) => parse(p, r));
export const VERSIONS = [...new Set(DOCS.map((d) => d.version))];

export function getNav(version: string) {
  return SECTIONS.map((s) => ({
    ...s,
    docs: DOCS.filter((d) => d.version === version && d.section === s.key).sort((a, b) => a.order - b.order),
  })).filter((s) => s.docs.length);
}

export function getFlat(version: string) {
  return getNav(version).flatMap((s) => s.docs);
}

export function getDoc(id: string) {
  return DOCS.find((d) => d.id === id.replace(/\/$/, ""));
}

export function sectionTitle(key: string) {
  return SECTIONS.find((s) => s.key === key)?.title ?? key;
}

export const DEFAULT_DOC = "latest/getting-started/introduction";

export function searchDocs(version: string, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return DOCS.filter((d) => d.version === version)
    .map((d) => {
      const t = d.title.toLowerCase().includes(query) ? 3 : 0;
      const h = d.headings.find((x) => x.text.toLowerCase().includes(query));
      const idx = d.plain.toLowerCase().indexOf(query);
      const score = t + (h ? 2 : 0) + (idx >= 0 ? 1 : 0);
      const snippet = idx >= 0 ? d.plain.slice(Math.max(0, idx - 40), idx + 80).trim() : d.description;
      return { doc: d, heading: h, score, snippet };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
