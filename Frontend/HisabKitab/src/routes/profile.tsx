import ProfilePage from "@/pages/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";
import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/profile")({
  component: () => (
    <AuthRoute requireAuth>
      <ProfilePage />
    </AuthRoute>
  ),
});
