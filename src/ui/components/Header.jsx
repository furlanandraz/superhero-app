import { useCharacters } from "../../context/CharactersContext";
import clsx from "clsx";

import style from './Header.module.css';
import Logo from '../../static/Logo.png';

import '../../App.css';

export default function Header() {

    const { filterStatus, setFilterStatus } = useCharacters();
    
    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.wrapper}>
                    <img className={style.logo} src={Logo} alt="" />
                    <nav className={style.nav}>
                        <button className={clsx(style.button, {[style.active]: filterStatus === ''})} onClick={() => setFilterStatus('')}>All</button>
                        <button className={clsx(style.button, {[style.active]: filterStatus === 'alive'})} onClick={() => setFilterStatus('alive')}>Alive</button>
                        <button className={clsx(style.button, {[style.active]: filterStatus === 'dead'})} onClick={() => setFilterStatus('dead')}>Dead</button>
                    </nav>
                </div>
            </div>
            
        </header>
    );
}