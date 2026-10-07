import {useSyncExternalStore} from "react";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

window.addEventListener("popstate", notify);

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export function usePath(): string {
    return useSyncExternalStore(subscribe, () => location.pathname);
}

const WIPE_MS = 420;
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Client-side navigation. A new page slides in under a paint wipe; a hash on
 * the current page just scrolls.
 */
export function navigate(to: string) {
    const url = new URL(to, location.href);
    if (url.pathname === location.pathname) {
        history.pushState(null, "", url);
        if (url.hash) document.querySelector(url.hash)?.scrollIntoView({behavior: reduceMotion() ? "auto" : "smooth"});
        else scrollTo({top: 0, behavior: reduceMotion() ? "auto" : "smooth"});
        return;
    }
    const go = () => {
        history.pushState(null, "", url);
        notify();
    };
    if (reduceMotion()) return go();
    document.documentElement.dataset.wipe = "in";
    setTimeout(() => {
        go();
        document.documentElement.dataset.wipe = "out";
        setTimeout(() => delete document.documentElement.dataset.wipe, WIPE_MS + 80);
    }, WIPE_MS);
}

