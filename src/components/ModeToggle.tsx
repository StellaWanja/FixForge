"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import useMounted from "@/hooks/useMounted";
import { animationProperties } from "./variants";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const mounted = useMounted();
  const { theme, setTheme, systemTheme } = useTheme();

  // get current theme
  const currentTheme = theme === "system" ? systemTheme : theme;

  // get animation state based on current theme
  const animationState =
    animationProperties[currentTheme === "dark" ? "light" : "dark"];

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="rounded-full size-fit cursor-pointer"
      variant={"ghost"}
      size={"icon"}
      type="button"
      aria-label="Toggle dark / light mode"
      title="Toggle dark / light mode"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        animate={animationState.svg}
        transition={{ type: "spring", stiffness: 250, damping: 35 }}
      >
        <mask id="logoMask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle
            animate={animationState.mask}
            cx="0"
            cy={"0"}
            r="7"
            fill="black"
            transition={{ type: "spring", stiffness: 250, damping: 35 }}
          />
        </mask>

        <motion.circle
          cx="12"
          cy="12"
          r="0"
          animate={animationState.circle}
          fill="currentColor"
          stroke="none"
          mask="url(#logoMask)"
          transition={{ type: "spring", stiffness: 250, damping: 35 }}
        />

        <motion.g
          stroke="currentColor"
          strokeWidth="2.5"
          animate={animationState.lines}
          transition={{ duration: 0.3 }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </Button>
  );
}
