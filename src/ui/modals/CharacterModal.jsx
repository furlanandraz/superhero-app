import Modal from 'react-modal';

import style from './CharacterModal.module.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function CharacterModal({ error, loading, character, modalIsOpen, onClose }) {
  
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={onClose} style={customStyles}>
      <button onClick={onClose}>Close</button>

      {loading ? (
        <p>Loading...</p>
      ) : character ? (
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : null}

      
    </Modal>
  );
}