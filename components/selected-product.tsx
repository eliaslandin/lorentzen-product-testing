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
  product: ProductWithImage;
  products: ProductWithImage[];
  setSelectedAction: Dispatch<SetStateAction<ProductWithImage>>;
}) => {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Avatar className="rounded-sm self-center h-60 w-60">
          <AvatarImage src={product.image_url} className="object-contain" />
          <AvatarFallback className="rounded-none bg-secondary" />
        </Avatar>
        <View className="flex-row border rounded-md p-1">
          <RemoveProductButton id={product.id} />
        </View>
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
