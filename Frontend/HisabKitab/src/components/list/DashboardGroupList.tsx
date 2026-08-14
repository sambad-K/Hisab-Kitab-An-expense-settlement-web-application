import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { GrLinkNext } from "react-icons/gr";
import type { GroupListProps } from "@/props/GroupListProps";
export function DashboardGroupList({ group }: GroupListProps) {
  const navigate = useNavigate();
  const gotoGroup = (search: string) => {
    navigate({ to: "/groups", search: { search } });
  };
  const gotoDetail = (id: number) => {
    navigate({ to: `/groupdetail/${id}` });
  };
  return (
    <>
      <Card className="bg-none h-full p-2 bg-transparent border-none shadow-none ">
        <CardHeader className="flex flex-row justify-between">
          <p className="text-2xl">Recent Groups</p>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white hover:text-white"
            onClick={() => {
              gotoGroup("");
            }}
          >
            View All
            <GrLinkNext />
          </Button>
        </CardHeader>
        {group.map((element) => {
          return (
            <Card
              size="sm"
              className="mx-auto w-full max-w-120 ring-green-500 hover:scale-110 transistion duration-300"
              onClick={() => {
                gotoDetail(element.id);
              }}
            >
              <CardHeader>
                <CardTitle>{element.group_name}</CardTitle>
                <CardDescription className="truncate flex flex-row justify-between">
                  <div>{element.description}</div>
                  <div>
                    {new Date(element.created_at).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </Card>
    </>
  );
}
