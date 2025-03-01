import { Spinner } from "@/components/spinner";
import { View } from "@/components/view";

export default function Loading() {
  return (
    <View className="justify-center items-center min-h-[40vh]">
      <Spinner className="h-8 w-8 text-primary" />
    </View>
  );
}
