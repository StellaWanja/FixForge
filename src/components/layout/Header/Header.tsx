
import React from "react";
import { getCurrentUser } from "@/lib/auth/currentUser";
import HeaderClient from "./HeaderClient";

async function Header() {
  // SET UP HEADER BASED ON LOGIN DETAILS
  const session = await getCurrentUser({ withFullUser: true });
  
  return <HeaderClient session={session} />;
}


export default Header;
