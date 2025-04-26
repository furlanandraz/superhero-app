import { useState } from "react";

import Header from "../components/Header";
import Breadcrumbs from "../components/Breadcrumbs";
import CharacterCard from "../components/CharacterCard";
import { CharacterModal } from "../modals/CharacterModal";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { useCharacters } from "../../context/CharactersContext";
import { InfiniteScrollObserver, useInfinteScroll } from "../../hooks/useInfiniteScroll";

import style from './CharactersGrid.module.css';


export default function CharactersGrid() {

    const { error: gridError, loading: gridLoading, characters, finished, setPagination } = useCharacters();
    const callback = () => setPagination(i => i + 1);
    const { sentinelReference } = useInfinteScroll({callback, error: gridError,  loading: gridLoading, finished})
    const { breadcrumbs } = useCharacters();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { error, loading, character, setCharacterId } = useCharacterDetails();


    console.log(finished);
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
                        
                    </div>
                    <InfiniteScrollObserver ref={sentinelReference} error={gridError} loading={gridLoading} finished={finished}/>
                </div>
                
            </main>
            
            
            <CharacterModal modalIsOpen={modalIsOpen} loading={loading} error={error} character={character} onClose={onClose} />
        </>
    );
}