import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("guivos:auth");
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed?.isLoggedIn) {
        throw redirect({ to: "/login" });
      }
    } catch (e) {
      if ((e as { isRedirect?: boolean })?.isRedirect) throw e;
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}
