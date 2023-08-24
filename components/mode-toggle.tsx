"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <>
      <HoverCard>
        <DropdownMenu>
          <HoverCardTrigger>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-fit">
                <HoverCardContent>Click to change</HoverCardContent>
                <h1 className="scale-100 dark:scale-0">Current Theme: Light</h1>
                <h1 className="absolute scale-0 dark:scale-100">
                  Current Theme: Dark
                </h1>
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </HoverCardTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </HoverCard>
    </>
  );
}
