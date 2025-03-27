import { getTestsTestPersons } from "@/lib/fetchers";
import { List } from "./list";
import Link from "next/link";
import { RemovePersonFromTestButton } from "./remove-person-from-test-button";
import { UserRoundIcon } from "lucide-react";
import { View } from "./view";
import { SearchInput } from "./search-input";
import { PaginationUrlState } from "./pagination-url-state";

const PAGINATION_PAGE_SIZE = 15;

export const TestAddedParticipants = async ({
  id,
  query,
}: {
  id: number;
  query?: string;
}) => {
  const { data, count, error } = await getTestsTestPersons(id, query);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    );
  }

  return (
    <View className="gap-3">
      <div className="px-2">
        <SearchInput queryKey="q1" placeholder="Sök testperson..." />
      </div>
      <List className="gap-1">
        {data.map((user) => (
          <li key={user.user_test_relation_id} className="flex justify-between">
            <Link
              href={`/admin/testpersoner/${user.id}`}
              className="flex gap-3 w-full items-center hover:bg-accent rounded-xl p-2 transition-colors group"
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
  );
};
