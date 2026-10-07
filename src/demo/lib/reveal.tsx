import {createElement, CSSProperties, ReactNode} from "react";
import {useInView} from "./useInView";
import {useParallax} from "./motion";

export function Parallax({speed, className, children}: { speed: number; className?: string; children?: ReactNode }) {
    const ref = useParallax<HTMLDivElement>(speed);
    return <div ref={ref} className={`will-change-transform ${className ?? ""}`}>{children}</div>;
}

/* ---------- roller reveal: an ink bar sweeps across, leaving the text ---------- */

export function Roller({as = "h2", className, children, delay = 0}: {
    as?: string;
    className?: string;
    children: ReactNode;
    delay?: number;
}) {
    const {ref, seen} = useInView<HTMLElement>(0.4);
    return createElement(as, {
        ref,
        className: `roller ${seen ? "in-view" : ""} ${className ?? ""}`,
        style: {"--delay": `${delay}ms`} as CSSProperties,
    }, <span className="roller-text">{children}</span>);
}

/** Fades and lifts children as they scroll in. */
export function Reveal({children, className, delay = 0, as = "div"}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: string;
}) {
    const {ref, seen} = useInView<HTMLElement>(0.15);
    return createElement(as, {
        ref,
        className: `fade-up ${seen ? "in-view" : ""} ${className ?? ""}`,
        style: {"--delay": `${delay}ms`} as CSSProperties,
    }, children);
}

