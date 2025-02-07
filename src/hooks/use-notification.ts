import {
  onGetNotifications,
  onMarkNotificationAsRead,
} from "@/actions/notification";
import { Prisma } from "@prisma/client";
import { useMutationData } from "./use-mutation";
import { useQueryData } from "./use-query";

export const useNotificationQuery = (email: string) => {
  const { data: notifications } = useQueryData<
    Prisma.PromiseReturnType<typeof onGetNotifications>
  >(["notifications"], () => onGetNotifications(email));

  return { notifications };
};

export const useNotificationMutation = (email: string) => {
  const { isPending: isMarkAsReadPending, mutate: markAsRead } =
    useMutationData(
      ["markAsRead"],
      async (notificationId: string) => {
        const markAsRead = await onMarkNotificationAsRead(
          notificationId,
          email
        );
        return markAsRead
          ? { status: 200, data: "Notificación marcada como leída" }
          : { status: 400, data: "Error al marcar la notificación como leída" };
      },
      "notifications"
    );

  return { markAsRead, isMarkAsReadPending };
};
