import { getTestPersons, getTestsTestPersons } from "@/lib/fetchers";
import { List } from "./list";
import { AddPersonToTestButton } from "./add-person-to-test-button";

export const TestAddNewParticipant = async ({ id }: { id: number }) => {
  const { data, error } = await getTestPersons();
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
    <List>
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
  );
};
