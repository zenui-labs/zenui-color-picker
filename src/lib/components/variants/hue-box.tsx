import React, {useCallback, useEffect, useRef} from "react";
import {ColorValue} from "../../types";
import {colorToValue, hsvToRgb} from "../../utils/colorUtils";

interface HueBoxProps {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    width?: number;
    height?: number;
}

export const HueBox: React.FC<HueBoxProps> = ({
                                                  color,
                                                  onChange,
                                                  width = 280,
                                                  height = 180,
                                              }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDraggingRef = useRef(false);
    const thumbYRef = useRef(height / 2);

    // Draw hue gradient box
    const drawHueBox = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Horizontal hue gradient
        const hueGradient = ctx.createLinearGradient(0, 0, width, 0);
        for (let i = 0; i <= 360; i += 10) {
            const {r, g, b} = hsvToRgb(i, 100, 100);
            hueGradient.addColorStop(i / 360, `rgb(${r},${g},${b})`);
        }
        ctx.fillStyle = hueGradient;
        ctx.fillRect(0, 0, width, height);

        // Thumb position
        const x = (color.hsv.h / 360) * width;
        const y = thumbYRef.current;

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
    }, [color, width, height]);

    useEffect(() => {
        drawHueBox();
    }, [drawHueBox]);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDraggingRef.current) return;
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, width));
            const y = Math.max(0, Math.min(e.clientY - rect.top, height));

            thumbYRef.current = y; // store vertical thumb position

            let hue = (x / width) * 360;
            hue = Math.max(0, Math.min(360, hue));

            const {r, g, b} = hsvToRgb(hue, 100, 100);
            const newColor = colorToValue(r, g, b, color.rgb.a);
            onChange(newColor);
        },
        [color, onChange, width, height]
    );

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            isDraggingRef.current = true;
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
            handleMouseMove(e.nativeEvent);
        },
        [handleMouseMove, handleMouseUp]
    );

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={handleMouseDown}
            className="cursor-crosshair rounded-lg mb-6"
            style={{width, height}}
        />
    );
};
