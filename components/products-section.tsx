import Link from "next/link";
import { H2 } from "./H2";
import { List } from "./list";
import { P } from "./P";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { View } from "./view";
import { getProducts } from "@/lib/fetchers";

export const ProductsSection = async ({ testId }: { testId: number }) => {
  const { data, error } = await getProducts(testId);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    );
  }

  return (
    <View>
      <H2 className="pl-4">Produkter</H2>
      <Card>
        <CardHeader>
          <Button asChild variant="secondary">
            <Link href={`/admin/tester/${testId}/produkter/ny`}>
              Ny produkt
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="pt-3">
          <List>
            {data.map((product) => (
              <li key={product.id}>
                <Link href={`/admin/tester/${testId}/produkter/${product.id}`}>
                  <Card className="flex width-full border border-secondary flex-row gap-5 p-3">
                    <Avatar className="rounded-sm self-center h-32 w-32">
                      <AvatarImage
                        src={product.image_url}
                        className="object-contain"
                      />
                      <AvatarFallback className="rounded-none bg-secondary" />
                    </Avatar>
                    <View className="py-2">
                      <h3 className="text-lg">{product.name}</h3>
                      <P>{product.description}</P>
                    </View>
                  </Card>
                </Link>
              </li>
            ))}
          </List>
        </CardContent>
      </Card>
    </View>
  );
};
