import { getTestsTestPersons } from "@/lib/fetchers";
import { List } from "./list";

export const TestAddedParticipants = async ({ id }: { id: number }) => {
  const { data, error } = await getTestsTestPersons(id);

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
        <li key={user.user_test_relation_id}>{user.name}</li>
      ))}
    </List>
  );
};
