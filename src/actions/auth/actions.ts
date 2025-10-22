"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { signInSchema, signUpSchema } from "./authSchemas";
import { OAuthProvider, UserTable } from "@/lib/db/schemas/userSchema";
import { db } from "@/lib/db";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "@/lib/auth/hashPassword";
import { createUserSession, removeUserSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getOAuthClient } from "@/lib/auth/oauth/base";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to sign in";

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, role: true, email: true },
    where: eq(UserTable.email, data.email),
  });

  if (!user || user.password === null || user.salt === null) {
    return "Unable to sign in";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to sign in";

  await createUserSession(user);

  redirect("/dashboard");
}

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

  redirect("/dashboard");
}

export async function signOut() {
  await removeUserSession();
  redirect("/");
}

export async function oAuthSignUp(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider);
  redirect(await oAuthClient.createAuthURL());
}
