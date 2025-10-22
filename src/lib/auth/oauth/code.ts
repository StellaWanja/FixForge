import crypto from "crypto";
import { cookies } from "next/headers";
import { InvalidCodeVerifierError } from "./errors";

const COOKIE_EXPIRATION_SECONDS = 60 * 10;
const CODE_VERIFIER_COOKIE_KEY = "oAuthCodeVerifier";

export async function createCodeVerifier() {
  const codeVerifier = crypto.randomBytes(64).toString("hex").normalize();
  (await cookies()).set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
    secure: true,
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(Date.now() + COOKIE_EXPIRATION_SECONDS * 1000),
  });

  return codeVerifier;
}

export async function getCodeVerifier() {
  const codeVerifier = (await cookies()).get(CODE_VERIFIER_COOKIE_KEY)?.value;
  if (!codeVerifier) throw new InvalidCodeVerifierError();
  return codeVerifier;
}
