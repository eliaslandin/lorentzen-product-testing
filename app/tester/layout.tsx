import { ReactNode } from "react";
import { View } from "@/components/view";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <View className="min-h-screen items-center bg-muted md:px-4 md:py-4">
      <View className="items-center max-w-6xl">{children}</View>
    </View>
  );
}
