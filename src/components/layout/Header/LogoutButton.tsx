"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { signOut } from "@/actions/auth/actions";
function LogoutButton() {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <button
      onClick={handleLogout}
      className="hover-color cursor-pointer"
      title="Logout"
    >
      <LogOut />
    </button>
  );
}

export default LogoutButton;
