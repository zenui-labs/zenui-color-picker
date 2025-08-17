import React, {useCallback, useEffect, useRef} from 'react';
import {ColorValue} from '../types';
import {colorToValue, hsvToRgb} from '../utils/colorUtils';

interface ColorWheelProps {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    size?: number;
}

export const ColorWheel: React.FC<ColorWheelProps> = ({
                                                          color,
                                                          onChange,
                                                          size = 200
                                                      }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDraggingRef = useRef(false);

    const drawColorWheel = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2 - 10;
        const innerRadius = radius * 0.3;

        ctx.clearRect(0, 0, size, size);

        // Draw full circular color wheel with hue gradient
        for (let angle = 0; angle < 360; angle += 1) {
            const startAngle = (angle - 0.5) * Math.PI / 180;
            const endAngle = (angle + 0.5) * Math.PI / 180;

            // Create radial gradient for each slice
            const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, radius);
            const rgb = hsvToRgb(angle, 100, 100);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(0.7, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
            gradient.addColorStop(1, `rgb(${Math.round(rgb.r * 0.8)}, ${Math.round(rgb.g * 0.8)}, ${Math.round(rgb.b * 0.8)})`);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        // Draw inner white circle for saturation/brightness
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        // Draw saturation/brightness circle
        const circleRadius = innerRadius - 5;

        // Background (current hue)
        const hueRgb = hsvToRgb(color.hsv.h, 100, 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${hueRgb.r}, ${hueRgb.g}, ${hueRgb.b})`;
        ctx.fill();

        // Saturation gradient (white to transparent from center to edge)
        const satGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, circleRadius);
        satGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        satGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = satGradient;
        ctx.fill();

        // Brightness gradient - draw manually using angular segments
        for (let angle = 0; angle < 360; angle += 2) {
            const startAngle = (angle - 1) * Math.PI / 180;
            const endAngle = (angle + 1) * Math.PI / 180;

            // Calculate brightness based on angle (0° = 0% brightness, 360° = 100% brightness)
            const brightness = angle / 360;
            const alpha = 1 - brightness; // Invert for black overlay

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, circleRadius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.fill();
        }

        // Draw current position indicators
        // Hue indicator on wheel
        const hueAngle = (color.hsv.h * Math.PI) / 180;
        const hueIndicatorRadius = (radius + innerRadius) / 2;
        const hueX = centerX + Math.cos(hueAngle) * hueIndicatorRadius;
        const hueY = centerY + Math.sin(hueAngle) * hueIndicatorRadius;

        ctx.beginPath();
        ctx.arc(hueX, hueY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Saturation/brightness indicator in the inner circle
        const saturationRadius = (color.hsv.s / 100) * circleRadius;
        const brightnessAngle = (color.hsv.v / 100) * Math.PI * 2; // Direct mapping: brightness to angle
        const satX = centerX + Math.cos(brightnessAngle) * saturationRadius;
        const satY = centerY + Math.sin(brightnessAngle) * saturationRadius;

        ctx.beginPath();
        ctx.arc(satX, satY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();

    }, [color, size]);

    useEffect(() => {
        drawColorWheel();
    }, [drawColorWheel]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDraggingRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2 - 10;
        const innerRadius = radius * 0.3;

        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if in outer wheel (hue selection)
        if (distance > innerRadius && distance < radius) {
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const hue = angle < 0 ? angle + 360 : angle;

            const newColor = colorToValue(
                ...Object.values(hsvToRgb(hue, color.hsv.s, color.hsv.v)),
                color.rgb.a
            );
            onChange(newColor);
        }

        // Check if in inner circle (saturation/brightness)
        const circleRadius = innerRadius - 5;

        if (distance <= circleRadius) {
            const saturation = Math.max(0, Math.min(100, (distance / circleRadius) * 100));

            // Fixed brightness calculation to match the new angular brightness system
            const brightnessAngle = Math.atan2(dy, dx);
            // Convert angle to 0-360 degrees and map directly to brightness
            const angleDegrees = brightnessAngle * 180 / Math.PI;
            const normalizedAngle = angleDegrees < 0 ? angleDegrees + 360 : angleDegrees;
            const brightness = Math.max(0, Math.min(100, (normalizedAngle / 360) * 100));

            const newColor = colorToValue(
                ...Object.values(hsvToRgb(color.hsv.h, saturation, brightness)),
                color.rgb.a
            );
            onChange(newColor);
        }
    }, [color, onChange, size]);

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        isDraggingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Trigger initial change
        handleMouseMove(e.nativeEvent);
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div className="flex justify-center">
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                onMouseDown={handleMouseDown}
                className="cursor-crosshair rounded-lg"
                style={{width: size, height: size}}
            />
        </div>
    );
};