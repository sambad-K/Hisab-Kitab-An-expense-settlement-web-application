import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegisterSchemaValue } from "@/schema/register.schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import schema from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerUser } from "@/api/auth.api";
import { toast } from "sonner";
export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterSchemaValue>({
    resolver: zodResolver(schema),
  });
  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 100);
      toast.success("Created user, proceed to login");
    },
    onError: () => {
      toast.error("Failed to create user, try again!");
    },
  });
  const onSubmit = (data: RegisterSchemaValue) => {
    registerMutation.mutate(data);
  };
  return (
    <div className="flex justify-center h-full items-center">
      <Card className="w-full max-w-200">
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>Enter your details below to register your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="first_name">Firstname</Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="eg:Ram"

                  required
                  {...register("first_name")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.first_name?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Lastname</Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="eg:Thapa"

                  required
                  {...register("last_name")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.last_name?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="m@example.com"

                  required
                  {...register("username")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.username?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="picture">Profile Photo</Label>
                <Input
                  id="picture"
                  type="file"

                  required
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("picture", file);
                    }
                  }}
                />
                <p className="mt-1 text-sm text-red-600">{errors.picture?.message}</p>
              </div>
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
                  <Label htmlFor="password1">Password</Label>
                </div>
                <Input id="password1" type="password" required {...register("password1")} />
                <p className="mt-1 text-sm text-red-600">{errors.password1?.message}</p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password2">Confirm Password</Label>
                </div>
                <Input id="password2" type="password" {...register("password2")} required />
                <p className="mt-1 text-sm text-red-600">{errors.password2?.message}</p>
              </div>
            </div>
            <Button
              type="submit"
              className=" mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
}
