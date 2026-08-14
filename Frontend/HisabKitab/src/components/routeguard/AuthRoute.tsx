import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "@tanstack/react-router";
type AuthRouteProps = {
  children: ReactNode;
  requireAuth: boolean;
};

export default function AuthRoute({ children, requireAuth }: AuthRouteProps) {
  const { auth, loading } = useAuth();
  if (loading) {
    return <div>Loading ..</div>;
  }
  if (requireAuth && !auth) {
    return <Navigate to="/login" />;
  }
  if (!requireAuth && auth) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
}
