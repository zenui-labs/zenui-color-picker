import React from "react";
import {Hsva} from "../../utils/hsva";
import {hsvToRgb} from "../../utils/colorUtils";
import {Slider} from "../Slider";

interface ChannelSlidersProps {
    hsva: Hsva;
    onChange: (hsva: Hsva) => void;
    onChangeEnd?: () => void;
    disabled?: boolean;
}

const rgb = (h: number, s: number, v: number) => {
    const c = hsvToRgb(h, s, v);
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
};

const HUE = 'linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)';

/** Hue, saturation and brightness as three labelled tracks. Each track previews its own range. */
export const ChannelSliders: React.FC<ChannelSlidersProps> = ({hsva, onChange, onChangeEnd, disabled}) => {
    const {h, s, v} = hsva;
    const rows = [
        {key: 'h', label: 'Hue', short: 'H', max: 360, value: h, unit: '°', track: HUE, thumb: rgb(h, 100, 100)},
        {key: 's', label: 'Saturation', short: 'S', max: 100, value: s, unit: '%', track: `linear-gradient(to right, ${rgb(h, 0, v)}, ${rgb(h, 100, v)})`, thumb: rgb(h, s, v)},
        {key: 'v', label: 'Brightness', short: 'B', max: 100, value: v, unit: '%', track: `linear-gradient(to right, #000, ${rgb(h, s, 100)})`, thumb: rgb(h, s, v)},
    ] as const;

    return (
        <div className="zcp-channels">
            {rows.map((row) => (
                <div key={row.key} className="zcp-channel">
                    <span className="zcp-channel-key" aria-hidden="true">{row.short}</span>
                    <Slider
                        label={row.label}
                        value={row.value}
                        min={0}
                        max={row.max}
                        valueText={`${Math.round(row.value)}${row.unit === '°' ? ' degrees' : '%'}`}
                        trackBackground={row.track}
                        thumbColor={row.thumb}
                        onChange={(next) => onChange({...hsva, [row.key]: row.key === 'h' ? next % 360 : next})}
                        onChangeEnd={onChangeEnd}
                        disabled={disabled}
                    />
                    <span className="zcp-channel-value">{Math.round(row.value)}{row.unit}</span>
                </div>
            ))}
        </div>
    );
};
