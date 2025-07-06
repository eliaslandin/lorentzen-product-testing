import { getProducts } from "@/lib/fetchers";
import { ProductSelector } from "./product-selector";

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

  return <ProductSelector products={data} testId={testId} />;
};
