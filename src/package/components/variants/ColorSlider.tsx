import React from "react";
import {Slider} from "../Slider";

interface ColorSliderProps {
    hue: number;
    onChange: (hue: number) => void;
    onChangeEnd?: () => void;
    disabled?: boolean;
    className?: string;
}

const HUE_TRACK = 'linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)';

export const ColorSlider: React.FC<ColorSliderProps> = ({hue, onChange, onChangeEnd, disabled, className}) => (
    <Slider
        className={className}
        label="Hue"
        value={hue}
        min={0}
        max={360}
        valueText={`${Math.round(hue)} degrees`}
        trackBackground={HUE_TRACK}
        thumbColor={`hsl(${hue}, 100%, 50%)`}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        disabled={disabled}
    />
);
