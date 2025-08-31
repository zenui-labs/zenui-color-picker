import {ColorValue} from '../types';

export const defaultPresetColors = [
    '#FF6B6B', '#4ECDC4', '#2300ff', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#006b85', '#85C1E9', '#C500ABFF'
];

export function hexToRgb(hex: string): { r: number; g: number; b: number; a?: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    if (!result) return {r: 0, g: 0, b: 0};

    const rgb = {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };

    if (result[4]) {
        return {...rgb, a: parseInt(result[4], 16) / 255};
    }

    return rgb;
}

export function rgbToHex(r: number, g: number, b: number, a?: number): string {
    const toHex = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    if (a !== undefined) {
        return `${hex}${toHex(a * 255)}`;
    }

    return hex;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                h = 0;
        }
        h /= 6;
    }

    return {h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100)};
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    const s = max === 0 ? 0 : diff / max;
    const v = max;

    if (diff !== 0) {
        switch (max) {
            case r:
                h = (g - b) / diff + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / diff + 2;
                break;
            case b:
                h = (r - g) / diff + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    v /= 100;

    const c = v * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = v - c;

    let r: number, g: number, b: number;

    if (h < 1 / 6) {
        [r, g, b] = [c, x, 0];
    } else if (h < 2 / 6) {
        [r, g, b] = [x, c, 0];
    } else if (h < 3 / 6) {
        [r, g, b] = [0, c, x];
    } else if (h < 4 / 6) {
        [r, g, b] = [0, x, c];
    } else if (h < 5 / 6) {
        [r, g, b] = [x, 0, c];
    } else {
        [r, g, b] = [c, 0, x];
    }

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

    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

export function parseColor(colorString: string): ColorValue | null {
    try {
        const color = colorString.trim();

        if (color.startsWith('#')) {
            const rgb = hexToRgb(color);
            return colorToValue(rgb.r, rgb.g, rgb.b, rgb.a);
        }

        const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
        if (rgbMatch) {
            const values = rgbMatch[1].split(',').map(v => parseFloat(v.trim()));
            if (values.length >= 3) {
                return colorToValue(values[0], values[1], values[2], values[3]);
            }
        }

        const hslMatch = color.match(/hsla?\(([^)]+)\)/);
        if (hslMatch) {
            const values = hslMatch[1].split(',').map(v => parseFloat(v.trim()));
            if (values.length >= 3) {
                const rgb = hslToRgb(values[0], values[1], values[2]);
                return colorToValue(rgb.r, rgb.g, rgb.b, values[3]);
            }
        }

        return null;
    } catch {
        return null;
    }
}

export function colorToValue(r: number, g: number, b: number, a?: number): ColorValue {
    const hex = rgbToHex(r, g, b, a);
    const rgb = {r, g, b, ...(a !== undefined && {a})};
    const hsl = {...rgbToHsl(r, g, b), ...(a !== undefined && {a})};
    const hsv = {...rgbToHsv(r, g, b), ...(a !== undefined && {a})};
    const cmyk = rgbToCmyk(r, g, b);

    return {hex, rgb, hsl, hsv, cmyk};
}

export function formatColorValue(colorValue: ColorValue, format: string): string {
    switch (format) {
        case 'hex':
            return colorValue.hex;
        case 'rgb':
            const {r, g, b, a} = colorValue.rgb;
            return a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
        case 'hsl':
            const {h, s, l, a: hslA} = colorValue.hsl;
            return hslA !== undefined ? `hsla(${h}, ${s}%, ${l}%, ${hslA})` : `hsl(${h}, ${s}%, ${l}%)`;
        case 'hsv':
            const {h: hsvH, s: hsvS, v} = colorValue.hsv;
            return `hsv(${hsvH}, ${hsvS}%, ${v}%)`;
        case 'cmyk':
            const {c, m, y, k} = colorValue.cmyk;
            return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
        default:
            return colorValue.hex;
    }
}