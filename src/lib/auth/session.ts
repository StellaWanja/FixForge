"use server";

import { cookies } from "next/headers";
import z from "zod";
import crypto from "crypto";
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

export async function getUserFromSession() {
  const sessionId = (await cookies()).get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;
  return getUserSessionById(sessionId);
}

async function getUserSessionById(sessionId: string) {
  const user = await redis.get(`session:${sessionId}`);
  const { success, data } = sessionSchema.safeParse(user);
  return success ? data : null;
}

export async function removeUserSession() {
  const sessionId = (await cookies()).get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;

  await redis.del(`session:${sessionId}`);
  (await cookies()).delete(COOKIE_SESSION_KEY);
}

