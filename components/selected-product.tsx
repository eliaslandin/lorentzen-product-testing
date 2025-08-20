"use client";

import { H2 } from "./H2";
import { List } from "./list";
import { P } from "./P";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { View } from "./view";
import { ProductWithImage } from "@/lib/types";
import { RemoveProductButton } from "./remove-product-button";
import { Dispatch, SetStateAction } from "react";

export const SelectedProduct = ({
  product,
  products,
  setSelectedAction,
}: {
  product: ProductWithImage | null;
  products: ProductWithImage[];
  setSelectedAction: Dispatch<SetStateAction<ProductWithImage | null>>;
}) => {
  if (!product) {
    return <Card></Card>;
  }

  return (
    <Card>
      <CardHeader className="gap-2">
        <Avatar className="rounded-sm self-center h-60 w-full">
          <AvatarImage src={product.image_url} className="object-contain" />
          <AvatarFallback className="rounded-none bg-secondary" />
        </Avatar>
        <div className="px-4 w-auto flex justify-center">
          <View className="flex-row flex-0 min-w-72 justify-between border rounded-full py-1 px-4 bg-white">
            <RemoveProductButton
              product={product}
              products={products}
              setSelectedAction={setSelectedAction}
            />
          </View>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <View className="py-2">
          <H2>{product.name}</H2>
          <P>{product.description}</P>
        </View>
        <List>
          <p>Questions....</p>
        </List>
      </CardContent>
    </Card>
  );
};
