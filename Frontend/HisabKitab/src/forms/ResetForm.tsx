import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import type { ResetSchemaValue } from "@/schema/reset.schema";
import { useForm } from "react-hook-form";
import schema from "@/schema/reset.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/api/password.api";
import { toast } from "sonner";
import { Route } from "@/routes/resetpassword/$uid64/$token";
export default function ResetForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetSchemaValue>({
    resolver: zodResolver(schema),
  });
  const registerMutation = useMutation({
    mutationFn: resetPassword,

    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 100);
      toast.success("Successfully reset password, proceed to login");
    },
    onError: () => {
      toast.error("Failed reset password, try again!");
    },
  });
  const { uid64, token } = Route.useParams();
  const onSubmit = (data: ResetSchemaValue) => {
    registerMutation.mutate({
      uid64: uid64,
      token: token,
      data: data,
    });
  };
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Card className="w-full max-w-150">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>Enter your new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password1">Password</Label>
                </div>
                <div>
                  <Input
                    id="new_password"
                    type="password"
                    required
                    {...register("new_password")}
                    placeholder="Enter new password"
                  />
                  <p className="mt-1 text-sm text-red-600">{errors.new_password?.message}</p>
                </div>
                <div>
                  <Input
                    id="password1"
                    type="password"
                    required
                    {...register("confirm_password")}
                    placeholder="Re-enter your password"
                  />
                  <p className="mt-1 text-sm text-red-600">{errors.confirm_password?.message}</p>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className=" mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Reset
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
