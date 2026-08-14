import { createFileRoute } from "@tanstack/react-router";
import RequestPasswordReset from "@/forms/RequestPasswordResetForm";

import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/forgotPassword")({
  component: () => (
    <AuthRoute requireAuth={false}>
      <div className="h-[calc(100vh-64px)]">
        <RequestPasswordReset />
      </div>
    </AuthRoute>
  ),
});
