"use client";

import { View } from "./view";
import { ProductWithImage } from "@/lib/types";
import { useState } from "react";
import { ProductList } from "./product-list";
import { SelectedProduct } from "./selected-product";

export const ProductSelector = ({
  products,
  testId,
}: {
  products: ProductWithImage[];
  testId: number;
}) => {
  const [selected, setSelected] = useState<ProductWithImage | null>(
    products[0] || null,
  );

  return (
    <View className="lg:flex-row gap-4">
      <ProductList
        products={products}
        selected={selected}
        setSelectedAction={setSelected}
        testId={testId}
      />
      <SelectedProduct
        products={products}
        product={selected}
        setSelectedAction={setSelected}
      />
    </View>
  );
};
