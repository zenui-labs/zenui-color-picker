import React, {useCallback, useEffect, useRef} from 'react';
import {ColorValue} from '../../types';
import {colorToValue, hsvToRgb} from '../../utils/colorUtils';
import {clsx} from "clsx";

interface ColorWheelProps {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    size?: number;
    disabled?: boolean;
}

export const WheelPicker: React.FC<ColorWheelProps> = ({
                                                           color,
                                                           onChange,
                                                           size = 200,
                                                           disabled
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

        // Draw hue wheel
        for (let angle = 0; angle < 360; angle += 1) {
            const startAngle = (angle - 0.5) * Math.PI / 180;
            const endAngle = (angle + 0.5) * Math.PI / 180;

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

        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        const circleRadius = innerRadius - 5;

        const hueRgb = hsvToRgb(color.hsv.h, 100, 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${hueRgb.r}, ${hueRgb.g}, ${hueRgb.b})`;
        ctx.fill();

        const satGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, circleRadius);
        satGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        satGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = satGradient;
        ctx.fill();

        for (let angle = 0; angle < 360; angle += 2) {
            const startAngle = (angle - 1) * Math.PI / 180;
            const endAngle = (angle + 1) * Math.PI / 180;

            const brightness = angle / 360;
            const alpha = 1 - brightness;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, circleRadius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.fill();
        }

        // Hue indicator
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

        // Saturation & brightness indicator
        const saturationRadius = (color.hsv.s / 100) * circleRadius;
        const brightnessAngle = (color.hsv.v / 100) * Math.PI * 2;
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

    const getPointerCoords = (e: MouseEvent | Touch) => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const clientX = 'clientX' in e ? e.clientX : 0;
        const clientY = 'clientY' in e ? e.clientY : 0;
        return {x: clientX - rect.left, y: clientY - rect.top};
    };

    const handlePointerMove = useCallback((e: MouseEvent | Touch) => {
        if (!isDraggingRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const coords = getPointerCoords(e);
        if (!coords) return;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2 - 10;
        const innerRadius = radius * 0.3;

        const dx = coords.x - centerX;
        const dy = coords.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > innerRadius && distance < radius) {
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const hue = angle < 0 ? angle + 360 : angle;
            const {r, g, b} = hsvToRgb(hue, color.hsv.s, color.hsv.v);
            onChange(colorToValue(r, g, b, color.rgb.a));
        }

        const circleRadius = innerRadius - 5;
        if (distance <= circleRadius) {
            const saturation = Math.max(0, Math.min(100, (distance / circleRadius) * 100));
            const brightnessAngle = Math.atan2(dy, dx);
            const angleDegrees = brightnessAngle * 180 / Math.PI;
            const normalizedAngle = angleDegrees < 0 ? angleDegrees + 360 : angleDegrees;
            const brightness = Math.max(0, Math.min(100, (normalizedAngle / 360) * 100));
            const {r, g, b} = hsvToRgb(color.hsv.h, saturation, brightness);
            onChange(colorToValue(r, g, b, color.rgb.a));
        }
    }, [color, onChange, size]);

    const handlePointerUp = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', handlePointerUp);
        document.removeEventListener('touchmove', touchMoveHandler);
        document.removeEventListener('touchend', handlePointerUp);
    }, []);

    const mouseMoveHandler = (e: MouseEvent) => handlePointerMove(e);
    const touchMoveHandler = (e: TouchEvent) => {
        if (e.touches.length > 0) handlePointerMove(e.touches[0]);
        e.preventDefault(); // prevent scrolling
    };

    const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return;
        isDraggingRef.current = true;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', handlePointerUp);
        document.addEventListener('touchmove', touchMoveHandler, {passive: false});
        document.addEventListener('touchend', handlePointerUp);

        if ('touches' in e && e.touches.length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            handlePointerMove(e.touches[0]);
        } else if ('nativeEvent' in e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            handlePointerMove(e.nativeEvent);
        }
    };

    return (
        <div className="flex justify-center">
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
                className={clsx(
                    'rounded-lg',
                    disabled ? 'cursor-not-allowed' : 'cursor-crosshair'
                )}
                style={{width: size, height: size}}
            />
        </div>
    );
};
