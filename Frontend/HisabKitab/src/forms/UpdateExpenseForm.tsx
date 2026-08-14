import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import schema from "@/schema/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import type { UpdateExpenseProps } from "@/props/UpdateExpenseProps";
import { updateExpense } from "@/api/update.expense.api";
import { useState } from "react";
import type { ExpenseSchemaInputValue, ExpenseSchemaOutputValue } from "@/schema/expense.schema";
export default function UpdateExpenseForm({
  id,
  split_type,
  category,
  amount,
  onOpenChange,
}: UpdateExpenseProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ExpenseSchemaInputValue, undefined, ExpenseSchemaOutputValue>({
    resolver: zodResolver(schema),
    defaultValues: {
      split_type,
      category,
      amount,
    },
  });

  const split_type_options = [
    { label: "Select Split Type", value: null },
    { label: "Equal", value: "EQUAL" },
    { label: "Exact", value: "EXACT" },
    { label: "Percent", value: "PERCENT" },
  ];
  const [custom, setCustom] = useState(false);
  const queryClient = useQueryClient();
  const registerMutation = useMutation({
    mutationFn: (data: Partial<ExpenseSchemaOutputValue>) => updateExpense(id, data),

    onSuccess: () => {
      toast.success("Updated expense successfully");
      queryClient.invalidateQueries({
        queryKey: ["expense-per-member"],
      });
      queryClient.invalidateQueries({
        queryKey: ["expense"],
      });
      onOpenChange?.(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error))
        toast.error(error.response?.data?.error ?? "Failed to update expense");
    },
  });
  const onSubmit = (data: ExpenseSchemaOutputValue) => {
    const changedData: Partial<ExpenseSchemaOutputValue> = {};

    if (dirtyFields.category) changedData.category = data.category;

    if (dirtyFields.split_type) changedData.split_type = data.split_type;

    if (dirtyFields.amount) changedData.amount = data.amount;
    registerMutation.mutate(changedData);
  };

  return (
    <div className="flex justify-center   items-center border-none!">
      <Card className="w-full max-w-sm border-none! shadow-none! bg-transparent ring-0!">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Make Changes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Controller
                  name="split_type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={split_type_options}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Split Type</SelectLabel>
                          {split_type_options.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="mt-1 text-sm text-red-600">{errors.split_type?.message}</p>
              </div>
              <div className="grid gap-2">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          setCustom(value === "Others");
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Split Type</SelectLabel>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                            <SelectItem value="Gaming">Gaming</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {custom && (
                        <>
                          <Label htmlFor="custom-category">Enter Custom category</Label>
                          <Input
                            id="custom-category"
                            type="text"
                            placeholder="Lodging"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </>
                      )}
                    </>
                  )}
                />
                <p className="mt-1 text-sm text-red-600">{errors.category?.message}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Amount</Label>
                <Input
                  id="percent"
                  type="number"
                  placeholder="m@example.com"

                  required
                  {...register("amount")}
                />
                <p className="mt-1 text-sm text-red-600">{errors.amount?.message}</p>
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
