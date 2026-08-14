import { createFileRoute } from "@tanstack/react-router";
import ActivityPage from "@/pages/ActivityPage";
export const Route = createFileRoute("/activity")({
  validateSearch: (search) => ({
    page: Number(search.page ?? 1),
    q: typeof search.q === "string" ? search.q : "",
    type: typeof search.type === "string" ? search.type : "",
  }),
  component: ActivityPage,
});
