import {ReactNode, useMemo, useRef, useState} from "react";
import {ColorFormat, ColorPicker, ColorPickerVariant, Themes} from "../../package";
import {CodeBlock} from "../components/CodeBlock";

type ToggleKey =
    'showTitle' | 'inline' | 'disabled' | 'showAlpha' | 'showHistory' | 'showFormats' | 'showCopyButton'
    | 'showPresets' | 'showColorInput' | 'enableHueSlider' | 'enableFavorite' | 'enableShuffle' | 'enableEyeDropper'
    | 'showHarmony' | 'showContrast';

/** Defaults as the component ships them. Only props that differ end up in the code. */
const DEFAULT_TOGGLES: Record<ToggleKey, boolean> = {
    showTitle: true,
    inline: false,
    disabled: false,
    showAlpha: true,
    showHistory: true,
    showFormats: true,
    showCopyButton: true,
    showPresets: true,
    showColorInput: true,
    enableHueSlider: false,
    enableFavorite: false,
    enableShuffle: false,
    enableEyeDropper: false,
    showHarmony: false,
    showContrast: false,
};

const START_TOGGLES: Record<ToggleKey, boolean> = {
    ...DEFAULT_TOGGLES,
    inline: true,
    enableShuffle: true,
    enableFavorite: true,
    showContrast: true,
};

