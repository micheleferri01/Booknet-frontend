import {Link} from "react-router";

export default function BooksCard ({book}){
    const coverUrl = `${import.meta.env.VITE_BASE_URL_COVER}/${book.cover}`;
    return (
        <>
        <Link to={'#'} className="col-auto text-decoration-none">
            <div className="card h-100" style={{width: "18rem",}}>
                <img src={coverUrl} alt="" className="card-img-top" style={{height: "400px"}}/>
                <div className="card-body">
                    <h5 className="card-title title-book">{book.title}</h5>
                    <p className="card-text text-end fs-4 fw-semibold">{book.price} &euro;</p>
                </div>
            </div>
        </Link>
        </>
    )
}