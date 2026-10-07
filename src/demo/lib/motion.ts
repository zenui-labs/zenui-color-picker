import {useEffect, useRef} from "react";

const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- parallax: one scroll listener for every element ---------- */

const layers = new Map<HTMLElement, number>();
let frame = 0;

function paint() {
    frame = 0;
    const mid = innerHeight / 2;
    layers.forEach((speed, el) => {
        const rect = el.parentElement?.getBoundingClientRect();
        if (!rect || rect.bottom < -200 || rect.top > innerHeight + 200) return;
        const offset = (rect.top + rect.height / 2 - mid) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
}

const schedule = () => {
    if (!frame) frame = requestAnimationFrame(paint);
};

if (typeof window !== "undefined" && !reduced) {
    addEventListener("scroll", schedule, {passive: true});
    addEventListener("resize", schedule);
}

/**
 * Moves the element against the scroll. Negative speed drifts up faster than
 * the page, positive lags behind. Measured from the parent so the transform
 * never feeds back into its own position.
 */
export function useParallax<T extends HTMLElement>(speed: number) {
    const ref = useRef<T>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el || reduced) return;
        layers.set(el, speed);
        schedule();
        return () => {
            layers.delete(el);
        };
    }, [speed]);
    return ref;
}

export const prefersReducedMotion = reduced;
