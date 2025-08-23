import {useEffect, useRef, useState} from "react";
import {ColorFormat} from "../types.ts";
import {ChevronDown} from "lucide-react";

type FormatSelectProps = {
    currentFormat: ColorFormat;
    handleFormatChange?: (newFormat: ColorFormat) => void;
    theme?: "light" | "dark";
};

export default function FormatSelect({
                                         currentFormat,
                                         handleFormatChange,
                                         theme,
                                     }: FormatSelectProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options: ColorFormat[] = ["hex", "rgb", "hsl", "hsv", "cmyk"];

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full px-3 py-2 rounded-lg border text-sm flex justify-between items-center
          focus:outline-none focus:ring-2 focus:ring-[var(--brand-color)] transition-colors
          ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-200 text-black"}
        `}
            >
                {currentFormat.toUpperCase()}
                <ChevronDown size={20}
                             className={`transition-all text-gray-500 duration-200 ${open ? "rotate-180" : "rotate-0"}`}/>
            </button>

            <ul
                className={`
          absolute z-10 w-full mt-1 p-1.5 rounded-lg shadow-lg overflow-hidden
          ${theme === "dark" ? "bg-gray-700" : "bg-white"}
          ${open ? "animate-slideDown" : "hidden"}
        `}
            >
                {options.map((option) => (
                    <li
                        key={option}
                        className={`px-3 py-2 rounded-lg cursor-pointer transition-colors
              ${currentFormat === option ? "bg-[var(--brand-color)] text-white" : "hover:bg-[var(--brand-color)]/10"}
            `}
                        onClick={() => {
                            if (handleFormatChange) {
                                handleFormatChange(option);
                                setOpen(false);
                            }
                        }}
                    >
                        {option.toUpperCase()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
