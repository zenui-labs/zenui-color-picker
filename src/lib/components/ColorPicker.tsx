import React, {useEffect, useRef, useState} from 'react';
import {Check, Copy, Heart, RotateCcw} from 'lucide-react';
import {ColorFormat, ColorPickerProps, ColorValue} from '../types';
import {colorToValue, formatColorValue, hsvToRgb, parseColor} from '../utils/colorUtils';
import {useColorPicker} from '../hooks/useColorPicker';
import {BrightnessSlider} from './BrightnessSlider.tsx';
import {ColorInput} from './ColorInput';
import {ColorSlider} from "./variants/ColorSlider.tsx";
import {WheelPicker} from "./variants/wheel-picker.tsx";
import {HueBox} from "./variants/hue-box.tsx";
import FormatSelect from "./FormatSelect.tsx";
import AdvancePicker from "./variants/advance-picker.tsx";

const defaultPresetColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
                                                            value,
                                                            format = 'hex',
                                                            variant = 'wheel',
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
                                                            title = 'Color Picker',
                                                            enableHueSlider = false,
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
    const [currentHue, setCurrentHue] = useState<number>(180);

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

    useEffect(() => {
        const newHue = hsvToRgb(currentHue, 100, 100)
        const newColor = colorToValue(
            newHue.r,
            newHue.g,
            newHue.b,
        );
        handleColorChange(newColor);
    }, [currentHue])

    const calculateDropdownPosition = () => {
        if (!triggerRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        let estimatedHeight = 200;
        if (showAlpha) estimatedHeight += 50;
        if (showPresets && presetColors.length > 0) estimatedHeight += 80;
        if (showHistory && colorHistory.length > 0) estimatedHeight += 60;
        if (enableFavorite && favoriteColors.length > 0) estimatedHeight += 60;

        const spaceBelow = viewportHeight - triggerRect.bottom - 10;
        const spaceAbove = triggerRect.top - 10;

        if (spaceBelow >= estimatedHeight) {
            setDropdownPosition('bottom');
        } else if (spaceAbove >= estimatedHeight) {
            setDropdownPosition('top');
        } else {
            setDropdownPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
        }
    };

    const handleOpen = () => {
        if (disabled) return;
        setIsOpen(true);
        setTimeout(calculateDropdownPosition, 0);
        onOpen?.();
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose?.();
    };

    const handleColorChange = (color: ColorValue) => {
        updateColor(color);
        setCurrentHue(color.hsv.h);
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
            ${variant === 'advance' ? 'w-max' : 'w-80'}
          `}
                    style={getDropdownStyles()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <div className="flex items-center gap-2">
                            {showCopyButton && (
                                <button
                                    onClick={handleCopy}
                                    className={`
                    p-2 rounded-lg transition-colors duration-200 cursor-pointer
                    ${copySuccess
                                        ? 'text-[var(--brand-color)] bg-[var(--brand-color)]/10'
                                        : 'hover:bg-gray-100 text-gray-600'
                                    }
                  `}
                                    title={copySuccess ? 'Copied!' : 'Copy color'}
                                >
                                    {
                                        copySuccess ? (
                                            <Check size={16}/>
                                        ) : (
                                            <Copy size={16}/>
                                        )
                                    }
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

                    {
                        variant === 'wheel' && (
                            <div className="mb-4">
                                <WheelPicker
                                    color={currentColor}
                                    onChange={handleColorChange}
                                    size={220}
                                />
                            </div>
                        )
                    }

                    {
                        variant === 'hue-box' && (
                            <HueBox
                                color={currentColor}
                                onChange={handleColorChange}
                            />
                        )
                    }

                    {
                        (variant === 'hue-slider' || enableHueSlider) && variant !== 'advance' && (
                            <ColorSlider
                                hue={currentHue}
                                onChange={setCurrentHue}
                            />
                        )
                    }

                    {
                        variant === 'advance' && (
                            <AdvancePicker
                                currentColor={currentColor}
                                currentFormat={currentFormat}
                                currentHue={currentHue}
                                setCurrentHue={setCurrentHue}
                                currentColorString={currentColorString}
                                handleFormatChange={handleFormatChange}
                                handleColorChange={handleColorChange}
                                addToFavorites={addToFavorites}
                                removeFromFavorites={removeFromFavorites}
                                presetColors={presetColors}
                                favoriteColors={favoriteColors}
                                colorHistory={colorHistory}
                                showFormats={showFormats}
                            />
                        )
                    }

                    {/* Alpha Slider */}
                    {variant !== 'advance' && showAlpha && (
                        <div className="mb-4">
                            <BrightnessSlider
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
                    {
                        variant !== 'advance' && showFormats && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    {showFormats && (
                                        <FormatSelect currentFormat={currentFormat} handleFormatChange={handleFormatChange}
                                                      theme={theme}/>
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
                        )
                    }

                    {/* Preset Colors */}
                    {variant !== 'advance' && showPresets && presetColors.length > 0 && (
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
                    {
                        variant !== 'advance' && showHistory && colorHistory.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium mb-2 text-gray-600 flex items-center gap-1">
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
                    }

                    {
                        variant !== 'advance' && enableFavorite && favoriteColors.length > 0 && (
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
                        variant !== 'advance' && enableFavorite && (
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