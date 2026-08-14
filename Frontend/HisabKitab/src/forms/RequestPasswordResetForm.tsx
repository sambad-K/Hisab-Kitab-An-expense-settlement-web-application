import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResetRequestSchemaValue } from "@/schema/reset.request.schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import schema from "@/schema/reset.request.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/api/password.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
export default function RequestPasswordReset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetRequestSchemaValue>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: requestPasswordReset,

    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 300);
      toast.success("Sent mail, check your mailbox");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Failed to send mail");
    },
  });
  const signUp = () => {
    navigate({ to: "/register" });
  };
  const onSubmit = (data: ResetRequestSchemaValue) => {
    registerMutation.mutate(data);
  };
  return (
    <div className="flex flex-row justify-center h-full items-center p-4 w-full i">
      <Card className="w-full max-w-150">
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
          <CardDescription>Enter your email below for reset link.</CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => {
                signUp();
              }}
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
              </div>
              <div className="grid gap-2"></div>
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
