import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function DefaultLayout () {
    return (
        <>
        <header>
            <Navbar/>
        </header>
        <main className="bg-dark text-white main-vh ">
            <Outlet/>
        </main>
        </>
    )
}