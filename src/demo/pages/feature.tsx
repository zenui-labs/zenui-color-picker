import {CSSProperties, useEffect, useState} from "react";
import {ColorPicker, ColorPickerVariant} from "../../package";
import {Feature, FEATURES} from "../lib/features";
import {useInk} from "../lib/ink-context";
import {Link} from "../lib/link";
import {Reveal, Roller} from "../lib/reveal";
import {ArrowGlyph} from "../lib/art";
import {CodeBlock} from "../components/CodeBlock";
import {PackageFacts} from "../components/PackageFacts";
import {PropCards} from "../components/PropCards";

const VARIANTS: ColorPickerVariant[] = ['wheel', 'hue-box', 'hue-slider', 'spectrum', 'sliders', 'swatches'];

const THEMES: { name: string; style: CSSProperties }[] = [
    {name: "Default", style: {}},
    {
        name: "Midnight",
        style: {
            '--zcp-accent': '#a78bfa', '--zcp-bg': '#0d0b1a', '--zcp-surface': '#1a1630', '--zcp-text': '#ece9ff',
            '--zcp-muted': '#8f88b8', '--zcp-border': 'rgba(167,139,250,.2)', '--zcp-radius': '24px',
        } as CSSProperties,
    },
    {
        name: "Brutal",
        style: {
            '--zcp-accent': '#ff4d00', '--zcp-bg': '#fff8e7', '--zcp-surface': '#ffe9b8', '--zcp-text': '#000',
            '--zcp-muted': '#4d4430', '--zcp-border': '#000', '--zcp-radius': '0px',
            '--zcp-shadow': '8px 8px 0 #000',
        } as CSSProperties,
    },
    {
        name: "Mint",
        style: {
            '--zcp-accent': '#0f766e', '--zcp-bg': '#effcf6', '--zcp-surface': '#d5f5e8', '--zcp-text': '#053d36',
            '--zcp-muted': '#3f7a6f', '--zcp-border': 'rgba(15,118,110,.18)', '--zcp-radius': '14px',
        } as CSSProperties,
    },
];

const KEYS: [string, string][] = [
    ["Tab", "Move between handles, the format switch, the field and swatches"],
    ["Arrow keys", "Nudge the focused handle by 1"],
    ["Shift + arrows", "Nudge by 10"],
    ["Home / End", "Jump a slider to its ends"],
    ["Page Up / Down", "Move a slider by a tenth of its range"],
    ["Escape", "Close the popover, focus returns to the trigger"],
];

const Pill = ({active, onClick, children}: { active: boolean; onClick: () => void; children: string }) => (
    <button type="button" onClick={onClick} aria-pressed={active}
            className={`cursor-pointer rounded-full border px-3 py-1.5 font-mono text-xs transition ${active ? 'border-text bg-text text-paper' : 'border-line text-muted hover:border-text hover:text-text'}`}>
        {children}
    </button>
);

const Demo = ({feature}: { feature: Feature }) => {
    const {color, setInk} = useInk();
    const [variant, setVariant] = useState<ColorPickerVariant>(feature.demo.variant ?? 'wheel');
    const [theme, setTheme] = useState(0);
    const demoValue = feature.demo.value;

    return (
        <div className="grid gap-4">
            {feature.extra === 'variants' && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="Variant">
                    {VARIANTS.map((v) => <Pill key={v} active={v === variant} onClick={() => setVariant(v)}>{v}</Pill>)}
                </div>
            )}
            {feature.extra === 'themes' && (
                <div className="flex flex-wrap gap-2" role="group" aria-label="Theme preset">
                    {THEMES.map((t, i) => <Pill key={t.name} active={i === theme} onClick={() => setTheme(i)}>{t.name}</Pill>)}
                </div>
            )}
            <div
                className="relative grid min-h-[520px] place-items-center overflow-hidden rounded-[28px] border border-line p-6 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:24px_24px]">
                <span className="absolute left-4 top-3 font-mono text-[11px] text-muted">live</span>
                <ColorPicker
                    key={`${feature.slug}-${variant}`}
                    inline
                    title={feature.title}
                    {...feature.demo}
                    variant={variant}
                    value={demoValue ?? color.hex}
                    onChange={demoValue ? undefined : setInk}
                    containerStyle={THEMES[theme].style}
                />
            </div>
        </div>
    );
};

