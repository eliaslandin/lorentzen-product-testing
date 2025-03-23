import { XIcon } from "lucide-react";
import { Button } from "./ui/button";

export const RemovePersonFromTestButton = ({
  relationId,
  testId,
}: {
  relationId: number;
  testId: number;
}) => {
  return (
    <Button size="icon" variant="ghost">
      <XIcon className="w-5 h-5" />
    </Button>
  );
};
