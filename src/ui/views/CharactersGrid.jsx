import { useCharacters } from "../../context/useCharacters";

import style from './CharactersGrid.module.css'

export default function CharactersGrid() {

    const { characters, setPagination } = useCharacters();
    return (
        <main className={style.main}>
            <div className="wrapper">
                {characters.map(character => { return <div key={character.id}>{character.name}</div> })}
                <button onClick={() => setPagination(i => i + 1)}>load more</button>
            </div>
        </main>
    );
}