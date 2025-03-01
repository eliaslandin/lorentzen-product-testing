import { View } from "@/components/view";
import { CreateTestPersonForm } from "@/components/create-test-person-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AddUserPage() {
  return (
    <View className="items-center">
      <Card className="max-w-2xl">
        <CardHeader>Skapa ny testperson</CardHeader>
        <CardContent>
          <CreateTestPersonForm />
        </CardContent>
      </Card>
    </View>
  );
}
