import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ColorValue} from '../types';

interface ColorSliderProps {
    value: number;
    color: ColorValue;
    onChange: (value: number) => void;
}

export const BrightnessSlider: React.FC<ColorSliderProps> = ({
                                                                 value,
                                                                 color,
                                                                 onChange
                                                             }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentColor, setCurrentColor] = useState<ColorValue | null>(null);

    const clampToThreeDecimals = (num: number) => {
        return parseFloat(Math.max(0, Math.min(1, num)).toFixed(2));
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const x = Math.max(2, Math.min(rect.width, e.clientX - rect.left));
        const percentage = x / rect.width;

        onChange(clampToThreeDecimals(percentage));
    }, [onChange]);

    useEffect(() => {
        setCurrentColor(color);
    }, [color]);

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        handleMouseMove(e.nativeEvent);
    }, [handleMouseMove, handleMouseUp]);

    const getThumbPosition = () => {
        const percentage = Math.max(0, Math.min(1, value));

        const thumbRadius = 12;
        const thumbWidthPercentage = (thumbRadius / (sliderRef.current?.offsetWidth || 200)) * 100;

        const minPosition = thumbWidthPercentage;
        const maxPosition = 100 - thumbWidthPercentage;

        return minPosition + (percentage * (maxPosition - minPosition));
    };

    const getBackgroundStyle = () => {
        const solidColor = color.hex.length === 9 ? color.hex.substring(0, 7) : color.hex;
        return {
            backgroundImage: `linear-gradient(to right, transparent, ${solidColor})`,
        }
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
        >
            <div
                className="absolute w-6 h-6 hover:scale-[1.2] hover:border-3 border-2 border-white rounded-full transition-colors duration-200 shadow-lg transform -translate-x-1/2 -translate-y-1 cursor-grab active:cursor-grabbing"
                style={{left: `${getThumbPosition()}%`, backgroundColor: getThumbColor()}}
            />
        </div>
    );
};