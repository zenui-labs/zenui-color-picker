import React, {useCallback, useRef} from 'react';
import {ColorValue} from '../types';

interface ColorSliderProps {
    type: 'hue' | 'saturation' | 'brightness' | 'alpha';
    value: number;
    color: ColorValue;
    onChange: (value: number) => void;
}

export const ColorSlider: React.FC<ColorSliderProps> = ({
                                                            type,
                                                            value,
                                                            color,
                                                            onChange
                                                        }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        const percentage = x / rect.width;

        let newValue: number;
        switch (type) {
            case 'hue':
                newValue = percentage * 360;
                break;
            case 'saturation':
            case 'brightness':
                newValue = percentage * 100;
                break;
            case 'alpha':
                newValue = percentage;
                break;
            default:
                newValue = percentage;
        }

        onChange(newValue);
    }, [onChange, type]);

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
        let percentage: number;

        switch (type) {
            case 'hue':
                percentage = value / 360;
                break;
            case 'saturation':
            case 'brightness':
                percentage = value / 100;
                break;
            case 'alpha':
                percentage = value;
                break;
            default:
                percentage = 0;
        }

        percentage = Math.max(0, Math.min(1, percentage));

        const thumbRadius = 12;
        const thumbWidthPercentage = (thumbRadius / (sliderRef.current?.offsetWidth || 200)) * 100;

        const minPosition = thumbWidthPercentage;
        const maxPosition = 100 - thumbWidthPercentage;

        return minPosition + (percentage * (maxPosition - minPosition));
    };

    const getBackgroundStyle = () => {
        switch (type) {
            case "hue":
                return {
                    backgroundImage:
                        "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                };
            case "saturation":
                return {
                    backgroundImage: `linear-gradient(to right, hsl(${color.hsv.h}, 0%, ${color.hsv.v}%), hsl(${color.hsv.h}, 100%, ${color.hsv.v}%))`,
                };
            case "brightness":
                return {
                    backgroundImage: `linear-gradient(to right, hsl(${color.hsv.h}, ${color.hsv.s}%, 0%), hsl(${color.hsv.h}, ${color.hsv.s}%, 100%))`,
                };
            case "alpha":
                const solidColor = color.hex.length === 9 ? color.hex.substring(0, 7) : color.hex;
                return {
                    backgroundImage: `linear-gradient(to right, transparent, ${solidColor})`,
                };
            default:
                return {};
        }
    };

    return (
        <div className="mb-3">
            <label className="block text-sm font-medium mb-2 text-gray-600 capitalize">
                {type} {type === 'alpha' && `(${Math.round(value * 100)}%)`}
            </label>
            <div
                ref={sliderRef}
                className="relative h-4 rounded-lg cursor-pointer shadow-inner"
                style={getBackgroundStyle()}
                onMouseDown={handleMouseDown}
            >
                <div
                    className="absolute w-6 h-6 hover:scale-[1.1] hover:border-blue-500 bg-white border-2 border-gray-400 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1 cursor-grab active:cursor-grabbing"
                    style={{left: `${getThumbPosition()}%`}}
                />
            </div>
        </div>
    );
};