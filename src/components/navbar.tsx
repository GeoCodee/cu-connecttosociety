import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import MobileSidebar from "@/components/mobile-sidebar";
import SideBar from "./sidebar";

const NavBar = () => {
  //bg-[#111827]
  return (
    <div className="flex items-center p-6  z-10">
      <MobileSidebar />
      <div className="hidden lg:max-w-[1440px] mx-auto lg:flex lg:justify-between lg:w-full lg:items-center">
        <SideBar />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default NavBar;
