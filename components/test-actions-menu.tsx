import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTriggerIcon,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

export const TestActionsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTriggerIcon className="text-muted-foreground">
        <EllipsisIcon />
      </DropdownMenuTriggerIcon>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-3 p-2">
          <EditIcon className="w-5 h-5" />
          Redigera
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3 p-2">
          <TrashIcon className="w-5 h-5" />
          Radera
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
