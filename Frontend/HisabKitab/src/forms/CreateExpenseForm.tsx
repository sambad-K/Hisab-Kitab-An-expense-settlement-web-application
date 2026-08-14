import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ExpenseSchemaInputValue, ExpenseSchemaOutputValue } from "@/schema/expense.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import schema from "@/schema/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpense } from "@/api/create.expense.api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateExpenseProps } from "@/props/CreateExpenseProps";
import { useState } from "react";
export default function CreateExpenseForm({ id, onOpenChange }: CreateExpenseProps) {
  const [custom, setCustom] = useState(false);
  const queryClient = useQueryClient();
  const split_type = [
    { label: "Select Split Type", value: null },
    { label: "Equal", value: "EQUAL" },
    { label: "Exact", value: "EXACT" },
    { label: "Percent", value: "PERCENT" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ExpenseSchemaInputValue, undefined, ExpenseSchemaOutputValue>({
    resolver: zodResolver(schema),
  });
  const expenseCreateMutation = useMutation({
    mutationFn: (data: ExpenseSchemaOutputValue) => createExpense(data, id),

    onSuccess: () => {
      reset();
      toast.success("Successfully created expense");
      queryClient.invalidateQueries({
        queryKey: ["expense-per-member", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["expense", id],
      });
      onOpenChange?.(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error))
        toast.error(error.response?.data.error ?? "Failed to create expense");
    },
  });
  const onSubmit = (data: ExpenseSchemaOutputValue) => {
    expenseCreateMutation.mutate(data);
  };
  return (
    <div className="flex justify-center   items-center border-none!">
      <Card className="w-full max-w-sm border-none! shadow-none! bg-transparent ring-0!">
        <CardHeader>
          <CardTitle>Create Expense</CardTitle>
          <CardDescription>Fill the fields below to create a expense.</CardDescription>
        </CardHeader>
        <CardContent className="border-none">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
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
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
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
                <Controller
                  name="split_type"
                  control={control}
                  render={({ field }) => (
                    <Select items={split_type} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Split Type</SelectLabel>
                          {split_type.map((item) => (
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
                <Label htmlFor="split_type">Amount</Label>
                <Input
                  id="amount"
                  type="number"

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
              Create Expense
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
