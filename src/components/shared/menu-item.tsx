"use client";
import { IMenuItem } from "@/types/sidebar";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MenuItem = ({ item: { title, icon, url } }: { item: IMenuItem }) => {
  const pathname = usePathname();

  const isActive = pathname === url;

  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton
        className={cn(
          "",
          isActive &&
            "bg-purple-600 hover:bg-purple-700 text-white hover:text-white font-medium"
        )}
        asChild
      >
        <Link href={url}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default MenuItem;
