import {CSSProperties, ReactNode, useEffect, useState} from "react";
import {useInView} from "../lib/useInView";
import {FEATURES} from "../lib/features";
import {Link} from "../lib/link";
import {Roller} from "../lib/reveal";
import {ArrowGlyph} from "../lib/art";
import {chipColor} from "../lib/chip";

const MID = (FEATURES.length - 1) / 2;
const STEP_MS = 4200;

const RoundButton = ({label, onClick, children}: { label: string; onClick: () => void; children: ReactNode }) => (
    <button type="button" aria-label={label} onClick={onClick}
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-soft text-text transition-[background-color,color,transform] duration-300 ease-[var(--ease-spring)] hover:scale-110 hover:bg-text hover:text-paper active:scale-95">
        {children}
    </button>
);

/**
 * The deck only reacts to clicks and to the controls on the right. Chips never
 * react to hover: a hovered chip that lifts away from the cursor would hand
 * the hover to its neighbour and the deck would shake.
 */
const Features = () => {
    const {ref, seen} = useInView<HTMLDivElement>(0.3);
    const [active, setActive] = useState(0);
    const [hovering, setHovering] = useState(false);
    const [stopped, setStopped] = useState(false);
    const feature = FEATURES[active];
    const running = seen && !hovering && !stopped;
    const go = (delta: number) => setActive(i => (i + delta + FEATURES.length) % FEATURES.length);

    // One timer per card, so picking a card by hand restarts the countdown ring.
    useEffect(() => {
        if (!running) return;
        const timer = setTimeout(() => setActive(i => (i + 1) % FEATURES.length), STEP_MS);
        return () => clearTimeout(timer);
    }, [running, active]);

    return (
        <section id="features" className="relative overflow-hidden bg-card py-24 lg:py-32">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
                <Roller className="display max-w-3xl text-[clamp(2.8rem,6vw,5rem)]">
                    A small component with a <em>whole fan deck</em> of options.
                </Roller>

                <div ref={ref} className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
                    <div
                        className={`fan relative mx-auto h-[360px] w-full max-w-[460px] [--step:7deg] sm:h-[430px] sm:[--step:10deg] ${seen ? 'in-view' : ''}`}
                        data-has-active="">
                        {FEATURES.map((f, i) => (
                            <button key={f.slug} type="button" tabIndex={-1} aria-hidden="true"
                                    onClick={() => setActive(i)}
                                    data-active={i === active || undefined}
                                    className="fan-chip absolute bottom-0 left-1/2 -ml-[44px] h-[330px] w-[88px] cursor-pointer sm:h-[400px]"
                                    style={{'--i': i, '--mid': MID, zIndex: i} as CSSProperties}>
                                <span
                                    className="fan-face flex h-full flex-col overflow-hidden rounded-[14px] border border-black/10 bg-[#fbfaf6] text-left shadow-[0_10px_30px_-12px_rgba(0,0,0,.4)]">
                                    <span className="h-[62%] transition-colors duration-500"
                                          style={{background: chipColor(i)}}/>
                                    <span className="flex flex-1 flex-col justify-end p-2.5 text-[#1a1814]">
                                        <span className="display self-start text-[1.1rem] leading-none [writing-mode:vertical-rl] rotate-180">
                                            {f.title.split(' ')[0]}
                                        </span>
                                    </span>
                                </span>
                            </button>
                        ))}
                        <span
                            className="absolute bottom-[14px] left-1/2 z-30 size-5 -translate-x-1/2 rounded-full border-2 border-[#1a1814]/50 bg-gradient-to-br from-[#e9e6de] to-[#9a958a] shadow-md"/>
                    </div>

                    <div onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
                        <article
                            className="feature-card relative overflow-hidden rounded-[32px] bg-paper p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]"
                            style={{'--chip': chipColor(active)} as CSSProperties}>
                            <div className="feature-band relative h-44 overflow-hidden rounded-[24px] sm:h-52">
                                <span aria-hidden="true" className="absolute left-5 top-5 size-4 rounded-full bg-paper/90 shadow-inner"/>
                                <span key={feature.slug} aria-hidden="true" className="band-swirl absolute -bottom-24 -right-16 size-72 rounded-full"/>
                                <span key={`${feature.slug}-b`} aria-hidden="true" className="band-swirl band-swirl--late absolute -left-20 -top-28 size-64 rounded-full"/>
                                <div className="absolute bottom-4 right-4">
                                    <svg viewBox="0 0 44 44" className="size-11 -rotate-90" aria-hidden="true">
                                        <circle cx="22" cy="22" r="18" fill="none" strokeWidth="4" className="stroke-paper/35"/>
                                        <circle key={`${feature.slug}-${running}`} cx="22" cy="22" r="18" fill="none" strokeWidth="4"
                                                strokeLinecap="round" pathLength={1}
                                                className={`stroke-paper ${running ? 'countdown' : ''}`}
                                                style={{'--ms': `${STEP_MS}ms`, strokeDasharray: 1, strokeDashoffset: running ? 1 : 0.999} as CSSProperties}/>
                                    </svg>
                                </div>
                            </div>

                            <div className="px-4 pb-4 pt-6 sm:px-6">
                                <div key={feature.slug} className="swap-in min-h-[150px]">
                                    <h3 className="display text-[clamp(2.2rem,4vw,3.2rem)]">{feature.title}</h3>
                                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{feature.short}</p>
                                </div>

                                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                                    <Link to={`/features/${feature.slug}`}
                                          className="group inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-sm font-medium text-paper transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-105">
                                        How it works
                                        <ArrowGlyph className="size-4 transition-transform duration-300 group-hover:translate-x-1"/>
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <RoundButton label="Previous feature" onClick={() => go(-1)}>
                                            <ArrowGlyph className="size-4 rotate-180"/>
                                        </RoundButton>
                                        <RoundButton label={stopped ? 'Play' : 'Pause'} onClick={() => setStopped(s => !s)}>
                                            {stopped ? (
                                                <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true"><path d="M6 4.5v11l9-5.5z" fill="currentColor"/></svg>
                                            ) : (
                                                <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true"><path d="M6 4h3v12H6zM11 4h3v12h-3z" fill="currentColor"/></svg>
                                            )}
                                        </RoundButton>
                                        <RoundButton label="Next feature" onClick={() => go(1)}>
                                            <ArrowGlyph className="size-4"/>
                                        </RoundButton>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Pick a feature">
                            {FEATURES.map((f, i) => (
                                <button key={f.slug} type="button" onClick={() => setActive(i)} aria-pressed={i === active}
                                        className={`flex cursor-pointer items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[13px] transition-colors duration-300 ${i === active ? 'bg-text text-paper' : 'bg-paper text-muted hover:text-text'}`}>
                                    <span className="size-5 rounded-full transition-transform duration-300" style={{background: chipColor(i)}}/>
                                    {f.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
