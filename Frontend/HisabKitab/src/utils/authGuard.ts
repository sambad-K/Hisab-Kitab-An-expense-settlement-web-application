import { redirect } from "@tanstack/react-router";
import { guard } from "@/api/auth.guard.api";
export async function authGuard() {
  const authenticated = await guard();
  if (!authenticated) {
    throw redirect({ to: "/login" });
  }
}
