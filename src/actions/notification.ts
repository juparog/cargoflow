"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { onGetUserByEmail } from "./user";

export const onGetNotifications = async (email: string) => {
  try {
    const user = await client.user.findUnique({
      where: { email: email },
      select: { id: true },
    });

    if (!user) return [];

    const notifications = await client.notification.findMany({
      where: {
        OR: [
          {
            targetId: user.id,
          },
          {
            targetId: null,
          },
        ],
        notificationHistory: {
          none: {
            changedBy: user.id,
            newValue: "read=true",
          },
        },
      },
      include: {
        notificationHistory: true,
        user: {
          select: {
            id: true,
            firstname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export const onCreateNotification = async (
  notification: Prisma.NotificationUncheckedCreateInput
) => {
  const createdNotification = await client.notification.create({
    data: notification,
  });

  return createdNotification;
};

export const onMarkNotificationAsRead = async (id: string, email: string) => {
  try {
    const user = await onGetUserByEmail(email);
    if (!user) return false;

    const notification = await client.notificationHistory.create({
      data: {
        notificationId: id,
        oldValue: "read=false",
        newValue: "read=true",
        changedBy: user.id,
      },
    });

    return !!notification;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
