import React, {useCallback, useEffect, useRef, useState} from "react";
import {ColorValue} from "../types";
import {clsx} from "clsx";

interface ColorSliderProps {
    value: number;
    color: ColorValue;
    onChange: (value: number) => void;
    disabled?: boolean
}

export const BrightnessSlider: React.FC<ColorSliderProps> = ({
                                                                 value,
                                                                 color,
                                                                 onChange,
                                                                 disabled
                                                             }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const [currentColor, setCurrentColor] = useState<ColorValue | null>(null);

    const clampToThreeDecimals = (num: number) => {
        return parseFloat(Math.max(0, Math.min(1, num)).toFixed(2));
    };

    const updateValueFromPosition = useCallback(
        (clientX: number) => {
            const slider = sliderRef.current;
            if (!slider) return;

            const rect = slider.getBoundingClientRect();
            const x = Math.max(2, Math.min(rect.width, clientX - rect.left));
            const percentage = x / rect.width;

            onChange(clampToThreeDecimals(percentage));
        },
        [onChange]
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            updateValueFromPosition(e.clientX);
        },
        [updateValueFromPosition]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (!isDraggingRef.current || e.touches.length === 0) return;
            updateValueFromPosition(e.touches[0].clientX);
        },
        [updateValueFromPosition]
    );

    const stopDragging = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", stopDragging);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", stopDragging);
    }, [handleMouseMove, handleTouchMove]);

    const startDragging = useCallback(
        (clientX: number) => {
            isDraggingRef.current = true;

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", stopDragging);
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", stopDragging);

            updateValueFromPosition(clientX);
        },
        [handleMouseMove, handleTouchMove, stopDragging, updateValueFromPosition]
    );

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            startDragging(e.clientX);
        },
        [startDragging]
    );

    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            if (e.touches.length > 0) {
                startDragging(e.touches[0].clientX);
            }
        },
        [startDragging]
    );

    useEffect(() => {
        setCurrentColor(color);
    }, [color]);

    const getThumbPosition = () => {
        const percentage = Math.max(0, Math.min(1, value));
        const sliderWidth = sliderRef.current?.offsetWidth || 200;

        const thumbRadius = 12;
        const thumbWidthPercentage = (thumbRadius / sliderWidth) * 100;

        const minPosition = thumbWidthPercentage;
        const maxPosition = 100 - thumbWidthPercentage;

        return minPosition + percentage * (maxPosition - minPosition);
    };

    const getBackgroundStyle = () => {
        const solidColor =
            color.hex.length === 9 ? color.hex.substring(0, 7) : color.hex;
        return {
            backgroundImage: `linear-gradient(to right, transparent, ${solidColor})`,
        };
    };

    const getThumbColor = () => {
        if (!currentColor) return "#fff";
        return `hsl(${currentColor.hsv.h}, ${currentColor.hsv.s}%, 50%)`;
    };

    return (
        <div
            ref={sliderRef}
            className="relative h-4 rounded-lg cursor-pointer shadow-inner mb-5"
            style={getBackgroundStyle()}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <div
                role="slider"
                aria-valuemin={0}
                aria-valuemax={359}
                aria-valuenow={value}
                aria-valuetext={`${value} degrees`}
                aria-disabled={disabled}
                className={clsx(
                    'absolute w-6 h-6 border-2 border-white rounded-full transition-colors duration-200 shadow-lg transform -translate-x-1/2 -translate-y-1 ',
                    disabled ? 'opacity-50 cursor-not-allowed' : 'active:cursor-grabbing cursor-grab hover:border-3 hover:scale-[1.2]'
                )}
                style={{left: `${getThumbPosition()}%`, backgroundColor: getThumbColor()}}
            />
        </div>
    );
};
