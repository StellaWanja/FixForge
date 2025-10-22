import {
  OAuthProvider,
  oAuthProviders,
  UserOAuthTable,
  UserTable,
} from "@/lib/db/schema";
import { NextRequest } from "next/server";
import z from "zod";
import { redirect } from "next/navigation";
import { getOAuthClient } from "@/lib/auth/oauth/base";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { createUserSession } from "@/lib/auth/session";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string | null | undefined }> }
) {
  const { provider: rawProvider } = await params;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const provider = z.enum(oAuthProviders).safeParse(rawProvider);

  if (
    typeof code !== "string" ||
    typeof state !== "string" ||
    !provider.success
  ) {
    return redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again."
      )}`
    );
  }

  const oAuthClient = getOAuthClient(provider.data);

  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state);
    const user = await connectUserToAccount(oAuthUser, provider.data);
    await createUserSession(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return redirect(
        `/sign-in?oauthError=${encodeURIComponent(
          "Failed to connect. Please try again."
        )}`
      );
    }
    console.error("Unknown error occurred");
    return redirect(
      `/sign-in?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again."
      )}`
    );
  }

  return redirect("/dashboard");
}
function connectUserToAccount(
  { id, email, name }: { id: string; email: string; name: string },
  provider: OAuthProvider
) {
  return db.transaction(async (tx) => {
    let user = await tx.query.UserTable.findFirst({
      where: eq(UserTable.email, email),
      columns: { id: true, role: true },
    });

    // create user
    if (!user) {
      const [newUser] = await tx
        .insert(UserTable)
        .values({
          email: email,
          name: name,
        })
        .returning({ id: UserTable.id, role: UserTable.role });

      user = newUser;
    }

    // connect account
    await tx
      .insert(UserOAuthTable)
      .values({ provider, providerAccountId: id, userId: user.id })
      .onConflictDoNothing();

    return user;
  });
}
