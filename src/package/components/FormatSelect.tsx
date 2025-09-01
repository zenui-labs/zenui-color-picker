import {useEffect, useRef, useState} from 'react';
import {ColorFormat} from '../types';
import {ChevronDown} from 'lucide-react';
import {clsx} from 'clsx';

type FormatSelectProps = {
    currentFormat: ColorFormat;
    handleFormatChange?: (newFormat: ColorFormat) => void;
    theme?: 'light' | 'dark';
    disabled?: boolean;
};

export default function FormatSelect({
                                         currentFormat,
                                         handleFormatChange,
                                         theme,
                                         disabled
                                     }: FormatSelectProps) {
    const [open, setOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const options: ColorFormat[] = ['hex', 'rgb', 'hsl', 'hsv', 'cmyk'];

    useEffect(() => {
        if (open && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const dropdownHeight = options.length * 40 + 12;

            const spaceBelow = viewportHeight - buttonRect.bottom;
            const spaceAbove = buttonRect.top;

            if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
                setDropdownPosition('bottom');
            } else {
                setDropdownPosition('top');
            }
        }
    }, [open, options.length]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        const handleResize = () => {
            if (open) {
                setOpen(false);
            }
        };

        const handleScroll = () => {
            if (open) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [open]);

    return (
        <div ref={dropdownRef} className='relative w-full'>
            <button
                ref={buttonRef}
                type='button'
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={clsx(
                    'w-full px-3 py-2 rounded-lg cursor-pointer border text-sm flex justify-between items-center\n          focus:outline-none focus:ring-2 disabled:cursor-not-allowed focus:ring-[var(--brand-color)] transition-colors',
                    theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-200 text-black'
                )}
            >
                {currentFormat.toUpperCase()}
                <ChevronDown
                    size={20}
                    className={clsx('transition-all duration-200',
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-500 dark:text-gray-200',
                        open ? 'rotate-180' : 'rotate-0'
                    )}
                />
            </button>

            <ul
                className={clsx(
                    'absolute z-10 w-full p-1.5 rounded-lg shadow-lg overflow-hidden border',
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
                    dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1',
                    open ? dropdownPosition === 'top' ? 'animate-slideUp' : 'animate-slideDown' : 'hidden'
                )}
            >
                {options.map((option) => (
                    <li
                        key={option}
                        className={clsx(
                            'px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm',
                            currentFormat === option ? 'bg-[var(--brand-color)] text-white' : 'hover:bg-[var(--brand-color)]/10',
                            theme === 'dark' ? 'text-white' : 'text-black dark:text-white'
                        )}
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