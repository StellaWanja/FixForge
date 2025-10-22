"use server";

import crypto from "crypto";
import { cookies } from "next/headers";

const STATE_COOKIE_KEY = "oAuthState";
const COOKIE_EXPIRATION_SECONDS = 60 * 10;

export async function createState() {
  const state = crypto.randomBytes(64).toString("hex").normalize();
  (await cookies()).set(STATE_COOKIE_KEY, state, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(Date.now() + COOKIE_EXPIRATION_SECONDS * 1000),
  });

  return state;
}

export async function validateState(state: string) {
  const cookieState = (await cookies()).get(STATE_COOKIE_KEY)?.value;
  return decodeURIComponent(cookieState ?? "") === decodeURIComponent(state);
}
