import type React from "react";
import AdminSidebar from "@/components/shared/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="p-4 sticky top-0 bg-white z-20">
          <SidebarTrigger />
        </div>
        <main className="flex-1 p-4 sm:p-6 min-w-0 overflow-hidden">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
