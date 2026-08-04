import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";

export default function DefaultLayout () {
    return (
        <>
        <header>
            <Navbar/>
        </header>
        <main className="bg-dark text-white main-vh ">
            {/* NOTIFICATION */}
            <Notification />

            <Outlet/>
        </main>
        </>
    )
}