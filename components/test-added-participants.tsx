import { getTestsTestPersons } from "@/lib/fetchers";

export const TestAddedParticipants = async ({ id }: { id: number }) => {
  const { data, error } = getTestsTestPersons(id);

  return <div>tillagda</div>;
};
