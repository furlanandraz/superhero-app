// react imports
import { useState, useEffect, useRef, useContext, createContext } from "react";

// helper imports
import { capitalize } from "../functions/helpers";

// context for characters import, to be available in grid view and header component
const CharactersContext = createContext();

// variables from .env parsed
const apiUrl = process.env.REACT_APP_API_URL;

// context provider component
export function CharactersProvider({ children }) {

    const [pagination, setPagination] = useState(1); // used for querying by page with infite scoll/load more
    const [filterStatus, setFilterStatusReset] = useState(''); // used for filtering API query
    const [characters, setCharacters] = useState([]); // used for storing characters array and extend it on scroll
    const [breadcrumbs, setBreadcrumbs] = useState([]) // handled inside context due to direct filter connection
    const [loading, setLoading] = useState(false); // loading state
    const [error, setError] = useState(''); // error state
    const [finished, setFinished] = useState(false); // no more results returned state
    const firstFetch = useRef(true); // reference used in developement to prevent effect double run on mount

    // auxiliary function for multi-state handling when there is a filter state change
    function setFilterStatus(newFilterStatus) {

        // no need to update if same filter is applied twice
        if (newFilterStatus === filterStatus) return;

        // state reset and filter + breadcrumbs update
        setFilterStatusReset(newFilterStatus);
        setPagination(1);
        setCharacters([]);
        setFinished(false);

    }

    // API async fetch function with error handling
    async function fetchCharacters() {

        setLoading(true);

        try {

            // fetching resources with filter if present
            const res = await fetch(`${apiUrl}/character?page=${pagination}${filterStatus ? `&status=${filterStatus}` : ''}`);

            // resources return 404 when there is no existing page
            if (res.status === 404) {
                setFinished(true);
                return;
            }

            if (!res.ok) throw new Error('There seems to be a problem with the API.');


            const data = await res.json();

            // data is always of length 20, if this fails, new fetches are automatically prevented intil filter state change or unmount
            if (data.results.length < 20) {
                setFinished(true);
                return;
            }

            // append new batch of charatcers without mutating previous
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

        // this case prevents effect double run in development mode
        if (firstFetch.current && process.env.NODE_ENV !== 'production') {
            firstFetch.current = false;
            return;
        }
        
        // if finished state is true, fetching is not performed for nonexisting data
        if (!finished) fetchCharacters();

        // breadcrums building on filter change 
        if (filterStatus) {
    
            // build breadrumbs if filer is set
            setBreadcrumbs([
                { label: "Home", onClick: () => setFilterStatus("") },
                { label: capitalize(filterStatus), onClick: () => void 0 }
            ]);

        } else {

            // revert breadcrumbs to showing Home if no filter is unset
            setBreadcrumbs([{ label: "Home", onClick: () => void 0 }]);

        }

    }, [pagination, filterStatus]);


    // state cleanup on context unmount with no dependency, so it doesn run on state change, but only on unmount
    useEffect(() => {

        return () => {
            setFilterStatusReset('');
            setPagination(1);
            setCharacters([]);
            setBreadcrumbs([{ label: "Home", onClick: () => void 0 }]);
            setFinished(false);
        }

    }, []);
    
    // assign values to character context for use in child components
    const context = { error, loading, finished, characters, breadcrumbs, filterStatus, setFilterStatus, setPagination };


    // context provider component
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