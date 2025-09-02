import { ColorFormat, ColorValue, UseColorPickerOptions } from '../types';
export declare function useColorPicker(options?: UseColorPickerOptions): {
    currentColor: ColorValue;
    currentFormat: ColorFormat;
    isOpen: boolean;
    colorHistory: ColorValue[];
    favoriteColors: ColorValue[];
    updateColor: (color: ColorValue) => void;
    updateFormat: (format: ColorFormat) => void;
    setIsOpen: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    addToFavorites: (color: ColorValue) => void;
    removeFromFavorites: (color: ColorValue) => void;
    clearHistory: () => void;
    copyToClipboard: (text: string) => Promise<boolean>;
    generateRandomColor: () => ColorValue;
};
