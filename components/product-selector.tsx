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
import { RemoveProductButton } from "./remove-product-button";
import { ProductList } from "./product-list";

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
      <ProductList
        products={products}
        selected={selected}
        setSelectedAction={setSelected}
        testId={testId}
      />
      <Card>
        <CardHeader className="gap-2">
          <Avatar className="rounded-sm self-center h-60 w-60">
            <AvatarImage src={selected.image_url} className="object-contain" />
            <AvatarFallback className="rounded-none bg-secondary" />
          </Avatar>
          <View className="flex-row border rounded-md p-1">
            <RemoveProductButton id={selected.id} />
          </View>
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
