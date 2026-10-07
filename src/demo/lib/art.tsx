import React from "react";

type SvgProps = React.SVGProps<SVGSVGElement>;

/** The logo: a paint chip with a punched hole, filled with the live ink. */
export const ChipMark = (props: SvgProps) => (
    <svg viewBox="0 0 28 36" aria-hidden="true" {...props}>
        <rect x="1" y="1" width="26" height="34" rx="5" fill="var(--card)" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M1 6a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v15H1z" fill="var(--ink)" className="ink-fade"/>
        <circle cx="14" cy="7" r="2.2" fill="var(--card)" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 26h11M6 30h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
);

/** Printer's registration target. */
export const RegMark = (props: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
        <path d="M12 0v24M0 12h24"/>
    </svg>
);

/** Corner crop marks, placed absolutely by the parent. */
export const CropMarks = () => (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 text-[var(--line-strong)]">
        {['left-0 top-0', 'right-0 top-0 rotate-90', 'right-0 bottom-0 rotate-180', 'left-0 bottom-0 -rotate-90'].map((pos) => (
            <svg key={pos} viewBox="0 0 20 20" className={`absolute size-5 ${pos}`} fill="none" stroke="currentColor"
                 strokeWidth="1">
                <path d="M0 8h6M8 0v6"/>
            </svg>
        ))}
    </div>
);

/** Drips as [x, length]. Built as one path so it scales cleanly. */
const DRIPS: [number, number][] = [[278, 13], [236, 24], [190, 9], [151, 30], [104, 14], [62, 21], [24, 11]];
const DRIP_PATH = 'M0 0H300V6' + DRIPS.map(([x, len]) => {
    const y = 6 + len;
    return `L${x + 6} 6C${x + 3} 6 ${x + 3.4} ${y - 5} ${x + 3.4} ${y - 2}A3.4 3.4 0 0 1 ${x - 3.4} ${y - 2}C${x - 3.4} ${y - 5} ${x - 3} 6 ${x - 6} 6`;
}).join('') + 'L0 6Z';

/** Paint running off the bottom of a word. Re-mount it (change `key`) to replay. */
export const Drip = (props: SvgProps) => (
    <svg viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true" {...props}>
        <path className="drip" fill="var(--ink)" d={DRIP_PATH}/>
    </svg>
);

export const ArrowGlyph = (props: SvgProps) => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
         strokeLinejoin="round" aria-hidden="true" {...props}>
        <path d="M3.5 10.5c4-.3 8.6-.4 12.5-.5M11.5 5.5c1.7 1.6 3.3 3 4.6 4.5-1.4 1.4-3 3-4.4 4.6"/>
    </svg>
);

export const GithubGlyph = (props: SvgProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path
            d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.8 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/>
    </svg>
);
