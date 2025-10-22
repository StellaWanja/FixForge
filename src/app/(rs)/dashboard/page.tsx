import React from "react";
import { Metadata } from "next";
import Toggle from "./togglerole";
import { getCurrentUser } from "@/lib/auth/currentUser";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Dashboard() {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  return (
    <div>
      <Toggle />
      <p>{user?.role}</p>
    </div>
  );
}

export default Dashboard;
