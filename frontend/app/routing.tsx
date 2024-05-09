"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Routing() {
  const path = usePathname();

  useEffect(() => {
    // Close dropdowns on navigation
    (document.activeElement as HTMLElement)?.blur();
  }, [path]);

  return null;
}
