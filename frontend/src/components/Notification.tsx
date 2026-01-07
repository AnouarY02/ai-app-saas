import React from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
}

const Notification: React.FC<NotificationProps> = ({ message, type = "info" }) => {
  if (!message) return null;
  return (
    <div className={`notification notification-${type}`}>{message}</div>
  );
};

export default Notification;
