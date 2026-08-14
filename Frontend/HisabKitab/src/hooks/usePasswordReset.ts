import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "@/api/password.api";
import { resetPassword } from "@/api/password.api";
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: requestPasswordReset,
  });
};
export const useResetPassword = () => {
  return useMutation({ mutationFn: resetPassword });
};