const FeaturePage = ({feature}: { feature: Feature }) => {
    const index = FEATURES.indexOf(feature);
    const prev = FEATURES[(index - 1 + FEATURES.length) % FEATURES.length];
    const next = FEATURES[(index + 1) % FEATURES.length];

    useEffect(() => {
        document.title = `${feature.title} · ColorPicker for React`;
    }, [feature]);

    return (
        <article className="relative overflow-hidden pt-16">

            <header className="relative mx-auto max-w-[1240px] px-4 pb-14 pt-12 sm:px-6 lg:pt-20">
                <Link to="/#features" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-text">
                    <ArrowGlyph className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"/>
                    All features
                </Link>
                <Roller as="h1" className="display mt-10 max-w-4xl text-[clamp(3rem,9vw,7.5rem)]">
                    {feature.title}
                </Roller>
                <Reveal as="p" delay={200} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                    {feature.lead}
                </Reveal>
            </header>

            <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                <div className="grid content-start gap-12">
                    <section>
                        <h2 className="display mb-5 text-4xl">The details</h2>
                        <ul className="grid gap-3">
                            {feature.points.map((point, i) => (
                                <Reveal as="li" key={point} delay={i * 60}
                                        className="flex gap-4 rounded-2xl bg-card px-5 py-4 text-[15px] leading-relaxed">
                                    <span className="mt-2 size-2 flex-none rounded-full bg-ink"/>
                                    <span>{point}</span>
                                </Reveal>
                            ))}
                        </ul>
                    </section>

                    {feature.extra === 'keys' && (
                        <section>
                            <h2 className="display mb-5 text-4xl">Keyboard</h2>
                            <dl className="grid gap-2">
                                {KEYS.map(([k, v]) => (
                                    <div key={k} className="flex flex-col gap-2 rounded-2xl bg-card px-5 py-3.5 sm:flex-row sm:items-center sm:gap-6">
                                        <dt className="w-40 flex-none"><kbd className="rounded-md border border-line bg-card px-2 py-1 font-mono text-xs shadow-[0_2px_0_var(--line)]">{k}</kbd></dt>
                                        <dd className="text-[15px] text-muted">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    )}

                    <section>
                        <h2 className="display mb-5 text-4xl">In code</h2>
                        <CodeBlock code={feature.code} file={feature.extra === 'themes' ? 'styles.css' : 'App.tsx'}/>
                    </section>

                    {feature.props.length > 0 && (
                        <section>
                            <h2 className="display mb-5 text-4xl">Props</h2>
                            <PropCards rows={feature.props}/>
                        </section>
                    )}
                </div>

                <div className="lg:sticky lg:top-24 lg:self-start">
                    {feature.extra === 'facts' ? (
                        <div className="grid gap-10">
                            <Demo feature={feature}/>
                            <div className="flex justify-center"><PackageFacts/></div>
                        </div>
                    ) : <Demo feature={feature}/>}
                </div>
            </div>

            <nav aria-label="More features" className="mx-auto grid max-w-[1240px] gap-4 px-4 pb-20 sm:grid-cols-2 sm:px-6">
                {[{f: prev, label: 'Previous'}, {f: next, label: 'Next'}].map(({f, label}, i) => (
                    <Link key={label} to={`/features/${f.slug}`}
                          className={`next-chip group relative overflow-hidden rounded-[28px] bg-card px-7 py-10 sm:px-10 ${i === 1 ? 'sm:text-right' : ''}`}
                          style={{'--chip': `hsl(calc(var(--ink-h) + ${(FEATURES.indexOf(f) + 1) * 36}) 64% 52%)`} as CSSProperties}>
                        <span className="next-chip-fill absolute inset-0"/>
                        <span className="relative block font-mono text-xs text-muted transition-colors group-hover:text-white/80">{label}</span>
                        <span className="display relative mt-2 block text-[clamp(2rem,4vw,3.5rem)] leading-none transition-colors group-hover:text-white">{f.title}</span>
                    </Link>
                ))}
            </nav>
        </article>
    );
};

export default FeaturePage;
