# @devtools/color-picker

A comprehensive, developer-friendly React color picker component with TypeScript support, multiple variants, and extensive customization options.

## 🚀 Features

- **Multiple Color Formats**: Support for HEX, RGB, HSL, HSV, and CMYK
- **TypeScript Support**: Full type definitions with strict type checking
- **Multiple Variants**: Basic, Advanced, Compact, and Palette variants
- **Customizable Themes**: Light, dark, and custom theme support
- **Color History & Favorites**: Automatic color tracking with favorites system
- **Copy to Clipboard**: One-click color copying in any format
- **Accessibility**: WCAG compliant with keyboard navigation
- **Developer Friendly**: Clean API with extensive customization options
- **Lightweight**: Optimized bundle size with tree shaking support

## 📦 Installation

```bash
npm install @devtools/color-picker
```

## 🎯 Basic Usage

```tsx
import { ColorPicker } from '@devtools/color-picker';
import { useState } from 'react';

function MyComponent() {
  const [color, setColor] = useState('#3B82F6');
  
  return (
    <ColorPicker
      value={color}
      format="hex"
      variant="advanced"
      onChange={(colorValue) => setColor(colorValue.hex)}
    />
  );
}
```

## 🎨 Advanced Usage

```tsx
<ColorPicker
  value={color}
  format="hsl"
  variant="advanced"
  theme="dark"
  showAlpha={true}
  showHistory={true}
  showEyeDropper={true}
  showFormats={true}
  showCopyButton={true}
  presetColors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
  maxHistory={15}
  onChange={(colorValue, format) => {
    console.log('Color:', colorValue);
    console.log('Format:', format);
  }}
  onFormatChange={(format) => {
    console.log('Format changed:', format);
  }}
/>
```

## 🎛️ Props API

### ColorPickerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Current color value |
| `format` | `ColorFormat` | `'hex'` | Color format (hex, rgb, hsl, hsv, cmyk) |
| `variant` | `string` | `'advanced'` | Picker variant (basic, advanced, compact, palette) |
| `theme` | `string \| ColorPickerTheme` | `'light'` | Theme (light, dark, auto, or custom theme object) |
| `disabled` | `boolean` | `false` | Disable the color picker |
| `showAlpha` | `boolean` | `true` | Show alpha/transparency slider |
| `showEyeDropper` | `boolean` | `true` | Show eye dropper tool |
| `showHistory` | `boolean` | `true` | Show color history |
| `showFormats` | `boolean` | `true` | Show format selector |
| `showCopyButton` | `boolean` | `true` | Show copy to clipboard button |
| `presetColors` | `string[]` | `[...]` | Array of preset colors |
| `maxHistory` | `number` | `10` | Maximum colors in history |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | - | Inline styles |
| `onChange` | `function` | - | Color change callback |
| `onFormatChange` | `function` | - | Format change callback |
| `onOpen` | `function` | - | Picker open callback |
| `onClose` | `function` | - | Picker close callback |

### ColorValue Type

```tsx
interface ColorValue {
  hex: string;
  rgb: { r: number; g: number; b: number; a?: number };
  hsl: { h: number; s: number; l: number; a?: number };
  hsv: { h: number; s: number; v: number; a?: number };
  cmyk: { c: number; m: number; y: number; k: number };
}
```

## 🎨 Variants

### Advanced (Default)
Full-featured color picker with color wheel, sliders, history, and all features enabled.

### Basic
Simplified color picker with essential features only.

### Compact
Space-efficient design perfect for toolbars and tight layouts.

### Palette
Grid-based color selection with preset colors and swatches.

## 🎭 Themes

### Light Theme (Default)
Clean, bright interface perfect for most applications.

### Dark Theme
Professional dark interface for dark mode applications.

### Custom Theme
Define your own color scheme:

```tsx
const customTheme = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  borderHover: '#D1D5DB',
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
};

<ColorPicker theme={customTheme} />
```

## 🪝 Hooks

### useColorPicker

A powerful hook for building custom color picker components:

```tsx
import { useColorPicker } from '@devtools/color-picker';

function CustomColorPicker() {
  const {
    currentColor,
    currentFormat,
    colorHistory,
    favoriteColors,
    updateColor,
    updateFormat,
    addToFavorites,
    copyToClipboard,
    generateRandomColor
  } = useColorPicker({
    initialColor: '#3B82F6',
    initialFormat: 'hex',
    showAlpha: true,
    maxHistory: 15
  });

  // Your custom implementation
}
```

## 🌟 Color Utilities

The package exports useful color utility functions:

```tsx
import { 
  hexToRgb, 
  rgbToHsl, 
  parseColor, 
  formatColorValue 
} from '@devtools/color-picker';

const rgb = hexToRgb('#3B82F6');
const hsl = rgbToHsl(59, 130, 246);
const colorValue = parseColor('rgb(59, 130, 246)');
const formatted = formatColorValue(colorValue, 'hsl');
```

## 🎯 TypeScript Support

This package is built with TypeScript and provides comprehensive type definitions:

```tsx
import type { 
  ColorValue, 
  ColorFormat, 
  ColorPickerProps,
  ColorPickerTheme,
  UseColorPickerOptions 
} from '@devtools/color-picker';
```

## 🚀 Performance

- **Tree Shaking**: Only import what you need
- **Optimized Renders**: Efficient React reconciliation
- **Lightweight**: < 50KB minified + gzipped
- **No Dependencies**: Zero runtime dependencies

## ♿ Accessibility

- **WCAG Compliant**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and descriptions
- **High Contrast**: Sufficient color contrast ratios
- **Focus Management**: Clear focus indicators

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## 📄 License

MIT License - see LICENSE file for details.

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/devtools/color-picker.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build package
npm run build

# Run tests
npm test
```

---

Made with ❤️ for developers who need powerful, flexible color picking capabilities.