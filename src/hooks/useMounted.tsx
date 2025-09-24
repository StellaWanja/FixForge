"use client";

import { useState, useEffect } from "react";

function useMounted() {
  // prevent hydration error on dark / light themes
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default useMounted;
