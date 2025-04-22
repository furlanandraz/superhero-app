import style from './CharacterCard.module.css';

export default function CharacterCard({ character }) {
    return (
        <div className={style.characterCard} key={character.id}>{character.name}</div>
    );
}