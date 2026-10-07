import React, {useEffect, useState} from 'react';
import type {ColorFormat} from '../types';
import {copyText} from "../hooks/useColorPicker";
import {parseColor} from "../utils/colorUtils";
import {CheckIcon, CopyIcon} from "./icons";
import {cx} from "../utils/cx";
import {useUniqueId} from "../hooks/useUniqueId";

interface ColorInputProps {
    value: string;
    format: ColorFormat;
    onChange: (value: string) => void;
    /** Called when the field loses focus or Enter is pressed. */
    onCommit?: () => void;
    theme?: 'light' | 'dark';
    showCopyButton?: boolean;
    disabled?: boolean;
}

const PLACEHOLDERS: Record<ColorFormat, string> = {
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    hsl: 'hsl(217, 91%, 60%)',
    hsv: 'hsv(217, 76%, 96%)',
    cmyk: 'cmyk(76%, 47%, 0%, 4%)'
};

/** Text field that accepts any supported color format, not just the active one. */
export const ColorInput: React.FC<ColorInputProps> = ({
                                                          value,
                                                          format,
                                                          showCopyButton,
                                                          onChange,
                                                          onCommit,
                                                          disabled,
                                                          theme,
                                                      }) => {
    const id = useUniqueId('zcp-input');
    const [draft, setDraft] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const isValid = draft === null || parseColor(draft) !== null;

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 1600);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        setDraft(next);
        if (parseColor(next)) onChange(next);
    };

    const commit = () => {
        if (draft !== null && isValid) onCommit?.();
        setDraft(null);
    };

    return (
        <div className="zcp-field" data-zcp-theme={theme} data-invalid={!isValid || undefined}>
            <input
                id={id}
                className="zcp-input"
                aria-label={`Color value (${format.toUpperCase()})`}
                aria-invalid={!isValid}
                type="text"
                spellCheck={false}
                autoComplete="off"
                value={draft ?? value}
                disabled={disabled}
                onChange={handleChange}
                onBlur={commit}
                onKeyDown={(e) => e.key === 'Enter' && commit()}
                placeholder={PLACEHOLDERS[format]}
            />
            {showCopyButton && (
                <button
                    type="button"
                    className={cx('zcp-icon-btn', copied && 'is-done')}
                    aria-label={copied ? 'Copied' : 'Copy color value'}
                    title={copied ? 'Copied' : 'Copy'}
                    disabled={disabled}
                    onClick={async () => setCopied(await copyText(value))}
                >
                    {copied ? <CheckIcon/> : <CopyIcon/>}
                </button>
            )}
            <span className="zcp-sr" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
        </div>
    );
};
