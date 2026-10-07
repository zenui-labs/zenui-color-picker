import {CSSProperties, PointerEvent, useEffect, useRef, useState} from "react";
import {ColorPicker, getLuminance} from "../../package";
import {ArrowGlyph, CropMarks, Drip, RegMark} from "../lib/art";
import {useInk} from "../lib/ink-context";
import {nearestColorName} from "../lib/colorNames";
import {InstallTape} from "../components/InstallTape";
import {Parallax} from "../lib/reveal";
import {Link} from "../lib/link";

/** A paint sample card that names whatever is picked. */
const PaintChip = () => {
    const {color} = useInk();
    const {name, exact} = nearestColorName(color.rgb);
    const lrv = Math.round(getLuminance(color) * 100);

    return (
        <figure
            className="pointer-events-none relative w-[190px] rounded-[22px] border border-line bg-card p-3 shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)]">
            <div className="relative h-[200px] overflow-hidden rounded-[14px] bg-ink transition-colors duration-500">
                <span className="absolute left-1/2 top-3 size-4 -translate-x-1/2 rounded-full border border-black/10 bg-card"/>
                <span className="sheen absolute inset-0"/>
            </div>
            <figcaption className="px-1 pb-1 pt-3">
                <div className="display break-words text-[1.65rem] leading-none">
                    {exact ? '' : <span className="text-muted">near </span>}{name}
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-y-1 font-mono text-[11px] text-muted">
                    <dt>code</dt>
                    <dd className="text-right text-text">ZCP {color.hex.slice(1, 7).toUpperCase()}</dd>
                    <dt>LRV</dt>
                    <dd className="text-right text-text">{lrv}</dd>
                </dl>
            </figcaption>
        </figure>
    );
};

/** Letters that hop and take a hue when the pointer passes over them. */
const Bouncy = ({text, offset = 0}: { text: string; offset?: number }) => (
    <span aria-hidden="true">
        {Array.from(text).map((ch, i) => (
            <span key={i} className="letter"
                  style={{'--i': i + offset, '--r': `${((i * 37) % 17) - 8}deg`} as CSSProperties}>
                {ch === ' ' ? ' ' : ch}
            </span>
        ))}
    </span>
);

const Hero = () => {
    const {color, setInk, remember} = useInk();
    const [dripKey, setDripKey] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    // Settle: once the color stops moving, add it to the visit palette and replay the drip.
    useEffect(() => {
        const timer = setTimeout(() => {
            remember(color.hex.slice(0, 7));
            setDripKey(k => k + 1);
        }, 650);
        return () => clearTimeout(timer);
    }, [color.hex, remember]);

    const tilt = (e: PointerEvent<HTMLElement>) => {
        const el = sectionRef.current;
        if (!el || e.pointerType !== 'mouse') return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 2 - 1).toFixed(3));
        el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 2 - 1).toFixed(3));
    };

    return (
        <section id="top" ref={sectionRef} onPointerMove={tilt}
                 className="relative overflow-hidden pt-16">

            <div className="relative mx-auto max-w-[1240px] px-4 pb-20 pt-10 sm:px-6 lg:pb-28 lg:pt-16">
                <CropMarks/>
                <RegMark className="spin-slow absolute right-6 top-6 hidden size-6 text-[var(--line-strong)] lg:block"/>

                <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-12">
                    <div>
                        <h1 aria-label="Pick colors in any format, styled your way."
                            className="display rise text-[clamp(2.6rem,10.4vw,5.6rem)] lg:text-[clamp(3rem,6vw,6.4rem)]">
                            <span><span><Bouncy text="Pick colors"/></span></span>
                            <span><span><Bouncy text="in any format," offset={11}/></span></span>
                            <span className="pb-[.45em]!">
                                <span>
                                    <em aria-hidden="true"
                                        className="relative inline-block whitespace-nowrap text-ink transition-colors duration-300">
                                        styled your way.
                                        <Drip key={dripKey}
                                              className="absolute left-[1%] top-[98%] h-[.34em] w-[96%]"/>
                                    </em>
                                </span>
                            </span>
                        </h1>

                        <p className="fade-up in-view mt-2 max-w-[34rem] text-lg leading-relaxed text-muted [--delay:.25s] sm:text-xl">
                            Six picker variants, alpha, harmonies, a contrast check and an on-screen eyedropper.
                            One React component with no runtime dependencies, themed with plain CSS variables.
                        </p>

                        <div className="fade-up in-view mt-10 flex flex-col gap-6 [--delay:.35s] sm:flex-row sm:items-center">
                            <InstallTape/>
                            <Link to="/features/variants" className="group inline-flex items-center gap-2 text-[15px] font-medium">
                                <span className="border-b border-line pb-0.5 transition-colors group-hover:border-text">Tour the features</span>
                                <ArrowGlyph className="size-5 transition-transform duration-300 group-hover:translate-x-1"/>
                            </Link>
                        </div>

                    </div>

                    <div className="flex items-start justify-center gap-6">
                        <Parallax speed={-0.12} className="mt-20 hidden xl:block">
                            <div className="tilt">
                                <div className="float">
                                    <PaintChip/>
                                </div>
                            </div>
                        </Parallax>
                        <div className="w-full max-w-[380px] sm:w-[380px]">
                            <ColorPicker
                                inline
                                value={color.hex}
                                onChange={(next) => setInk(next)}
                                variant="hue-box"
                                enableHueSlider
                                enableShuffle
                                enableFavorite
                                enableEyeDropper
                                showContrast
                                title="Mix something"
                                containerClasses="w-full"
                                popupClasses="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
