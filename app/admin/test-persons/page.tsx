import { createServiceRoleClient } from "@/utils/supabase/service-role";
import Link from "next/link";

export default async function Page() {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    );
  }

  console.log(data);

  return (
    <div>
      <Link href="/admin/test-persons/add" className="text-accent underline">
        Skapa användare
      </Link>
      <h1>Test Persons:</h1>
      <ul className="flex flex-col gap-4">
        {data.users.map((user, i) => (
          <li key={user.id}>{`User ${i + 1}: ${user.user_metadata.name}`}</li>
        ))}
      </ul>
    </div>
  );
}
