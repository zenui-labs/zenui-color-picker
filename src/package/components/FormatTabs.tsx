import React from "react";
import type {ColorFormat} from "../types";

const FORMATS: ColorFormat[] = ["hex", "rgb", "hsl", "hsv", "cmyk"];

interface FormatTabsProps {
    value: ColorFormat;
    onChange: (format: ColorFormat) => void;
    disabled?: boolean;
}

/** Segmented control. Arrow keys move between formats, like a radio group. */
export const FormatTabs: React.FC<FormatTabsProps> = ({value, onChange, disabled}) => {
    const index = Math.max(0, FORMATS.indexOf(value));

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const delta = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}[e.key];
        if (delta === undefined) return;
        e.preventDefault();
        const next = FORMATS[(index + delta + FORMATS.length) % FORMATS.length];
        onChange(next);
        (e.currentTarget.querySelector(`[data-format="${next}"]`) as HTMLElement | null)?.focus();
    };

    return (
        <div
            className="zcp-tabs"
            role="radiogroup"
            aria-label="Color format"
            style={{'--zcp-index': index, '--zcp-count': FORMATS.length} as React.CSSProperties}
            onKeyDown={handleKeyDown}
        >
            <span className="zcp-tabs-pill" aria-hidden="true"/>
            {FORMATS.map((format) => (
                <button
                    key={format}
                    type="button"
                    role="radio"
                    data-format={format}
                    aria-checked={format === value}
                    tabIndex={format === value ? 0 : -1}
                    disabled={disabled}
                    className="zcp-tab"
                    onClick={() => onChange(format)}
                >
                    {format}
                </button>
            ))}
        </div>
    );
};
