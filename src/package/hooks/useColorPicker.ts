import {useCallback, useRef, useState} from 'react';
import {ColorFormat, ColorValue, UseColorPickerOptions} from '../types';
import {colorToValue, parseColor} from '../utils/colorUtils';

export function useColorPicker(options: UseColorPickerOptions = {}) {
    const {
        initialColor = '#3B82F6',
        initialFormat = 'hex',
        showAlpha = false,
        maxHistory = 10
    } = options;

    const [currentColor, setCurrentColor] = useState<ColorValue>(() => {
        const parsed = parseColor(initialColor);
        return parsed || colorToValue(59, 130, 246);
    });

    const [currentFormat, setCurrentFormat] = useState<ColorFormat>(initialFormat);
    const [isOpen, setIsOpen] = useState(false);
    const [colorHistory, setColorHistory] = useState<ColorValue[]>([]);
    const [favoriteColors, setFavoriteColors] = useState<ColorValue[]>([]);

    const historyRef = useRef<Set<string>>(new Set());

    const updateColor = useCallback((color: ColorValue) => {
        setCurrentColor(color);

        if (!historyRef.current.has(color.hex)) {
            historyRef.current.add(color.hex);
            setColorHistory(prev => {
                const newHistory = [color, ...prev.filter(c => c.hex !== color.hex)];
                return newHistory.slice(0, maxHistory);
            });
        }
    }, [maxHistory]);

    const updateFormat = useCallback((format: ColorFormat) => {
        setCurrentFormat(format);
    }, []);

    const addToFavorites = useCallback((color: ColorValue) => {
        setFavoriteColors(prev => {
            if (prev.some(c => c.hex === color.hex)) return prev;
            return [...prev, color];
        });
    }, []);

    const removeFromFavorites = useCallback((color: ColorValue) => {
        setFavoriteColors(prev => prev.filter(c => c.hex !== color.hex));
    }, []);

    const clearHistory = useCallback(() => {
        setColorHistory([]);
        historyRef.current.clear();
    }, []);

    const copyToClipboard = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            return false;
        }
    }, []);

    const generateRandomColor = useCallback(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = showAlpha ? Math.random() : undefined;

        const color = colorToValue(r, g, b, a);
        updateColor(color);
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
        addToFavorites,
        removeFromFavorites,
        clearHistory,
        copyToClipboard,
        generateRandomColor
    };
}