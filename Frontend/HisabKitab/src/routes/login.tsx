import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/pages/LoginPage";
import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/login")({
  component: () => (
    <AuthRoute requireAuth={false}>
      <LoginPage />
    </AuthRoute>
  ),
});
