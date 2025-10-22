//  preserve state, remain interactive, and do not rerender.
import Header from "@/components/layout/Header/Header";
import React, { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center text-white">
            Loading...
          </div>
        }
      >
        <div className="px-4 py-2">{children}</div>
      </Suspense>
    </div>
  );
}
