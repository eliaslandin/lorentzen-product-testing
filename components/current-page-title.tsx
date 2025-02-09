"use client";

import { capitalize } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const CurrentPageTitle = () => {
  const pathname = usePathname();

  const currentPage = pathname.split("/").at(-1);
  const title = currentPage?.replace("-", " ");

  return <h1>{title ? capitalize(title) : ""}</h1>;
};