function Segmented<T extends string>({label, value, options, onChange}: {
    label: string;
    value: T;
    options: readonly T[];
    onChange: (v: T) => void
}) {
    const index = options.indexOf(value);
    const cols = options.length > 5 ? 3 : options.length;
    const rows = Math.ceil(options.length / cols);
    return (
        <fieldset>
            <legend className="mb-2 text-sm text-muted">{label}</legend>
            <div className="relative grid rounded-xl bg-soft p-1"
                 style={{gridTemplateColumns: `repeat(${cols}, 1fr)`}}>
                <span aria-hidden="true"
                      className="absolute left-1 top-1 rounded-lg bg-card shadow-[0_1px_3px_rgba(0,0,0,.12),0_0_0_1px_var(--line)] transition-transform duration-500 ease-[var(--ease-spring)]"
                      style={{
                          width: `calc((100% - .5rem) / ${cols})`,
                          height: `calc((100% - .5rem) / ${rows})`,
                          transform: `translate(${(index % cols) * 100}%, ${Math.floor(index / cols) * 100}%)`,
                      }}/>
                {options.map((option) => (
                    <label key={option}
                           className={`relative z-10 cursor-pointer rounded-lg py-2 text-center font-mono text-xs transition-colors has-focus-visible:outline-2 has-focus-visible:outline-ink ${option === value ? 'text-text' : 'text-muted hover:text-text'}`}>
                        <input type="radio" className="sr-only" name={label} checked={option === value}
                               onChange={() => onChange(option)}/>
                        {option}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

const Switch = ({label, checked, onChange}: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="group flex cursor-pointer items-center justify-between gap-3 py-2.5">
        <span className="font-mono text-[13px]">{label}</span>
        <input type="checkbox" role="switch" className="peer sr-only" checked={checked} onChange={onChange}/>
        <span
            className="relative h-6 w-10 flex-none rounded-full bg-soft shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-300 peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
            <span
                className={`absolute top-1 size-4 rounded-full bg-white shadow transition-all duration-300 ease-[var(--ease-spring)] ${checked ? 'left-5' : 'left-1'}`}/>
        </span>
    </label>
);

const Panel = ({title, children}: { title: string; children: ReactNode }) => (
    <section className="rounded-[24px] border border-line bg-card p-5 sm:p-6">
        <h3 className="display mb-5 text-3xl">{title}</h3>
        {children}
    </section>
);

const Playground = () => {
    const [color, setColor] = useState("#2F6BFF");
    const [format, setFormat] = useState<ColorFormat>("hex");
    const [variant, setVariant] = useState<ColorPickerVariant>("wheel");
    const [theme, setTheme] = useState<Themes | "auto">("auto");
    const [title, setTitle] = useState("Color Picker");
    const [brandColor, setBrandColor] = useState<string | null>(null);
    const [maxHistory, setMaxHistory] = useState(10);
    const [toggles, setToggles] = useState(START_TOGGLES);
    const brandRef = useRef<HTMLButtonElement>(null);

    const code = useMemo(() => {
        const props = ['value={color}', 'onChange={(next) => setColor(next.hex)}'];
        const str = (name: string, v: string) => props.push(`${name}="${v}"`);
        const expr = (name: string, v: number | boolean) => props.push(`${name}={${v}}`);

        if (variant !== 'wheel') str('variant', variant);
        if (format !== 'hex') str('format', format);
        if (theme !== 'auto') str('theme', theme);
        if (title !== 'Color Picker') str('title', title);
        if (brandColor) str('brandColor', brandColor);
        if (maxHistory !== 10) expr('maxHistory', maxHistory);
        (Object.keys(toggles) as ToggleKey[]).forEach((key) => {
            if (toggles[key] === DEFAULT_TOGGLES[key]) return;
            if (toggles[key]) props.push(key);
            else expr(key, false);
        });

        return `import {ColorPicker} from '@zenuilabs/color-picker-react';\n\n<ColorPicker\n${props.map(p => `  ${p}`).join('\n')}\n/>`;
    }, [variant, format, theme, title, brandColor, maxHistory, toggles]);

    return (
        <section id="playground" className="bg-card/40 py-24 lg:py-32">
            <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <h2 className="display text-[clamp(2.8rem,6vw,5rem)]">
                        The <em>mixing desk.</em>
                    </h2>
                    <p className="max-w-md text-lg leading-relaxed text-muted">
                        Flip every prop and copy the result. The snippet only lists what you changed from the
                        defaults.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
                    <div className="grid content-start gap-6">
                        <Panel title="Shape">
                            <div className="grid gap-5">
                                <Segmented label="variant" value={variant} options={['wheel', 'hue-box', 'hue-slider', 'spectrum', 'sliders', 'swatches'] as const} onChange={setVariant}/>
                                <Segmented label="format" value={format} options={['hex', 'rgb', 'hsl', 'hsv', 'cmyk'] as const} onChange={setFormat}/>
                                <Segmented label="theme" value={theme} options={['auto', 'light', 'dark'] as const} onChange={setTheme}/>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="mb-2 block text-sm text-muted">title</span>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)}
                                               className="h-11 w-full rounded-xl border border-line bg-paper px-3 font-mono text-sm outline-none transition focus:border-ink focus:ring-4 focus:ring-ink/20"/>
                                    </label>
                                    <div>
                                        <span className="mb-2 block text-sm text-muted">maxHistory</span>
                                        <div className="flex h-11 items-center justify-between rounded-xl border border-line bg-paper px-1">
                                            <button type="button" aria-label="Fewer"
                                                    onClick={() => setMaxHistory(n => Math.max(0, n - 1))}
                                                    className="grid size-9 cursor-pointer place-items-center rounded-lg text-lg hover:bg-soft">−
                                            </button>
                                            <span className="font-mono text-sm tabular-nums" aria-live="polite">{maxHistory}</span>
                                            <button type="button" aria-label="More"
                                                    onClick={() => setMaxHistory(n => Math.min(30, n + 1))}
                                                    className="grid size-9 cursor-pointer place-items-center rounded-lg text-lg hover:bg-soft">+
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className="mb-2 block text-sm text-muted">brandColor <span className="opacity-70">(opens a second picker through triggerRef)</span></span>
                                    <div className="flex items-center gap-2">
                                        <button ref={brandRef} type="button"
                                                className="flex h-11 flex-1 cursor-pointer items-center gap-3 rounded-xl border border-line bg-paper px-2 text-left font-mono text-sm transition hover:border-[var(--line-strong)]">
                                            <span className="size-7 rounded-lg border border-line"
                                                  style={{background: brandColor ?? 'var(--zcp-accent, #00aa45)'}}/>
                                            {brandColor ?? 'default'}
                                        </button>
                                        {brandColor && (
                                            <button type="button" onClick={() => setBrandColor(null)}
                                                    className="h-11 cursor-pointer rounded-xl px-3 text-sm text-muted hover:bg-soft hover:text-text">
                                                reset
                                            </button>
                                        )}
                                    </div>
                                    <ColorPicker
                                        triggerRef={brandRef}
                                        value={brandColor ?? '#00AA45'}
                                        onChange={(c) => setBrandColor(c.hex.slice(0, 7))}
                                        variant="hue-box"
                                        enableHueSlider
                                        showTitle={false}
                                        showAlpha={false}
                                        showHistory={false}
                                        showFormats={false}
                                        showPresets={false}
                                        showCopyButton={false}
                                    />
                                </div>
                            </div>
                        </Panel>

                        <Panel title="Switches">
                            <div className="grid gap-x-8 sm:grid-cols-2">
                                {(Object.keys(toggles) as ToggleKey[]).map((key) => (
                                    <Switch key={key} label={key} checked={toggles[key]}
                                            onChange={() => setToggles(t => ({...t, [key]: !t[key]}))}/>
                                ))}
                            </div>
                        </Panel>
                    </div>

                    <div className="grid content-start gap-6 lg:sticky lg:top-24 lg:self-start">
                        <div
                            className="relative grid min-h-[520px] place-items-center overflow-hidden rounded-[24px] border border-line p-6 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:24px_24px] [background-position:-1px_-1px]">
                            <span className="absolute left-4 top-3 font-mono text-[11px] text-muted">preview</span>
                            <span className="absolute bottom-3 right-4 font-mono text-[11px] text-muted">{color}</span>
                            <ColorPicker
                                key={toggles.inline ? 'inline' : 'popover'}
                                value={color}
                                onChange={(c) => setColor(c.hex)}
                                format={format}
                                onFormatChange={setFormat}
                                variant={variant}
                                theme={theme === 'auto' ? undefined : theme}
                                title={title}
                                maxHistory={maxHistory}
                                brandColor={brandColor ?? undefined}
                                {...toggles}
                            />
                        </div>
                        <CodeBlock code={code}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Playground;
