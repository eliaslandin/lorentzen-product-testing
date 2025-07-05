export default async function Page({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = await params;
  return (
    <div>
      <h1>Product id {productId}</h1>
    </div>
  );
}
