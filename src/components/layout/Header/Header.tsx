import React from "react";
import NavButton from "./NavButton";
import { HomeIcon, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import LogoutButton from "./LogoutButton";

function Header() {
  // SET UP HEADER BASED ON LOGIN DETAILS
  const session = false;

  return (
    <header className="h-12 p-2 border-b-2 sticky top-0 z-20">
      <div className="flex h-8 items-center justify-between w-full">
        {session ? (
          <div className="flex items-center gap-2">
            <NavButton
              href="/home"
              label="Home"
              icon={HomeIcon}
              styles="hover-color"
            />
          </div>
        ) : (
          <Link
            href="/"
            className="hidden sm:block text-2xl font-bold m-0 mt-1"
            title="logo"
          >
            Fix Forge
          </Link>
        )}
        {session ? (
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <NavButton
                href="/tickets"
                label="Tickets"
                icon={Ticket}
                styles="hover-color"
              />
              <NavButton
                href="/customers"
                label="Customers"
                icon={Users}
                styles="hover-color"
              />
            </div>
            <ModeToggle />
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-8 font-bold text-lg">
            <Link href="/login" className="hover-color">
              Login
            </Link>
            <Link href="/register" className="hover-color">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
