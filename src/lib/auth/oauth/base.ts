import z from "zod";
import crypto from "crypto";
import {
  InvalidStateError,
  InvalidTokenError,
  InvalidUserError,
} from "./errors";
import { validateState, createState } from "./state";
import { getCodeVerifier, createCodeVerifier } from "./code";
import { OAuthProvider } from "@/lib/db/schema";
import { createDiscordOAuthClient } from "./discord";
import { cookies } from "next/headers";

const CODE_VERIFIER_COOKIE_KEY = "oAuthCodeVerifier";
const STATE_COOKIE_KEY = "oAuthState";

export class OAuthClient<T> {
  private readonly provider: OAuthProvider;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: {
    auth: string;
    token: string;
    user: string;
  };
  private readonly userInfo: {
    schema: z.ZodSchema<T>;
    parser: (data: T) => { id: string; email: string; name: string };
  };
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  });
  private readonly userSchema = z.object({
    id: z.string(),
    username: z.string(),
    global_name: z.string().nullable(),
    email: z.string(),
  });

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: {
    provider: OAuthProvider;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    urls: {
      auth: string;
      token: string;
      user: string;
    };
    userInfo: {
      schema: z.ZodSchema<T>;
      parser: (data: T) => { id: string; email: string; name: string };
    };
  }) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
    this.userInfo = userInfo;
  }

  private get redirectURL() {
    return new URL(
      `/api/oauth/${this.provider}`,
      process.env.NEXT_PUBLIC_BASE_URL!
    );
  }

  async createAuthURL() {
    const state = await createState();
    const codeVerifier = await createCodeVerifier();
    const url = new URL(this.urls.auth);

    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("redirect_uri", this.redirectURL.toString());
    url.searchParams.set("response_type", "code"); // get code
    url.searchParams.set("scope", this.scopes.join(" "));
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set(
      "code_challenge",
      crypto.hash("sha256", codeVerifier, "base64url")
    );
    return url.toString();
  }
  async fetchUser(code: string, state: string) {
    const isValidState = await validateState(state);

    if (!isValidState) throw new InvalidStateError();

    const { accessToken, tokenType } = await this.fetchToken(
      code,
      await getCodeVerifier()
    );

    const user = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, success, error } =
        this.userInfo.schema.safeParse(rawData);
        if (!success) throw new InvalidUserError(error);
        return data;
      });


    return this.userInfo.parser(user);
  }

  private async fetchToken(code: string, codeVerifier: string) {
    return fetch(this.urls.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectURL.toString(),
        grant_type: "authorization_code",
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code_verifier: codeVerifier,
      }),
    })
      .finally(async () => {
        // clear cookies
        (await cookies()).delete(CODE_VERIFIER_COOKIE_KEY);
        (await cookies()).delete(STATE_COOKIE_KEY);
      })
      .then((res) => res.json())
      .then((rawData) => {
        const { data, success, error } = this.tokenSchema.safeParse(rawData);
        if (!success) throw new InvalidTokenError(error);

        return {
          accessToken: data.access_token,
          tokenType: data.token_type,
        };
      });
  }
}
export function getOAuthClient(provider: OAuthProvider) {
  switch (provider) {
    case "discord":
      return createDiscordOAuthClient();
    default:
      throw new Error(`Invalid provider: ${provider satisfies never}`);
  }
}
