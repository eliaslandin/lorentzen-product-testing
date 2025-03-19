export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <h1>Test ID is: {id}</h1>;
}
