import { useNotificationContext } from "../contexts/NotificationContext";

export default function ClearModal({
  setOpenClearModal,
  onClear,
  itemName = "elemento",
  successMessage,
  notificationType = "warning",
}) {
  const { showNotification } = useNotificationContext();

  const handleClear = () => {
    onClear();
    if (successMessage) showNotification(successMessage, notificationType);
    else showNotification(`${itemName} svuotato con successo!`, notificationType);
    setOpenClearModal(false);
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1" data-bs-theme="dark">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={() => setOpenClearModal(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p className="fs-5">
                Sei sicuro di voler svuotare <span className="text-warning">{itemName}</span>?
              </p>
              <div className="d-flex gap-4 justify-content-center">
                <button onClick={handleClear} className="btn btn-warning btn-lg py-1 px-3">
                  Sì
                </button>
                <button
                  onClick={() => setOpenClearModal(false)}
                  className="btn btn-secondary btn-lg py-1 px-3"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
