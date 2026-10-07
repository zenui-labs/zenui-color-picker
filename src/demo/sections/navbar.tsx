import React, {useEffect, useRef, useState} from "react";
import {ChipMark, GithubGlyph} from "../lib/art";
import {useInk} from "../lib/ink-context";
import pkg from "../../../package.json";
import {navigate} from "../lib/router";
import {Link} from "../lib/link";
import {MegaName, MegaPanel} from "./megamenu";
import {FEATURES} from "../lib/features";
import {chipColor} from "../lib/chip";

type Mega = MegaName;

const LINKS: { href: string; label: string; external?: boolean; mega?: Mega }[] = [
    {href: "/#formats", label: "Formats", mega: "formats"},
    {href: "/#features", label: "Features", mega: "features"},
    {href: "/#variants", label: "Variants"},
    {href: "/#playground", label: "Playground"},
    {href: "https://github.com/zenui-labs/zenui-color-picker/releases", label: "Changelog", external: true},
];

/** Sun and moon as one drawing: a second disc slides over the first. */
const EclipseIcon = ({dark}: { dark: boolean }) => (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <mask id="eclipse">
            <rect width="24" height="24" fill="#fff"/>
            <circle cx={dark ? 17 : 30} cy={dark ? 7 : -6} r="6.5" fill="#000"
                    className="transition-all duration-500 ease-[var(--ease-spring)]"/>
        </mask>
        <circle cx="12" cy="12" r={dark ? 8 : 5} fill="currentColor" mask="url(#eclipse)"
                className="transition-all duration-500 ease-[var(--ease-spring)]"/>
        <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
           className={`origin-center transition-all duration-500 ${dark ? 'scale-50 rotate-90 opacity-0' : ''}`}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <path key={deg} d="M12 2.5v2" transform={`rotate(${deg} 12 12)`}/>
            ))}
        </g>
    </svg>
);

