import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";

import { useCharacters } from "../../context/useCharacters";

import style from './CharactersGrid.module.css';

export default function CharactersGrid() {

    const { characters, setPagination } = useCharacters();
    const { breadcrumbs } = useCharacters();

    return (
        <>
            <Header />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
                <main className={style.main}>
                    <div className="wrapper">
                        {characters.map(character => { return <div key={character.id}>{character.name}</div> })}
                        <button onClick={() => setPagination(i => i + 1)}>load more</button>
                    </div>
            </main>
        </>
    );
}