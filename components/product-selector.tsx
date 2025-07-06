"use client";

import Link from "next/link";
import { H2 } from "./H2";
import { List } from "./list";
import { P } from "./P";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { View } from "./view";
import { ProductWithImage } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

export const ProductSelector = ({
  products,
  testId,
}: {
  products: ProductWithImage[];
  testId: number;
}) => {
  const [selected, setSelected] = useState<ProductWithImage>(products[0]);

  return (
    <View className="lg:flex-row gap-4">
      <Card>
        <CardHeader className="text-center">
          <H2 className="pl-4">Produkter</H2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild variant="secondary">
            <Link href={`/admin/tester/${testId}/produkter/ny`}>
              Ny produkt
            </Link>
          </Button>
          <List>
            {products.map((product) => (
              <li key={product.id}>
                <Button
                  variant="ghost"
                  onClick={() => setSelected(product)}
                  className={cn(
                    "flex w-full h-auto text-left items-start justify-start border border-secondary flex-row gap-5 p-3 hover:bg-muted",
                    selected.id === product.id
                      ? "border-primary/30 border-2"
                      : "",
                  )}
                >
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
                  {selected.id === product.id && (
                    <ChevronRightIcon className="self-center w-12 h-12 text-primary/50" />
                  )}
                </Button>
              </li>
            ))}
          </List>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Avatar className="rounded-sm self-center h-60 w-60">
            <AvatarImage src={selected.image_url} className="object-contain" />
            <AvatarFallback className="rounded-none bg-secondary" />
          </Avatar>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <View className="py-2">
            <H2>{selected.name}</H2>
            <P>{selected.description}</P>
          </View>
          <List>
            <p>Questions....</p>
          </List>
        </CardContent>
      </Card>
    </View>
  );
};
