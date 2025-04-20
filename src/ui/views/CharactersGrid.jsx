import { useCharacters } from "../../context/useCharacters";

export default function CharactersGrid() {

    const { characters, setPagination } = useCharacters();
    return (
        <>
            {characters.map(character => { return <div key={character.id}>{character.name}</div> })}
            <button onClick={() => setPagination(i => i + 1)}>load more</button>
        </>
    );
}