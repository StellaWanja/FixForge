import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { UserTable } from "@/lib/db/schema";
import { getUserFromSession } from "./session";
import { redirect } from "next/navigation";
import { cache } from "react";

// get all user info
async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
}) {
  // get user from session
  const user = await getUserFromSession();

  // if no user session id, return null
  if (!user) {
    if (redirectIfNotFound) return redirect("/login");
    return null;
  }

  //  get user from db
  if (withFullUser) {
    const fullUser = withFullUser ? await getUserFromDB(user.id) : null;
    if (!fullUser) throw new Error("User not found");
    return fullUser;
  }

  return user;
}

// cache the current user to access db only once if called multiple times
export const getCurrentUser = cache(_getCurrentUser);

function getUserFromDB(id: string) {
  return db.query.UserTable.findFirst({
    columns: { id: true, name: true, email: true, role: true },
    where: eq(UserTable.id, id),
  });
}
