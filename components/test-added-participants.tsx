import { getTestsTestPersons } from "@/lib/fetchers";
import { List } from "./list";
import Link from "next/link";
import { RemovePersonFromTestButton } from "./remove-person-from-test-button";

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
        <li key={user.user_test_relation_id} className="flex justify-between">
          <Link href={`/admin/testpersoner/${user.id}`}>{user.name}</Link>
          <RemovePersonFromTestButton
            relationId={user.user_test_relation_id}
            testId={id}
          />
        </li>
      ))}
    </List>
  );
};
