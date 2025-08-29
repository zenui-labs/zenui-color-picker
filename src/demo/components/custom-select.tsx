import {useEffect, useRef, useState} from 'react';
import {ChevronDown} from "lucide-react";

type CustomSelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    open: boolean;
    onToggle: () => void;
};

const CustomSelect = ({value, options, onChange, open, onToggle}: CustomSelectProps) => {
    const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const dropdownHeight = options.length * 40 + 12;

            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            setDropdownPosition(spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove ? 'bottom' : 'top');
        }
    }, [open, options.length]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                if (open) onToggle();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, onToggle]);

    return (
        <div ref={wrapperRef} className='relative'>
            <button
                type="button"
                onClick={() => onToggle()}
                className={`w-full px-3 py-2.5 rounded-lg cursor-pointer border text-sm flex justify-between items-center
          focus:outline-none transition-colors bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-200 text-black
        `}
            >
                {value}
                <ChevronDown
                    size={20}
                    className={`transition-all duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                />
            </button>

            <ul
                className={`
          absolute z-10 w-full p-1.5 rounded-lg shadow-lg overflow-hidden border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700
          ${dropdownPosition === 'top'
                    ? 'bottom-full mb-1'
                    : 'top-full mt-1'
                } 
          ${open
                    ? (dropdownPosition === 'top' ? "animate-slideUp" : "animate-slideDown")
                    : "hidden"
                }
        `}
            >
                {options.map((option) => (
                    <li
                        key={option.value}
                        className={`px-3 dark:text-darkText py-2 rounded-lg cursor-pointer transition-colors text-sm
              ${value === option.value
                            ? "bg-accent text-white"
                            : `hover:bg-accent/10`
                        }
            `}
                        onClick={() => {
                            onChange(option.value)
                            onToggle()
                        }}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;