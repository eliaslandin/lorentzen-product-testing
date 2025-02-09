import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(string: string) {
  const words = string.split(" ");
  const capWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  return capWords.join(" ");
}
