import { default as React } from 'react';
import { ColorFormat } from '../types';
interface ColorInputProps {
    value: string;
    format: ColorFormat;
    onChange: (value: string) => void;
    theme?: 'light' | 'dark';
    showCopyButton?: boolean;
    disabled?: boolean;
}
export declare const ColorInput: React.FC<ColorInputProps>;
export {};
