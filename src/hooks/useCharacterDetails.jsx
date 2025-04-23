import { useState, useEffect } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export function useCharacterDetails() {

    const [characterId, setCharacterId] = useState(null);
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function fetchCharacter(characterId) {

        setLoading(true);
        setError('')

        try {
            
            const res = await fetch(`${apiUrl}/character/${characterId}`);
            if (!res.ok) throw new Error('There seems to be a problem with the API.');
            const data = await res.json();
            setCharacter(data);
        } catch (err) {
            console.error(err);
            setError('There was an error getting you beloved character :(');
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {

        if (!characterId) return;

        fetchCharacter(characterId);

        return () => {
            setCharacter(null);
        }

    }, [characterId]);

    
    return { error, loading, character, setCharacterId, setCharacter };
}