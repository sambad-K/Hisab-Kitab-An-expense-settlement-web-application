import RegisterPage from "@/pages/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";
import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/register")({
  component: () => (
    <AuthRoute requireAuth={false}>
      <RegisterPage />
    </AuthRoute>
  ),
});
