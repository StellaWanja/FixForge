"use client";

import React, { forwardRef } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormInputProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  icon: LucideIcon;
  toggleVisibility?: () => void;
  showPassword?: boolean;
  error?: { message?: string };
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      id,
      type,
      placeholder,
      icon: Icon,
      toggleVisibility,
      showPassword,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-white">
          {label}
        </Label>
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            ref={ref}
            className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/50"
            autoComplete="on"
            {...props}
          />
          {id === "password" && (
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-destructive">{error.message}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
