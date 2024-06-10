"use client";

import React, { useState } from "react";

import { NotificationsContext } from "./NotificationsContext";
import { NotificationType } from "@/types";

type NotificationsProviderType = {
  children: React.ReactNode;
};

export const NotificationsProvider = ({
  children,
}: NotificationsProviderType): JSX.Element => {
  const [notification, setNotification] = useState<
    NotificationType | undefined
  >(undefined);

  const pusblishNotification = (notification: NotificationType) => {
    setNotification(notification);
  };

  const deleteNotification = () => {
    setNotification(undefined);
  };

  return (
    <NotificationsContext.Provider
      value={{ notification, pusblishNotification, deleteNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
