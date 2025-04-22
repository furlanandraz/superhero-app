import { useCharacters } from "../../context/useCharacters";

import style from './Header.module.css';

export default function Header() {

    const { setFilterStatus } = useCharacters();
    
    return (
        <header className={style.header}>
            <nav className={style.navbar}>
                <button onClick={() => setFilterStatus('')}>All</button>
                <button onClick={() => setFilterStatus('alive')}>Alive</button>
                <button onClick={() => setFilterStatus('dead')}>Dead</button>
            </nav>
            
        </header>
    );
}