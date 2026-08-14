import GroupsPage from "@/pages/GroupsPage";
import { createFileRoute } from "@tanstack/react-router";
import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/groups")({
  validateSearch: (search) => ({
    search: (search.search as string) || "",
  }),

  component: () => {
    return (
      <AuthRoute requireAuth>
        <GroupsPage />
      </AuthRoute>
    );
  },
});
