import React from "react";
import type {ColorValue} from "../types";
import {colorToValue, getContrastRatio} from "../utils/colorUtils";

const WHITE = colorToValue(255, 255, 255);
const BLACK = colorToValue(0, 0, 0);

const grade = (ratio: number) => (ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'Fail');

/** WCAG contrast of white and black text on the current color. */
export const Contrast: React.FC<{ color: ColorValue }> = ({color}) => {
    const solid = color.hex.slice(0, 7);
    return (
        <div className="zcp-contrast" aria-label="Text contrast">
            {[{text: WHITE, name: 'White'}, {text: BLACK, name: 'Black'}].map(({text, name}) => {
                const ratio = getContrastRatio(color, text);
                const result = grade(ratio);
                return (
                    <div key={name} className="zcp-contrast-card" style={{background: solid, color: text.hex}}
                         title={`${name} text: ${ratio}:1`}>
                        <span className="zcp-contrast-aa">Aa</span>
                        <span className="zcp-contrast-ratio">{ratio.toFixed(1)}</span>
                        <span className="zcp-contrast-grade" data-fail={result === 'Fail' || undefined}>{result}</span>
                    </div>
                );
            })}
        </div>
    );
};
