# @zenuilabs/color-picker-react

A React color picker with six variants, alpha, five color formats, color harmonies, a contrast check, history and
favorites. It has no runtime dependencies, and you theme it with plain CSS variables.

**Live demo:** https://color-picker.zenui.net/

![ColorPicker preview](https://ik.imagekit.io/b2xymuik2/website%20preview%20image.png)

- [Install](#install)
- [Quick start](#quick-start)
- [Examples](#examples)
- [Props](#props)
- [Other exports](#other-exports)
- [Theming](#theming)
- [Accessibility](#accessibility)
- [Requirements](#requirements)
- [Upgrading from 1.1](#upgrading-from-11)
- [Contributing](#contributing)

## Install

```bash
npm install @zenuilabs/color-picker-react
```

The stylesheet is imported for you when you import the component. If your setup strips CSS side effects, import it
yourself:

```ts
import '@zenuilabs/color-picker-react/style.css';
```

## Quick start

```tsx
import {useState} from 'react';
import {ColorPicker} from '@zenuilabs/color-picker-react';

export default function App() {
    const [color, setColor] = useState('#3B82F6');

    return <ColorPicker value={color} onChange={(next) => setColor(next.hex)}/>;
}
```

That renders a swatch button. Clicking it opens the picker in a popover. Pass `inline` to render the panel in place.

## Examples

**Inline hue box with a hue slider**

```tsx
<ColorPicker
    inline
    variant="hue-box"
    enableHueSlider
    value={color}
    onChange={(next) => setColor(next.hex)}
/>
```

**Every format at once.** `onChange` gives you a `ColorValue`, which carries the color in all five formats, plus the
format currently selected in the picker.

```tsx
<ColorPicker
    value={color}
    format="hsl"
    onChange={(next, format) => {
        next.hex;   // '#f59e0b'
        next.rgb;   // { r: 245, g: 158, b: 11 }
        next.hsl;   // { h: 38, s: 92, l: 50 }
        next.hsv;   // { h: 38, s: 96, v: 96 }
        next.cmyk;  // { c: 0, m: 36, y: 96, k: 4 }
        setColor(next.hex);
    }}
/>
```

When alpha is below 1, `hex` has eight digits and `rgb` and `hsl` include `a`.

**Your own trigger.** Any element works. The picker toggles when it is clicked.

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);

<button ref={buttonRef}>Brand color</button>
<ColorPicker triggerRef={buttonRef} value={color} onChange={(next) => setColor(next.hex)}/>
```

**Spectrum, channel sliders or a palette grid**

```tsx
<ColorPicker inline variant="spectrum" value={color} onChange={(next) => setColor(next.hex)}/>
<ColorPicker inline variant="sliders" value={color} onChange={(next) => setColor(next.hex)}/>
<ColorPicker inline variant="swatches" value={color} onChange={(next) => setColor(next.hex)}/>
```

**Harmonies and contrast**

```tsx
<ColorPicker showHarmony showContrast value={color} onChange={(next) => setColor(next.hex)}/>
```

`showHarmony` adds a row of complementary, analogous, triadic, split complementary or tetradic colors. `showContrast`
shows white and black text on the color with its WCAG ratio and grade (AAA, AA, AA large or Fail).

**Presets, shuffle, favorites and the eyedropper**

```tsx
<ColorPicker
    value={color}
    onChange={(next) => setColor(next.hex)}
    presetColors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7B267', '#A78BFA']}
    enableShuffle
    enableFavorite
    enableEyeDropper
    maxHistory={15}
/>
```

## Props

| Prop                | Type                                               | Default               | Description                                                                                       |
|---------------------|----------------------------------------------------|-----------------------|---------------------------------------------------------------------------------------------------|
| `value`             | `string`                                           |                       | Any string `parseColor` understands: hex (3, 4, 6 or 8 digits), `rgb()`, `hsl()`, `hsv()`, `cmyk()`. |
| `onChange`          | `(color: ColorValue, format: ColorFormat) => void` |                       | Fires on every user change. It does not fire when `value` changes from outside.                    |
| `format`            | `ColorFormat`                                      | `'hex'`               | Format shown in the text field.                                                                   |
| `onFormatChange`    | `(format: ColorFormat) => void`                    |                       | Fires when the user picks another format.                                                         |
| `variant`           | `'wheel' \| 'hue-box' \| 'hue-slider' \| 'spectrum' \| 'sliders' \| 'swatches'` | `'wheel'` | Hue ring around a square, saturation box, hue slider only, hue-by-lightness spectrum, H/S/B channel sliders, or a 78 color palette grid. |
| `theme`             | `'light' \| 'dark'`                                |                       | Pins the theme. Left out, the picker turns dark inside any element with a `dark` class.           |
| `inline`            | `boolean`                                          | `false`               | Render the panel in place instead of in a popover.                                                |
| `disabled`          | `boolean`                                          | `false`               | Disables every control.                                                                           |
| `title`             | `string`                                           | `'Color Picker'`      | Heading text. Also the panel's accessible name.                                                   |
| `showTitle`         | `boolean`                                          | `true`                | Show the heading.                                                                                 |
| `showAlpha`         | `boolean`                                          | `true`                | Show the opacity slider.                                                                          |
| `showFormats`       | `boolean`                                          | `true`                | Show the HEX / RGB / HSL / HSV / CMYK switch.                                                     |
| `showColorInput`    | `boolean`                                          | `true`                | Show the text field.                                                                              |
| `showCopyButton`    | `boolean`                                          | `true`                | Show the copy button inside the text field.                                                       |
| `showPresets`       | `boolean`                                          | `true`                | Show preset swatches.                                                                             |
| `presetColors`      | `string[]`                                         | `defaultPresetColors` | Preset swatches. Any parseable color string.                                                      |
| `showHistory`       | `boolean`                                          | `true`                | Show recent colors. A color is recorded when a drag ends, not on every move.                      |
| `maxHistory`        | `number`                                           | `10`                  | How many recent colors to keep.                                                                   |
| `enableHueSlider`   | `boolean`                                          | `false`               | Add a hue slider under the wheel, hue box, spectrum or palette.                                   |
| `showHarmony`       | `boolean`                                          | `false`               | Row of harmonious colors with five modes.                                                         |
| `showContrast`      | `boolean`                                          | `false`               | White and black text on the color, with WCAG ratio and grade.                                     |
| `enableFavorite`    | `boolean`                                          | `false`               | Heart button and a favorites row. Double-click a recent color to favorite it.                     |
| `enableShuffle`     | `boolean`                                          | `false`               | Button that picks a random color.                                                                 |
| `enableEyeDropper`  | `boolean`                                          | `false`               | Button that samples a color from the screen. Shown only where the EyeDropper API exists (Chromium). |
| `brandColor`        | `string`                                           |                       | Accent for focus rings, the active format and the selected swatch. Same as setting `--zcp-accent`. |
| `triggerRef`        | `RefObject<HTMLElement \| null>`                   |                       | Use your own element as the trigger.                                                              |
| `showDefaultButton` | `boolean`                                          | `true`                | Render the built-in swatch button when there is no `triggerRef`.                                  |
| `onOpen`            | `() => void`                                       |                       | Popover opened.                                                                                   |
| `onClose`           | `() => void`                                       |                       | Popover closed (outside click, Escape or the trigger).                                            |
| `containerClasses`  | `string`                                           |                       | Classes for the root element.                                                                     |
| `containerStyle`    | `CSSProperties`                                    |                       | Inline styles for the root element. A good place for `--zcp-*` variables.                          |
| `popupClasses`      | `string`                                           |                       | Classes for the panel, for example a width.                                                       |

## Other exports

```ts
import {
    BrightnessSlider,     // the opacity slider on its own
    ColorInput,           // the text field on its own
    useColorPicker,       // format, history and favorites state
    parseColor,           // string -> ColorValue | null
    formatColorValue,     // (ColorValue, format) -> string
    colorToValue,         // (r, g, b, a?) -> ColorValue
    hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToHsv, hsvToRgb, rgbToCmyk, cmykToRgb,
    getLuminance,         // WCAG relative luminance, for picking readable text
    getContrastRatio,     // (a, b) -> 1..21
    getHarmony,           // (color, 'complementary' | 'analogous' | 'triadic' | 'split' | 'tetradic') -> ColorValue[]
    defaultPresetColors,
    type ColorValue, type ColorFormat, type ColorPickerVariant, type ColorPickerProps, type Themes,
} from '@zenuilabs/color-picker-react';
```

`parseColor` returns `null` for anything that is not a color. It accepts comma and space syntax, so
`rgb(10, 20, 30)`, `rgb(10 20 30 / 50%)` and `hsl(200 80% 50%)` all work.

## Theming

All styles sit in the `components` cascade layer and every class starts with `zcp-`. The package does not style
anything outside the picker. Because the styles are layered, your own CSS and utility classes (Tailwind included)
override them without `!important`.

Set these variables on `.zcp`, or pass them through `containerStyle`:

| Variable        | What it controls                          |
|-----------------|-------------------------------------------|
| `--zcp-accent`  | Focus rings, active format, selected swatch. Falls back to `--brand-color`. |
| `--zcp-bg`      | Panel background                          |
| `--zcp-surface` | Text field and format switch background   |
| `--zcp-text`    | Main text                                 |
| `--zcp-muted`   | Labels and icons                          |
| `--zcp-border`  | Hairlines                                 |
| `--zcp-shadow`  | Panel shadow                              |
| `--zcp-radius`  | Panel corner radius                       |
| `--zcp-font`    | Font family (inherits by default)         |
| `--zcp-mono`    | Font for values and format labels         |

```css
.zcp {
    --zcp-accent: #7c3aed;
    --zcp-radius: 8px;
    --zcp-font: "Inter", sans-serif;
}
```

```tsx
<ColorPicker containerStyle={{'--zcp-accent': '#7c3aed'} as React.CSSProperties}/>
```

## Accessibility

- Every handle is a focusable `role="slider"` with a readable value. Arrow keys move by 1, Shift + arrows by 10.
  Home, End, Page Up and Page Down work on the sliders.
- The format switch is a radio group. Arrow keys move between formats.
- In popover mode, Escape closes the panel and returns focus to the trigger.
- Mouse, touch and pen all use pointer events with pointer capture, so a drag keeps working outside the control.
- Animations are cut short when the visitor prefers reduced motion.

## Requirements

- React and React DOM 16.14 or newer (the automatic JSX runtime). Tested with 18 and 19.
- A bundler that handles CSS imports (Vite, webpack, Next.js, Parcel and so on).
- Modern browsers. The CSS uses cascade layers, `color-mix()` and conic gradients.

## Upgrading from 1.1

1.2 keeps the same props and exports. What changes:

- **Dependencies.** 1.1 required `clsx` and `lucide-react` at runtime and listed React as a dependency. 1.2 has no
  dependencies. React is only a peer.
- **No global CSS.** 1.1 shipped Tailwind's full reset and global scrollbar styles, which restyled the host page.
  1.2 only styles `zcp-` classes.
- **New look.** The UI was redrawn. The wheel is now a hue ring around a saturation square, and the format menu is a
  segmented switch.
- **New.** Three more variants (`spectrum`, `sliders`, `swatches`), `showHarmony`, `showContrast`, `enableEyeDropper`,
  and the `getHarmony` and `getContrastRatio` utilities.
- **Copy button** falls back to a hidden text area when the async clipboard API is blocked.
- **Fixes.** The initial `value` is no longer replaced by a pure hue on mount. Moving the hue keeps saturation and
  brightness. Three-digit hex, `hsv()` and `cmyk()` typed into the field now work. An alpha of 0 is no longer read
  as 1. Several pickers on one page no longer share element ids.
- **Theme.** `theme="light"` now pins the light theme. Leave `theme` out to follow a `.dark` ancestor, which is what
  the default did before.
- **Types.** `triggerRef` accepts `RefObject<HTMLElement | null>`, so refs from React 19's `useRef(null)` type-check.
  `ColorPickerVariant` and `Themes` are exported. `ColorPickerTheme` was never used and is now marked deprecated.
- **Scrolling over the hue box** no longer changes the color.

## Contributing

```bash
npm install
npm run dev            # the demo site
npm run lint
npm run typecheck
npm run build:package  # builds the library into build/
```

The library lives in `src/package`. The demo site lives in `src/demo` and imports the library from source.

## License

[MIT](LICENSE)
