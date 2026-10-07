import type {ColorValue} from '../types';
import {colorToValue, hsvToRgb, rgbToHsvExact} from './colorUtils';

/** Internal source of truth. Floats, so hue survives greys and drags never drift. */
export interface Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
}

export function hsvaToValue({h, s, v, a}: Hsva): ColorValue {
    const {r, g, b} = hsvToRgb(h, s, v);
    return colorToValue(r, g, b, a < 1 ? a : undefined);
}

/** Converts a parsed color, keeping the previous hue (and saturation) where the color has none. */
export function valueToHsva(value: ColorValue, prev?: Hsva): Hsva {
    const {r, g, b, a = 1} = value.rgb;
    const exact = rgbToHsvExact(r, g, b);
    const keepHue = prev && (exact.s === 0 || exact.v === 0);
    return {
        h: keepHue ? prev.h : exact.h,
        s: prev && exact.v === 0 ? prev.s : exact.s,
        v: exact.v,
        a,
    };
}

export const sameColor = (a: ColorValue, b: ColorValue) => a.hex.toLowerCase() === b.hex.toLowerCase();

export const rgbaString = ({rgb: {r, g, b, a = 1}}: ColorValue) => `rgba(${r}, ${g}, ${b}, ${a})`;
