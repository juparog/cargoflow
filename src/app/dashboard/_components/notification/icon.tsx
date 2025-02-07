import { NotificationType } from "@prisma/client";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

export const NotificationIcon = ({
  type,
}: {
  type: NotificationType | null;
}) => {
  switch (type) {
    case NotificationType.INFO:
      return <Info className="text-blue-500" size={20} />;
    case NotificationType.WARNING:
      return <AlertTriangle className="text-yellow-500" size={20} />;
    case NotificationType.ERROR:
      return <XCircle className="text-red-500" size={20} />;
    case NotificationType.SUCCESS:
      return <CheckCircle className="text-green-500" size={20} />;
    default:
      return <Info className="text-muted-foreground" size={20} />;
  }
};
