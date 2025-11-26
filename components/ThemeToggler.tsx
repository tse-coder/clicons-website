"use client";

import * as React from "react";
import { Computer, Moon, PcCase, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex-col flex min-w-0">
        <DropdownMenuItem onClick={() => setTheme("light")} className="w-8">
          <Sun className="mr-2 h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="w-8">
          <Moon className="mr-2 h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="w-8">
          <Computer className="mr-2 h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
