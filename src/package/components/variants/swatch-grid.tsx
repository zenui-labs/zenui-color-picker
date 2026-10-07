import React, {useRef} from "react";
import type {ColorValue} from "../../types";
import {hslToRgb, colorToValue} from "../../utils/colorUtils";
import {rgbaString, sameColor} from "../../utils/hsva";

interface SwatchGridProps {
    color: ColorValue;
    onPick: (color: ColorValue) => void;
    disabled?: boolean;
}

const HUES = [0, 22, 42, 58, 90, 140, 172, 195, 215, 245, 275, 320];
const LIGHTNESS = [92, 80, 66, 52, 40, 28];
const COLUMNS = HUES.length + 1;

/** A ready-made palette: twelve hues plus greys, six steps from tint to shade. */
function buildPalette(): ColorValue[] {
    const cells: ColorValue[] = [];
    for (const l of LIGHTNESS) {
        for (const h of HUES) {
            const {r, g, b} = hslToRgb(h, l > 85 ? 70 : 78, l);
            cells.push(colorToValue(r, g, b));
        }
        const grey = Math.round((l / 100) * 255);
        cells.push(colorToValue(grey, grey, grey));
    }
    return cells;
}

const PALETTE = buildPalette();

export const SwatchGrid: React.FC<SwatchGridProps> = ({color, onPick, disabled}) => {
    const palette = PALETTE;
    const gridRef = useRef<HTMLDivElement>(null);
    const selected = palette.findIndex((c) => sameColor(c, color));
    const tabStop = selected >= 0 ? selected : 0;

    // One tab stop for the whole grid; arrows move between cells.
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        const move = {ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLUMNS, ArrowUp: -COLUMNS}[e.key];
        if (move === undefined) return;
        e.preventDefault();
        const next = Math.min(palette.length - 1, Math.max(0, index + move));
        (gridRef.current?.children[next] as HTMLElement | undefined)?.focus();
    };

    return (
        <div ref={gridRef} className="zcp-grid" role="group" aria-label="Palette"
             style={{'--zcp-columns': COLUMNS} as React.CSSProperties}>
            {palette.map((c, i) => (
                <button
                    key={c.hex}
                    type="button"
                    className={`zcp-cell${i === selected ? ' is-active' : ''}`}
                    style={{'--zcp-swatch': rgbaString(c), '--zcp-delay': `${(i % COLUMNS) * 18 + Math.floor(i / COLUMNS) * 30}ms`} as React.CSSProperties}
                    tabIndex={i === tabStop ? 0 : -1}
                    aria-label={c.hex}
                    aria-pressed={i === selected}
                    title={c.hex}
                    disabled={disabled}
                    onClick={() => onPick(c)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                />
            ))}
        </div>
    );
};
