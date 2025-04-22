import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import style from './CharacterModal.module.css';

const apiUrl = process.env.REACT_APP_API_URL;

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

export function CharacterModal({ error, loading, modalIsOpen, character, onClose }) {

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={onClose} style={customStyles}>
      <button onClick={onClose}>Close</button>
      {character ? (
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
}

export function useCharacterModal() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [characterId, setCharacterId] = useState(null);
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function fetchCharacter(characterId) {

        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/character/${characterId}`);
            if (!res.ok) throw new Error('There seems to be a problem with the API.');
            const data = await res.json();
            setCharacter(data);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        if (!characterId) return;

        fetchCharacter(characterId);

    }, [characterId]);

    function openModal(id) {
        setCharacterId(id);
        setModalIsOpen(true);
    }
    
    function onClose() {
        setCharacterId(null);
        setModalIsOpen(false);
        setCharacter(null);
    }
    
    return { error, loading, modalIsOpen, character, openModal, onClose };
}