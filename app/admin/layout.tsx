import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import { Profile } from "./test-persons/page";
import { redirect } from "next/navigation";
import { CurrentPageTitle } from "@/components/current-page-title";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const { data: currentUser } = await supabase.auth.getUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  const { data: userProfile }: { data: Profile | null } = await supabase
    .from("profile")
    .select("*")
    .eq("id", currentUser.user?.id)
    .single();

  if (!userProfile) {
    throw new Error("User profile not found");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userProfile} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CurrentPageTitle />
          </div>
        </header>
        <div className="md:p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
