import React, {useCallback, useRef} from "react";
import {Hsva} from "../../utils/hsva";
import {arrowStep, DragPoint, usePointerDrag} from "../../hooks/usePointerDrag";
import {hsvToRgb} from "../../utils/colorUtils";

interface SpectrumProps {
    hsva: Hsva;
    onChange: (hsva: Hsva) => void;
    onChangeEnd?: () => void;
    height?: number;
    disabled?: boolean;
}

const clamp = (n: number, max = 100) => Math.min(max, Math.max(0, n));

/** Position 0..1 down the strip: white at the top, the pure hue in the middle, black at the bottom. */
const toY = ({s, v}: Hsva) => (v >= 99.5 ? s / 200 : 0.5 + (100 - v) / 200);
const fromY = (y: number) => (y <= 0.5 ? {s: y * 200, v: 100} : {s: 100, v: 100 - (y - 0.5) * 200});

/** Every hue across, tints above and shades below. One drag reaches most colors. */
export const Spectrum: React.FC<SpectrumProps> = ({hsva, onChange, onChangeEnd, height = 170, disabled}) => {
    const thumbRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(({x, y, rect, first}: DragPoint) => {
        onChange({...hsva, h: clamp((x / rect.width) * 360, 359.9), ...fromY(clamp(y / rect.height, 1))});
        if (first) thumbRef.current?.focus({preventScroll: true});
    }, [hsva, onChange]);

    const {ref, dragProps} = usePointerDrag<HTMLDivElement>(handleMove, onChangeEnd, disabled);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        const step = arrowStep(e);
        if (!step) return;
        e.preventDefault();
        onChange({...hsva, h: (hsva.h + step[0] + 360) % 360, ...fromY(clamp(toY(hsva) - step[1] / 100, 1))});
    };

    const {r, g, b} = hsvToRgb(hsva.h, hsva.s, hsva.v);

    return (
        <div ref={ref} className="zcp-area zcp-spectrum" style={{height}} data-disabled={disabled || undefined} {...dragProps}>
            <div
                ref={thumbRef}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label="Hue and lightness"
                aria-valuemin={0}
                aria-valuemax={360}
                aria-valuenow={Math.round(hsva.h)}
                aria-valuetext={`Hue ${Math.round(hsva.h)} degrees, ${Math.round(toY(hsva) * 100)}% down`}
                aria-disabled={disabled || undefined}
                className="zcp-thumb zcp-thumb--free"
                style={{
                    left: `${(hsva.h / 360) * 100}%`,
                    top: `${toY(hsva) * 100}%`,
                    '--zcp-thumb-fill': `rgb(${r}, ${g}, ${b})`,
                } as React.CSSProperties}
                onKeyDown={handleKeyDown}
                onBlur={onChangeEnd}
            />
        </div>
    );
};
