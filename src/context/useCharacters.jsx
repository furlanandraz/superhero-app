import { useState, useEffect, useContext, createContext } from "react";

import { capitalize } from "../functions/helpers";

// context for characters, to be available in grid view and header component
const CharactersContext = createContext();

// API base url from .env
const apiUrl = process.env.REACT_APP_API_URL;

export function CharactersProvider({ children }) {

    const [pagination, setPagination] = useState(1); // used for filtering by page with infite scoll/load more
    const [filterStatus, setFilterStatusReset] = useState(''); // used for filtering API query
    const [characters, setCharacters] = useState([]); // used for storing characters array and extend it on scroll
    const [breadcrumbs, setBreadcrumbs] = useState([]) // handled inside context due to direct filter connection
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // auxiliary function for multi-state handling when there is a filter state change
    function setFilterStatus(newFilterStatus) {

        // no need to update if same filter is applied twice
        if (newFilterStatus === filterStatus) return;

        // state reset and filter + breadcrumbs update
        setFilterStatusReset(newFilterStatus);
        setPagination(1);
        setCharacters([]);

    }

    // API async fetch function with error handling
    async function fetchCharacters() {

        setLoading(true);

        try {
            const res = await fetch(`${apiUrl}/character?page=${pagination}${filterStatus ? `&status=${filterStatus}` : ''}`);
            if (!res.ok) throw new Error('There seems to be a problem with the API.');
            const data = await res.json();
            setCharacters((prev) => [...prev, ...data.results]);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }

    };

    // effect runs on mount and for each pagination increment and filter state change
    useEffect(() => {

        // use the API fetch function
        fetchCharacters();


        if (filterStatus) {
    
            // build breadrumbs if filer is set
            setBreadcrumbs([
                { label: "Home", onClick: () => setFilterStatus("") },
                { label: capitalize(filterStatus), onClick: () => void 0 }
            ]);

        } else {

            // revert breadcrumbs to showing Home if no filter is set
            setBreadcrumbs([{ label: "Home", onClick: () => void 0 }]);

        }

    }, [pagination, filterStatus]);


    // state cleanup on context unmount with no dependency (not necessary here since its global)
    useEffect(() => {

        return () => {
            setFilterStatusReset('');
            setPagination(1);
            setCharacters([]);
            setBreadcrumbs([]);
            setBreadcrumbs([{ label: "Home", onClick: () => void 0 }]);
        }

    }, []);
    
    // assign values to character context for use in child components
    const context = { error, loading, characters, breadcrumbs, filterStatus, setFilterStatus, setPagination };

    return (
        <CharactersContext.Provider value={context}>
            {children}
        </CharactersContext.Provider>
    );
}

// export a hook for easier context extraction in components
export function useCharacters() {
  return useContext(CharactersContext);
}