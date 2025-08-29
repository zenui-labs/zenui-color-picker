import React, {useEffect, useRef, useState} from 'react';
import {Heart, RotateCcw} from 'lucide-react';
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
    '#FF6B6B', '#4ECDC4', '#2300ff', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#006b85', '#85C1E9', '#C500ABFF'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
                                                            value,
                                                            format = 'hex',
                                                            variant = 'wheel',
                                                            theme = 'light',
                                                            disabled = false,
                                                            showAlpha = true,
                                                            showHistory = true,
                                                            showTitle = true,
                                                            showFormats = true,
                                                            showCopyButton = true,
                                                            presetColors = defaultPresetColors,
                                                            maxHistory = 10,
                                                            className = '',
                                                            showColorInput = true,
                                                            containerStyle,
                                                            popupStyle,
                                                            onChange,
                                                            inline = false,
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
        generateRandomColor
    } = useColorPicker({
        initialColor: value,
        initialFormat: format,
        showAlpha,
        maxHistory
    });

    const [dropdownPositionY, setDropdownPositionY] = useState<'bottom' | 'top'>('bottom');
    const [dropdownPositionX, setDropdownPositionX] = useState<'left' | 'right' | 'center'>('left');

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

        if (isOpen && !inline) {
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
        const viewportWidth = window.innerWidth;

        let estimatedHeight = 200;
        if (showAlpha) estimatedHeight += 50;
        if (showPresets && presetColors.length > 0) estimatedHeight += 80;
        if (showHistory && colorHistory.length > 0) estimatedHeight += 60;
        if (enableFavorite && favoriteColors.length > 0) estimatedHeight += 60;

        const estimatedWidth = variant === 'advance' ? 420 : 320;

        const spaceBelow = viewportHeight - triggerRect.bottom - 10;
        const spaceAbove = triggerRect.top - 30;

        if (spaceBelow >= estimatedHeight) {
            setDropdownPositionY('bottom');
        } else if (spaceAbove >= estimatedHeight) {
            setDropdownPositionY('top');
        } else {
            setDropdownPositionY(spaceBelow > spaceAbove ? 'bottom' : 'top');
        }

        const spaceRight = viewportWidth - triggerRect.left;
        const spaceLeft = triggerRect.right;

        if (spaceRight >= estimatedWidth) {
            setDropdownPositionX('left');
        } else if (spaceLeft >= estimatedWidth) {
            setDropdownPositionX('right');
        } else {
            setDropdownPositionX('center');
        }
    };

    useEffect(() => {
        setIsOpen(inline);
    }, [inline]);

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
        if (disabled) return;
        updateColor(color);
        setCurrentHue(color.hsv.h);
        onChange?.(color, currentFormat);
    };

    const handleFormatChange = (newFormat: ColorFormat) => {
        updateFormat(newFormat);
        onFormatChange?.(newFormat);
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
        ? 'bg-gray-900 text-white border-gray-600'
        : 'bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-200';

    const currentColorString = formatColorValue(currentColor, currentFormat);

    const brandColorStyles = {
        '--brand-color': brandColor,
        ...containerStyle
    };

    const getDropdownStyles = () => {
        if (inline) return

        const baseStyles: React.CSSProperties = {
            position: 'absolute',
            zIndex: 2000000000000000,
        };

        if (dropdownPositionY === 'bottom') {
            baseStyles.top = '100%';
            baseStyles.marginTop = '20px';
        } else {
            baseStyles.bottom = '100%';
            baseStyles.marginBottom = '8px';
        }

        if (!triggerRef.current) return baseStyles;
        if (dropdownPositionX === 'left') {
            baseStyles.left = 0;
        } else if (dropdownPositionX === 'right') {
            baseStyles.right = 0;
        } else {
            baseStyles.left = '50%';
            baseStyles.transform = 'translateX(-50%)';
        }

        return baseStyles;
    };

    return (
        <div className={`relative inline-block ${className}`} style={brandColorStyles}>
            {/* button */}
            {
                !inline && (
                    <button
                        type='button'
                        ref={triggerRef}
                        onClick={handleOpen}
                        disabled={disabled}
                        className={`
          w-12 h-12 rounded-lg border-2 border-gray-200 dark:border-gray-600 shadow-xs hover:shadow-md 
          transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-[var(--brand-color)]
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        `}
                        style={{backgroundColor: currentColor.hex}}
                        title={currentColorString}
                    />
                )
            }

            {/* Popover */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className={`
            p-4 rounded-xl shadow-2xl border backdrop-blur-xs
            ${themeClasses}
            ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-default'}
            ${popupStyle}
            ${variant === 'advance' ? 'w-max' : 'w-80'}
          `}
                    style={getDropdownStyles()}
                >
                    {/* Header */}
                    {
                        (showTitle || enableShuffle) && (
                            <div className="flex items-center justify-between mb-4">
                                {
                                    showTitle && (
                                        <h3 className="text-lg font-semibold">{title}</h3>
                                    )
                                }
                                <div className="flex items-center gap-2">
                                    {
                                        enableShuffle && (
                                            <button
                                                disabled={disabled}
                                                type='button'
                                                onClick={generateRandomColor}
                                                className={`${theme === 'dark' ? 'hover:bg-gray-600 text-gray-200' : 'hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-gray-600 dark:text-gray-200 text-gray-600'} p-2 rounded-lg transition-colors group cursor-pointer duration-200`}
                                                title="Generate random color"
                                            >
                                                <RotateCcw size={16}
                                                           className='group-hover:rotate-[-90deg] transition-all duration-200'/>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

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
                                disabled={disabled}
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

                    {/* Format Selector */}
                    {
                        variant !== 'advance' && showFormats && (
                            <div className="mt-4">
                                {showFormats && (
                                    <FormatSelect disabled={disabled} currentFormat={currentFormat}
                                                  handleFormatChange={handleFormatChange}
                                                  theme={theme}/>
                                )}
                            </div>
                        )
                    }

                    {
                        variant !== 'advance' && showColorInput && (
                            <div className="mt-4 relative">
                                <ColorInput
                                    value={currentColorString}
                                    format={currentFormat}
                                    disabled={disabled}
                                    onChange={(colorString) => {
                                        const parsed = parseColor(colorString);
                                        if (parsed) handleColorChange(parsed);
                                    }}
                                    showCopyButton={showCopyButton}
                                    theme={theme}
                                />
                            </div>
                        )
                    }

                    {/* Preset Colors */}
                    {variant !== 'advance' && showPresets && presetColors.length > 0 && (
                        <div className="mt-3">
                            <h4 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-600 dark:text-gray-100'} text-sm font-medium mb-2`}>Preset
                                Colors</h4>
                            <div className="flex items-center flex-wrap gap-2">
                                {presetColors.map((color, index) => (
                                    <button
                                        type='button'
                                        key={index}
                                        disabled={disabled}
                                        onClick={() => {
                                            const parsed = parseColor(color);
                                            if (parsed) handleColorChange(parsed);
                                        }}
                                        className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-200 dark:border-gray-700'} disabled:cursor-not-allowed w-8 h-8 rounded-lg cursor-pointer border dark:border-gray-700 border-gray-200 hover:scale-110 transition-transform duration-200`}
                                        style={{backgroundColor: color}}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* History */}
                    {
                        variant !== 'advance' && showHistory && colorHistory.length > 0 && (
                            <div className='mt-3'>
                                <h4 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-600 dark:text-gray-100'} text-sm font-medium mb-2 flex items-center gap-1`}>
                                    Recent Colors
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                    {colorHistory.slice(0, 10).map((color, index) => (
                                        <button
                                            type='button'
                                            key={index}
                                            disabled={disabled}
                                            onClick={() => handleColorChange(color)}
                                            onDoubleClick={() => addToFavorites(color)}
                                            className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-200 dark:border-gray-700'} disabled:cursor-not-allowed w-6 h-6 rounded-sm border hover:scale-110 transition-transform duration-200`}
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
                            <div className='mt-3'>
                                <h4 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-600 dark:text-gray-100'} text-sm font-medium mb-2 mt-4 gap-1`}>
                                    Favorites
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                    {favoriteColors.map((color, index) => (
                                        <button
                                            type='button'
                                            key={index}
                                            disabled={disabled}
                                            onClick={() => handleColorChange(color)}
                                            onDoubleClick={() => removeFromFavorites(color)}
                                            className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-200 dark:border-gray-700'} w-6 h-6 rounded-sm border border-gray-200 hover:scale-110 disabled:cursor-not-allowed transition-transform duration-200`}
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
                            <div
                                className={`${theme === 'dark' ? 'border-gray-600' : 'border-gray-200 dark:border-gray-600'} mt-4 pt-4 border-t`}>
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-200 dark:border-gray-700'} w-8 h-8 rounded-lg border`}
                                        style={{backgroundColor: currentColor.hex}}
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{currentColorString}</div>
                                        <div
                                            className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500 dark:text-gray-300'} text-xs`}>Current
                                            Color
                                        </div>
                                    </div>
                                    <button
                                        disabled={disabled}
                                        type='button'
                                        onClick={() => addToFavorites(currentColor)}
                                        className={`${theme === 'dark' ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-gray-200'} p-1 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-sm transition-colors cursor-pointer duration-200`}
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