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
                                                            showHistory = true,
                                                            showFormats = true,
                                                            showCopyButton = true,
                                                            presetColors = defaultPresetColors,
                                                            maxHistory = 10,
                                                            className = '',
                                                            style,
                                                            onChange,
                                                            showPresets = true,
                                                            onFormatChange,
                                                            onOpen,
                                                            brandColor,
                                                            enableFavorite = false,
                                                            enableShuffle = false,
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
    const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

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

    // Calculate dropdown position based on available space
    const calculateDropdownPosition = () => {
        if (!triggerRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Estimate dropdown height based on variant and features
        let estimatedHeight = 200; // Base height
        if (variant === 'advanced') estimatedHeight += 100;
        if (showAlpha) estimatedHeight += 50;
        if (showPresets && presetColors.length > 0) estimatedHeight += 80;
        if (showHistory && colorHistory.length > 0) estimatedHeight += 60;
        if (enableFavorite && favoriteColors.length > 0) estimatedHeight += 60;
        if (variant === 'compact') estimatedHeight = 280;

        const spaceBelow = viewportHeight - triggerRect.bottom - 10; // 10px margin
        const spaceAbove = triggerRect.top - 10; // 10px margin

        // Prefer bottom position, but switch to top if not enough space below
        if (spaceBelow >= estimatedHeight) {
            setDropdownPosition('bottom');
        } else if (spaceAbove >= estimatedHeight) {
            setDropdownPosition('top');
        } else {
            // If neither has enough space, choose the side with more space
            setDropdownPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
        }
    };

    const handleOpen = () => {
        if (disabled) return;
        setIsOpen(true);
        // Calculate position after state update to ensure proper positioning
        setTimeout(calculateDropdownPosition, 0);
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

    // Recalculate position on window resize
    useEffect(() => {
        const handleResize = () => {
            if (isOpen) {
                calculateDropdownPosition();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    const themeClasses = theme === 'dark'
        ? 'bg-gray-800 text-white border-gray-600'
        : 'bg-white text-gray-900 border-gray-200';

    const currentColorString = formatColorValue(currentColor, currentFormat);

    const brandColorStyles = {
        '--brand-color': brandColor,
        ...style
    };

    // Dynamic positioning styles
    const getDropdownStyles = () => {
        const baseStyles = {
            position: 'absolute' as const,
            zIndex: 2000000000000000,
            left: 0,
        };

        if (dropdownPosition === 'bottom') {
            return {
                ...baseStyles,
                top: '100%',
                marginTop: '8px',
            };
        } else {
            return {
                ...baseStyles,
                bottom: '100%',
                marginBottom: '8px',
            };
        }
    };

    return (
        <div className={`relative inline-block ${className}`} style={brandColorStyles}>
            {/* Color Trigger */}
            <button
                ref={triggerRef}
                onClick={handleOpen}
                disabled={disabled}
                className={`
          w-12 h-12 rounded-lg border-2 border-gray-200 shadow-xs hover:shadow-md 
          transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
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
            p-4 rounded-xl shadow-2xl border backdrop-blur-xs
            ${themeClasses}
            ${variant === 'compact' ? 'w-64' : 'w-80'}
          `}
                    style={getDropdownStyles()}
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
                            {
                                enableShuffle && (
                                    <button
                                        onClick={generateRandomColor}
                                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                                        title="Generate random color"
                                    >
                                        <RotateCcw size={16}/>
                                    </button>
                                )
                            }
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
                    px-3 py-1 rounded-lg border text-sm focus:outline-hidden focus:ring-2 focus:ring-brandColor
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
                    {showPresets && presetColors.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2 text-gray-600">Preset Colors</h4>
                            <div className="grid grid-cols-7 gap-2">
                                {presetColors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            const parsed = parseColor(color);
                                            if (parsed) handleColorChange(parsed);
                                        }}
                                        className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 hover:scale-110 transition-transform duration-200"
                                        style={{backgroundColor: color}}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* History & Favorites */}
                    {variant !== 'compact' && (
                        showHistory && colorHistory.length > 0 && (
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
                                            className="w-6 h-6 rounded-sm border border-gray-200 hover:scale-110 transition-transform duration-200"
                                            style={{backgroundColor: color.hex}}
                                            title={`${color.hex} (double-click to favorite)`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    )}

                    {
                        enableFavorite && favoriteColors.length > 0 && (
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
                                            className="w-6 h-6 rounded-sm border border-gray-200 hover:scale-110 transition-transform duration-200"
                                            style={{backgroundColor: color.hex}}
                                            title={`${color.hex} (double-click to remove)`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    }

                    {/* Current Color Display */}
                    {
                        enableFavorite && (
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
                                        className="p-1 rounded-sm hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                        title="Add to favorites"
                                    >
                                        <Heart size={16}/>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
};