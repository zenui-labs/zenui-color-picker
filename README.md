# @zenui/color-picker

A developer-friendly color picker component with TypeScript support, multiple interactive variants, and extensive
customization options.

## Live demo: https://color-picker.zenui.net/

![showcase image](https://ik.imagekit.io/b2xymuik2/website%20preview%20image.png)

## Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage Examples](#-usage-examples)
- [API Reference](#-api-reference)
    - [ColorPicker](#colorpicker)
    - [Types](#types)
    - [Utilities](#utilities)
- [Theming & Customization](#-theming--customization)
- [Compatibility / Requirements](#-compatibility--requirements)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🚀 Features

- Multiple color formats: hex, rgb, hsl, hsv, cmyk
- Interactive variants:
    - Wheel picker
    - Hue slider
    - Hue box
- Brightness/Value slider and fine-grained inputs
- Format switcher and copy-friendly output
- Favorites and quick presets
- Color history and reset
- Light/Dark themes with custom theme support
- Fully typed with TypeScript
- Accessible, keyboard-friendly interactions
- Small and tree-shakeable

---

## 📦 Installation

Using npm:

```bash
npm install @zenui/color-picker-react
```

---

## ⚡ Quick Start

```tsx
import React, {useState} from 'react';
import {ColorPicker} from '@zenui/color-picker-react';

export default function App() {
    const [color, setColor] = useState('#3B82F6');

    return (
        <div>
            <ColorPicker
                value={color}
                format="hex"
                variant="wheel"
                onChange={(next) => setColor(next.hex)}
            />
            <p>Selected: {color}</p>
        </div>
    );
}
```

---

## 🧪 Usage Examples

Basic (HEX, wheel):

```tsx
import React, {useState} from 'react';
import {ColorPicker} from '@zenui/color-picker-react';

function BasicExample() {
    const [color, setColor] = useState('#4F46E5');

    return (
        <ColorPicker
            value={color}
            format="hex"
            variant="wheel"
            onChange={(val) => setColor(val.hex)}
        />
    );
}
```

Use picker as inline:

```tsx
import React, {useState} from 'react';
import {ColorPicker} from '@zenui/color-picker-react';

function BasicExample() {
    const [color, setColor] = useState('#4F46E5');

    return (
        <ColorPicker
            value={color}
            format="hex"
            inline={true} // now the picker will render as inline
            variant="wheel"
            onChange={(val) => setColor(val.hex)}
        />
    );
}
```

Change format and access multiple representations:

```tsx
import React, {useState} from 'react';
import {ColorPicker, type ColorFormat} from '@zenui/color-picker-react';

function FormatExample() {
    const [format, setFormat] = useState<ColorFormat>('rgb');
    const [value, setValue] = useState('#22C55E');

    return (
        <div>
            <ColorPicker
                value={value}
                format={format}
                variant="hue-slider"
                onChange={(val, fmt) => {
                    // Persist a specific representation
                    setValue(fmt === 'hex' ? val.hex : val.hex);
                    // You can also handle the active format
                    setFormat(fmt);
                    console.log('As HEX:', val.hex);
                    console.log('As RGB:', val.rgb);
                    console.log('As HSL:', val.hsl);
                    console.log('As HSV:', val.hsv);
                    console.log('As CMYK:', val.cmyk);
                }}
            />
        </div>
    );
}
```

Hue box variant with presets, alpha, and history:

```tsx
import React, {useState} from 'react';
import {ColorPicker} from '@zenui/color-picker-react';

const presetColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7B267', '#A78BFA'];

function AdvancedExample() {
    const [color, setColor] = useState('#F59E0B');

    return (
        <ColorPicker
            value={color}
            format="hsl"
            variant="hue-box"
            showAlpha
            showHistory
            showFormats
            showCopyButton
            presetColors={presetColors}
            maxHistory={15}
            onChange={(val) => setColor(val.hex)}
        />
    );
}
```

---

## 📚 API Reference

### ColorPicker

A controlled React component. Provide a `value` and handle updates via `onChange`.

Props:

| Prop              | Type                                             | Default             | Description                                                         |
|-------------------|--------------------------------------------------|---------------------|---------------------------------------------------------------------|
| value             | string or ColorValue                             | —                   | Current color value (commonly HEX like `#ffffff`).                  |
| format            | ColorFormat                                      | 'hex'               | Active display/parse format: 'hex', 'rgb', 'hsl', 'hsv', or 'cmyk'. |
| variant           | ColorPickerVariant                               | 'wheel'             | Visual variant: 'wheel', 'hue-slider', or 'hue-box'.                |
| theme             | Themes or ColorPickerTheme                       | 'light'             | Built-in theme ('light' or 'dark').                                 |
| disabled          | boolean                                          | false               | Disable all interactions.                                           |
| showAlpha         | boolean                                          | true                | Enable alpha channel control and display when supported.            |
| showHistory       | boolean                                          | true                | Track and display recently picked colors.                           |
| showTitle         | boolean                                          | true                | Show a title of the picker.                                         |
| showFormats       | boolean                                          | true                | Show the format selector (HEX/RGB/HSL/HSV/CMYK).                    |
| showCopyButton    | boolean                                          | true                | Show a one-click copy to clipboard for the active format.           |
| presetColors      | string[]                                         | defaultPresetColors | Quick-access swatches displayed below the picker.                   |
| maxHistory        | number                                           | 10                  | Maximum number of items kept in color history.                      |
| containerClasses  | string                                           | ''                  | Additional CSS classes for the root element.                        |
| showColorInput    | boolean                                          | true                | Show an input field to enter color values manually.                 |
| containerStyle    | React.CSSProperties                              | —                   | Inline styles for the root element.                                 |
| popupClasses      | string                                           | —                   | Additional CSS classes for the popup/colorContainer element.        |
| onChange          | (value: ColorValue, format: ColorFormat) => void | —                   | Called on any color change.                                         |
| inline            | boolean                                          | false               | Render the picker inline rather than in a popup.                    |
| title             | string                                           | 'Color Picker'      | Title text displayed on the picker.                                 |
| enableHueSlider   | boolean                                          | false               | Enable the hue slider for variant that supports it.                 |
| showPresets       | boolean                                          | true                | Show preset color swatches.                                         |
| onFormatChange    | (format: ColorFormat) => void                    | —                   | Called when the active format changes.                              |
| onOpen            | () => void                                       | —                   | Callback fired when the color picker opens.                         |
| brandColor        | string                                           | —                   | Optional brand color used for styling or highlighting.              |
| enableFavorite    | boolean                                          | false               | Enable marking colors as favorites.                                 |
| enableShuffle     | boolean                                          | false               | Enable shuffle button for random colors.                            |
| onClose           | () => void                                       | —                   | Callback fired when the color picker closes.                        |
| triggerRef        | React.RefObject<HTMLElement>                     | —                   | External reference to trigger the picker popup.                     |
| showDefaultButton | boolean                                          | true                | Show the default triggering button.                                 |

Notes:

- `ColorValue` includes every representation of the color (HEX, RGB, HSL, HSV, CMYK) so you can store or display any
  format without re-conversion.
- The component is designed to be controlled; keeping `value` in your state is recommended.

### Types

```ts
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';
export type ColorPickerVariant = 'wheel' | 'hue-slider' | 'hue-box'
export type Themes = 'light' | 'dark';

export interface ColorValue {
    hex: string;
    rgb: { r: number; g: number; b: number; a?: number };
    hsl: { h: number; s: number; l: number; a?: number };
    hsv: { h: number; s: number; v: number; a?: number };
    cmyk: { c: number; m: number; y: number; k: number };
}

export interface ColorPickerTheme {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    borderHover: string;
    shadow: string;
}

export interface ColorPickerProps {
    value?: string;
    format?: ColorFormat;
    variant?: ColorPickerVariant;
    theme?: Themes;
    disabled?: boolean;
    inline?: boolean;
    showColorInput?: boolean;
    showTitle?: boolean;
    title?: string
    popupClasses?: string;
    showAlpha?: boolean;
    showHistory?: boolean;
    showFormats?: boolean;
    showCopyButton?: boolean;
    presetColors?: string[];
    maxHistory?: number;
    containerClasses?: string;
    containerStyle?: React.CSSProperties;
    onChange?: (color: ColorValue, format: ColorFormat) => void;
    onFormatChange?: (format: ColorFormat) => void;
    onOpen?: () => void;
    onClose?: () => void;
    enableHueSlider?: boolean;
    brandColor?: string;
    enableFavorite?: boolean;
    showPresets?: boolean;
    enableShuffle?: boolean;
    triggerRef?: React.RefObject<HTMLElement>;
    showDefaultButton?: boolean;
}

export interface UseColorPickerOptions {
    initialColor?: string;
    initialFormat?: ColorFormat;
    showAlpha?: boolean;
    maxHistory?: number;
}
```

### Utilities

Useful helpers are available for parsing and formatting colors.

```ts
import {
    parseColor,
    formatColorValue,
    colorToValue,
    hsvToRgb,
    defaultPresetColors,
    type ColorValue,
    type ColorFormat,
} from '@zenui/color-picker-react';
```

- `parseColor(input: string): ColorValue` — Parses a string (HEX, RGB, HSL, etc.) into a full `ColorValue`.
- `formatColorValue(value: ColorValue, format: ColorFormat): string` — Converts a `ColorValue` to a formatted string.
- `colorToValue(input: string | ColorValue): ColorValue` — Normalizes arbitrary input to a `ColorValue`.
- `hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number }` — Low-level conversion utility.
- `defaultPresetColors: string[]` — A ready-to-use list of common swatches.

---

## 🎨 Theming & Customization

You can switch between built-in themes.

Built-in theme:

```tsx
<ColorPicker theme="dark"/>
```

Presets:

```tsx
<ColorPicker presetColors={['#FF6B6B', '#4ECDC4', '#45B7D1']}/>
```

Alpha channel:

```tsx
<ColorPicker showAlpha format="rgb"/>
```

History and favorites:

```tsx
<ColorPicker showHistory showFavorites maxHistory={12}/>
```

---

## ✅ Compatibility / Requirements

- **React**: 16.8 or newer (Hooks support required; 18+ recommended)
- **TypeScript**: 5.x recommended (type definitions included)
- **Node.js**: 18+ recommended
- **Module format**: ESM-first
- **Browsers**: Modern browsers with standard Canvas and Pointer Events support

> ⚠️ Note: Advanced features may rely on newer web APIs. Ensure your target browsers support them.

---

## ❓ FAQ

- Controlled vs. uncontrolled?
    - The component is designed for controlled usage via `value` and `onChange`.
- How to store colors?
    - Store `ColorValue` if you need multiple formats. Otherwise, store a single string (e.g., `hex`) and derive other
      formats when necessary.
- Can I disable certain UI parts?
    - Use the boolean props like `showFormats`, `showCopyButton`, `showHistory`, etc., to tailor the UI.

---

## 🤝 Contributing

Contributions are welcome!

- Fork the repository
- Create a feature branch
- Commit your changes with clear messages
- Add/adjust tests where applicable
- Submit a pull request describing your changes and rationale

Before submitting:

- Ensure linting and type checks pass
- Ensure the demo/playground still works
- Update documentation if props or behavior changed

---

## 📄 License

[MIT License](LICENSE)

---

## 🆘 Support

- Issues: open a ticket at https://github.com/zenui-labs/zenui-color-picker/issues/new
- Contact: create an issue with details or reach us via your preferred channel

---

## 🧾 Type Definitions

This package ships with first-class TypeScript support. Types can be imported directly:

```ts
import type {
    ColorFormat,
    ColorValue,
    ColorPickerVariant,
    ColorPickerTheme,
} from '@zenui/color-picker-react';
```

---

## 🛠️ Release & Build

- The package is published on npm as `@zenui/color-picker-react`.
- ESM build with tree-shaking-friendly structure.
- CSS: no global stylesheet required; theming is provided via props and CSS variables.

# A Product of [@zenui-labs](https://zenui.net)
