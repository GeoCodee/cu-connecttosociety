import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import MobileSidebar from "@/components/mobile-sidebar";
import SideBar from "./sidebar";

const NavBar = () => {
  return (
    <div className="flex items-center p-6 bg-[#111827]">
      <MobileSidebar />
      <div className="hidden lg:flex lg:justify-between lg:w-full lg:items-center">
        <SideBar />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBar;
