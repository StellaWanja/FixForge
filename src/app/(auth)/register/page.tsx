import React from "react";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import OAuthButtons from "../OAuthButtons";

export default async function Register({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>;
}) {
  const { oauthError } = await searchParams;

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[url('/images/home-bg.jpg')] bg-cover bg-no-repeat bg-center p-8 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 w-full max-w-md">
        <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-white/80">Join us to get started</p>
          </div>

          <div className="flex flex-col gap-4">
            {oauthError && (
              <p className="text-destructive text-center">{oauthError}</p>
            )}
            <OAuthButtons />
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/10 text-white/80">
                Or continue with email
              </span>
            </div>
          </div>

          <RegisterForm />

          <div className="mt-6 text-center space-y-2">
            <p className="text-white/80 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
            <Link
              href="/"
              className="text-white/60 text-sm hover:text-white transition-colors inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
