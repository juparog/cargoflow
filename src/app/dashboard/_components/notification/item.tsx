import { Tooltip } from "@/components/global/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NotificationType } from "@prisma/client";
import { Check, Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { NotificationIcon } from "./icon";

type NotificationItemProps = {
  id: string;
  title: string;
  content: string;
  createdAt?: Date | null;
  type: NotificationType | null;
  userInitials: string;
  onMarkAsRead: (id: string) => void;
  isMarkAsReadPending: boolean;
  className?: string;
};

export const NotificationItem = ({
  id,
  title,
  content,
  createdAt,
  type,
  userInitials,
  onMarkAsRead,
  isMarkAsReadPending,
  className,
}: NotificationItemProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-y-2 pl-6 pr-2 py-1 border-t border-border",
        className
      )}
    >
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage alt="Profile Picture" />
          <AvatarFallback className="bg-primary">{userInitials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-grow">
          <p className="flex items-center gap-2">
            <NotificationIcon type={type} />
            <span className="font-bold line-clamp-1">{title}</span>
          </p>
          <p className="text-muted-foreground line-clamp-1">{content}</p>
          <div className="flex items-center w-full justify-between">
            <small className="text-xs text-muted-foreground">
              {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
            </small>
            <Tooltip content="Marcar como leído">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkAsRead(id)}
                className="h-5 p-1"
              >
                {isMarkAsReadPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" /> // Spinner de carga
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};
