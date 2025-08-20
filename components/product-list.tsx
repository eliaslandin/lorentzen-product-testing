"use client";

import Link from "next/link";
import { List } from "./list";
import { P } from "./P";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { View } from "./view";
import { ProductWithImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export const ProductList = ({
  products,
  selected,
  setSelectedAction,
  testId,
}: {
  products: ProductWithImage[];
  selected: ProductWithImage | null;
  setSelectedAction: Dispatch<SetStateAction<ProductWithImage | null>>;
  testId: number;
}) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <Button asChild variant="outline" className="max-w-48">
          <Link className="gap-1" href={`/admin/tester/${testId}/produkter/ny`}>
            <PlusIcon />
            Ny produkt
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <List>
          {products.map((product) => (
            <li key={product.id}>
              <Button
                variant="ghost"
                onClick={() => setSelectedAction(product)}
                className={cn(
                  "flex w-full h-auto text-left items-start justify-start border border-secondary flex-row gap-5 p-3 hover:bg-muted",
                  selected?.id === product.id
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
                {selected?.id === product.id && (
                  <ChevronRightIcon className="self-center w-12 h-12 text-primary/50" />
                )}
              </Button>
            </li>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
