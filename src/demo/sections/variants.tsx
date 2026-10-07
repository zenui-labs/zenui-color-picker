import {ColorPicker, ColorPickerVariant} from "../../package";
import {useInk} from "../lib/ink-context";
import {Reveal, Roller} from "../lib/reveal";
import {Link} from "../lib/link";

const VARIANTS: { variant: ColorPickerVariant; name: string; note: string; hue?: boolean }[] = [
    {variant: "wheel", name: "Wheel", note: "Hue on the ring, shade in the square."},
    {variant: "hue-box", name: "Hue box", note: "The classic, with a hue track below.", hue: true},
    {variant: "spectrum", name: "Spectrum", note: "Every hue across. Tints up, shades down."},
    {variant: "sliders", name: "Sliders", note: "Hue, saturation, brightness. Exact numbers."},
    {variant: "swatches", name: "Swatches", note: "A 78 color palette. Arrow keys move."},
    {variant: "hue-slider", name: "Hue slider", note: "Just the hue, for tight toolbars."},
];

const Variants = () => {
    const {color, setInk} = useInk();

    return (
        <section id="variants" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:py-32">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <Roller className="display text-[clamp(2.8rem,6vw,5rem)]">
                    Six ways to <em>mix.</em>
                </Roller>
                <Reveal as="p" delay={100} className="max-w-md text-lg leading-relaxed text-muted">
                    All six share one <code className="font-mono text-[0.85em] text-text">value</code>.
                    Drag any of them and the others follow, along with the rest of this page.
                </Reveal>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {VARIANTS.map(({variant, name, note, hue}, i) => (
                    <Reveal key={variant} delay={(i % 3) * 90} as="figure"
                            className="variant-card flex flex-col rounded-[28px] border border-line bg-card p-3">
                        <div className="relative grid flex-1 place-items-center overflow-hidden rounded-[20px] bg-soft/60 px-3 py-8">
                            <ColorPicker
                                inline
                                variant={variant}
                                value={color.hex}
                                onChange={setInk}
                                showTitle={false}
                                showPresets={false}
                                showHistory={false}
                                showFormats={false}
                                showAlpha={false}
                                enableHueSlider={hue}
                                popupClasses="w-[min(272px,100%)]"
                            />
                        </div>
                        <figcaption className="flex items-baseline justify-between gap-3 px-3 pb-2 pt-4">
                            <span className="display text-3xl">{name}</span>
                            <code className="font-mono text-xs text-muted">"{variant}"</code>
                        </figcaption>
                        <p className="px-3 pb-3 text-[15px] text-muted">{note}</p>
                    </Reveal>
                ))}
            </div>

            <Reveal className="mt-10 text-center">
                <Link to="/features/variants"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition hover:border-text hover:bg-text hover:text-paper">
                    When to use which
                </Link>
            </Reveal>
        </section>
    );
};

export default Variants;
