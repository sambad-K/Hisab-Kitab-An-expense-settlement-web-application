import useFetchExpensePerMember from "@/hooks/useFetchExpensePerMember";
import { Card, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { UpdateExpensePerMemberDrawer } from "../drawer/UpdateExpensePerMemberDrawer";
import type { ExpenseProps } from "@/props/ExpenseProps";
export default function ExpensePerMemberList({ id }: ExpenseProps) {
  const { data, isLoading, isError, error } = useFetchExpensePerMember(id);
  if (isLoading) {
    return <div>Loading Expense</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="font-bold text-2xl flex p-1">Expense Per Members</p>
      <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3 gap-4 place-items-center ">
        {data ? (
          data.map((element) => (
            <Card
              key={element.group_member.id}
              size="sm"
              className=" hover:ring-green-500 transition duration-500 w-full max-w-md "
            >
              <div className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="p-3 flex flex-row justify-between items-center gap-30">
                    <div>{element.group_member.user.username}</div>

                    <div>
                      <UpdateExpensePerMemberDrawer
                        id={element.id}
                        paid_amount={element.paid_amount}
                        percent={element.percent}
                        share_amount={element.share_amount}
                        gid={id}
                        expense={element.expense}
                      />
                    </div>
                  </CardTitle>

                  <CardDescription className="p-3">
                    <div>Paid amount : {element.paid_amount}</div>
                    <div>Share Amount : {element.share_amount}</div>
                    {element.percent && <div>Percent: {element.percent}</div>}
                  </CardDescription>
                </div>
              </div>
              <CardFooter className="flex flex-col items-start text-xs">
                <div className="text-gray-500">
                  Created:
                  {new Date(element.created_at).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
                <div className="text-gray-500">
                  Updated:
                  {new Date(element.created_at).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No Expense Created</p>
        )}
      </div>
    </div>
  );
}
