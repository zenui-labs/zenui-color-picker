import { default as React } from 'react';
interface ColorSliderProps {
    hue: number;
    onChange: (hue: number) => void;
    height?: number;
    className?: string;
    disabled?: boolean;
}
export declare const ColorSlider: React.FC<ColorSliderProps>;
export {};
