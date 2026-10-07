import { createFileRoute, redirect } from "@tanstack/react-router";

// The old Project Archive page was merged into the Case Studies tab on the home page.
// Keep the URL alive so existing links and bookmarks land somewhere useful.
export const Route = createFileRoute("/projects/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
