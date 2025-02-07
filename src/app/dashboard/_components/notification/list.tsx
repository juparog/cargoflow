import { onGetNotifications } from "@/actions/notification";
import { Prisma } from "@prisma/client";
import { NotificationItem } from "./item";

type NotificationsListProps = {
  notifications: Prisma.PromiseReturnType<typeof onGetNotifications>;
  onMarkAsRead: (id: string) => void;
  isMarkAsReadPending: boolean;
};

export const NotificationsList = ({
  notifications,
  onMarkAsRead,
  isMarkAsReadPending,
}: NotificationsListProps) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex items-center justify-center text-muted-foreground">
        You have no notifications
      </div>
    );
  }

  return (
    <>
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          title={notification.title}
          content={notification.content}
          createdAt={notification.createdAt}
          type={notification.type}
          userInitials={notification?.user?.firstname.slice(0, 2).toUpperCase()}
          onMarkAsRead={onMarkAsRead}
          isMarkAsReadPending={isMarkAsReadPending}
          className={index + 1 === notifications.length ? "border-b" : ""}
        />
      ))}
    </>
  );
};
