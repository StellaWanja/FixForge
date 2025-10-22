"use client";

import { Ticket, User, Users, Wrench } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function HeaderClient({
  session,
}: {
  session: { id: string; role: "admin" | "user", name: string } | null;
}) {
  const pathname = usePathname();
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div>
            {session ? (
              <Link href="/dashboard" className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">
                  Fix Forge{" "}
                  {pathname !== "/" && (
                    <span className=" capitalize">
                      {" "}
                      | {pathname.split("/")[1]}
                    </span>
                  )}
                </h1>
              </Link>
            ) : (
              <Link href="/" title="logo" className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Fix Forge</h1>
              </Link>
            )}
          </div>

          {session && (
            <div className="flex items-center gap-6">
              {/* Navigation Items */}
              <Button variant="ghost">
                <Link href="/tickets" className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <span>Tickets</span>
                </Link>
              </Button>
              <Button variant="ghost">
                <Link href="/customers" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Customers</span>
                </Link>
              </Button>
            </div>
          )}

          {session && (
            <div className="flex items-center gap-8">
              {/* Mode Toggle */}
              <ModeToggle />

              {/* Account */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="gap-2 cursor-pointer">
                    <User className="h-5 w-5" />
                    <span>{session.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {!session && (
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
      </div>
    </nav>
  );
}

export default HeaderClient;
