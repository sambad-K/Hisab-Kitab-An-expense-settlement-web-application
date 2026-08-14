import { Button } from "@base-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "@/api/logout.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const LogOutButton = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      toast.warning("Logged out!");
      setTimeout(() => {
        navigate({
          to: "/login",
          replace: true,
        });
      }, 300);
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  return (
    <Button
      className="bg-green-500 rounded-full text-white w-30 h-10 hover:bg-green-600"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending ? "Logging out" : "Logout"}
    </Button>
  );
};

export default LogOutButton;
