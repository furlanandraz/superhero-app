import { useRef, useCallback, useEffect } from "react";

export function useInfinteScroll({callback, loading, finished}) {

    const observer = useRef(null);

    const sentinelReference = useCallback(
        element => {
            if (observer.current) observer.current.disconnect();
            if (loading || finished || !element) return;

            observer.current = new IntersectionObserver(entires => {
                if (entires[0].isIntersecting) {
                    callback();
                }
            });

            observer.current.observe(element);

        },
        [callback, loading, finished]
    );

    useEffect(() => () => observer.current?.disconnect(), []);
    return { sentinelReference };
    
}

export function InfiniteScrollObserver({ref, error, finished, loading}) {

    
    return (
        <div
            ref={ref}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem'
            }}
        >
            {loading && <div>Loading…</div>}
            {error && <div>Error when loading.</div>}
            {finished && <div>Finished!</div>}
        </div>
    );
    
}