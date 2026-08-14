import { redirect } from "@tanstack/react-router";
import { guard } from "@/api/auth.guard.api";
export async function authPrevent() {
  const authenticated = await guard();
  if (authenticated) {
    throw redirect({ to: "/profile" });
  }
}
