"use client";

import { useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";

// Page to redirect from client so auth cookie gets set
// Used for logging in users with magic link without emails
export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string> | undefined>;
}) {
  const effectHasRun = useRef(false);
  const search = use(searchParams);
  const router = useRouter();

  useEffect(() => {
    if (!effectHasRun.current) {
      if (!searchParams) {
        router.push("/");
      }

      const params = new URLSearchParams(search);
      router.push(`/auth/confirm?${params}`);

      effectHasRun.current = true;
    }
  }, [searchParams]);
}
