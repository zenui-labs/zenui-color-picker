import { ColorValue } from '../types';
export declare const defaultPresetColors: string[];
export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
    a?: number;
};
export declare function rgbToHex(r: number, g: number, b: number, a?: number): string;
export declare function rgbToHsl(r: number, g: number, b: number): {
    h: number;
    s: number;
    l: number;
};
export declare function hslToRgb(h: number, s: number, l: number): {
    r: number;
    g: number;
    b: number;
};
export declare function rgbToHsv(r: number, g: number, b: number): {
    h: number;
    s: number;
    v: number;
};
export declare function hsvToRgb(h: number, s: number, v: number): {
    r: number;
    g: number;
    b: number;
};
export declare function rgbToCmyk(r: number, g: number, b: number): {
    c: number;
    m: number;
    y: number;
    k: number;
};
export declare function parseColor(colorString: string): ColorValue | null;
export declare function colorToValue(r: number, g: number, b: number, a?: number): ColorValue;
export declare function formatColorValue(colorValue: ColorValue, format: string): string;
