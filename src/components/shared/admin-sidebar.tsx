import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { IMenuItem } from "@/types/sidebar";
import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import MenuItem from "./menu-item";

const menuItems: IMenuItem[] = [
  {
    title: "Posts",
    url: "/admin",
    icon: <FileText />,
  },
];

function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="relative">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Link href="/">
          <Button
            variant="destructive"
            className="absolute bottom-10 left-[5%] w-[90%]"
          >
            Logout
          </Button>
        </Link>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default AdminSidebar;
