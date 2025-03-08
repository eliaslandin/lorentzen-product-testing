import { View } from "@/components/view";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateTestForm } from "@/components/create-test-form";

export default function AddUserPage() {
  return (
    <View className="items-center">
      <Card className="max-w-2xl">
        <CardHeader>Skapa nytt test</CardHeader>
        <CardContent>
          <CreateTestForm />
        </CardContent>
      </Card>
    </View>
  );
}
