import {CSSProperties, ReactNode} from "react";
import {ColorFormat, ColorValue, formatColorValue} from "../../package";
import {useInk} from "../lib/ink-context";
import {useCopy} from "../lib/useCopy";
import {useInView} from "../lib/useInView";

const Tile = ({children, paper}: { children: ReactNode; paper?: boolean }) => (
    <div
        className={`relative grid h-24 w-full place-items-center overflow-hidden rounded-2xl border border-line sm:w-40 ${paper ? 'bg-white' : 'bg-card'}`}>
        {children}
    </div>
);

const HexArt = ({color}: { color: ColorValue }) => {
    const pairs = [color.hex.slice(1, 3), color.hex.slice(3, 5), color.hex.slice(5, 7)];
    const fills = ['#ff3b30', '#22c55e', '#2f6bff'];
    return (
        <Tile>
            <div className="flex gap-2 font-mono text-2xl font-semibold uppercase">
                {pairs.map((pair, i) => (
                    <span key={i} className="flex flex-col items-center gap-1.5">
                        {pair}
                        <span className="h-1.5 w-7 overflow-hidden rounded-full bg-soft">
                            <span className="block h-full rounded-full transition-[width] duration-500"
                                  style={{width: `${(parseInt(pair, 16) / 255) * 100}%`, background: fills[i]}}/>
                        </span>
                    </span>
                ))}
            </div>
        </Tile>
    );
};

const RgbArt = ({color}: { color: ColorValue }) => {
    const {r, g, b} = color.rgb;
    return (
        <Tile>
            <div className="flex h-16 items-end gap-2.5">
                {[[r, '#ff3b30'], [g, '#22c55e'], [b, '#2f6bff']].map(([value, fill], i) => (
                    <span key={i} className="flex h-full w-5 items-end overflow-hidden rounded-md bg-soft">
                        <span className="w-full rounded-md transition-[height] duration-500 ease-[var(--ease-spring)]"
                              style={{height: `${((value as number) / 255) * 100}%`, background: fill as string}}/>
                    </span>
                ))}
            </div>
        </Tile>
    );
};

const HslArt = ({color}: { color: ColorValue }) => {
    const {h, s, l} = color.hsl;
    return (
        <Tile>
            <div className="flex items-center gap-4">
                <div className="relative size-16">
                    <div className="absolute inset-0 rounded-full"
                         style={{
                             background: 'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
                             mask: 'radial-gradient(farthest-side, transparent 62%, #000 64%)',
                         }}/>
                    <span aria-hidden="true" className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-spring)]"
                          style={{transform: `rotate(${h}deg)`}}>
                        <span className="absolute left-1/2 top-1 h-[calc(50%-4px)] w-[2px] -translate-x-1/2 rounded bg-text"/>
                    </span>
                    <span className="absolute left-1/2 top-1/2 size-2 -translate-1/2 rounded-full bg-text"/>
                </div>
                <div className="flex flex-col gap-2 font-mono text-[10px] text-muted">
                    {([['S', s], ['L', l]] as const).map(([k, v]) => (
                        <span key={k} className="flex items-center gap-1.5">
                            {k}
                            <span className="h-1.5 w-10 overflow-hidden rounded-full bg-soft">
                                <span className="block h-full rounded-full bg-text transition-[width] duration-500"
                                      style={{width: `${v}%`}}/>
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </Tile>
    );
};

const HsvArt = ({color}: { color: ColorValue }) => {
    const {h, s, v} = color.hsv;
    return (
        <Tile>
            <div className="relative h-16 w-24 rounded-lg"
                 style={{background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${h} 100% 50%))`}}>
                <span
                    className="absolute size-3.5 -translate-1/2 rounded-full border-2 border-white shadow-md transition-all duration-500 ease-[var(--ease-spring)]"
                    style={{left: `${s}%`, top: `${100 - v}%`, background: color.hex.slice(0, 7)}}/>
            </div>
        </Tile>
    );
};

/** Overprinted process inks. Each disc grows with its percentage. */
const CmykArt = ({color}: { color: ColorValue }) => {
    const {c, m, y, k} = color.cmyk;
    const discs: [number, string, string][] = [[c, '#00a0e3', '38% 40%'], [m, '#e6007e', '62% 40%'], [y, '#ffed00', '50% 64%'], [k, '#1a1814', '50% 48%']];
    return (
        <Tile paper>
            {discs.map(([value, fill, at]) => (
                <span key={fill}
                      className="absolute size-14 rounded-full mix-blend-multiply transition-transform duration-700 ease-[var(--ease-spring)]"
                      style={{left: at.split(' ')[0], top: at.split(' ')[1], background: fill, transform: `translate(-50%, -50%) scale(${0.12 + Math.sqrt(value / 100) * 0.88})`, opacity: fill === '#1a1814' ? 0.85 : 0.9}}/>
            ))}
        </Tile>
    );
};

const ROWS: { format: ColorFormat; note: string; Art: (p: { color: ColorValue }) => ReactNode }[] = [
    {format: 'hex', note: 'Three byte pairs. Eight digits once alpha drops below 1.', Art: HexArt},
    {format: 'rgb', note: 'Light, added channel by channel. rgba() when translucent.', Art: RgbArt},
    {format: 'hsl', note: 'Hue as an angle, then saturation and lightness.', Art: HslArt},
    {format: 'hsv', note: 'What the box actually draws: saturation across, value up.', Art: HsvArt},
    {format: 'cmyk', note: 'Printer inks. Handy for handoff, approximate on screen.', Art: CmykArt},
];

const Formats = () => {
    const {color} = useInk();
    const {copied, copy} = useCopy();
    const {ref, seen} = useInView<HTMLElement>(0.15);

    return (
        <section id="formats" ref={ref} className={`mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:py-32 ${seen ? 'in-view' : ''}`}>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                <div className="fade-up lg:sticky lg:top-28 lg:self-start">
                    <h2 className="display text-[clamp(2.8rem,6vw,5rem)]">
                        One color,<br/><em>five ways</em> to write it.
                    </h2>
                    <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                        Every change hands you all five at once, so you store the one you need and never convert
                        twice. The field also takes any of them as input. Paste <code
                        className="rounded bg-soft px-1.5 py-0.5 font-mono text-[0.85em] text-text">hsl(200 80% 50%)</code> and
                        it just works.
                    </p>
                </div>

                <ol className="grid gap-4">
                    {ROWS.map(({format, note, Art}, i) => {
                        const text = formatColorValue(color, format);
                        return (
                            <li key={format} style={{'--delay': `${i * 70}ms`} as CSSProperties}
                                className="fade-up grid items-center gap-5 rounded-[26px] bg-card p-5 sm:grid-cols-[1fr_auto] sm:gap-8 sm:p-6">
                                <div className="min-w-0">
                                    <div className="flex items-baseline">
                                        <h3 className="display text-4xl">{format}</h3>
                                    </div>
                                    <button type="button" onClick={() => copy(text)}
                                            className="group mt-3 flex max-w-full cursor-pointer items-center gap-3 rounded-xl bg-soft px-3.5 py-2.5 text-left font-mono text-sm transition hover:border-[var(--line-strong)]">
                                        <span className="size-4 flex-none rounded bg-ink transition-colors duration-300"/>
                                        <span className="truncate">{text}</span>
                                        <span className="ml-auto flex-none pl-2 text-xs text-muted group-hover:text-text">
                                            {copied === text ? 'copied' : 'copy'}
                                        </span>
                                    </button>
                                    <p className="mt-3 text-[15px] text-muted">{note}</p>
                                </div>
                                <Art color={color}/>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};

export default Formats;
