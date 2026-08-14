import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpensePerMemberList from "../list/ExpensePerMemberList";
import DeleteGroupMemberButton from "../buttons/DeleteGroupMemberButton";
import { Expense } from "../expense/Expense";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import type { DetailProps } from "@/props/DetailProps";
import useFetchGroupMembers from "@/hooks/useFetchGroupMembers";
import CreateExpensePopup from "../popups/CreateExpensePopup";
import useFetchUser from "@/hooks/useFetchUser";
export function GroupMemberTable({ id }: DetailProps) {
  const { check } = useCheckAdmin(id);
  const { members } = useFetchGroupMembers(id);
  const { data } = useFetchUser();
  if (members.isLoading) {
    return <>Loading..</>;
  }
  if (members.isError) {
    return <>Error while loading members</>;
  }

  return (
    <>
      <div className="self-start grid md:grid-cols-2 sm:grid-cols-1 gap-3 grid-cols-1">
        <div>
          <div className="text-xl font-bold">Group Members</div>

          <Table className="z-30">
            <TableHeader>
              <TableRow>
                <TableHead className="w-25"> Name</TableHead>
                <TableHead> Username</TableHead>
                <TableHead className="flex justify-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.data?.map((element) => {
                return (
                  <TableRow key={element.id}>
                    <TableCell className="font-medium">{element.user.first_name}</TableCell>
                    <TableCell className="font-medium">{element.user.username}</TableCell>

                    {check.data ? (
                      <TableCell className="flex justify-center">
                        <DeleteGroupMemberButton
                          id={element.id}
                          button={data?.username === element.user.username ? "Leave" : "Kick Out"}
                        />
                      </TableCell>
                    ) : (
                      <TableCell className="flex justify-center">
                        {data?.username === element.user.username && (
                          <DeleteGroupMemberButton id={element.id} button="Leave" />
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <CreateExpensePopup id={id} />
          <Expense id={id} />
        </div>
      </div>
      <div>
        <ExpensePerMemberList id={id} />
      </div>
    </>
  );
}
