import {useCallback, useEffect, useRef, useState} from 'react';
import type {ColorFormat, ColorValue, UpdateColorOptions, UseColorPickerOptions} from '../types';
import {colorToValue, parseColor} from '../utils/colorUtils';

/**
 * Copies text. Falls back to a hidden textarea when the async clipboard is
 * blocked (permissions policy, iframes, older browsers).
 */
export async function copyText(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        try {
            const area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
            document.body.appendChild(area);
            area.select();
            const ok = document.execCommand('copy');
            area.remove();
            return ok;
        } catch {
            return false;
        }
    }
}

export function useColorPicker(options: UseColorPickerOptions = {}) {
    const {
        initialColor = '#00AA45',
        initialFormat = 'hex',
        showAlpha = false,
        maxHistory = 10,
        setCurrentHue,
    } = options;

    const [currentColor, setCurrentColor] = useState<ColorValue>(
        () => parseColor(initialColor) ?? colorToValue(0, 170, 69)
    );
    const [currentFormat, setCurrentFormat] = useState<ColorFormat>(initialFormat);
    const [isOpen, setIsOpen] = useState(false);
    const [colorHistory, setColorHistory] = useState<ColorValue[]>([]);
    const [favoriteColors, setFavoriteColors] = useState<ColorValue[]>([]);

    const setHueRef = useRef(setCurrentHue);
    useEffect(() => {
        setHueRef.current = setCurrentHue;
    }, [setCurrentHue]);

    const addToHistory = useCallback((color: ColorValue) => {
        setColorHistory(prev => {
            if (prev[0]?.hex === color.hex) return prev;
            return [color, ...prev.filter(c => c.hex !== color.hex)].slice(0, Math.max(0, maxHistory));
        });
    }, [maxHistory]);

    const updateColor = useCallback((color: ColorValue, {addToHistory: record = true}: UpdateColorOptions = {}) => {
        setCurrentColor(color);
        if (record) addToHistory(color);
    }, [addToHistory]);

    const updateFormat = useCallback((format: ColorFormat) => {
        setCurrentFormat(format);
    }, []);

    const addToFavorites = useCallback((color: ColorValue) => {
        setFavoriteColors(prev => prev.some(c => c.hex === color.hex) ? prev : [...prev, color]);
    }, []);

    const removeFromFavorites = useCallback((color: ColorValue) => {
        setFavoriteColors(prev => prev.filter(c => c.hex !== color.hex));
    }, []);

    const clearHistory = useCallback(() => setColorHistory([]), []);

    const copyToClipboard = useCallback((text: string) => copyText(text), []);

    const generateRandomColor = useCallback(() => {
        const channel = () => Math.floor(Math.random() * 256);
        const color = colorToValue(channel(), channel(), channel(), showAlpha ? Math.random() : undefined);
        updateColor(color);
        setHueRef.current?.(color.hsv.h);
        return color;
    }, [showAlpha, updateColor]);

    return {
        currentColor,
        currentFormat,
        isOpen,
        colorHistory,
        favoriteColors,
        updateColor,
        updateFormat,
        setIsOpen,
        addToHistory,
        addToFavorites,
        removeFromFavorites,
        clearHistory,
        copyToClipboard,
        generateRandomColor
    };
}
