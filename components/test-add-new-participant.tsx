import { getTestPersons, getTestsTestPersons } from "@/lib/fetchers";
import { List } from "./list";
import { AddPersonToTestButton } from "./add-person-to-test-button";
import { View } from "./view";
import { SearchInput } from "./search-input";
import { PaginationUrlState } from "./pagination-url-state";

const PAGINATION_PAGE_SIZE = 5;

export const TestAddNewParticipant = async ({
  id,
  query,
  page,
}: {
  id: number;
  query?: string;
  page?: string;
}) => {
  const { data, count, error } = await getTestPersons(query, {
    page: Math.max(1, Number(page) || 1),
    pageSize: PAGINATION_PAGE_SIZE,
  });
  const { data: addedPersons, error: addedError } =
    await getTestsTestPersons(id);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    );
  }

  if (addedError) {
    return (
      <div>
        <h1>Error</h1>
        {addedError.message}
      </div>
    );
  }

  return (
    <View className="gap-3">
      <div className="px-2">
        <SearchInput queryKey="q2" placeholder="Sök testperson..." />
      </div>
      <List className="gap-1">
        {data.map((user) => (
          <li key={user.id}>
            <AddPersonToTestButton
              testId={id}
              user={user}
              alreadyAdded={addedPersons.some(
                (addedPerson) => addedPerson.id === user.id,
              )}
            />
          </li>
        ))}
      </List>
      <PaginationUrlState
        itemCount={count}
        pageSize={PAGINATION_PAGE_SIZE}
        queryKey="p2"
      />
    </View>
  );
};
