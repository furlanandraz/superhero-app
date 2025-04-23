import Modal from 'react-modal';

import Image from '../components/Image';

import style from './CharacterModal.module.css';

export function CharacterModal({ error, loading, character, modalIsOpen, onClose }) {
  
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={onClose} style={{ content: {} }} className={style.content}
    >
      <div className={style.modalHeader}>
      <button onClick={onClose}>Close</button>
      </div>

      {loading ? (
        <div className={style.loading}></div>
      ) : character ? (
        <div>
          <h2>{character.name}</h2>
          <Image url={character.image} alt={character.name} />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : null}

    </Modal>
  );
}