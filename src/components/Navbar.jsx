import { NavLink } from "react-router";

export default function Navbar () {
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="d-flex justify-content-between align-items-center flex-wrap w-100 px-3">
                <NavLink className="text-decoration-none text-white fs-5" to="#">Booknet</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-start" id="navbarNav">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Booknet</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <ul className="offcanvas-body navbar-nav">
                        <li className="nav-item">
                        <NavLink className="nav-link fs-5" aria-current="page" to="/">Libri</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link fs-5" to="/cart">Carrello</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}