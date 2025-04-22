import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64 pt-8">
      <h1 className="text-2xl font-medium">Logga in</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="epost@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Lösenord</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/glomt-losenord"
          >
            Glömt lösenord?
          </Link>
        </div>
        <Input type="password" name="password" required />
        <SubmitButton pendingText="Loggar in..." formAction={signInAction}>
          Logga in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
