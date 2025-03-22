import { List } from "@/components/list";
import { Card, CardContent } from "@/components/ui/card";
import { getTests } from "@/lib/fetchers";
import Link from "next/link";

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
        <List>
          {data.map((test) => (
            <Link key={test.id} href={`/admin/tester/${test.id}`}>
              <li className="flex w-full justify-between border rounded-md p-4 bg-background">
                <p>{test.name}</p>
                <p>{test.city_name}</p>
              </li>
            </Link>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
