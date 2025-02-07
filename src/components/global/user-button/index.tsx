import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contact, LogOut } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  afterSignOutUrl: string;
  user: User | undefined;
}

export const UserButton = ({ user, afterSignOutUrl }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1 rounded-full">
          {user?.image ? (
            <Image
              src={user?.image}
              alt={user?.name || "User"}
              width={40}
              height={40}
              priority={true}
              className="rounded-full"
            />
          ) : (
            <Avatar>
              <AvatarImage alt="Profile Picture" />
              <AvatarFallback className="bg-primary">
                {(user?.name || "User").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>
          <p className="font-bold">{user?.name}</p>
          <p className="text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <Contact /> Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut({ redirectTo: afterSignOutUrl })}
            className="w-full text-left"
          >
            <LogOut /> Cerrar sesión
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
