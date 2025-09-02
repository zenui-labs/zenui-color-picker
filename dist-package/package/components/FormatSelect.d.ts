import { ColorFormat } from '../types';
type FormatSelectProps = {
    currentFormat: ColorFormat;
    handleFormatChange?: (newFormat: ColorFormat) => void;
    theme?: "light" | "dark";
    disabled?: boolean;
};
export default function FormatSelect({ currentFormat, handleFormatChange, theme, disabled, }: FormatSelectProps): import("react/jsx-runtime").JSX.Element;
export {};
