import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Session } from "next-auth";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { signOut } from "@/server/auth";
import Link from "next/link";

function UserButton({ session }: { session: Session }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-9 w-9">
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOutIcon />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
