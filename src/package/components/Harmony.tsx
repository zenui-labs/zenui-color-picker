import React, {useState} from "react";
import type {ColorValue} from "../types";
import {getHarmony, HarmonyMode} from "../utils/colorUtils";
import {rgbaString} from "../utils/hsva";

const MODES: { mode: HarmonyMode; label: string }[] = [
    {mode: 'complementary', label: 'Comp'},
    {mode: 'analogous', label: 'Analog'},
    {mode: 'triadic', label: 'Triad'},
    {mode: 'split', label: 'Split'},
    {mode: 'tetradic', label: 'Tetrad'},
];

interface HarmonyProps {
    color: ColorValue;
    onPick: (color: ColorValue) => void;
    disabled?: boolean;
}

export const Harmony: React.FC<HarmonyProps> = ({color, onPick, disabled}) => {
    const [mode, setMode] = useState<HarmonyMode>('complementary');
    const colors = getHarmony(color, mode);

    return (
        <div className="zcp-section">
            <div className="zcp-section-head">
                <span className="zcp-label">Harmony</span>
                <div className="zcp-chips" role="radiogroup" aria-label="Harmony mode">
                    {MODES.map(({mode: m, label}) => (
                        <button key={m} type="button" role="radio" aria-checked={m === mode} className="zcp-mini"
                                disabled={disabled} onClick={() => setMode(m)}>{label}</button>
                    ))}
                </div>
            </div>
            <div className="zcp-harmony" key={mode}>
                {colors.map((c, i) => (
                    <button key={`${c.hex}-${i}`} type="button" className="zcp-harmony-chip zcp-checker"
                            style={{'--zcp-swatch': rgbaString(c), '--zcp-delay': `${i * 60}ms`} as React.CSSProperties}
                            aria-label={i === 0 ? `Current color ${c.hex}` : `Use ${c.hex}`}
                            disabled={disabled || i === 0}
                            onClick={() => onPick(c)}>
                        <span>{c.hex.slice(1, 7)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
