import { createFileRoute } from "@tanstack/react-router";
import DashPage from "@/pages/DashPage";
import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/dashboard")({
  component: () => {
    return (
      <AuthRoute requireAuth>
        <DashPage />
      </AuthRoute>
    );
  },
});
