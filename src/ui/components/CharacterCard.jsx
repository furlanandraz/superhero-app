import style from './CharacterCard.module.css';

export default function CharacterCard({ character, onCardClick }) {
    return (
        <div className={style.characterCard} key={character.id}>
            <div className={style.infoWrapper} onClick={() => onCardClick(character.id)}>
                {character.name}
            </div>
        </div>
    );
}