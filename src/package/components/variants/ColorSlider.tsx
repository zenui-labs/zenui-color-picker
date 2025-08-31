import React, {useCallback, useEffect, useRef, useState} from 'react';
import {colorToValue, hsvToRgb} from "../../utils/colorUtils.ts";
import {ColorValue} from "../../types.ts";
import {clsx} from "clsx";

interface ColorSliderProps {
    hue: number;
    onChange: (hue: number) => void;
    height?: number;
    className?: string;
    disabled?: boolean;
}

export const ColorSlider: React.FC<ColorSliderProps> = ({
                                                            hue,
                                                            onChange,
                                                            height = 16,
                                                            disabled,
                                                            className = ""
                                                        }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const [currentColor, setCurrentColor] = useState<ColorValue | null>(null);

    const getHueFromPosition = useCallback((x: number) => {
        const slider = sliderRef.current;
        if (!slider) return hue;

        const rect = slider.getBoundingClientRect();
        const normalizedX = Math.max(0, Math.min(rect.width, x));
        const percentage = normalizedX / rect.width;

        const calculatedHue = percentage * 359;
        return Math.max(0, Math.min(359, Math.round(calculatedHue)));
    }, [hue]);

    const getThumbPosition = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return (hue / 359) * 100;

        const rect = slider.getBoundingClientRect();
        const sliderWidth = rect.width;

        if (sliderWidth === 0) return (hue / 359) * 100;

        const percentage = (hue / 359) * 100;

        const thumbRadius = 12;
        const thumbWidthPercentage = (thumbRadius / sliderWidth) * 100;

        const minPosition = thumbWidthPercentage;
        const maxPosition = 100 - thumbWidthPercentage;

        const adjustedPercentage = minPosition + ((percentage / 100) * (maxPosition - minPosition));

        return Math.max(minPosition, Math.min(maxPosition, adjustedPercentage));
    }, [hue]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDraggingRef.current || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newHue = getHueFromPosition(x);

        onChange(newHue);
    }, [onChange, getHueFromPosition]);

    useEffect(() => {
        const newHue = hsvToRgb(hue, 100, 100)
        const newColor = colorToValue(
            newHue.r,
            newHue.g,
            newHue.b,
        );
        setCurrentColor(newColor);
    }, [hue])

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (disabled || !sliderRef.current) return;

        e.preventDefault();

        isDraggingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newHue = getHueFromPosition(x);
        onChange(newHue);
    }, [disabled, handleMouseMove, handleMouseUp, getHueFromPosition, onChange]);

    useEffect(() => {
        const handleResize = () => {
            if (sliderRef.current) {
                setCurrentColor(prev => {
                    if (!prev) return null;
                    return {...prev};
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={clsx(
                'w-full mb-4',
                className
            )}
        >
            <div
                ref={sliderRef}
                className="relative rounded-lg cursor-pointer shadow-inner"
                style={{
                    height: height,
                    backgroundImage: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                }}
                onMouseDown={handleMouseDown}
            >
                <div
                    className={`absolute w-6 h-6 hover:scale-[1.2] hover:border-3 transition-colors duration-200 border-2 border-white rounded-full shadow-xl transform -translate-x-1/2 -translate-y-1 cursor-grab active:cursor-grabbing ${
                        disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={{
                        left: `${getThumbPosition()}%`,
                        backgroundColor: currentColor?.hex || "#fff",
                    }}
                />
            </div>
        </div>
    );
};