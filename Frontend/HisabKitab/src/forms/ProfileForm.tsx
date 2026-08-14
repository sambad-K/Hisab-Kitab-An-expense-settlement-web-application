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
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { UpdateSchemaValue } from "@/schema/update.schema";
import schema from "@/schema/update.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateProfile } from "@/api/update.user.api";
import type { User } from "@/types/user";
import { useRef, useState } from "react";
import LogOutButton from "../components/buttons/LogOutButton";
export default function ProfileForm({ id, username, picture, first_name, last_name, email }: User) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateSchemaValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name,
      last_name,
      username,
      email,
    },
  });
  const [currentPicture, setCurrentPicture] = useState(picture);
  const imageRef = useRef<HTMLInputElement>(null);
  const registerMutation = useMutation({
    mutationFn: (data: UpdateSchemaValue) => updateProfile(id, data),

    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: "/profile" });
      }, 2000);
      toast.success("Updated user successfully");
      navigate({ to: "/profile" });
    },
    onError: () => {
      toast.error("Failed to update user, try again!");
    },
  });
  const onSubmit = (data: UpdateSchemaValue) => {
    registerMutation.mutate(data);
  };
  return (
    <div className="flex justify-center min-h-screen items-center ">
      <Card className="w-full sm:max-w-sm md:min-w-200 lg-min-w-500 p-3">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>You can view as well as update your details below</CardDescription>
          </div>
          <LogOutButton />
        </CardHeader>
        <div className="flex justify-center">
          <img src={currentPicture} alt="Profile Picture" className="w-100 h-100 rounded-full" />
        </div>
        <div className="grid gap-2">
          <Input
            id="picture"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setValue("picture", file);
                setCurrentPicture(URL.createObjectURL(file));
              }
            }}
            ref={imageRef}
            className="hidden"
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => imageRef.current?.click()}
            className="w-40 bg-green-500 hover:bg-green-600 text-white hover:text-white"
          >
            Change Photo
          </Button>
        </div>
        <p className="mt-1 text-sm text-red-600">{errors.picture?.message}</p>
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
            <Button
              type="submit"
              className=" mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Update
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
}
