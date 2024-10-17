"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu/>
          </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar></Sidebar>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
