import { View } from "@/components/view";
import { CreateTestPersonForm } from "@/components/create-test-person-form";

export default function AddUserPage() {
  return (
    <View className="items-center">
      <View className="max-w-2xl">
        <CreateTestPersonForm />
      </View>
    </View>
  );
}
