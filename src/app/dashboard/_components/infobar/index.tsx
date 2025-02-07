"use client";

import { ModeToggle } from "@/components/global/mode-toogle";
import { UserButton } from "@/components/global/user-button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useNotificationMutation,
  useNotificationQuery,
} from "@/hooks/use-notification";
import { useCurrentUser } from "@/hooks/use-user";
import { Bell } from "lucide-react";
import { NotificationsList } from "../notification/list";

export const InfoBar = () => {
  const user = useCurrentUser();
  const { notifications = [] } = useNotificationQuery(user?.email || "");

  const { markAsRead, isMarkAsReadPending } = useNotificationMutation(
    user?.email || ""
  );

  return (
    <div
      className={`fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[1px]`}
    >
      <div className="flex items-center gap-2 ml-auto">
        <ModeToggle />
        <Sheet>
          <SheetTrigger className="relative">
            {notifications.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5"
              >
                {notifications.length}
              </Badge>
            )}
            <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
              <Bell size={17} />
            </div>
          </SheetTrigger>
          <SheetContent className="p-0 py-6">
            <SheetHeader className="text-left mb-4 px-6">
              <SheetTitle aria-describedby="notificaciones">
                Notificaciones
              </SheetTitle>
              <SheetDescription>
                {notifications.length} nuevas notificaciones
              </SheetDescription>
            </SheetHeader>
            <NotificationsList
              notifications={notifications}
              onMarkAsRead={markAsRead}
              isMarkAsReadPending={isMarkAsReadPending}
            />
          </SheetContent>
        </Sheet>
        <UserButton afterSignOutUrl="/" user={user} />
      </div>
    </div>
  );
};
