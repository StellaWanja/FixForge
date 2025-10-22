"use client";

import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "@/actions/auth/actions";
function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  if (loading) {
    return <span>Logging out...</span>;
  }

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer flex items-center gap-2 text-destructive"
      title="Logout"
    >
      <LogOut className="text-destructive" /> <span>Logout</span>
    </button>
  );
}

export default LogoutButton;
