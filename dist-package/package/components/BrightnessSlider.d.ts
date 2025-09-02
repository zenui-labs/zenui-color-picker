import { default as React } from 'react';
import { ColorValue } from '../types';
interface ColorSliderProps {
    value: number;
    color: ColorValue;
    onChange: (value: number) => void;
    disabled?: boolean;
}
export declare const BrightnessSlider: React.FC<ColorSliderProps>;
export {};
