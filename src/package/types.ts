import type React from "react";

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';
export type ColorPickerVariant = 'wheel' | 'hue-slider' | 'hue-box' | 'spectrum' | 'sliders' | 'swatches';
export type Themes = 'light' | 'dark';

export interface ColorValue {
    hex: string;
    rgb: { r: number; g: number; b: number; a?: number };
    hsl: { h: number; s: number; l: number; a?: number };
    hsv: { h: number; s: number; v: number; a?: number };
    cmyk: { c: number; m: number; y: number; k: number };
}

/**
 * @deprecated Never read by the component. Theme the picker with the
 * `--zcp-*` CSS custom properties instead (see README, "Theming").
 */
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
    /** Any string `parseColor` understands: hex, rgb(a), hsl(a), hsv or cmyk. */
    value?: string;
    format?: ColorFormat;
    variant?: ColorPickerVariant;
    /** Pins the theme. Left out, the picker follows a `.dark` class on any ancestor. */
    theme?: Themes;
    disabled?: boolean;
    inline?: boolean;
    showColorInput?: boolean;
    showTitle?: boolean;
    title?: string;
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
    /** Accent used for focus rings, the active format and selected swatches. */
    brandColor?: string;
    enableFavorite?: boolean;
    showPresets?: boolean;
    enableShuffle?: boolean;
    /** Adds a "pick from screen" button where the browser supports the EyeDropper API (Chromium). */
    enableEyeDropper?: boolean;
    /** Shows a row of harmonious colors (complementary, analogous, triadic, split, tetradic). */
    showHarmony?: boolean;
    /** Shows the WCAG contrast of the color against white and black text. */
    showContrast?: boolean;
    triggerRef?: React.RefObject<HTMLElement | null>;
    showDefaultButton?: boolean;
}

export interface UseColorPickerOptions {
    initialColor?: string;
    initialFormat?: ColorFormat;
    showAlpha?: boolean;
    maxHistory?: number;
    setCurrentHue?: (hue: number) => void;
}

export interface UpdateColorOptions {
    /** Defaults to true. Pass false while dragging so history only keeps settled colors. */
    addToHistory?: boolean;
}
