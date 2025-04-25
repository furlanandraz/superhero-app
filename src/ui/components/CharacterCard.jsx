import { useState } from 'react';
import style from './CharacterCard.module.css';
import clsx from 'clsx';

export default function CharacterCard({ character, onCardClick }) {

    const [loaded, setLoaded] = useState(false)
    return (
        <div className={style.characterCard} key={character.id}>
            
            <div className={style.cardWrapper} onClick={() => onCardClick(character.id)}>
                
                <div className={clsx(style.imageWrapper, {[style.loaded]: loaded})}>  
                    <img
                    src={character.image}
                    alt={character.name}
                    className={style.image}
                    onLoad={() => setLoaded(true)}
                    />
                </div>
                <span className={style.title}>{character.name}</span>
                <span className={style.fakeButton}>Read more</span>
            </div>
        </div>
    );
}