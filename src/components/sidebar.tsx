"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
  UserRound,
  Calendar,
  CirclePlus,
  PersonStanding,
} from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import { Code2 } from "lucide-react";
import { usePathname } from "next/navigation";

const montseratt = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Create Event",
    icon: CirclePlus,
    href: "/createEvent?lat=43.58&lng=-79.64",
    color: "text-green-400",
  },
  {
    label: "Events",
    icon: Calendar,
    href: "/events",
    color: "text-green-400",
  },
  {
    label: "Profile",
    icon: UserRound,
    href: "/profile",
    color: "text-green-400",
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="space-y-4 py-4 flex flec-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link
          href="/dashboard"
          className="flex items-center justify-start pl-2"
        >
          <div className="relative w-8 h-8 mr-4">
            <PersonStanding
              className="text-green-400"
              size={32}
            ></PersonStanding>
          </div>
          <h1
            className={cn(
              "text-2xl font-bold text-green-400",
              montseratt.className
            )}
          >
            CU
          </h1>
        </Link>
        <div className="border-b-4 border-green-400 w-full mb-8 mt-5"></div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathName === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
