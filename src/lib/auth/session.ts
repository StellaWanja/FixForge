"use server";

import { cookies } from "next/headers";
import z from "zod";
import crypto from "crypto";
import { User } from "@/models/user";
import { userRoles } from "@/lib/db/schema";
import { redis } from "@/lib/redis/redis";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "session-id";

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});

type UserSession = z.infer<typeof sessionSchema>;

export async function createUserSession(user: UserSession) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();

  await redis.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  (await cookies()).set(COOKIE_SESSION_KEY, sessionId, {
    httpOnly: true, //only accessible on server
    secure: true,
    sameSite: "lax",
    expires: new Date(Date.now() + SESSION_EXPIRATION_SECONDS * 1000),
  });
}

// Set session cookie
export const setSessionCookie = async (user: User) => {
  (await cookies()).set(COOKIE_SESSION_KEY, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_EXPIRATION_SECONDS,
    path: "/",
  });
};

// get session cookie
export const getSessionCookie = async (): Promise<User | null> => {
  const session = (await cookies()).get(COOKIE_SESSION_KEY)?.value;
  if (!session) return null;
  const user = JSON.parse(session) as User;
  return user;
};

// delete session cookie
export const deleteSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_SESSION_KEY);
};
