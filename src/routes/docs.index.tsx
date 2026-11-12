import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_DOC } from "@/lib/docs";

export const Route = createFileRoute("/docs/")({
  beforeLoad: () => {
    throw redirect({ to: "/docs/$", params: { _splat: DEFAULT_DOC } });
  },
});
