import { default as React } from 'react';
import { ColorValue } from '../../types';
interface ColorWheelProps {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    size?: number;
    disabled?: boolean;
}
export declare const WheelPicker: React.FC<ColorWheelProps>;
export {};
