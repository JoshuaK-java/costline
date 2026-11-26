import { ChevronDownIcon, FolderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/** Placeholder until projects exist (SPC-3, CL-161). Shows a made-up project name. */
export function ProjectSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="min-w-0 gap-1.5 px-2 font-semibold">
          <FolderIcon className="text-muted-foreground" aria-hidden />
          <span className="truncate">Sample project</span>
          <ChevronDownIcon className="text-muted-foreground" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>Project switching comes later</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
