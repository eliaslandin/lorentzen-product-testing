import { ReactNode } from "react";
import { View } from "@/components/view";
import { Logo } from "@/components/logo";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <View className="min-h-screen items-center bg-muted md:px-4 py-4">
      <View className="items-center max-w-6xl gap-4">
        <header className="w-full flex justify-between px-4">
          <Logo className="max-w-12" />
        </header>
        {children}
      </View>
    </View>
  );
}
