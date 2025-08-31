import React, {useEffect, useState} from 'react';
import {ColorFormat} from '../types';
import {useColorPicker} from "../hooks/useColorPicker.ts";
import {Check, Copy} from "lucide-react";
import {clsx} from "clsx";

interface ColorInputProps {
    value: string;
    format: ColorFormat;
    onChange: (value: string) => void;
    theme?: 'light' | 'dark';
    showCopyButton?: boolean;
    disabled?: boolean;
}

export const ColorInput: React.FC<ColorInputProps> = ({
                                                          value,
                                                          format,
                                                          showCopyButton,
                                                          onChange,
                                                          disabled,
                                                          theme = 'light'
                                                      }) => {
    const [inputValue, setInputValue] = useState(value);
    const [isValid, setIsValid] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);

    const {copyToClipboard} = useColorPicker()

    const handleCopy = async () => {
        const success = await copyToClipboard(value);
        if (success) {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

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
        if (disabled) return;

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
        <div className='relative'>
            <input
                type="text"
                value={inputValue}
                disabled={disabled}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={clsx(
                    'w-full px-3 py-2 rounded-lg disabled:cursor-not-allowed border text-sm font-mono outline-none focus:ring-2 focus:ring-[var(--brand-color)] transition-colors',
                    isValid ? theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-200 text-gray-900'
                        : 'border-red-300 bg-red-50 text-red-900 dark:!ring-red-500/20 dark:bg-red-500/20 dark:text-red-100'
                )}
            />
            {showCopyButton && (
                <button
                    type='button'
                    disabled={disabled}
                    onClick={handleCopy}
                    className={clsx(
                        'p-2 rounded-lg disabled:cursor-not-allowed transition-colors absolute top-1/2 -translate-y-1/2 right-0.5 duration-200 cursor-pointer',
                        theme === 'dark' && 'hover:bg-gray-700 text-white',
                        copySuccess ? 'text-[var(--brand-color)] bg-[var(--brand-color)]/10'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white text-gray-600'
                    )}
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
        </div>
    );
};