import { getTestPersons } from "@/lib/fetchers";
import { List } from "./list";
import { AddPersonToTestButton } from "./add-person-to-test-button";

export const TestAddNewParticipant = async ({ id }: { id: number }) => {
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
    <List>
      {data.map((user) => (
        <AddPersonToTestButton key={user.id} testId={id} user={user} />
      ))}
    </List>
  );
};
