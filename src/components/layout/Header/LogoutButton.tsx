import React from "react";
import { LogOut } from "lucide-react";
function LogoutButton() {
  return (
    <button className="hover-color cursor-pointer" title="Logout">
      <LogOut />
    </button>
  );
}

export default LogoutButton;
