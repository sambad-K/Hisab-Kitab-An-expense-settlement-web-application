import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GroupSchemaValue } from "@/schema/group.schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import schema from "@/schema/group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGroup } from "@/api/create.group.api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateGroupProps } from "@/props/CreateGroupProps";
export default function CreateGroupForm({ onOpenChange }: CreateGroupProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupSchemaValue>({
    resolver: zodResolver(schema),
  });
  const groupCreateMutation = useMutation({
    mutationFn: createGroup,

    onSuccess: () => {
      reset();
      toast.success("Successfully created group");
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });

      onOpenChange?.(false);
    },
    onError: () => {
      toast.error("Failed to create group, try again!");
    },
  });
  const onSubmit = (data: GroupSchemaValue) => {
    groupCreateMutation.mutate(data);
  };
  return (
    <div className="flex justify-center   items-center border-none!">
      <Card className="w-full max-w-sm border-none! shadow-none! bg-transparent">
        <CardHeader>
          <CardTitle>Create your group</CardTitle>
          <CardDescription>Fill the fields below to create a group.</CardDescription>
        </CardHeader>
        <CardContent className="border-none">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="group_name"
                  type="text"
                  placeholder="eg:Dinner at durbarmarg"

                  required
                  {...register("group_name")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.group_name?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="groupName">Description</Label>
                <Input
                  id="groupName"
                  type="text"
                  placeholder="Add a description"

                  required
                  {...register("description")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.description?.message}</p>
              </div>
            </div>
            <Button
              type="submit"
              className=" mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Create Group
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
