import { View } from "@/components/view";
import { createServiceRoleClient } from "@/utils/supabase/service-role";

export type Profile = {
  id: string;
  name: string;
};

export default async function Page() {
  const supabase = await createServiceRoleClient();
  const { data, error } = await supabase.from("profile").select("*");

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    );
  }

  return (
    <View>
      <ul className="flex flex-col gap-3 bg-muted md:rounded-lg p-4">
        {data.map((user, i) => (
          <li
            key={user.id}
            className="border rounded-md p-4 bg-background"
          >{`User ${i + 1}: ${user.name}`}</li>
        ))}
      </ul>
    </View>
  );
}
