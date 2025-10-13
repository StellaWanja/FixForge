"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import FormInput from "@/components/features/auth/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { signUpSchema } from "@/actions/auth/authSchemas";
import { signIn } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    data: z.infer<typeof signUpSchema>
  ) => {
    const error = await signIn(data);
    setFormError(error);
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[url('/images/home-bg.jpg')] bg-cover bg-no-repeat bg-center p-8 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 w-full max-w-md">
        <section className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-white/80">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* error message */}
            {formError && (
              <p className="mt-1 text-sm text-destructive">{formError}</p>
            )}

            <FormInput
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
                setValueAs: (v) => v.trim(),
              })}
              error={errors.email}
            />

            <FormInput
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={Lock}
              toggleVisibility={() => {
                setShowPassword((prev) => !prev);
              }}
              showPassword={showPassword}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message:
                    "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                setValueAs: (v) => v.trim(),
              })}
              error={errors.password}
            />

            <Button
              type="submit"
              className="w-full bg-white backdrop-blur-sm border border-white/30 text-md font-bold cursor-pointer transition-all duration-300"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-white/80 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-white font-medium hover:underline"
              >
                Sign Up
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

export default Login;
