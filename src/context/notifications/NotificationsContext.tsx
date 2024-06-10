"use client";

import { createContext } from "react";
import { NotificationType } from "@/types";

type NotificationsContextType = {
  notification?: NotificationType;
  pusblishNotification: (notification: NotificationType) => void;
  deleteNotification: () => void;
};

export const NotificationsContext = createContext(
  {} as NotificationsContextType
);
