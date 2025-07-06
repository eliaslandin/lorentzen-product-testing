import { getTestsTestPersons } from "@/lib/fetchers";
import { List } from "./list";
import Link from "next/link";
import { RemovePersonFromTestButton } from "./remove-person-from-test-button";
import { UserRoundIcon } from "lucide-react";
import { View } from "./view";
import { SearchInput } from "./search-input";
import { PaginationUrlState } from "./pagination-url-state";
import { Card, CardContent, CardHeader } from "./ui/card";
import { H2 } from "./H2";

const PAGINATION_PAGE_SIZE = 15;

export const TestAddedParticipants = async ({
  id,
  query,
  page,
}: {
  id: number;
  query?: string;
  page?: string;
}) => {
  const { data, count, error } = await getTestsTestPersons(id, query, {
    page: Math.max(1, Number(page) || 1),
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
      <CardHeader className="text-center">
        <H2>Tillagda testpersoner</H2>
      </CardHeader>
      <CardContent>
        <View className="gap-3">
          <div className="px-2">
            <SearchInput queryKey="q1" placeholder="Sök testperson..." />
          </div>
          <List className="gap-1">
            {data.map((user) => (
              <li
                key={user.user_test_relation_id}
                className="flex justify-between"
              >
                <Link
                  href={`/admin/testpersoner/${user.id}`}
                  className="flex gap-3 w-full items-center hover:bg-muted rounded-xl p-2 transition-colors group"
                >
                  <UserRoundIcon className="bg-secondary rounded-full text-white p-1 h-8 w-8 transition-colors group-hover:bg-primary" />
                  {user.name}
                </Link>
                <RemovePersonFromTestButton
                  relationId={user.user_test_relation_id}
                  testId={id}
                />
              </li>
            ))}
          </List>
          <PaginationUrlState
            itemCount={count}
            pageSize={PAGINATION_PAGE_SIZE}
            queryKey="p1"
          />
        </View>
      </CardContent>
    </Card>
  );
};
