import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const notificationInitialState = {
  visible: false,
  message: "",
  type: "primary",
};

const acceptedTypes = ["info", "warning", "success", "danger", "primary"];

const NotificationContextProvider = ({ children }) => {
  //* useState Constant
  const [notification, setNotification] = useState(notificationInitialState);
  const [timeoutID, setTimeoutID] = useState(null);

  const showNotification = (
    message,
    type = "primary",
    autoHide = true,
    duration = 5000,
  ) => {
    if (timeoutID) clearTimeout(timeoutID);

    if (!message) {
      message = "Errore Sconosciuto";
      type = "danger";
    } else if (!acceptedTypes.includes(type)) {
      type = "primary";
    }

    setNotification({
      visible: true,
      message,
      type,
    });

    if (autoHide) {
      const id = setTimeout(() => {
        hideNotification();
      }, duration);
      setTimeoutID(id);
    }
  };

  const hideNotification = () => {
    setNotification((notify) => ({ ...notify, hide: true }));
    setTimeout(() => {
      setNotification(notificationInitialState);
    }, 300);
  };

  const dataValue = {
    notification,
    showNotification,
    hideNotification,
  };
  return (
    <NotificationContext.Provider value={dataValue}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export { NotificationContextProvider, useNotificationContext };
