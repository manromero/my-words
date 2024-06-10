import { useContext } from "react";
import { NotificationsContext } from "@/context/notifications";

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
