import React, {useCallback, useRef} from 'react';
import {Hsva} from '../../utils/hsva';
import {DragPoint, usePointerDrag} from '../../hooks/usePointerDrag';
import {SaturationArea} from './hue-box';

interface WheelPickerProps {
    hsva: Hsva;
    onChange: (hsva: Hsva) => void;
    onChangeEnd?: () => void;
    size?: number;
    disabled?: boolean;
}

/**
 * A hue ring around a saturation/brightness square. Hue 0 sits at twelve
 * o'clock and runs clockwise, matching the conic gradient that paints the ring.
 */
export const WheelPicker: React.FC<WheelPickerProps> = ({hsva, onChange, onChangeEnd, size = 220, disabled}) => {
    const ring = Math.round(size * 0.1);
    const gap = Math.round(size * 0.04);
    const innerRadius = size / 2 - ring - gap;
    const square = Math.floor(innerRadius * Math.SQRT2);
    const thumbRef = useRef<HTMLDivElement>(null);
    const onRing = useRef(false);

    const handleMove = useCallback(({x, y, rect, first}: DragPoint) => {
        const dx = x - rect.width / 2;
        const dy = y - rect.height / 2;
        if (first) {
            onRing.current = Math.hypot(dx, dy) > innerRadius;
            if (onRing.current) thumbRef.current?.focus({preventScroll: true});
        }
        if (!onRing.current) return;
        const deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
        onChange({...hsva, h: (deg + 360) % 360});
    }, [hsva, innerRadius, onChange]);

    const {ref, dragProps} = usePointerDrag<HTMLDivElement>(handleMove, onChangeEnd, disabled);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        const step = e.shiftKey ? 10 : 1;
        const delta = {ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step}[e.key];
        if (delta === undefined) return;
        e.preventDefault();
        onChange({...hsva, h: (hsva.h + delta + 360) % 360});
    };

    const angle = (hsva.h * Math.PI) / 180;
    const thumbRadius = size / 2 - ring / 2;

    return (
        <div
            ref={ref}
            className="zcp-wheel"
            data-disabled={disabled || undefined}
            style={{width: size, height: size, '--zcp-ring': `${ring}px`} as React.CSSProperties}
            {...dragProps}
        >
            <div className="zcp-wheel-ring" aria-hidden="true"/>
            <div
                ref={thumbRef}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label="Hue"
                aria-valuemin={0}
                aria-valuemax={360}
                aria-valuenow={Math.round(hsva.h)}
                aria-valuetext={`${Math.round(hsva.h)} degrees`}
                aria-disabled={disabled || undefined}
                className="zcp-thumb zcp-thumb--free"
                style={{
                    left: size / 2 + Math.sin(angle) * thumbRadius,
                    top: size / 2 - Math.cos(angle) * thumbRadius,
                    '--zcp-thumb-fill': `hsl(${hsva.h}, 100%, 50%)`,
                } as React.CSSProperties}
                onKeyDown={handleKeyDown}
                onBlur={onChangeEnd}
            />
            <SaturationArea
                className="zcp-wheel-square"
                hsva={hsva}
                onChange={onChange}
                onChangeEnd={onChangeEnd}
                disabled={disabled}
                style={{width: square, height: square}}
            />
        </div>
    );
};
