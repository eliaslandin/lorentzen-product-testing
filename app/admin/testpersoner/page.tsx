import { Card, CardContent } from "@/components/ui/card";
import { getTestPersons } from "@/lib/fetchers";

export default async function Page() {
  const { data, error } = await getTestPersons();

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
          {data.map((user) => (
            <li key={user.id} className="border rounded-md p-4 bg-background">
              {user.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
