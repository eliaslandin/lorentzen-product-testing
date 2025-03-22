import { getTestPersons } from "@/lib/fetchers";
import { List } from "./list";
import { Button } from "./ui/button";

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
      {data.map((testPerson) => (
        <Button key={testPerson.id} variant="outline">
          {testPerson.name}
        </Button>
      ))}
    </List>
  );
};
