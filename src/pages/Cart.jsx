import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router";
import DeleteFromCartModal from "../components/DeleteFromCartModal.jsx";
import ClearModal from "../components/ClearModal.jsx";
import { useNotificationContext } from "../contexts/NotificationContext.jsx";
import axios from "axios";

export default function Cart() {
    // useStates
  const [openForm, setOpenForm] = useState(false);
  const [openClearModal, setOpenClearModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [books, setBooks] = useState();

    //custom hooks
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { showNotification } = useNotificationContext();

  const navigateTo = useNavigate();

  const handleClear = () => setOpenClearModal(true);

  useEffect(() =>{
    const controller = new AbortController();

    setLoading(true);

    if (cart.length === 0) {
        setBooks([]);
        setLoading(false);
        return;
    }

    console.log(cart);

    axios.post(`${import.meta.env.VITE_BASE_API_URL}/cart`, {
        books: cart,
    },{signal: controller.signal,})
         .then((res) => {
            console.log(res.data);
            setBooks(res.data.data);
        })
         .catch((err) => {setError(err);})
         .finally(() => {
            setTimeout(() => {setLoading(false)}, 2000);
         });

    return ()=>{controller.abort();};
  },[cart]);

  const totalPrice = books?.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  if (openForm) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
  } else {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  }

  return (
    <>
      <div className="container pb-3 pb-md-0">
            <div className="d-flex justify-content-between align-items-start mb-3 pt-3">
            <h1 className="text-white mb-0">
                Il tuo carrello
            </h1>
            {cart.length > 0 && (
                <button type="button" className="btn btn-outline-danger mt-1" onClick={handleClear}>
                <i className="bi bi-trash3 me-2" />
                Svuota carrello
                </button>
            )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
            <div className="fs-4 fw-bold text-white">{`Totale: ${totalPrice? totalPrice?.toFixed(2): 0}`} &euro;</div>
            <button
                onClick={() => {
                if (cart.length === 0) {
                    setOpenForm(false);
                    showNotification(
                    "Il carrello è vuoto. Non puoi effettuare ordini se non ci sono elementi nel carrello.",
                    "warning",
                    );
                } else {
                    setOpenForm(true);
                }
                }}
                className="btn btn-warning btn-lg"
            >
                Effettua ordine
            </button>
            </div>

            {cart.length === 0 ? (
            <h2 className="text-white text-center mt-5">Il tuo carrello è vuoto</h2>
            ) : (
            <div className="d-flex flex-column gap-3 my-4">
                {books?.map((book) => {
                return (
                    <div key={book.id} className="card cart-list-item cart-item border-secondary p-3">
                    <div
                        onClick={(e) => {
                        if (e.target.closest("button, input, label")) return;
                        navigateTo(`/${book.slug}`);
                        }}
                        className=" d-block text-decoration-none"
                    >
                        <div className="row g-3 align-items-center">
                        <div className="col-12 col-sm-4 col-md-2 book-card">
                            <div className="position-relative">
                            <img
                                className="img-fluid rounded-2"
                                src={`${import.meta.env.VITE_BASE_URL_COVER}/${book.cover}`}
                                alt={book.title}
                            />
                            </div>
                        </div>

                        <div className="col-12 col-sm-8 col-md-10 text-white">
                            <h4 className="mb-2 fs-2">{book.title}</h4>
                            <p className="mb-0">{book.plot}</p>
                            <div>
                            <div className="btn-group fs-4 mt-2">
                                {book.quantity === 1 ? (
                                <>
                                    <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setBookToDelete(book);
                                        setOpenDeleteModal(true);
                                    }}
                                    type="button"
                                    className="btn btn-light py-0 px-1"
                                    >
                                    <i className="bi bi-trash text-danger" />
                                    </button>
                                </>
                                ) : (
                                <>
                                    <button
                                    onClick={() => removeFromCart(book.id, book.title)}
                                    className="btn btn-light py-0 px-1"
                                    >
                                    <i className="bi bi-dash" />
                                    </button>
                                </>
                                )}
                                <p className="m-0 px-2 border border-light">{book.quantity}</p>
                                <button
                                onClick={() => addToCart(book)}
                                className="btn btn-light py-0 px-1"
                                >
                                <i className="bi bi-plus p-0 m-0" />
                                </button>
                            </div>
                            
                                <p className="text-end fs-4 fw-bold m-0 mt-2">{`${book.price} \u20AC`}</p>
                           
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
            )}
        </div>

        {openForm && <CheckoutForm openForm={openForm} setOpenForm={setOpenForm} />}
        {openDeleteModal && (
            <DeleteFromCartModal bookToDelete={bookToDelete} setOpenDeleteModal={setOpenDeleteModal} />
        )}
        {/* clear modal */}
        {openClearModal && (
            <ClearModal
            setOpenClearModal={setOpenClearModal}
            onClear={clearCart}
            itemName="Carrello"
            successMessage="Carrello svuotato con successo!"
            notificationType="info"
            />
        )}
    </>
  );
}
