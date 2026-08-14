import { useRouterState } from "@tanstack/react-router";
import { ThemeToggle } from "../theme/ThemeToggle";
import CreateGroupPopup from "../popups/CreateGroupPopup";
const Heading = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const headings: Record<string, string> = {
    "/login": "Login",
    "/register": "Register",
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/expense": "Expense",
    "/activity": "My Activity",
    "/groups": "Groups",
  };
  return (
    <div className="flex justify-between items-center w-full h-16">
      <p className="font-bold text-2xl  p-2">{headings[pathname]}</p>
      {headings[pathname] === "Groups" && <CreateGroupPopup />}
      <ThemeToggle />
    </div>
  );
};

export default Heading;
