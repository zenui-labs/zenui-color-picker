import React, {useEffect, useRef, useState} from 'react';
import {Copy, Heart, History, RotateCcw} from 'lucide-react';
import {ColorFormat, ColorPickerProps, ColorValue} from '../types';
import {colorToValue, formatColorValue, parseColor} from '../utils/colorUtils';
import {useColorPicker} from '../hooks/useColorPicker';
import {ColorWheel} from './ColorWheel';
import {ColorSlider} from './ColorSlider';
import {ColorInput} from './ColorInput';

const defaultPresetColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
                                                            value,
                                                            format = 'hex',
                                                            variant = 'advanced',
                                                            theme = 'light',
                                                            disabled = false,
                                                            showAlpha = true,
                                                            showEyeDropper = true,
                                                            showHistory = true,
                                                            showFormats = true,
                                                            showCopyButton = true,
                                                            presetColors = defaultPresetColors,
                                                            maxHistory = 10,
                                                            className = '',
                                                            style,
                                                            onChange,
                                                            onFormatChange,
                                                            onOpen,
                                                            onClose
                                                        }) => {
    const {
        currentColor,
        currentFormat,
        isOpen,
        colorHistory,
        favoriteColors,
        updateColor,
        updateFormat,
        setIsOpen,
        addToFavorites,
        removeFromFavorites,
        copyToClipboard,
        generateRandomColor
    } = useColorPicker({
        initialColor: value,
        initialFormat: format,
        showAlpha,
        maxHistory
    });

    const [copySuccess, setCopySuccess] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            const parsed = parseColor(value);
            if (parsed) updateColor(parsed);
        }
    }, [value, updateColor]);

    useEffect(() => {
        updateFormat(format);
    }, [format, updateFormat]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    const handleOpen = () => {
        if (disabled) return;
        setIsOpen(true);
        onOpen?.();
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose?.();
    };

    const handleColorChange = (color: ColorValue) => {
        updateColor(color);
        onChange?.(color, currentFormat);
    };

    const handleFormatChange = (newFormat: ColorFormat) => {
        updateFormat(newFormat);
        onFormatChange?.(newFormat);
    };

    const handleCopy = async () => {
        const colorString = formatColorValue(currentColor, currentFormat);
        const success = await copyToClipboard(colorString);
        if (success) {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    const themeClasses = theme === 'dark'
        ? 'bg-gray-800 text-white border-gray-600'
        : 'bg-white text-gray-900 border-gray-200';

    const currentColorString = formatColorValue(currentColor, currentFormat);

    return (
        <div className={`relative inline-block ${className}`} style={style}>
            {/* Color Trigger */}
            <button
                onClick={handleOpen}
                disabled={disabled}
                className={`
          w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md 
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        `}
                style={{backgroundColor: currentColor.hex}}
                title={currentColorString}
            />

            {/* Color Picker Popover */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className={`
            absolute z-50 mt-2 p-4 rounded-xl shadow-2xl border backdrop-blur-sm
            ${themeClasses}
            ${variant === 'compact' ? 'w-64' : 'w-80'}
          `}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Color Picker</h3>
                        <div className="flex items-center gap-2">
                            {showCopyButton && (
                                <button
                                    onClick={handleCopy}
                                    className={`
                    p-2 rounded-lg transition-colors duration-200
                    ${copySuccess
                                        ? 'bg-green-100 text-green-600'
                                        : 'hover:bg-gray-100 text-gray-600'
                                    }
                  `}
                                    title={copySuccess ? 'Copied!' : 'Copy color'}
                                >
                                    <Copy size={16}/>
                                </button>
                            )}
                            <button
                                onClick={generateRandomColor}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                                title="Generate random color"
                            >
                                <RotateCcw size={16}/>
                            </button>
                        </div>
                    </div>

                    {/* Color Wheel/Slider */}
                    {variant !== 'compact' && (
                        <div className="mb-4">
                            <ColorWheel
                                color={currentColor}
                                onChange={handleColorChange}
                                size={variant === 'basic' ? 180 : 220}
                            />
                        </div>
                    )}

                    {/* Alpha Slider */}
                    {showAlpha && (
                        <div className="mb-4">
                            <ColorSlider
                                type="alpha"
                                value={currentColor.rgb.a || 1}
                                color={currentColor}
                                onChange={(alpha) => {
                                    const newColor = colorToValue(
                                        currentColor.rgb.r,
                                        currentColor.rgb.g,
                                        currentColor.rgb.b,
                                        alpha
                                    );
                                    handleColorChange(newColor);
                                }}
                            />
                        </div>
                    )}

                    {/* Format Selector & Input */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            {showFormats && (
                                <select
                                    value={currentFormat}
                                    onChange={(e) => handleFormatChange(e.target.value as ColorFormat)}
                                    className={`
                    px-3 py-1 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}
                  `}
                                >
                                    <option value="hex">HEX</option>
                                    <option value="rgb">RGB</option>
                                    <option value="hsl">HSL</option>
                                    <option value="hsv">HSV</option>
                                    <option value="cmyk">CMYK</option>
                                </select>
                            )}
                        </div>

                        <ColorInput
                            value={currentColorString}
                            format={currentFormat}
                            onChange={(colorString) => {
                                const parsed = parseColor(colorString);
                                if (parsed) handleColorChange(parsed);
                            }}
                            theme={theme}
                        />
                    </div>

                    {/* Preset Colors */}
                    {presetColors.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2 text-gray-600">Preset Colors</h4>
                            <div className="grid grid-cols-5 gap-2">
                                {presetColors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            const parsed = parseColor(color);
                                            if (parsed) handleColorChange(parsed);
                                        }}
                                        className="w-8 h-8 rounded-lg border border-gray-200 hover:scale-110 transition-transform duration-200"
                                        style={{backgroundColor: color}}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* History & Favorites */}
                    {(showHistory || favoriteColors.length > 0) && variant !== 'compact' && (
                        <div className="space-y-3">
                            {/* Favorites */}
                            {favoriteColors.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2 text-gray-600 flex items-center gap-1">
                                        <Heart size={14}/>
                                        Favorites
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {favoriteColors.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleColorChange(color)}
                                                onDoubleClick={() => removeFromFavorites(color)}
                                                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform duration-200"
                                                style={{backgroundColor: color.hex}}
                                                title={`${color.hex} (double-click to remove)`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* History */}
                            {showHistory && colorHistory.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2 text-gray-600 flex items-center gap-1">
                                        <History size={14}/>
                                        Recent Colors
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {colorHistory.slice(0, 10).map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleColorChange(color)}
                                                onDoubleClick={() => addToFavorites(color)}
                                                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform duration-200"
                                                style={{backgroundColor: color.hex}}
                                                title={`${color.hex} (double-click to favorite)`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Current Color Display */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg border border-gray-200"
                                style={{backgroundColor: currentColor.hex}}
                            />
                            <div className="flex-1">
                                <div className="text-sm font-medium">{currentColorString}</div>
                                <div className="text-xs text-gray-500">Current Color</div>
                            </div>
                            <button
                                onClick={() => addToFavorites(currentColor)}
                                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                title="Add to favorites"
                            >
                                <Heart size={16}/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};