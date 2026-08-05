import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import { Link } from "react-router";
import { useNotificationContext } from "../contexts/NotificationContext";

export default function CheckoutForm({ setOpenForm }) {
  // CUSTOM HOOK
  const { cart, clearCart } = useCart();

  const initialData = {
    name: "",
    surname: "",
    email: "",
    books: [...cart],
  };

  // USE STATES
  const [formData, setFormData] = useState(initialData);
  const [orderSuccess, setOrderSuccess] = useState(undefined);
  const { showNotification } = useNotificationContext();
  const [ loading, setLoading ] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    const {
      name,
      surname,
      email,
    } = formData;

    if (!name.trim().toLowerCase()) {
      return showNotification("Compilare il campo Nome.", "warning");
    }
    if (!surname.trim().toLowerCase()) {
      return showNotification("Compilare il campo Cognome.", "warning");
    }
    if (!email.trim()) {
      return showNotification("Compila il campo Email", "warning");
    }
    if (!regex.test(email)) {
      return showNotification("Email non valida", "warning");
    }

    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_BASE_API_URL}/checkout`, formData)
      .then((res) => {
        if (res.data) {
          setOrderSuccess(true);
          showNotification("Ordine effettuato con successo!", "success");
          console.log(res.data.message);
        }
        setTimeout(() => clearCart(), 50);
      })
      .catch((err) => {

         console.log(err.response);
    console.log(err.response.data);
    console.log(err.response.data.errors);
        
        if (err) {
          setOrderSuccess(false);
          return showNotification("Qualcosa è andato storto!", "danger");
        }
        showNotification("Qualcosa è andato storto!", "danger");
      })
      .finally(() => {setTimeout(()=>{setLoading(false), 2000})});
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="welcome-popup thanks-modal modal show d-block"
        tabIndex="-1"
        data-bs-theme="dark"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ marginTop: "4rem", paddingBottom: "1rem" }}>
            <div className="modal-header">
              <button
                onClick={() => setOpenForm(false)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {orderSuccess === undefined && (
                <>
                  <div className="text-center mb-3">
                    <h1 className="text-warning">Ordina ora!</h1>
                    <p>Inserisci i tuoi dati per completare l'ordine</p>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e)} className="row g-3 p-2">
                    <div className="col-12 col-sm-6">
                      <label htmlFor="name" className="form-label">
                        Nome
                      </label>
                      <input
                        value={formData.name}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label htmlFor="surname" className="form-label">
                        Cognome
                      </label>
                      <input
                        value={formData.surname}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="surname"
                        className="form-control"
                        id="surname"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        value={formData.email}
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        name="email"
                        className="form-control"
                        id="email"
                      />
                    </div>

                    <div className="d-flex justify-content-end">
                      <button className="btn btn-primary">Invia</button>
                    </div>
                  </form>
                </>
              )}

              {orderSuccess === true && (
                <>
                  <div className="d-flex flex-column gap-4 align-items-center">
                    <h1>
                      Ordine effettuato con <span className="text-warning glow-text">Successo</span>
                    </h1>
                    <i className="bi bi-check-circle-fill text-success fs-1" />
                    <h2>Grazie per aver acquistato da noi.</h2>
                    <p className="fs-4 mx-3">Gli articoli sono da ritirare in negozio ed il pagamento si effettua al ritiro degli articoli.</p>
                      <Link
                        to="/"
                        onClick={() => setOpenForm(false)}
                        className="btn btn-warning fw-bold px-4"
                      >
                        🏠 Torna alla Home
                      </Link>
                  </div>
                </>
              )}

              {orderSuccess === false && (
                <>
                  <div className="d-flex flex-column gap-4 align-items-center">
                    <h1>
                      Ordine <span className="text-warning glow-text">Fallito</span>
                    </h1>
                    <i className="bi bi-x-octagon-fill text-danger fs-1" />
                    <h2>Riprova.</h2>
                    <div className="d-flex gap-3">
                      <Link
                        to="/"
                        onClick={() => setOpenForm(false)}
                        className="btn btn-warning fw-bold px-4"
                      >
                        🏠 Torna alla Home
                      </Link>

                      <Link
                        to="/cart"
                        onClick={() => setOpenForm(false)}
                        className="btn btn-outline-warning px-4"
                      >
                        🛒 Vai al Carrello
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
