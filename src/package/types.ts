export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';
export type ColorPickerVariant = 'wheel' | 'hue-slider' | 'advance' | 'hue-box'
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
    popupStyle?: string;
    showAlpha?: boolean;
    showHistory?: boolean;
    showFormats?: boolean;
    showCopyButton?: boolean;
    presetColors?: string[];
    maxHistory?: number;
    className?: string;
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
}

export interface UseColorPickerOptions {
    initialColor?: string;
    initialFormat?: ColorFormat;
    showAlpha?: boolean;
    maxHistory?: number;
}