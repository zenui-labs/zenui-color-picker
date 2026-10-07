import type {ColorPickerProps} from "../../package";

export type PropRow = [name: string, type: string, fallback: string, description: string];

export interface Feature {
    slug: string;
    title: string;
    /** One line for lists and the fan deck. */
    short: string;
    /** Opening paragraph on the detail page. */
    lead: string;
    points: string[];
    /** Props for the live picker on the detail page. */
    demo: Partial<ColorPickerProps>;
    /** Optional extra block rendered next to the demo. */
    extra?: "variants" | "themes" | "keys" | "facts";
    code: string;
    props: PropRow[];
}

export const FEATURES: Feature[] = [
    {
        slug: "variants",
        title: "Six variants",
        short: "Wheel, hue box, hue slider, spectrum, channel sliders and a palette grid. Same props for all six.",
        lead: "Different screens need different pickers. A settings page has room for a wheel; a toolbar has room for a strip. Change one prop and the rest of the panel stays the same.",
        points: [
            "wheel: a hue ring around a saturation and brightness square.",
            "hue-box: the classic saturation box. Add enableHueSlider for a hue track under it.",
            "hue-slider: only the hue. Greys jump to full color so the slider always does something.",
            "spectrum: every hue across, tints above the middle and shades below. One drag reaches most colors.",
            "sliders: hue, saturation and brightness as labelled tracks with exact numbers.",
            "swatches: a ready-made 78 color palette with keyboard navigation.",
        ],
        demo: {variant: "spectrum", showPresets: false, showHistory: false},
        extra: "variants",
        code: `import {ColorPicker} from '@zenuilabs/color-picker-react';

<ColorPicker variant="spectrum" value={color} onChange={(c) => setColor(c.hex)}/>
<ColorPicker variant="sliders" value={color} onChange={(c) => setColor(c.hex)}/>
<ColorPicker variant="swatches" value={color} onChange={(c) => setColor(c.hex)}/>`,
        props: [
            ["variant", "'wheel' | 'hue-box' | 'hue-slider' | 'spectrum' | 'sliders' | 'swatches'", "'wheel'", "Which picking surface to show."],
            ["enableHueSlider", "boolean", "false", "Adds a hue track under the wheel, hue box, spectrum or palette."],
        ],
    },
    {
        slug: "alpha",
        title: "Alpha you can see",
        short: "A checkerboard track and swatches, so 40% opacity looks like 40%.",
        lead: "Transparency is hard to judge on a flat color. Every swatch, the preview chip and the opacity track sit on a checkerboard, so you see exactly how much of the background shows through.",
        points: [
            "The opacity slider is on by default. Turn it off with showAlpha={false}.",
            "Fully opaque colors stay short: #22c55e, rgb(), hsl().",
            "Below 100% you get #22c55e80, rgba() and hsla(), and ColorValue.rgb.a holds the number.",
            "An alpha of 0 stays 0. Older versions read it as 1.",
        ],
        demo: {format: "rgb", value: "rgba(34, 197, 94, 0.55)", showPresets: false, variant: "hue-box"},
        code: `<ColorPicker
  showAlpha
  format="rgb"
  value={color}
  onChange={(next) => {
    next.rgb.a;   // 0.55
    next.hex;     // '#22c55e8c'
    setColor(next.hex);
  }}
/>`,
        props: [
            ["showAlpha", "boolean", "true", "Show the opacity slider."],
            ["value", "string", "", "Alpha in the value is kept, from #rrggbbaa, rgba() or hsla()."],
        ],
    },
    {
        slug: "formats",
        title: "Paste anything",
        short: "The field takes hex, rgb, hsl, hsv and cmyk in comma or space syntax.",
        lead: "People copy colors from everywhere: a design tool, a stylesheet, a brand PDF. The text field accepts any supported format no matter which one is showing, and converts as you type.",
        points: [
            "Hex in 3, 4, 6 or 8 digits.",
            "rgb() and rgba(), with commas or the modern rgb(10 20 30 / 50%) syntax.",
            "hsl() and hsla(), hsv() and cmyk().",
            "Bad input turns the field red and goes back to the last good value when you leave it.",
            "onChange hands you every format at once, so you never convert twice.",
        ],
        demo: {format: "hsl", variant: "hue-box", showPresets: false},
        code: `import {parseColor, formatColorValue} from '@zenuilabs/color-picker-react';

const c = parseColor('cmyk(0%, 36%, 96%, 4%)');
formatColorValue(c!, 'hsl');   // 'hsl(37, 100%, 52%)'
parseColor('not a color');     // null`,
        props: [
            ["format", "'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk'", "'hex'", "Format shown in the field."],
            ["onFormatChange", "(format) => void", "", "Fires when the user switches format."],
            ["showFormats", "boolean", "true", "Show the format switch."],
            ["showColorInput", "boolean", "true", "Show the text field."],
        ],
    },
    {
        slug: "keyboard",
        title: "Keys, mouse, pen, touch",
        short: "Every handle is a real slider. Arrows nudge, Shift moves by ten.",
        lead: "Each handle is a focusable slider with a readable value, so screen readers announce it and the keyboard can drive it. Drags use pointer events with pointer capture: the same code path for a mouse, a stylus and a finger.",
        points: [
            "Tab moves between handles, the format switch, the field and the swatches.",
            "Pointer capture keeps a drag alive when the pointer leaves the control.",
            "Touch drags never scroll the page underneath.",
            "In popover mode, Escape closes the panel and gives focus back to the trigger.",
            "Animations shrink to nothing when the visitor prefers reduced motion.",
        ],
        demo: {variant: "wheel", showPresets: false},
        extra: "keys",
        code: `// Nothing to configure. Every variant ships with:
<div role="slider" tabIndex={0}
     aria-valuenow={217} aria-valuetext="217 degrees"/>`,
        props: [
            ["disabled", "boolean", "false", "Removes handles from the tab order and blocks input."],
            ["title", "string", "'Color Picker'", "Also used as the panel's accessible name."],
        ],
    },
    {
        slug: "theming",
        title: "Your CSS wins",
        short: "Styles live in a cascade layer behind --zcp-* variables. Override without !important.",
        lead: "The stylesheet only touches classes that start with zcp-, and all of it sits in the components cascade layer. Your own CSS and utility classes beat it by default, and ten custom properties cover the usual changes.",
        points: [
            "No global reset, no scrollbar styles, nothing outside the picker.",
            "Leave out theme and the picker turns dark under any .dark class. Pass theme to pin it.",
            "--zcp-accent falls back to --brand-color, so an existing brand variable just works.",
            "Tailwind classes on containerClasses and popupClasses apply directly.",
        ],
        demo: {variant: "hue-box", showPresets: true, showHistory: false},
        extra: "themes",
        code: `.zcp {
  --zcp-accent: #7c3aed;
  --zcp-bg: #0b0b12;
  --zcp-surface: #171726;
  --zcp-text: #ece9ff;
  --zcp-radius: 6px;
  --zcp-font: "Space Mono", monospace;
}`,
        props: [
            ["theme", "'light' | 'dark'", "", "Pins a theme. Left out, it follows a .dark ancestor."],
            ["brandColor", "string", "", "Shortcut for --zcp-accent."],
            ["containerStyle", "CSSProperties", "", "A handy place to set --zcp-* variables per instance."],
            ["popupClasses", "string", "", "Classes for the panel. Width utilities work."],
        ],
    },
    {
        slug: "history",
        title: "History and favorites",
        short: "Recent colors fill in as you settle. Double-click one to keep it.",
        lead: "History records the color you land on, not every color you pass through while dragging. Favorites are one click on the heart, or a double-click on any recent color.",
        points: [
            "A color is recorded when a drag ends, a handle loses focus, or you pick a preset.",
            "maxHistory caps the list. The newest color is first and duplicates move to the front.",
            "Double-click a favorite to remove it.",
            "Need the lists yourself? useColorPicker exposes history, favorites and their setters.",
        ],
        demo: {variant: "hue-box", enableFavorite: true, maxHistory: 12, showPresets: false},
        code: `import {useColorPicker} from '@zenuilabs/color-picker-react';

const {colorHistory, favoriteColors, addToFavorites, clearHistory} =
  useColorPicker({maxHistory: 12});`,
        props: [
            ["showHistory", "boolean", "true", "Show the recent row."],
            ["maxHistory", "number", "10", "How many recent colors to keep."],
            ["enableFavorite", "boolean", "false", "Heart button and favorites row."],
        ],
    },
    {
        slug: "eyedropper",
        title: "Pick off the screen",
        short: "An eyedropper button that samples any pixel on the display.",
        lead: "Sometimes the color you want is already on screen: in a screenshot, a mockup, another tab. In Chromium browsers the eyedropper samples any pixel, even outside the browser window.",
        points: [
            "Uses the browser's EyeDropper API. Nothing is uploaded; the browser hands back one hex value.",
            "The button only renders where the API exists, so Safari and Firefox users never see a dead control.",
            "Press Escape to cancel sampling.",
        ],
        demo: {variant: "hue-box", enableEyeDropper: true, showPresets: false},
        code: `<ColorPicker enableEyeDropper value={color} onChange={(c) => setColor(c.hex)}/>`,
        props: [
            ["enableEyeDropper", "boolean", "false", "Show the eyedropper button where supported."],
        ],
    },
    {
        slug: "harmony",
        title: "Color harmonies",
        short: "Complementary, analogous, triadic, split and tetradic colors, one click away.",
        lead: "A single color rarely ships alone. The harmony row turns the hue wheel for you and keeps saturation and brightness, so the suggestions belong to the same family.",
        points: [
            "Five modes: complementary, analogous, triadic, split complementary and tetradic.",
            "The first chip is always the current color, for comparison.",
            "Hover a chip to widen it and read its hex. Click to use it.",
            "getHarmony(color, mode) is exported for building your own palette UI.",
        ],
        demo: {variant: "wheel", showHarmony: true, showPresets: false},
        code: `import {getHarmony, parseColor} from '@zenuilabs/color-picker-react';

getHarmony(parseColor('#2f6bff')!, 'triadic').map((c) => c.hex);
// ['#2f6bff', '#ff2f6b', '#6bff2f']`,
        props: [
            ["showHarmony", "boolean", "false", "Show the harmony row."],
        ],
    },
    {
        slug: "contrast",
        title: "Contrast check",
        short: "WCAG contrast for white and black text, graded as you drag.",
        lead: "A brand color is only useful if text on it is readable. The contrast strip shows white and black text on the current color with the WCAG ratio and grade, updating live.",
        points: [
            "Grades: AAA from 7:1, AA from 4.5:1, AA large from 3:1, otherwise Fail.",
            "Uses the WCAG 2 relative luminance formula. Alpha is ignored.",
            "getContrastRatio(a, b) and getLuminance(color) are exported.",
        ],
        demo: {variant: "spectrum", showContrast: true, showPresets: false},
        code: `import {getContrastRatio, parseColor} from '@zenuilabs/color-picker-react';

getContrastRatio(parseColor('#2f6bff')!, parseColor('#fff')!); // 4.5`,
        props: [
            ["showContrast", "boolean", "false", "Show the contrast strip."],
        ],
    },
    {
        slug: "zero-deps",
        title: "Nothing else to install",
        short: "No icon set, no class helpers, no Tailwind in your bundle. React is the only peer.",
        lead: "The package is one component, a few small hooks and a stylesheet. Icons are inline SVG, class names are joined by a tiny helper, and the CSS is hand written.",
        points: [
            "Peer dependencies: react and react-dom 16.14 or newer. Nothing else.",
            "ESM and CommonJS builds behind an exports map, with TypeScript types.",
            "The stylesheet is imported for you, or import @zenuilabs/color-picker-react/style.css yourself.",
            "sideEffects is set, so bundlers tree-shake the color utilities you do not use.",
        ],
        demo: {variant: "wheel", showPresets: false},
        extra: "facts",
        code: `npm install @zenuilabs/color-picker-react

// package.json of the library
"dependencies": {},
"peerDependencies": { "react": ">=16.14.0", "react-dom": ">=16.14.0" }`,
        props: [],
    },
];

export const featureBySlug = (slug: string) => FEATURES.find((f) => f.slug === slug);
