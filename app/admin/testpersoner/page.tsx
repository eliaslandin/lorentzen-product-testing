import { List } from "@/components/list";
import { PaginationUrlState } from "@/components/pagination-url-state";
import { Card, CardContent } from "@/components/ui/card";
import { View } from "@/components/view";
import { getTestPersons } from "@/lib/fetchers";

const PAGINATION_PAGE_SIZE = 20;

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    p?: string;
  }>;
}) {
  const search = await searchParams;
  const { data, count, error } = await getTestPersons(undefined, {
    page: Math.max(1, Number(search?.p) || 1),
    pageSize: PAGINATION_PAGE_SIZE,
  });

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
        <View className="gap-3">
          <List>
            {data.map((user) => (
              <li key={user.id} className="border rounded-md p-4 bg-background">
                {user.name}
              </li>
            ))}
          </List>
          <PaginationUrlState
            itemCount={count}
            pageSize={PAGINATION_PAGE_SIZE}
            queryKey={"p"}
          />
        </View>
      </CardContent>
    </Card>
  );
}
