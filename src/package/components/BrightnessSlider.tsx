import React from "react";
import type {ColorValue} from "../types";
import {Slider} from "./Slider";
import {rgbaString} from "../utils/hsva";

interface BrightnessSliderProps {
    /** Alpha, 0 to 1. */
    value: number;
    color: ColorValue;
    onChange: (value: number) => void;
    onChangeEnd?: () => void;
    disabled?: boolean;
}

/** The alpha (opacity) slider. The name is kept for backwards compatibility. */
export const BrightnessSlider: React.FC<BrightnessSliderProps> = ({value, color, onChange, onChangeEnd, disabled}) => {
    const {r, g, b} = color.rgb;
    const alpha = Math.round(value * 100);

    return (
        <Slider
            label="Opacity"
            value={alpha}
            min={0}
            max={100}
            valueText={`${alpha}% opaque`}
            checker
            trackBackground={`linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0), rgb(${r}, ${g}, ${b}))`}
            thumbColor={rgbaString(color)}
            onChange={(next) => onChange(Math.round(next) / 100)}
            onChangeEnd={onChangeEnd}
            disabled={disabled}
        />
    );
};
