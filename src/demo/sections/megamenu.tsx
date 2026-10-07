import {CSSProperties, useEffect, useLayoutEffect, useRef, useState} from "react";
import {ColorFormat, formatColorValue} from "../../package";
import {FEATURES} from "../lib/features";
import {chipColor} from "../lib/chip";
import {Link} from "../lib/link";
import {useInk} from "../lib/ink-context";
import {useCopy} from "../lib/useCopy";
import {ArrowGlyph} from "../lib/art";
import {CheckIcon, CopyIcon} from "../../package/components/icons";

const stagger = (i: number) => ({animationDelay: `${40 + i * 32}ms`} as CSSProperties);

/** A mini paint chip: color, punched hole. */
const MiniChip = ({color, size = 'size-11'}: { color: string; size?: string }) => (
    <span className={`relative flex-none rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] ${size}`}
          style={{background: color}}>
        <span className="absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-paper/90"/>
    </span>
);

export const FeaturesMenu = ({onNavigate}: { onNavigate: () => void }) => {
    const [spot, setSpot] = useState(0);
    const feature = FEATURES[spot];

    return (
        <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
            <ul className="grid grid-cols-2 gap-1">
                {FEATURES.map((f, i) => (
                    <li key={f.slug} className="mega-item" style={stagger(i)}>
                        <Link to={`/features/${f.slug}`} onClick={onNavigate}
                              onPointerEnter={() => setSpot(i)} onFocus={() => setSpot(i)}
                              className={`group flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors ${i === spot ? 'bg-soft' : ''}`}>
                            <MiniChip color={chipColor(i)}/>
                            <span className="min-w-0">
                                <span className="block text-[15px] font-medium leading-tight">{f.title}</span>
                                <span className="mt-0.5 block truncate text-[13px] text-muted">{f.short}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <aside className="mega-item flex flex-col overflow-hidden rounded-[22px] bg-card" style={stagger(4)}>
                <div className="feature-band relative h-36 overflow-hidden" style={{'--chip': chipColor(spot)} as CSSProperties}>
                    <span key={feature.slug} aria-hidden="true" className="band-swirl absolute -bottom-20 -right-12 size-56 rounded-full"/>
                    <span aria-hidden="true" className="absolute left-4 top-4 size-3.5 rounded-full bg-paper/90"/>
                </div>
                <div key={feature.slug} className="fade-swap flex flex-1 flex-col p-5">
                    <p className="display text-[1.9rem]">{feature.title}</p>
                    <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">{feature.lead}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                        <Link to={`/features/${feature.slug}`} onClick={onNavigate}
                              className="group inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-paper">
                            Open
                            <ArrowGlyph className="size-4 transition-transform duration-300 group-hover:translate-x-1"/>
                        </Link>
                        <Link to="/#features" onClick={onNavigate} className="text-sm text-muted hover:text-text">
                            The fan deck
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

const FORMATS: { format: ColorFormat; note: string }[] = [
    {format: 'hex', note: 'Six digits, eight with alpha'},
    {format: 'rgb', note: 'Red, green, blue channels'},
    {format: 'hsl', note: 'Hue, saturation, lightness'},
    {format: 'hsv', note: 'What the box draws'},
    {format: 'cmyk', note: 'Printer inks'},
];

export const FormatsMenu = ({onNavigate}: { onNavigate: () => void }) => {
    const {color} = useInk();
    const {copied, copy} = useCopy();

    return (
        <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
            <ul className="grid gap-1">
                {FORMATS.map(({format, note}, i) => {
                    const value = formatColorValue(color, format);
                    return (
                        <li key={format} className="mega-item relative" style={stagger(i)}>
                            <Link to="/#formats" onClick={onNavigate}
                                  className="group grid grid-cols-[4.5rem_1fr] items-center gap-4 rounded-2xl p-2.5 pr-14 transition-colors hover:bg-soft sm:grid-cols-[5.5rem_1fr_auto]">
                                <span className="display text-[1.9rem] leading-none">{format}</span>
                                <span className="min-w-0">
                                    <span className="block truncate font-mono text-[13px]">{value}</span>
                                    <span className="mt-0.5 block text-[13px] text-muted">{note}</span>
                                </span>
                                <span className="hidden h-7 w-16 overflow-hidden rounded-lg sm:flex">
                                    {[100, 70, 40].map((p) => (
                                        <span key={p} className="flex-1 transition-colors duration-500"
                                              style={{background: `color-mix(in srgb, var(--ink) ${p}%, var(--paper))`}}/>
                                    ))}
                                </span>
                            </Link>
                            <button type="button" onClick={() => copy(value)}
                                    aria-label={`Copy ${value}`}
                                    className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted transition hover:bg-paper hover:text-text">
                                {copied === value ? <CheckIcon/> : <CopyIcon/>}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <aside className="mega-item flex flex-col justify-between gap-5 rounded-[22px] bg-card p-5" style={stagger(3)}>
                <div className="flex items-center gap-4">
                    <span className="size-20 flex-none rounded-[18px] bg-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,.08)] transition-colors duration-500"/>
                    <div>
                        <p className="font-mono text-sm">{color.hex.slice(0, 7)}</p>
                        <p className="mt-1 text-[13px] text-muted">Your current ink, written five ways.</p>
                    </div>
                </div>
                <div>
                    <p className="display text-[1.9rem]">Paste anything</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                        The picker's field reads every one of these, in comma or space syntax.
                    </p>
                    <Link to="/features/formats" onClick={onNavigate}
                          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-paper">
                        How parsing works
                        <ArrowGlyph className="size-4 transition-transform duration-300 group-hover:translate-x-1"/>
                    </Link>
                </div>
            </aside>
        </div>
    );
};

export type MegaName = 'formats' | 'features';

const ORDER: MegaName[] = ['formats', 'features'];

/**
 * One panel for both menus. Switching menus keeps the panel open: the old
 * content slides out, the new one waves in from the side of the trigger you
 * moved toward, the height morphs and the caret glides to the new trigger.
 */
export const MegaPanel = ({mega, onNavigate}: { mega: MegaName; onNavigate: () => void }) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);
    const [shown, setShown] = useState({active: mega, previous: null as MegaName | null, dir: 0});

    if (shown.active !== mega) {
        setShown({active: mega, previous: shown.active, dir: ORDER.indexOf(mega) > ORDER.indexOf(shown.active) ? 1 : -1});
    }

    useEffect(() => {
        if (!shown.previous) return;
        const timer = setTimeout(() => setShown((s) => ({...s, previous: null})), 420);
        return () => clearTimeout(timer);
    }, [shown.previous]);

    // Height follows the visible menu. The first measurement skips the transition.
    useLayoutEffect(() => {
        const box = boxRef.current;
        const body = bodyRef.current;
        if (!box || !body) return;
        let first = !box.style.height;
        const fit = () => {
            box.style.transition = first ? 'none' : '';
            box.style.height = `${body.offsetHeight}px`;
            first = false;
        };
        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(body);
        return () => observer.disconnect();
    }, [shown.active]);

    // Caret sits under the middle of the active trigger.
    useLayoutEffect(() => {
        const caret = caretRef.current;
        const box = boxRef.current?.parentElement;
        const anchor = document.querySelector(`[aria-controls="mega-${mega}"]`);
        if (!caret || !box || !anchor) return;
        const a = anchor.getBoundingClientRect();
        const b = box.getBoundingClientRect();
        caret.style.left = `${a.left + a.width / 2 - b.left}px`;
    }, [mega]);

    const render = (name: MegaName) => name === 'features'
        ? <FeaturesMenu onNavigate={onNavigate}/>
        : <FormatsMenu onNavigate={onNavigate}/>;

    return (
        <div className="mega-panel relative mx-auto max-w-[1240px] rounded-[30px] bg-paper shadow-[0_40px_80px_-30px_rgba(0,0,0,.45),0_0_0_1px_var(--line)]">
            <span ref={caretRef} aria-hidden="true"
                  className="mega-caret absolute -top-[7px] size-3.5 -translate-x-1/2 rotate-45 rounded-[3px] bg-paper shadow-[-1px_-1px_0_var(--line)]"/>
            <div ref={boxRef} className="mega-box relative overflow-hidden rounded-[30px]">
                {shown.previous && (
                    <div aria-hidden="true" key={`out-${shown.previous}`}
                         className="mega-out pointer-events-none absolute inset-x-0 top-0 p-3"
                         style={{'--dir': shown.dir} as CSSProperties}>
                        {render(shown.previous)}
                    </div>
                )}
                <div ref={bodyRef} key={`in-${shown.active}`} id={`mega-${shown.active}`}
                     className={`p-3 ${shown.previous ? 'mega-in' : ''}`}
                     style={{'--dir': shown.dir} as CSSProperties}>
                    {render(shown.active)}
                </div>
            </div>
        </div>
    );
};
