// imports from react
import { useRef, useCallback, useEffect } from "react";

// custom hook for usage with observer component
export function useInfinteScroll({callback, loading, finished}) {

    // create one persisting variable for one instance of intersection observer class
    const observer = useRef(null);

    // callback runs on mount and unmount of assigned node via ref prop or dependency change
    const sentinelReference = useCallback(node => {

            // if there are expired observers connected, remove them
            if (observer.current) observer.current.disconnect();

            // if state is being updated, or API has finished or node has been unmounted, return
            if (loading || finished || !node) return;

            // the current observer is being assigned to infinite scroll component, and invokes callback (always one entry)
            observer.current = new IntersectionObserver(entires => {
                if (entires[0].isIntersecting) {
                    callback();
                }
            });

            // set to observe the node with ref prop pointing to callback
            observer.current.observe(node);

        },
        [callback, loading, finished]
    );


    // cleanup only effect runs on mount and disconnects any existing observers on unmount
    useEffect(() => () => observer.current?.disconnect(), []);

    // returning sentinel variable
    return { sentinelReference };
    
}

// infite scroll component, containing messages and serving as observer entry
export function InfiniteScrollObserver({ref, error, finished, loading}) {

    return (
        <div
            ref={ref}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 1rem 1rem 1rem',
                height: '3rem'
            }}
        >
            {loading && <div>Loading…</div>}
            {error && <div>Error when loading.</div>}
            {finished && <div>Finished!</div>}
        </div>
    );
    
}