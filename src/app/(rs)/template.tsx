// rerenders every time
// are given a unique key, meaning children Client Components reset their state on navigation.
import React from "react";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="animate-appear">
        {children}
    </div>
  );
}
