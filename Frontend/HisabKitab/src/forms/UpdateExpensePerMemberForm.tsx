import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import schema from "@/schema/expense.per.member.schema";
import type {
  ExpensePerMemberSchemaInputValue,
  ExpensePerMemberSchemaOutputValue,
} from "@/schema/expense.per.member.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateExpensePerMember } from "@/api/update.expense.per.member.api";
import { useQueryClient } from "@tanstack/react-query";
import type { UpdateExpensePerMemberProps } from "@/props/UpdateExpensePerMemberProps";
export default function UpdateExpensePerMemberForm({
  id,
  share_amount,
  percent,
  paid_amount,
  expense,
  gid,
  onOpenChange,
}: UpdateExpensePerMemberProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<ExpensePerMemberSchemaInputValue, undefined, ExpensePerMemberSchemaOutputValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      paid_amount,
      share_amount,
      percent,
    },
  });
  const queryClient = useQueryClient();
  const registerMutation = useMutation({
    mutationFn: (data: Partial<ExpensePerMemberSchemaOutputValue>) =>
      updateExpensePerMember(id, data),

    onSuccess: () => {
      toast.success("Updated expense of the member successfully");
      queryClient.invalidateQueries({
        queryKey: ["expense-per-member", gid],
      });
      if (onOpenChange) {
        onOpenChange(false);
      }
      console.log("Success");
      console.log(onOpenChange);
    },
    onError: () => {
      toast.error("Failed to update user, try again!");
    },
  });
  const onSubmit = (data: ExpensePerMemberSchemaOutputValue) => {
    const changedData: Partial<ExpensePerMemberSchemaOutputValue> = {};

    if (dirtyFields.paid_amount) changedData.paid_amount = data.paid_amount;

    if (dirtyFields.share_amount) changedData.share_amount = data.share_amount;

    if (dirtyFields.percent) changedData.percent = data.percent;
    registerMutation.mutate(changedData);
  };

  return (
    <div className="flex justify-center items-center ">
      <Card className="w-full sm:max-w-sm md:min-w-200 lg-min-w-500 p-3">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Make Changes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="paid_amount">Paid Amount</Label>
                <Input
                  id="paid_amount"
                  type="number"
                  placeholder="eg:Ram"

                  required
                  {...register("paid_amount")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.paid_amount?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="share amount">Share Amount</Label>
                <Input
                  id="share_amount"
                  type="number"
                  placeholder="eg:Thapa"

                  required
                  {...register("share_amount")}
                  disabled={expense?.split_type === "EQUAL" || expense?.split_type === "PERCENT"}
                />
                <p className="mt-1 text-sm text-red-600">{errors.share_amount?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Percent</Label>
                <Input
                  id="percent"
                  type="number"
                  placeholder="m@example.com"

                  required
                  {...register("percent")}
                  disabled={expense?.split_type !== "PERCENT"}
                />
                <p className="mt-1 text-sm text-red-600">{errors.percent?.message}</p>
              </div>
            </div>
            <Button
              type="submit"
              className=" mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Make Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
