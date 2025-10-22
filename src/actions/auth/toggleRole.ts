"use server";

import { getCurrentUser } from "@/lib/auth/currentUser";
import { updateUserSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { UserTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function toggleRole() {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (!user) return null;

  const [updatedUser] = await db
    .update(UserTable)
    .set({ role: user.role === "admin" ? "user" : "admin" })
    .where(eq(UserTable.id, user.id))
    .returning({ id: UserTable.id, role: UserTable.role });

  updateUserSession(updatedUser);
}
