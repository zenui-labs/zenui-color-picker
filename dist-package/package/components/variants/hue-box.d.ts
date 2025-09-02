import { default as React } from 'react';
import { ColorValue } from '../../types';
interface SVBoxProps {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    height?: number;
    disabled?: boolean;
}
export declare const HueBox: React.FC<SVBoxProps>;
export {};
