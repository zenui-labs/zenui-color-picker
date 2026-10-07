// The two share-image layouts, built from the real picker and the site's own parts.
import {ColorPicker, ColorPickerVariant} from '../../src/package';
import {ChipMark, CropMarks, Drip, RegMark} from '../../src/demo/lib/art';
import {PaintChip} from '../../src/demo/sections/hero';
import pkg from '../../package.json';

const Logo = () => (
    <div className="flex items-center gap-3">
        <ChipMark className="h-9 w-auto text-text"/>
        <span className="display text-[1.9rem] leading-none">color<em>picker</em></span>
        <span className="ml-1 rounded-full border border-line px-2.5 py-0.5 font-mono text-[13px] text-muted">
            v{pkg.version}
        </span>
    </div>
);

export const Card = () => (
    <div className="relative flex h-full gap-10 p-14">
        <div className="absolute inset-6"><CropMarks/></div>
        <RegMark className="absolute right-10 top-10 size-6 text-[var(--line-strong)]"/>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
            <Logo/>
            <h1 className="display text-[5.2rem]">
                Pick colors<br/>
                in any format,<br/>
                <em className="relative inline-block whitespace-nowrap pb-[.3em] text-ink">
                    styled your way.
                    <Drip className="absolute left-[1%] top-[86%] h-[.34em] w-[96%]"/>
                </em>
            </h1>
            <div className="flex items-center gap-6">
                <div className="tape w-fit px-5 py-3.5">
                    <span className="tape-text relative block font-mono text-[15px] font-semibold tracking-wide">
                        <span className="opacity-60">$ </span>npm i {pkg.name}
                    </span>
                </div>
                <span className="font-mono text-[14px] text-muted">React · 0 dependencies</span>
            </div>
        </div>

        <div className="relative flex shrink-0 items-center">
            <div className="absolute -left-44 bottom-16 rotate-[-8deg]"><PaintChip/></div>
            <ColorPicker
                inline
                value="#00AA45"
                showTitle
                title="Mix something"
                showPresets={false}
                showHistory={false}
                enableFavorite
                enableShuffle
                enableEyeDropper
                popupClasses="w-[330px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.5)]"
            />
        </div>
    </div>
);

const VARIANTS: { variant: ColorPickerVariant; name: string; color: string; hue?: boolean }[] = [
    {variant: 'wheel', name: 'Wheel', color: '#00AA45'},
    {variant: 'hue-box', name: 'Hue box', color: '#3B82F6', hue: true},
    {variant: 'spectrum', name: 'Spectrum', color: '#F59E0B'},
    {variant: 'sliders', name: 'Sliders', color: '#E11D48'},
    {variant: 'swatches', name: 'Swatches', color: '#7C3AED'},
    {variant: 'hue-slider', name: 'Hue slider', color: '#0D9488'},
];

export const Variants = () => (
    <div className="grid h-full grid-cols-3 gap-6 p-10">
        {VARIANTS.map(({variant, name, color, hue}) => (
            <figure key={variant} className="flex flex-col rounded-[28px] border border-line bg-card p-3">
                <div className="grid flex-1 place-items-center rounded-[20px] bg-soft/60 p-6">
                    <ColorPicker inline variant={variant} value={color} enableHueSlider={hue}
                                 showTitle={false} showPresets={false} showHistory={false} showFormats={false}
                                 showAlpha={false} popupClasses="w-[300px]"/>
                </div>
                <figcaption className="flex items-baseline justify-between px-3 pb-2 pt-4">
                    <span className="display text-3xl">{name}</span>
                    <code className="font-mono text-sm text-muted">variant="{variant}"</code>
                </figcaption>
            </figure>
        ))}
    </div>
);
