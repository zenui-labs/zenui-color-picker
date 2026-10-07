import React, {useCallback, useRef} from 'react';
import {DragPoint, usePointerDrag} from '../hooks/usePointerDrag';
import {cx} from '../utils/cx';

interface SliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    onChangeEnd?: () => void;
    label: string;
    valueText?: string;
    trackBackground: string;
    thumbColor: string;
    checker?: boolean;
    disabled?: boolean;
    className?: string;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** Horizontal track shared by the hue and alpha sliders. */
export const Slider: React.FC<SliderProps> = ({
                                                  value,
                                                  min,
                                                  max,
                                                  onChange,
                                                  onChangeEnd,
                                                  label,
                                                  valueText,
                                                  trackBackground,
                                                  thumbColor,
                                                  checker,
                                                  disabled,
                                                  className,
                                              }) => {
    const thumbRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(({x, rect, first}: DragPoint) => {
        const thumb = thumbRef.current?.offsetWidth ?? 0;
        const ratio = clamp((x - thumb / 2) / Math.max(1, rect.width - thumb), 0, 1);
        onChange(min + ratio * (max - min));
        if (first) thumbRef.current?.focus({preventScroll: true});
    }, [min, max, onChange]);

    const {ref, dragProps} = usePointerDrag<HTMLDivElement>(handleMove, onChangeEnd, disabled);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        const big = (max - min) / 10;
        const step = e.shiftKey ? 10 : 1;
        const next: Record<string, number> = {
            ArrowLeft: value - step,
            ArrowDown: value - step,
            ArrowRight: value + step,
            ArrowUp: value + step,
            PageDown: value - big,
            PageUp: value + big,
            Home: min,
            End: max,
        };
        if (!(e.key in next)) return;
        e.preventDefault();
        onChange(clamp(next[e.key], min, max));
    };

    const ratio = (clamp(value, min, max) - min) / (max - min);

    return (
        <div
            ref={ref}
            className={cx('zcp-slider', checker && 'zcp-checker', className)}
            data-disabled={disabled || undefined}
            {...dragProps}
        >
            <div className="zcp-slider-fill" style={{background: trackBackground}}/>
            <div
                ref={thumbRef}
                role="slider"
                tabIndex={disabled ? -1 : 0}
                aria-label={label}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={Math.round(value)}
                aria-valuetext={valueText}
                aria-disabled={disabled || undefined}
                className="zcp-thumb"
                style={{'--zcp-pos': ratio, '--zcp-thumb-fill': thumbColor} as React.CSSProperties}
                onKeyDown={handleKeyDown}
                onBlur={onChangeEnd}
            />
        </div>
    );
};
