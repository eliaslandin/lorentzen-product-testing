import { Card, CardContent } from "@/components/ui/card";
import { getTests } from "@/lib/fetchers";

export default async function Page() {
  const { data, error } = await getTests();

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    );
  }

  return (
    <Card>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {data.map((test) => (
            <li key={test.id} className="border rounded-md p-4 bg-background">
              {test.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
