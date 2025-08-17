import React, { useRef, useCallback } from 'react';
import { ColorValue } from '../types';

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

    const getBackground = () => {
        switch (type) {
            case 'hue':
                return 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)';
            case 'saturation':
                return `linear-gradient(to right, hsl(${color.hsv.h}, 0%, ${color.hsv.v}%), hsl(${color.hsv.h}, 100%, ${color.hsv.v}%))`;
            case 'brightness':
                return `linear-gradient(to right, hsl(${color.hsv.h}, ${color.hsv.s}%, 0%), hsl(${color.hsv.h}, ${color.hsv.s}%, 100%))`;
            case 'alpha':
                return `linear-gradient(to right, 
          transparent, ${color.hex}), 
          linear-gradient(45deg, #ccc 25%, transparent 25%), 
          linear-gradient(-45deg, #ccc 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #ccc 75%), 
          linear-gradient(-45deg, transparent 75%, #ccc 75%)`;
            default:
                return '';
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));

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
        switch (type) {
            case 'hue':
                return (value / 360) * 100;
            case 'saturation':
            case 'brightness':
                return (value / 100) * 100;
            case 'alpha':
                return value * 100;
            default:
                return 0;
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
                style={{
                    background: getBackground(),
                    backgroundSize: type === 'alpha' ? '20px 20px, 10px 10px, 10px 10px, 10px 10px, 10px 10px' : 'auto'
                }}
                onMouseDown={handleMouseDown}
            >
                <div
                    className="absolute w-4 h-4 bg-white border-2 border-gray-400 rounded-full shadow-lg transform -translate-x-2 -translate-y-0 cursor-grab active:cursor-grabbing"
                    style={{ left: `${getThumbPosition()}%` }}
                />
            </div>
        </div>
    );
};