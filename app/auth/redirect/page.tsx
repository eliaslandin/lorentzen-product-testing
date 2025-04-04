"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Page to redirect from client so auth cookie gets set
// Used for logging in users with magic link without emails
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) {
      router.push("/");
    }

    const params = searchParams.toString();
    router.push(`/auth/confirm?${params}`);
  }, [searchParams]);
}
