import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LoginSchemaValue } from "@/schema/login.schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import schema from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login as loginUser } from "@/api/auth.api";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaValue>({
    resolver: zodResolver(schema),
  });
  const { refreshAuth } = useAuth();
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: async () => {
      await refreshAuth();
      navigate({ to: "/dashboard" });
      toast.success("Login successful");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Invalid Credentials");
    },
  });
  const signUp = () => {
    navigate({ to: "/register" });
  };
  const forgot = () => {
    navigate({ to: "/forgotPassword" });
  };
  const onSubmit = (data: LoginSchemaValue) => {
    registerMutation.mutate(data);
  };
  return (
    <div className="flex justify-center h-full items-center p-4 w-full">
      <Card className="w-full max-w-150">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required {...register("password")} />
                <p className="mt-1 text-sm text-red-600">{errors.password?.message}</p>
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            variant="link"
            onClick={() => {
              forgot();
            }}
          >
            Forgot password?
          </Button>
          {/*<Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
