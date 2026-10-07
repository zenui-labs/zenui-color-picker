import {useEffect, useRef, useState} from "react";

/** True once the element has scrolled into view. Stays true. */
export function useInView<T extends Element>(threshold = 0.25) {
    const ref = useRef<T>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || seen) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setSeen(true);
        }, {threshold});
        observer.observe(el);
        return () => observer.disconnect();
    }, [seen, threshold]);

    return {ref, seen};
}
