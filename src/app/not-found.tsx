import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center bg-[url('/images/home-bg.jpg')] bg-cover bg-no-repeat bg-center p-8 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
          <p className="text-white/80 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          href={"/"}
          className="inline-block rounded-lg bg-white backdrop-blur-sm px-4 py-2 text-black hover:bg-white/80 transition-colors duration-200 ease-in-out font-semibold text-xl"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
