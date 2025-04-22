import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import CharacterCard from "../components/CharacterCard";

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
                    <div className={style.flexWrapper}>
                        {characters.map(character => { return <CharacterCard character={character} /> })}
                        <button onClick={() => setPagination(i => i + 1)}>load more</button>
                    </div>
            </main>
        </>
    );
}