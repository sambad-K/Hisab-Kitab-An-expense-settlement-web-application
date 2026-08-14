import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useNavigate } from "@tanstack/react-router";
import type { DashActivity } from "@/types/dashactivity";
import { LuActivity } from "react-icons/lu";
export function ActivityHover({ data }: DashActivity) {
  const navigate = useNavigate();
  return (
    <HoverCard>
      <HoverCardTrigger
        delay={10}
        closeDelay={100}
        render={
          <Button className="bg-green-500 h-8 font-bold text-white" variant="link">
            Recents
            <LuActivity />
          </Button>
        }
      />
      <HoverCardContent className="flex w-64 flex-col gap-4.5">
        {data.map((element) => (
          <div>{element}</div>
        ))}
        <Button
          className="bg-green-500 hover:bg-green-600"
          onClick={() =>
            navigate({
              to: "/activity",
              search: {
                page: 1,
                q: "",
                type: "",
              },
            })
          }
        >
          View All
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
