// imports from react
import { useState, useEffect } from "react";

// env variables parsing
const apiUrl = process.env.REACT_APP_API_URL;

// custom hook for getting character details by id
export function useCharacterDetails() {

    const [characterId, setCharacterId] = useState(null); // is state used in API calls
    const [character, setCharacter] = useState(null); // character state used to populate it with response data
    const [error, setError] = useState(''); // error state for fetch
    const [loading, setLoading] = useState(false); // loading state for fetch

    // character details fetching function
    async function fetchCharacter(characterId) {

        setLoading(true);
        
        try {
            
            const res = await fetch(`${apiUrl}/character/${characterId}`); // API call with character id params
            if (!res.ok) throw new Error('There seems to be a problem with the API.');
            const data = await res.json();
            setCharacter(data);

        } catch (err) {

            console.error(err);
            setError('There was an error while getting you beloved character :(');

        } finally {

            setLoading(false);

        }

    };

    // effect that runs when character id changes by clicking and closing the modal
    useEffect(() => {

        // case for when modal is closed and character id is set to null, prevents fetch from running
        if (!characterId) return;

        // calling the character details fetching function
        fetchCharacter(characterId);


        // state cleanup on modal unmount
        return () => {
            setCharacter(null);
            setError('');
        }

    }, [characterId]);

    // return state and setters
    return { error, loading, character, setCharacterId, setCharacter };
}