import React, {useCallback, useRef} from "react";
import {Hsva} from "../../utils/hsva";
import {arrowStep, DragPoint, usePointerDrag} from "../../hooks/usePointerDrag";
import {hsvToRgb} from "../../utils/colorUtils";

interface HueBoxProps {
    hsva: Hsva;
    onChange: (hsva: Hsva) => void;
    onChangeEnd?: () => void;
    height?: number;
    disabled?: boolean;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** Saturation on x, brightness on y, for the current hue. */
export const SaturationArea: React.FC<HueBoxProps & { className?: string; style?: React.CSSProperties }> = ({
    hsva,
    onChange,
    onChangeEnd,
    disabled,
    className,
    style,
}) => {
    const thumbRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(({x, y, rect, first}: DragPoint) => {
        onChange({
            ...hsva,
            s: clamp((x / rect.width) * 100),
            v: clamp(100 - (y / rect.height) * 100),
        });
        if (first) thumbRef.current?.focus({preventScroll: true});
    }, [hsva, onChange]);

    const {ref, dragProps} = usePointerDrag<HTMLDivElement>(handleMove, onChangeEnd, disabled);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        const step = arrowStep(e);
        if (!step) return;
        e.preventDefault();
        onChange({...hsva, s: clamp(hsva.s + step[0]), v: clamp(hsva.v + step[1])});
    };

    const {r, g, b} = hsvToRgb(hsva.h, hsva.s, hsva.v);

    return (
        <div
            ref={ref}
            className={`zcp-area ${className ?? ''}`}
            data-disabled={disabled || undefined}
            style={{'--zcp-hue': hsva.h, ...style} as React.CSSProperties}
            {...dragProps}
        >
            <div
                ref={thumbRef}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label="Saturation and brightness"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(hsva.s)}
                aria-valuetext={`Saturation ${Math.round(hsva.s)}%, brightness ${Math.round(hsva.v)}%`}
                aria-disabled={disabled || undefined}
                className="zcp-thumb zcp-thumb--free"
                style={{
                    left: `${hsva.s}%`,
                    top: `${100 - hsva.v}%`,
                    '--zcp-thumb-fill': `rgb(${r}, ${g}, ${b})`,
                } as React.CSSProperties}
                onKeyDown={handleKeyDown}
                onBlur={onChangeEnd}
            />
        </div>
    );
};

export const HueBox: React.FC<HueBoxProps> = ({height = 180, ...props}) => (
    <SaturationArea {...props} style={{height}}/>
);
