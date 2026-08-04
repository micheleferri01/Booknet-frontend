import { useNotificationContext } from "../contexts/NotificationContext";

export default function Notification() {
  const { notification } = useNotificationContext();

  if (!notification.visible) return;

  return (
    <>
      <div
        className={`notification notification-${notification.type} ${notification.hide ? "hiding" : ""}`}
      >
        <div className="d-flex align-items-center gap-3">
          {notification.type === "success" && (
            <i className="bi bi-check-circle" />
          )}
          {notification.type === "danger" && (
            <i className="bi bi-exclamation-circle" />
          )}
          {notification.type === "warning" && (
            <i className="bi bi-exclamation-triangle" />
          )}
          {notification.type === "info" && <i className="bi bi-info-circle" />}
          {notification.type === "primary" && <i className="bi bi-bell" />}
          <span>{notification.message}</span>
        </div>
      </div>
    </>
  );
}
