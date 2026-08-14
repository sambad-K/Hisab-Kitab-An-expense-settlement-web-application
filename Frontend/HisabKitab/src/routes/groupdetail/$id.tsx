import { createFileRoute } from "@tanstack/react-router";
import GroupsDetailPage from "@/pages/GroupDetailPage";
import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/groupdetail/$id")({
  component: () => {
    return (
      <AuthRoute requireAuth>
        <GroupsDetailPage />
      </AuthRoute>
    );
  },
});
