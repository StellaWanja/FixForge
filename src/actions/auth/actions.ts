"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { signInSchema, signUpSchema } from "./authSchemas";
import { UserTable } from "@/lib/db/schemas/userSchema";
import { db } from "@/lib/db";
import { generateSalt, hashPassword } from "@/lib/auth/hashPassword";
import { createUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {}

// Verify data, hash password -> save user to DB -> create user session -> save session to Redis -> save session cookie
export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Unable to create account";

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null) return "Account already exists. Please log in.";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user === null) return "Unable to create account";
    await createUserSession(user);
  } catch {
    return "Unable to create account";
  }

  redirect("/home");
}
