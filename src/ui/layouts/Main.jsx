import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Main() {

    return (
        <>
            <Outlet/>
            <Footer/>
        </>
    );
}