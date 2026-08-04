import { useEffect, useState } from "react"
import { useParams, Link } from "react-router";
import axios from "axios";
import { useCart } from "../contexts/CartContext";


export default function BookDetailsPage(){

    const {slug} = useParams();

    const [book, setBook] = useState();
    const [loading, setLoading] = useState();

    const {cart, addToCart} = useCart();

    const cartItem = cart?.find((item) => item.id === book?.id);

    useEffect(()=>{
        const controller = new AbortController();

        setLoading(true);

        axios.get(`${import.meta.env.VITE_BASE_API_URL}/books/${slug}`, {
            signal: controller.signal,
        })
             .then((res)=>{
                // console.log(res.data);
                setBook(res.data.data);
            })
            .catch((err)=>{
                if (err.name !== 'CanceledError') {
                    // console.error(err);
                    setError(err);
                }
            })
            .finally(()=>{
               setTimeout(() => {
                    setLoading(false);
                }, 2000);
            });
            return ()=>{controller.abort();};
    },[])
    return (
        <>
        <div className="py-3 container">
            <Link to={'/'} className="btn btn-primary">Torna indietro</Link>
        </div>
        {loading? <h1 className="text-center">Caricamento....</h1> : 
        <div className="py-4 container d-flex flex-column flex-lg-row gap-5">
            <div>
                <img src={book?.cover? `${import.meta.env.VITE_BASE_URL_COVER}/${book.cover}`: `${import.meta.env.VITE_BASE_URL_COVER}/books_covers/cover_not_found.jpg`} alt={book?.title} className="book-img"/>
            </div>
            <div>
                <h1>{book?.title}</h1>
                <ul className="list-unstyled">
                    <li>Autore: <Link to={`/?author=${book?.author.slug}`} className="text-decoration-none text-white fw-semibold fs-5">{book?.author.name}</Link></li>
                    <li className="mb-3">Casa editrice: <Link to={`/?editor=${book?.editor.slug}`} className="text-decoration-none text-white fw-semibold fs-5">{book?.editor.name}</Link></li>
                    <li>{book?.genres.map((genre) => {return <Link to={`/?genre=${genre.slug}`} key={genre.id} className="text-decoration-none badge badge text-bg-secondary fs-6 me-2">{genre.name}</Link>})}</li>
                </ul>
                <p>{book?.plot}</p>
                <div>
                    <p className="fs-1 text-success fw-bold">{book?.price} &euro;</p>
                    <div className="d-flex flex-column">
                        <div>
                            <button className="btn btn-warning" onClick={() => addToCart(book)}>
                            Aggiungi al carrello
                            </button>
                        </div>
                        {cartItem && (
                        <div className="text-success mt-2 fw-semibold">
                            {cartItem.quantity > 1
                            ? `Prodotto nel carrello (${cartItem.quantity})`
                            : "Prodotto nel carrello!"}
                        </div>
                        )}
                    </div>
                </div>

            </div>
        </div>}
        </>
    )
}