import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import CharacterCard from "../components/CharacterCard";
import { CharacterModal, useCharacterModal } from "../modals/CharacterModal";

import { useCharacters } from "../../context/CharactersContext";

import style from './CharactersGrid.module.css';

export default function CharactersGrid() {

    const { characters, setPagination } = useCharacters();
    const { breadcrumbs } = useCharacters();
    const { error, loading, modalIsOpen, character, openModal, onClose } = useCharacterModal();

    function onCardClick(characterId) {
        openModal(characterId)
    }

    return (
        <>
            <Header />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <main className={style.main}>
                <div className={style.flexWrapper}>
                    {characters.map(character => { return <CharacterCard character={character} onCardClick={onCardClick} /> })}
                    <button onClick={() => setPagination(i => i + 1)}>load more</button>
                </div>
            </main>
            <CharacterModal modalIsOpen={modalIsOpen} loading={loading} error={error} character={character} onClose={onClose} />
        </>
    );
}