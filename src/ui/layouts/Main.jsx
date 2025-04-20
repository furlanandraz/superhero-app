import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

import { useCharacters } from "../../context/useCharacters";

import style from './Main.module.css'


export default function Main({ children }) {
    
    const { breadcrumbs } = useCharacters();

    return (
        <>
            <Header />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {children}
            <Footer/>
        </>
    );
}