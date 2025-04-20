import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "../components/Footer";
import CharactersGrid from "../views/CharactersGrid";
import Error404 from "../views/Error404";

export default function Main() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CharactersGrid/>} />
                    <Route path="*" element={<Error404/>} />
                </Routes>
            </BrowserRouter>
            <Footer/>
        </>
    );
}