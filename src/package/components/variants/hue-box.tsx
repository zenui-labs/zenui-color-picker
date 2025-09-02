import React, {useCallback, useEffect, useRef, useState} from "react";
import {ColorValue} from "../../types";
import {colorToValue, hsvToRgb} from "../../utils/colorUtils";
import {clsx} from "clsx";

interface SVBoxProps {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    height?: number;
    disabled?: boolean;
}

export const HueBox: React.FC<SVBoxProps> = ({
                                                 color,
                                                 onChange,
                                                 height = 180,
                                                 disabled
                                             }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const drawSVBox = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !width) return;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const hueColor = `hsl(${color.hsv.h}, 100%, 50%)`;
        ctx.fillStyle = hueColor;
        ctx.fillRect(0, 0, width, height);

        const whiteGradient = ctx.createLinearGradient(0, 0, width, 0);
        whiteGradient.addColorStop(0, "#fff");
        whiteGradient.addColorStop(1, "transparent");
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, width, height);

        const blackGradient = ctx.createLinearGradient(0, 0, 0, height);
        blackGradient.addColorStop(0, "transparent");
        blackGradient.addColorStop(1, "#000");
        ctx.fillStyle = blackGradient;
        ctx.fillRect(0, 0, width, height);

        const x = (color.hsv.s / 100) * width;
        const y = height - (color.hsv.v / 100) * height;

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);

        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 6;

        ctx.fillStyle = color.hex;
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#fff";
        ctx.stroke();
    }, [color, width, height]);

    useEffect(() => {
        drawSVBox();
    }, [drawSVBox]);

    const getCoordinatesFromEvent = (e: MouseEvent | React.MouseEvent | WheelEvent) => {
        if (!canvasRef.current) return null;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, width));
        const y = Math.max(0, Math.min(e.clientY - rect.top, height));

        return {x, y};
    };

    const updateColorFromCoordinates = (x: number, y: number) => {
        const s = Math.max(0, Math.min(100, (x / width) * 100));
        const v = Math.max(0, Math.min(100, 100 - (y / height) * 100));

        const {r, g, b} = hsvToRgb(color.hsv.h, s, v);
        onChange(colorToValue(r, g, b, color.rgb.a));
    };

    const handleMove = (e: MouseEvent) => {
        if (!isDraggingRef.current) return;

        const coords = getCoordinatesFromEvent(e);
        if (coords) {
            updateColorFromCoordinates(coords.x, coords.y);
        }
    };

    const handleDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDraggingRef.current = true;

        const coords = getCoordinatesFromEvent(e);
        if (coords) {
            updateColorFromCoordinates(coords.x, coords.y);
        }

        const handleUp = () => {
            isDraggingRef.current = false;
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleUp);
        };

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleUp);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();

        const coords = getCoordinatesFromEvent(e);
        if (!coords) return;

        const scrollSensitivity = 2;
        const deltaY = e.deltaY;
        const deltaX = e.deltaX;

        let newS = color.hsv.s;
        let newV = color.hsv.v;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            newV = Math.max(0, Math.min(100, color.hsv.v - (deltaY / scrollSensitivity)));
        } else {
            newS = Math.max(0, Math.min(100, color.hsv.s + (deltaX / scrollSensitivity)));
        }

        const {r, g, b} = hsvToRgb(color.hsv.h, newS, newV);
        onChange(colorToValue(r, g, b, color.rgb.a));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const step = e.shiftKey ? 10 : 1;
        let newS = color.hsv.s;
        let newV = color.hsv.v;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newS = Math.max(0, color.hsv.s - step);
                break;
            case 'ArrowRight':
                e.preventDefault();
                newS = Math.min(100, color.hsv.s + step);
                break;
            case 'ArrowUp':
                e.preventDefault();
                newV = Math.min(100, color.hsv.v + step);
                break;
            case 'ArrowDown':
                e.preventDefault();
                newV = Math.max(0, color.hsv.v - step);
                break;
            default:
                return;
        }

        const {r, g, b} = hsvToRgb(color.hsv.h, newS, newV);
        onChange(colorToValue(r, g, b, color.rgb.a));
    };

    return (
        <div ref={containerRef} className="w-full relative mb-5">
            <canvas
                ref={canvasRef}
                onMouseDown={handleDown}
                onWheel={handleWheel}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                className={clsx(
                    'rounded-lg',
                    disabled ? 'cursor-not-allowed' : 'cursor-crosshair'
                )}
                style={{display: "block", height}}
                aria-label="Color saturation and value picker"
                role="slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={color.hsv.s}
            />
        </div>
    );
};