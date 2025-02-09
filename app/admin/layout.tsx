import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { CurrentPageTitle } from "@/components/current-page-title";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  const { data: userProfile } = await supabase
    .from("profile")
    .select()
    .eq("id", currentUser.id)
    .single();

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userProfile} className="border-none shadow-sm" />
      <SidebarInset className="bg-muted">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 md:h-5 md:w-5 md:p-2 box-content" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CurrentPageTitle />
          </div>
        </header>
        <div className="md:px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
