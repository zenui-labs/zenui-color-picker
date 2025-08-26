import React, {useEffect, useState} from 'react';
import {ColorFormat} from '../types';

interface ColorInputProps {
    value: string;
    format: ColorFormat;
    onChange: (value: string) => void;
    theme?: 'light' | 'dark';
}

export const ColorInput: React.FC<ColorInputProps> = ({
                                                          value,
                                                          format,
                                                          onChange,
                                                          theme = 'light'
                                                      }) => {
    const [inputValue, setInputValue] = useState(value);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const validateInput = (input: string): boolean => {
        switch (format) {
            case 'hex':
                return /^#[0-9A-Fa-f]{3,8}$/.test(input);
            case 'rgb':
                return /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*(0|1|0\.\d+))?\s*\)$/.test(input);
            case 'hsl':
                return /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*(0|1|0\.\d+))?\s*\)$/.test(input);
            case 'hsv':
                return /^hsv\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(input);
            case 'cmyk':
                return /^cmyk\(\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(input);
            default:
                return true;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        const valid = validateInput(newValue);
        setIsValid(valid);

        if (valid) {
            onChange(newValue);
        }
    };

    const handleBlur = () => {
        if (!isValid) {
            setInputValue(value);
            setIsValid(true);
        }
    };

    const placeholder = {
        hex: '#3B82F6',
        rgb: 'rgb(59, 130, 246)',
        hsl: 'hsl(217, 91%, 60%)',
        hsv: 'hsv(217, 76%, 96%)',
        cmyk: 'cmyk(76%, 47%, 0%, 4%)'
    }[format];

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`
                w-full px-3 py-2 rounded-lg border text-sm font-mono outline-none focus:ring-2 focus:ring-[var(--brand-color)] transition-colors
            ${isValid
                ? (theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-200 text-gray-900')
                : 'border-red-300 bg-red-50 text-red-900'
            }
      `}
        />
    );
};