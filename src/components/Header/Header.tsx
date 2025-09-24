import React from "react";
import NavButton from "./NavButton";
import { HomeIcon, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b-2 sticky top-0 z-20 dark:bg-[#0D0F12]">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" label="Home" icon={HomeIcon} />
          <Link
            href="/home"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-semibold m-0 mt-1">
              Fix Forge
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <NavButton href="/tickets" label="Tickets" icon={Ticket} />
            <NavButton href="/customers" label="Customers" icon={Users} />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
