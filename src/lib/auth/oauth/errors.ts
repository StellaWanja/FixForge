import { z } from "zod";

export class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid token");
    this.cause = zodError;
  }
}

export class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid user");
    this.cause = zodError;
  }
}

export class InvalidStateError extends Error {
  constructor() {
    super("Invalid state");
  }
}

export class InvalidCodeVerifierError extends Error {
  constructor() {
    super("Invalid code verifier");
  }
}
