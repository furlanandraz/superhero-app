import Modal from 'react-modal';

import Image from '../components/Image';

import style from './CharacterModal.module.css';

export function CharacterModal({ error, loading, character, modalIsOpen, onClose }) {
  
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={onClose} style={{ content: {} }} className={style.content}
    >
      <div className={style.modalHeader}>
        <button className={style.closeButton} onClick={onClose}>Close</button>
      </div>

      {loading ? (
        <div className={style.loading}></div>
      ) : character ? (
        <div className={style.wrapper}>
            
          
          <Image url={character.image} alt={character.name} />
          <div className={style.details}>

            <h2>{character.name}</h2>
            <p><b>Status:</b> {character.status}</p>
            <p><b>Species:</b> {character.species}</p>
            <p><b>Gender:</b> {character.gender}</p>
            <p><b>Location:</b> {character.location.name}</p>
              
          </div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : null}

    </Modal>
  );
}