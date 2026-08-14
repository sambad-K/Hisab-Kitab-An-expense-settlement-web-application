import { ChevronRightIcon } from "lucide-react";
import useFetchExpense from "@/hooks/useFetchExpense";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "../ui/spinner";
import UpdateExpensePopup from "../popups/UpdateExpensePopup";
import type { ExpenseProps } from "@/props/ExpenseProps";
import CreateSettlementButton from "../buttons/CreateSettlementButton";
import SettlelmentDrawer from "../drawer/SettlementDrawer";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import DeleteExpenseConfirmPopup from "../popups/DeleteExpenseConfirmPopup";
export function Expense({ id }: ExpenseProps) {
  const { check } = useCheckAdmin(id);
  const { data, isLoading, isError } = useFetchExpense(id);
  if (isLoading) {
    return (
      <p>
        Loading Expense <Spinner />
      </p>
    );
  }
  if (isError) {
    return <p>No expense to show</p>;
  }
  return (
    <Card size="sm" className="mx-auto w-full hover:ring-green-500 transistion duration-500">
      <CardHeader>
        <CardTitle>Expense</CardTitle>
        <CardDescription>Expense details</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 py-2 text-sm">
          <li className="flex gap-2">
            <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>Category: {data?.category}</span>
          </li>
          <li className="flex gap-2">
            <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>Split Type: {data?.split_type}</span>
          </li>
          <li className="flex gap-2">
            <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span>Expense: {data?.amount} </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-row flex-wrap  gap-2 justify-between">
        {data?.id && <CreateSettlementButton id={data?.id} />}
        {check.data && data && <DeleteExpenseConfirmPopup id={data.id} />}

        {data && (
          <UpdateExpensePopup
            id={data?.id}
            split_type={data?.split_type}
            amount={data?.amount}
            category={data?.category}
          />
        )}
        {data && <SettlelmentDrawer id={data.id} />}
      </CardFooter>
    </Card>
  );
}
