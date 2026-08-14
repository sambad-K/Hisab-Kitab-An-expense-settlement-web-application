import { AppSidebar } from "@/components/sidebar/SideNav";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Heading from "../heading/Heading";
import { Toaster } from "sonner";
import { ThemeProvider } from "../theme/ThemeProvider";
import { useLocation, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
const queryClient = new QueryClient();
const RootLayout = () => {
  const { loading } = useAuth();
  const [load, setLoad] = useState<boolean>(false);
  const state = useRouterState();
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (state.status == "pending") {
      timer = setTimeout(() => {
        setLoad(true);
      }, 400);
    } else {
      setLoad(false);
    }
    return () => clearTimeout(timer);
  }, [state.status]);
  const location = useLocation();
  const hide =
    location.pathname == "/login" ||
    location.pathname === "/register" ||
    location.pathname.includes("/forgotPassword") ||
    location.pathname.includes("resetpassword");
  if (loading) {
    return (
      <div className=" flex inset-0 fixed  z-50 bg-background/50 justify-center items-center">
        <Spinner className="size-20" />
      </div>
    );
  }
  if (hide) {
    return (
      <div>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <header className="flex h-14 items-center border-b px4">
              <Heading />
            </header>

            <Outlet />
          </QueryClientProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </div>
    );
  }

  return (
    <div>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-14 items-center border-b px4">
                <SidebarTrigger />
                <Heading />
              </header>
              {load && (
                <div className=" flex inset-0 fixed  z-50 bg-background/50 justify-center items-center">
                  <Spinner className="size-20" />
                </div>
              )}
              <Outlet />
            </SidebarInset>
          </SidebarProvider>
        </QueryClientProvider>
        <Toaster position="top-center" />
      </ThemeProvider>
    </div>
  );
};

export default RootLayout;
