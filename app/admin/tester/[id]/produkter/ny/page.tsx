import { View } from "@/components/view";
import { CreateProductForm } from "@/components/create-product-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { H1 } from "@/components/H1";

export default async function AddProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return (
    <View className="items-center">
      <Card className="max-w-2xl">
        <CardHeader>
          <H1>Ny produkt</H1>
        </CardHeader>
        <CardContent>
          <CreateProductForm testId={id} />
        </CardContent>
      </Card>
    </View>
  );
}
