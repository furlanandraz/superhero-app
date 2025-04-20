import Breadcrumbs from "./Breadcrumbs";
import { useCharacters } from "../../context/useCharacters";

export default function Header() {

    const { setFilterStatus, breadcrumbs } = useCharacters();
    
    return (
        <header>
            <nav>
                <button onClick={() => setFilterStatus('')}>All</button>
                <button onClick={() => setFilterStatus('alive')}>Alive</button>
                <button onClick={() => setFilterStatus('dead')}>Dead</button>
            </nav>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </header>
    );
}