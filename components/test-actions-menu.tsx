import { EditIcon, EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTriggerIcon,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { RemoveTestButton } from "./remove-test-button";

export const TestActionsMenu = ({ testId }: { testId: number }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTriggerIcon className="text-muted-foreground">
        <EllipsisIcon />
      </DropdownMenuTriggerIcon>
      <DropdownMenuContent align="end">
        <Link href={`/admin/tester/${testId}/redigera`}>
          <DropdownMenuItem className="flex items-center gap-3 p-2">
            <EditIcon className="w-5 h-5" />
            Redigera
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="p-0">
          <RemoveTestButton testId={testId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
