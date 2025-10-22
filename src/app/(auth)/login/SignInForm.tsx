"use client";

import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import FormInput from "@/components/features/auth/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { signUpSchema } from "@/actions/auth/authSchemas";
import { signIn } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";

function SignInForm() {
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
  );
}

export default SignInForm;
