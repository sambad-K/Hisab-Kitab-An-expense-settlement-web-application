import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { TbHomeStats } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { LuActivity } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";
export function AppSidebar() {
  return (
    <div>
      <Sidebar className="h-full">
        <SidebarHeader>
          <img src="/logo.png" alt="Logo" className="h-20 w-50" />
        </SidebarHeader>
        <SidebarContent>
          <div className="flex flex-col gap-10 px-4 justify-evenly">
            <div className="mt-10 ">
              <Link
                to="/dashboard"
                className="flex gap-2 items-center hover:bg-green-500 hover:rounded-2xl w-full h-10 p-2 transistion duration-300 text-gray-500"
                activeProps={{
                  className:
                    "block w-full bg-green-500  h-10 flex p-2 items-center rounded-2xl text-white",
                }}
              >
                <TbHomeStats />
                Dashboard
              </Link>
            </div>
            <div>
              <Link
                to="/groups"
                search={{ search: "" }}
                className="flex gap-2 items-center hover:bg-green-500 w-full h-10 p-2 transistion duration-300 text-gray-500 rounded-2xl"
                activeOptions={{
                  includeSearch: false,
                  exact: true,
                }}
                activeProps={{
                  className:
                    "block w-full bg-green-500  h-10 flex p-2 items-center border-rounded-2xl text-white gap-2",
                }}
              >
                <MdGroups />
                Groups
              </Link>
            </div>
            <div>
              <Link
                to="/activity"
                search={{ page: 1, q: "", type: "" }}
                className="flex gap-2 items-center hover:bg-green-500 w-full h-10 p-2 transistion duration-300 text-gray-500 rounded-2xl"
                activeOptions={{
                  includeSearch: false,
                  exact: true,
                }}
                activeProps={{
                  className:
                    "block w-full bg-green-500  h-10 flex p-2 items-center border-rounded-2xl text-white gap-2",
                }}
              >
                <LuActivity />
                Activities
              </Link>
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-3">
            <Link
              to="/profile"
              className="flex gap-2 hover:bg-green-500 w-full h-10 p-2 transistion duration-300 text-gray-500 rounded-2xl items-center"
              activeProps={{
                className:
                  "flex gap-2 w-full bg-green-500  h-10 flex p-2 items-center border-rounded-2xl text-white items-center",
              }}
            >
              <MdOutlineManageAccounts />
              Profile
            </Link>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
