import type {ColorFormat, ColorValue} from '../types';

export const defaultPresetColors = [
    '#FF6B6B', '#4ECDC4', '#2300FF', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#006B85', '#85C1E9', '#C500AB'
];

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const roundAlpha = (a: number) => Math.round(clamp(a, 0, 1) * 100) / 100;

/** Accepts #rgb, #rgba, #rrggbb and #rrggbbaa (the leading # is optional). */
export function hexToRgb(hex: string): { r: number; g: number; b: number; a?: number } {
    let h = hex.trim().replace(/^#/, '');
    if (!/^([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(h)) return {r: 0, g: 0, b: 0};
    if (h.length <= 4) h = h.split('').map(c => c + c).join('');

    const rgb = {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
    };

    return h.length === 8 ? {...rgb, a: roundAlpha(parseInt(h.slice(6, 8), 16) / 255)} : rgb;
}

export function rgbToHex(r: number, g: number, b: number, a?: number): string {
    const toHex = (n: number) => Math.round(clamp(n, 0, 255)).toString(16).padStart(2, '0');
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    return a !== undefined ? `${hex}${toHex(a * 255)}` : hex;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h /= 6;
    }

    return {h: Math.round(h * 360) % 360, s: Math.round(s * 100), l: Math.round(l * 100)};
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h = (((h % 360) + 360) % 360) / 360;
    s = clamp(s, 0, 100) / 100;
    l = clamp(l, 0, 100) / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    if (s === 0) {
        const grey = Math.round(l * 255);
        return {r: grey, g: grey, b: grey};
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return {
        r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, h) * 255),
        b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
    };
}

/** Unrounded RGB to HSV. Used internally so dragging never drifts. */
export function rgbToHsvExact(r: number, g: number, b: number): { h: number; s: number; v: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    if (diff !== 0) {
        if (max === r) h = (g - b) / diff + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / diff + 2;
        else h = (r - g) / diff + 4;
        h /= 6;
    }

    return {h: h * 360, s: max === 0 ? 0 : (diff / max) * 100, v: max * 100};
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
    const {h, s, v} = rgbToHsvExact(r, g, b);
    return {h: Math.round(h) % 360, s: Math.round(s), v: Math.round(v)};
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
    h = (((h % 360) + 360) % 360) / 60;
    s = clamp(s, 0, 100) / 100;
    v = clamp(v, 0, 100) / 100;

    const c = v * s;
    const x = c * (1 - Math.abs((h % 2) - 1));
    const m = v - c;

    const [r, g, b] =
        h < 1 ? [c, x, 0] :
            h < 2 ? [x, c, 0] :
                h < 3 ? [0, c, x] :
                    h < 4 ? [0, x, c] :
                        h < 5 ? [x, 0, c] : [c, 0, x];

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

export function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    if (k === 1) return {c: 0, m: 0, y: 0, k: 100};

    return {
        c: Math.round(((1 - r - k) / (1 - k)) * 100),
        m: Math.round(((1 - g - k) / (1 - k)) * 100),
        y: Math.round(((1 - b - k) / (1 - k)) * 100),
        k: Math.round(k * 100)
    };
}

export function cmykToRgb(c: number, m: number, y: number, k: number): { r: number; g: number; b: number } {
    const [cc, mm, yy, kk] = [c, m, y, k].map(n => clamp(n, 0, 100) / 100);
    return {
        r: Math.round(255 * (1 - cc) * (1 - kk)),
        g: Math.round(255 * (1 - mm) * (1 - kk)),
        b: Math.round(255 * (1 - yy) * (1 - kk)),
    };
}

/** Splits "a, b, c / d" or "a b c d" into numbers. Percent alpha becomes 0..1. */
function readChannels(body: string): number[] {
    const parts = body.replace(/\//g, ' ').split(/[\s,]+/).filter(Boolean);
    return parts.map((part, i) => {
        const n = parseFloat(part);
        if (i === 3 && part.endsWith('%')) return n / 100;
        return n;
    });
}

/**
 * Parses hex, rgb(a), hsl(a), hsv and cmyk strings. Both comma and
 * space separated syntax work. Returns null when the string is not a color.
 */
export function parseColor(colorString: string): ColorValue | null {
    const color = colorString.trim().toLowerCase();

    if (/^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(color) && (color.startsWith('#') || color.length >= 6)) {
        const {r, g, b, a} = hexToRgb(color);
        return colorToValue(r, g, b, a);
    }

    const fn = /^(rgba?|hsla?|hsv|cmyk)\(([^)]+)\)$/.exec(color);
    if (!fn) return null;

    const values = readChannels(fn[2]);
    if (values.some(Number.isNaN)) return null;
    const alpha = values[3] !== undefined ? roundAlpha(values[3]) : undefined;

    switch (fn[1]) {
        case 'rgb':
        case 'rgba': {
            if (values.length < 3) return null;
            const [r, g, b] = values.map(n => clamp(Math.round(n), 0, 255));
            return colorToValue(r, g, b, alpha);
        }
        case 'hsl':
        case 'hsla': {
            if (values.length < 3) return null;
            const {r, g, b} = hslToRgb(values[0], values[1], values[2]);
            return colorToValue(r, g, b, alpha);
        }
        case 'hsv': {
            if (values.length < 3) return null;
            const {r, g, b} = hsvToRgb(values[0], values[1], values[2]);
            return colorToValue(r, g, b, alpha);
        }
        case 'cmyk': {
            if (values.length < 4) return null;
            const {r, g, b} = cmykToRgb(values[0], values[1], values[2], values[3]);
            return colorToValue(r, g, b);
        }
        default:
            return null;
    }
}

/** Builds every representation of one color. Alpha is kept only when given. */
export function colorToValue(r: number, g: number, b: number, a?: number): ColorValue {
    const alpha = a !== undefined ? roundAlpha(a) : undefined;
    const withAlpha = alpha !== undefined ? {a: alpha} : {};

    return {
        hex: rgbToHex(r, g, b, alpha),
        rgb: {r, g, b, ...withAlpha},
        hsl: {...rgbToHsl(r, g, b), ...withAlpha},
        hsv: {...rgbToHsv(r, g, b), ...withAlpha},
        cmyk: rgbToCmyk(r, g, b),
    };
}

export function formatColorValue(colorValue: ColorValue, format: ColorFormat | string): string {
    switch (format) {
        case 'rgb': {
            const {r, g, b, a} = colorValue.rgb;
            return a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
        }
        case 'hsl': {
            const {h, s, l, a} = colorValue.hsl;
            return a !== undefined ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;
        }
        case 'hsv': {
            const {h, s, v} = colorValue.hsv;
            return `hsv(${h}, ${s}%, ${v}%)`;
        }
        case 'cmyk': {
            const {c, m, y, k} = colorValue.cmyk;
            return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
        }
        default:
            return colorValue.hex;
    }
}

/** Relative luminance (WCAG). Handy for picking readable text on a swatch. */
export function getLuminance(color: ColorValue): number {
    const lin = (n: number) => {
        const c = n / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const {r, g, b} = color.rgb;
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio between two colors, from 1 to 21. Alpha is ignored. */
export function getContrastRatio(a: ColorValue, b: ColorValue): number {
    const [hi, lo] = [getLuminance(a), getLuminance(b)].sort((x, y) => y - x);
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

export type HarmonyMode = 'complementary' | 'analogous' | 'triadic' | 'split' | 'tetradic';

const HARMONY_OFFSETS: Record<HarmonyMode, number[]> = {
    complementary: [0, 180],
    analogous: [-30, 0, 30],
    triadic: [0, 120, 240],
    split: [0, 150, 210],
    tetradic: [0, 90, 180, 270],
};

/** Colors that sit at fixed hue distances from the given one. The first item is the color itself (rotated by 0). */
export function getHarmony(color: ColorValue, mode: HarmonyMode): ColorValue[] {
    const {r, g, b, a} = color.rgb;
    const {h, s, v} = rgbToHsvExact(r, g, b);
    return HARMONY_OFFSETS[mode].map((offset) => {
        const rgb = hsvToRgb(h + offset, s, v);
        return colorToValue(rgb.r, rgb.g, rgb.b, a);
    });
}
