import useFetchSettlement from "@/hooks/useFetchSettlement";
import { Card, CardDescription, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import useFetchUser from "@/hooks/useFetchUser";
import type { SettlementProps } from "@/props/SettlementProps";
import { Button } from "../ui/button";
import useToggleSettlementStatus from "@/hooks/useToggleSettlementStatus";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { FaArrowRight } from "react-icons/fa";
export default function SettlementList({ id }: SettlementProps) {
  const { mutate } = useToggleSettlementStatus();
  const { data } = useFetchUser();
  const { settlement } = useFetchSettlement(id);

  if (settlement.isError) {
    toast.error("Something went wrong");
  }
  if (settlement.isLoading) {
    return (
      <div className="mt-50 w-full flex justify-center ">
        <Spinner className="size-8" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-3 ">
      {settlement.data && settlement.data.length === 0 && (
        <div className="mt-30">No valid settlements yet</div>
      )}
      <div>
        <div className="flex flex-col gap-3 items-center min-w-full  ">
          {settlement.data ? (
            settlement.data.map((element) => (
              <Card
                key={element.id}
                size="sm"
                className="md:w-80 sm:w-30 lg:w-100 h-50 flex items-center transition duration-500 p-3 hover:ring-2 hover:ring-green-500"
              >
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="p-3 flex flex-row justify-between items-center gap-30">
                        <p>
                          <div className="flex items-center gap-1.5">
                            {element.from_member.user.username}
                            <FaArrowRight /> {element.to_member.user.username}
                          </div>
                        </p>
                      </CardTitle>

                      <CardDescription className="p-3">
                        <div>
                          <span>To be paid : Rs. {element.amount}</span>
                        </div>
                        {element.to_member.user.username === data?.username ? (
                          <div>
                            <span>
                              Status:
                              {element.status ? (
                                <Button
                                  className="bg-green-500 hover:bg-green-600"
                                  onClick={() => mutate(element.id)}
                                >
                                  Settled
                                </Button>
                              ) : (
                                <Button
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => mutate(element.id)}
                                >
                                  Pending
                                </Button>
                              )}
                            </span>
                          </div>
                        ) : (
                          <span>
                            Status:{element.status ? <span>Settled</span> : <span>Pending</span>}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <CardFooter className="flex flex-row justify-between">
                    <div className="text-gray-500">
                      Created:
                      {new Date(element.first_payment).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                    <div>{element.status}</div>
                    <div className="text-gray-500">
                      Update:
                      {new Date(element.latest_payment).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No Expense Created</p>
          )}
        </div>
      </div>
    </div>
  );
}
