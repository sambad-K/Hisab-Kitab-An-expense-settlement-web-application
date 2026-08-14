import { createFileRoute } from "@tanstack/react-router";
import ResetForm from "@/forms/ResetForm";
import AuthRoute from "@/components/routeguard/AuthRoute";
export const Route = createFileRoute("/resetpassword/$uid64/$token")({
  component: () => {
    console.log("reset route");
    return (
      <AuthRoute requireAuth={false}>
        <div className="h-[calc(100vh-64px)]">
          <ResetForm />
        </div>
      </AuthRoute>
    );
  },
});