const Navbar = () => {
    const {color} = useInk();
    const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mega, setMega] = useState<Mega | null>(null);
    const headerRef = useRef<HTMLElement>(null);
    const closeTimer = useRef(0);
    const openTimer = useRef(0);

    const openMega = (name: Mega) => {
        clearTimeout(closeTimer.current);
        clearTimeout(openTimer.current);
        setMega(name);
    };
    // Hover intent: a short dwell before opening or switching, so sweeping the
    // pointer across the bar does not flick the panel back and forth.
    const hoverMega = (name: Mega) => {
        clearTimeout(closeTimer.current);
        clearTimeout(openTimer.current);
        openTimer.current = window.setTimeout(() => setMega(name), mega ? 140 : 70);
    };
    const closeMegaSoon = () => {
        clearTimeout(closeTimer.current);
        clearTimeout(openTimer.current);
        closeTimer.current = window.setTimeout(() => setMega(null), 220);
    };

    // Escape closes and hands focus back to the trigger; a press outside the header closes too.
    useEffect(() => {
        if (!mega) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;
            setMega(null);
            headerRef.current?.querySelector<HTMLElement>(`[aria-controls="mega-${mega}"]`)?.focus();
        };
        const onDown = (e: PointerEvent) => {
            if (!headerRef.current?.contains(e.target as Node)) setMega(null);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onDown);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onDown);
        };
    }, [mega]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        try {
            localStorage.setItem("zcp-theme", dark ? "dark" : "light");
        } catch {
            // Storage blocked. The toggle still works for this visit.
        }
    }, [dark]);

    const go = (href: string) => (e: React.MouseEvent) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        setMenuOpen(false);
        navigate(href);
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header ref={headerRef}
                onPointerEnter={() => clearTimeout(closeTimer.current)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && closeMegaSoon()}
                className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
                    scrolled || menuOpen || mega ? 'border-line bg-paper/85 backdrop-blur-xl' : 'border-transparent'
                }`}>
            <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6">
                <Link to="/" className="group flex items-center gap-2.5" aria-label="ColorPicker home">
                    <ChipMark
                        className="h-8 w-auto text-text transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-12"/>
                    <span className="display text-[1.65rem] leading-none">
                        color<em>picker</em>
                    </span>
                    <span
                        className="ml-1 hidden rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-muted sm:inline">
                        v{pkg.version}
                    </span>
                </Link>

                <ul className="hidden items-center gap-1 text-[15px] lg:flex">
                    {LINKS.map(({href, label, external, mega: menu}) => (
                        <li key={href}>
                            {menu ? (
                                <button type="button"
                                        aria-expanded={mega === menu} aria-controls={`mega-${menu}`}
                                        onPointerEnter={(e) => e.pointerType === 'mouse' && hoverMega(menu)}
                                        onPointerLeave={() => clearTimeout(openTimer.current)}
                                        onClick={() => (mega === menu ? setMega(null) : openMega(menu))}
                                        className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 transition-colors ${mega === menu ? 'bg-soft text-text' : 'text-text/80 hover:text-text'}`}>
                                    {label}
                                    <svg viewBox="0 0 12 12" aria-hidden="true"
                                         className={`size-3 transition-transform duration-300 ease-[var(--ease-spring)] ${mega === menu ? 'rotate-180' : ''}`}>
                                        <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            ) : (
                                <a href={href} {...(external ? {target: "_blank", rel: "noreferrer"} : {onClick: go(href)})}
                                   onPointerEnter={() => mega && closeMegaSoon()}
                                   className="group relative block rounded-full px-3.5 py-2 text-text/80 transition-colors hover:text-text">
                                    {label}
                                    <span
                                        className="absolute inset-x-3.5 bottom-1 h-[3px] origin-left scale-x-0 rounded-full bg-ink transition-transform duration-300 group-hover:scale-x-100"/>
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-1">
                    <a href="https://github.com/zenui-labs/zenui-color-picker" target="_blank" rel="noreferrer"
                       className="grid size-10 place-items-center rounded-full text-text/80 transition hover:bg-soft hover:text-text"
                       aria-label="Source on GitHub">
                        <GithubGlyph className="size-5"/>
                    </a>
                    <button type="button" onClick={() => setDark(d => !d)}
                            className="grid size-10 cursor-pointer place-items-center rounded-full text-text/80 transition hover:bg-soft hover:text-text"
                            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
                        <EclipseIcon dark={dark}/>
                    </button>
                    <button type="button" onClick={() => setMenuOpen(o => !o)}
                            className="grid size-10 cursor-pointer place-items-center rounded-full lg:hidden"
                            aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Menu">
                        <span className="relative block h-3 w-5">
                            <span
                                className={`absolute left-0 h-[2px] w-5 rounded bg-text transition-all duration-300 ${menuOpen ? 'top-[5px] rotate-45' : 'top-0'}`}/>
                            <span
                                className={`absolute left-0 h-[2px] rounded bg-text transition-all duration-300 ${menuOpen ? 'top-[5px] w-5 -rotate-45' : 'top-[10px] w-3'}`}/>
                        </span>
                    </button>
                </div>
            </nav>

            {mega && (
                <div className="absolute inset-x-0 top-full hidden px-4 pt-3 sm:px-6 lg:block">
                    <MegaPanel mega={mega} onNavigate={() => setMega(null)}/>
                </div>
            )}

            <div id="mobile-menu"
                 className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)] lg:hidden ${menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <ul className="min-h-0 px-4 sm:px-6">
                    {LINKS.map(({href, label, external}) => (
                        <li key={href}>
                            <a href={href}
                               {...(external ? {target: "_blank", rel: "noreferrer", onClick: () => setMenuOpen(false)} : {onClick: go(href)})}
                               className="flex items-baseline justify-between py-3">
                                <span className="display text-4xl">{label}</span>
                            </a>
                            {label === 'Features' && (
                                <div className="flex flex-wrap gap-1.5 pb-3">
                                    {FEATURES.map((f, i) => (
                                        <Link key={f.slug} to={`/features/${f.slug}`} onClick={() => setMenuOpen(false)}
                                              className="flex items-center gap-1.5 rounded-full bg-soft py-1 pl-1 pr-3 text-[13px]">
                                            <span className="size-4 rounded-full" style={{background: chipColor(i)}}/>
                                            {f.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                    <li className="flex items-center gap-2 pb-5 font-mono text-xs text-muted">
                        <span className="size-3 rounded-sm bg-ink"/> now mixing {color.hex.slice(0, 7)}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
