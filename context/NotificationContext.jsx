import { createContext, useState } from "react";

export const NotificationContext =
  createContext();

export const NotificationProvider = ({
  children
}) => {
  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        message:
          "🔥 Gold tickets for Arijit Singh are now 20% off"
      },
      {
        id: 2,
        message:
          "🎵 Anirudh Live starts in 3 days"
      }
    ]);

  const addNotification = (message) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        message
      },
      ...prev
    ]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};