import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { useState, type ReactNode } from "react";
import { Check, Copy, Link2, Info, Lightbulb, TriangleAlert, Clock } from "lucide-react";

type HNode = { type: string; value?: string; tagName?: string; properties?: Record<string, unknown>; children?: HNode[] };

const toText = (n: HNode): string => (n.type === "text" ? n.value ?? "" : (n.children ?? []).map(toText).join(""));

function rehypeCallouts() {
  return (tree: HNode) => {
    const walk = (n: HNode) => {
      if (n.type === "element" && n.tagName === "blockquote") {
        const p = n.children?.find((c) => c.type === "element" && c.tagName === "p");
        const t = p?.children?.[0];
        const m = t?.type === "text" ? t.value?.match(/^\[!(NOTE|TIP|WARNING|PENDING)\]\s*/i) : null;
        if (t && m) {
          n.properties = { ...n.properties, dataCallout: m[1].toLowerCase() };
          t.value = t.value!.slice(m[0].length);
        }
      }
      n.children?.forEach(walk);
    };
    walk(tree);
  };
}

const CALLOUTS = {
  note: { label: "Note", Icon: Info },
  tip: { label: "Tip", Icon: Lightbulb },
  warning: { label: "Warning", Icon: TriangleAlert },
  pending: { label: "Pending documentation", Icon: Clock },
} as const;

function CodeBlock({ text, lang, children }: { text: string; lang?: string | undefined; children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="docs-code group">
      <div className="docs-code-bar">
        <span>{lang ?? "text"}</span>
        <button
          type="button"
          aria-label="Copy code"
          onClick={() => {
            navigator.clipboard.writeText(text.replace(/\n$/, ""));
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>{children}</pre>
    </div>
  );
}

function Anchor({ id, children, level }: { id?: string | undefined; children: ReactNode; level: 2 | 3 }) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id} className="docs-heading">
      {children}
      <a href={`#${id}`} aria-label="Link to this section" className="docs-anchor"><Link2 size={14} /></a>
    </Tag>
  );
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="docs-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeCallouts, [rehypeHighlight, { detect: false }]]}
        components={{
          h2: ({ id, children }) => <Anchor id={id} level={2}>{children}</Anchor>,
          h3: ({ id, children }) => <Anchor id={id} level={3}>{children}</Anchor>,
          pre: ({ node, children }) => {
            const code = (node as unknown as HNode).children?.[0];
            const cls = (code?.properties?.className as string[] | undefined)?.find((c) => c.startsWith("language-"));
            return <CodeBlock text={toText(node as unknown as HNode)} lang={cls?.replace("language-", "")}>{children}</CodeBlock>;
          },
          table: ({ children }) => <div className="docs-table"><table>{children}</table></div>,
          blockquote: ({ node, children }) => {
            const type = (node as unknown as HNode).properties?.["dataCallout"] as keyof typeof CALLOUTS | undefined;
            if (!type) return <blockquote>{children}</blockquote>;
            const { label, Icon } = CALLOUTS[type];
            return (
              <aside className="docs-callout" data-type={type}>
                <p className="docs-callout-title"><Icon size={15} /> {label}</p>
                {children}
              </aside>
            );
          },
          a: ({ href, children }) => <a href={href} {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
