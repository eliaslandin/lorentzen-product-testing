import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTriggerIcon,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import Link from "next/link";

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
        <DropdownMenuItem className="flex items-center gap-3 p-2">
          <TrashIcon className="w-5 h-5" />
          Radera
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
