import React, {useCallback, useEffect, useRef, useState} from 'react';

interface ColorSliderProps {
    hue: number;
    onChange: (hue: number) => void;
    width?: number;
    height?: number;
    className?: string;
}

export const ColorSlider: React.FC<ColorSliderProps> = ({
                                                            hue,
                                                            onChange,
                                                            width = 400,
                                                            height = 16,
                                                            className = ""
                                                        }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const [containerWidth, setContainerWidth] = useState(width);

    useEffect(() => {
        const updateWidth = () => {
            if (sliderRef.current) {
                setContainerWidth(sliderRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const getHueFromPosition = useCallback((x: number) => {
        const slider = sliderRef.current;
        if (!slider) return hue;

        const rect = slider.getBoundingClientRect();
        const normalizedX = Math.max(0, Math.min(rect.width, x));
        return (normalizedX / rect.width) * 360;
    }, [hue]);

    const getThumbPosition = () => {
        const percentage = hue / 360;
        const thumbRadius = 12;
        const thumbWidthPercentage = (thumbRadius / containerWidth) * 100;

        const minPosition = thumbWidthPercentage;
        const maxPosition = 100 - thumbWidthPercentage;

        return minPosition + (percentage * (maxPosition - minPosition));
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDraggingRef.current) return;

        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newHue = getHueFromPosition(x);

        onChange(newHue);
    }, [onChange, getHueFromPosition]);

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDraggingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newHue = getHueFromPosition(x);
        onChange(newHue);
    }, [handleMouseMove, handleMouseUp, getHueFromPosition, onChange]);

    return (
        <div
            className={`w-full ${className} mb-6`}
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
                    className="absolute w-6 h-6 hover:scale-[1.1] hover:border-[var(--brand-color)] hover:border-3 transition-colors duration-200 bg-white border-2 border-gray-400 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1 cursor-grab active:cursor-grabbing"
                    style={{left: `${getThumbPosition()}%`}}
                />
            </div>
        </div>
    );
};