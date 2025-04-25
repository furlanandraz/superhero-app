import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import CharacterCard from "../components/CharacterCard";
import { CharacterModal } from "../modals/CharacterModal";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { useCharacters } from "../../context/CharactersContext";

import style from './CharactersGrid.module.css';
import { useEffect, useState } from "react";

export default function CharactersGrid() {

    const { characters, setPagination } = useCharacters();
    const { breadcrumbs } = useCharacters();

    //new
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { error, loading, character, setCharacterId } = useCharacterDetails();

    function onCardClick(characterId) {
        setCharacterId(characterId);
        setModalIsOpen(true);
    }
    
    function onClose() {
        setCharacterId(null);
        setModalIsOpen(false);
    }

    return (
        <>
            <Header />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            

            <main className={style.main}>
                <div className="container">
                <div className={style.flexWrapper}>
                    {characters.map(character => { return <CharacterCard key={character.id} character={character} onCardClick={onCardClick} /> })}
                    <button onClick={() => setPagination(i => i + 1)}>load more</button>
                </div>
                </div>
            </main>
            
            <CharacterModal modalIsOpen={modalIsOpen} loading={loading} error={error} character={character} onClose={onClose} />
        </>
    );
}