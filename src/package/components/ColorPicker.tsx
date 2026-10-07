import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import type {ColorFormat, ColorPickerProps, ColorValue} from '../types';
import {defaultPresetColors, formatColorValue, parseColor} from '../utils/colorUtils';
import {Hsva, hsvaToValue, rgbaString, sameColor, valueToHsva} from '../utils/hsva';
import {useColorPicker} from '../hooks/useColorPicker';
import {useUniqueId} from '../hooks/useUniqueId';
import {BrightnessSlider} from './BrightnessSlider';
import {ColorInput} from './ColorInput';
import {FormatTabs} from './FormatTabs';
import {ColorSlider} from './variants/ColorSlider';
import {WheelPicker} from './variants/wheel-picker';
import {HueBox} from './variants/hue-box';
import {Spectrum} from './variants/spectrum';
import {ChannelSliders} from './variants/channel-sliders';
import {SwatchGrid} from './variants/swatch-grid';
import {Harmony} from './Harmony';
import {Contrast} from './Contrast';
import {DiceIcon, HeartIcon, PipetteIcon} from './icons';
import {cx} from '../utils/cx';

interface EyeDropperResult {
    sRGBHex: string;
}

type EyeDropperWindow = Window & { EyeDropper?: new () => { open: () => Promise<EyeDropperResult> } };

const GAP = 8;

interface SwatchRowProps {
    label: string;
    colors: ColorValue[];
    disabled: boolean;
    hint?: string;
    onPick: (color: ColorValue) => void;
    onDoublePick?: (color: ColorValue) => void;
}

const SwatchRow = ({label, colors, disabled, hint, onPick, onDoublePick}: SwatchRowProps) => (
    <div className="zcp-section">
        <div className="zcp-label">{label}</div>
        <div className="zcp-swatches zcp-swatches--small">
            {colors.map((c) => (
                <button
                    key={c.hex}
                    type="button"
                    className="zcp-swatch zcp-checker"
                    style={{'--zcp-swatch': rgbaString(c)} as React.CSSProperties}
                    aria-label={`${label}: ${c.hex}`}
                    title={hint ? `${c.hex} (${hint})` : c.hex}
                    disabled={disabled}
                    onClick={() => onPick(c)}
                    onDoubleClick={onDoublePick && (() => onDoublePick(c))}
                />
            ))}
        </div>
    </div>
);

export const ColorPicker: React.FC<ColorPickerProps> = ({
    value,
    format = 'hex',
    variant = 'wheel',
    theme,
    disabled = false,
    showAlpha = true,
    showHistory = true,
    showTitle = true,
    showFormats = true,
    showCopyButton = true,
    presetColors = defaultPresetColors,
    maxHistory = 10,
    containerClasses,
    showColorInput = true,
    containerStyle,
    popupClasses,
    onChange,
    inline = false,
    title = 'Color Picker',
    enableHueSlider = false,
    showPresets = true,
    onFormatChange,
    onOpen,
    brandColor,
    enableFavorite = false,
    enableShuffle = false,
    enableEyeDropper = false,
    showHarmony = false,
    showContrast = false,
    onClose,
    triggerRef: externalTriggerRef,
    showDefaultButton = true,
}) => {
    const panelId = useUniqueId('zcp-panel');
    const titleId = `${panelId}-title`;
    const panelRef = useRef<HTMLDivElement>(null);
    const internalTriggerRef = useRef<HTMLButtonElement>(null);
    const triggerRef = externalTriggerRef ?? internalTriggerRef;

    const {
        currentFormat,
        isOpen,
        colorHistory,
        favoriteColors,
        updateFormat,
        setIsOpen,
        addToHistory,
        addToFavorites,
        removeFromFavorites,
        generateRandomColor,
    } = useColorPicker({initialColor: value, initialFormat: format, showAlpha, maxHistory});

    const [hsva, setHsva] = useState<Hsva>(() => valueToHsva(parseColor(value ?? '') ?? parseColor('#00AA45')!));
    const color = hsvaToValue(hsva);
    const latest = useRef(color);
    const dirty = useRef(false);

    // Follow the controlled props without an effect round-trip.
    const [syncedValue, setSyncedValue] = useState(value);
    if (value !== syncedValue) {
        setSyncedValue(value);
        const parsed = value ? parseColor(value) : null;
        if (parsed && !sameColor(parsed, color)) setHsva(valueToHsva(parsed, hsva));
    }
    const [syncedFormat, setSyncedFormat] = useState(format);
    if (format !== syncedFormat) {
        setSyncedFormat(format);
        updateFormat(format);
    }

    const open = inline || isOpen;
    const colorString = formatColorValue(color, currentFormat);
    const supportsEyeDropper = enableEyeDropper && typeof window !== 'undefined' && 'EyeDropper' in window;

    const emit = (next: Hsva) => {
        if (disabled) return;
        const nextColor = hsvaToValue(next);
        setHsva(next);
        latest.current = nextColor;
        dirty.current = true;
        onChange?.(nextColor, currentFormat);
    };

    const pick = (next: ColorValue) => {
        emit(valueToHsva(next, hsva));
        dirty.current = false;
        addToHistory(next);
    };

    // History keeps settled colors: called when a drag ends or a handle loses focus.
    const commit = () => {
        if (!dirty.current) return;
        dirty.current = false;
        addToHistory(latest.current);
    };

    const handleHue = (h: number) => {
        // Without an area to set saturation, a grey would ignore the hue slider.
        const flat = variant === 'hue-slider' && (hsva.s < 1 || hsva.v < 1);
        emit(flat ? {...hsva, h, s: 100, v: 100} : {...hsva, h});
    };

    const handleFormatChange = (next: ColorFormat) => {
        updateFormat(next);
        onFormatChange?.(next);
    };

    const handleOpen = useCallback(() => {
        if (disabled) return;
        setIsOpen(true);
        onOpen?.();
    }, [disabled, onOpen, setIsOpen]);

    const handleClose = useCallback((restoreFocus = false) => {
        setIsOpen(false);
        onClose?.();
        if (restoreFocus) triggerRef.current?.focus();
    }, [onClose, setIsOpen, triggerRef]);

    const toggle = useRef(() => {
    });
    useEffect(() => {
        toggle.current = () => (isOpen ? handleClose() : handleOpen());
    }, [isOpen, handleOpen, handleClose]);

    // An external trigger is any element the consumer owns, so listen natively.
    useEffect(() => {
        const trigger = externalTriggerRef?.current;
        if (!trigger || inline) return;
        const onClick = (event: MouseEvent) => {
            event.preventDefault();
            toggle.current();
        };
        trigger.addEventListener('click', onClick);
        return () => trigger.removeEventListener('click', onClick);
    }, [externalTriggerRef, inline]);

    // Popover: close on outside press, keep it pinned to the trigger while the page moves.
    useLayoutEffect(() => {
        if (inline || !isOpen) return;
        const panel = panelRef.current;
        const trigger = triggerRef.current;
        if (!panel) return;

        let frame = 0;
        const place = () => {
            if (!trigger) return;
            const t = trigger.getBoundingClientRect();
            const p = panel.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const below = vh - t.bottom - GAP >= p.height || t.top - GAP < p.height && vh - t.bottom > t.top;
            const top = below ? t.bottom + GAP : t.top - GAP - p.height;
            const left = Math.min(Math.max(GAP, t.left), Math.max(GAP, vw - p.width - GAP));
            panel.style.top = `${Math.max(GAP, top)}px`;
            panel.style.left = `${left}px`;
            panel.dataset.side = below ? 'bottom' : 'top';
        };
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(place);
        };
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (!panel.contains(target) && !trigger?.contains(target)) handleClose();
        };

        place();
        panel.focus({preventScroll: true});
        window.addEventListener('scroll', schedule, true);
        window.addEventListener('resize', schedule);
        document.addEventListener('pointerdown', onPointerDown);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule, true);
            window.removeEventListener('resize', schedule);
            document.removeEventListener('pointerdown', onPointerDown);
        };
    }, [inline, isOpen, triggerRef, handleClose]);

    const pickFromScreen = async () => {
        const EyeDropper = (window as EyeDropperWindow).EyeDropper;
        if (!EyeDropper) return;
        try {
            const {sRGBHex} = await new EyeDropper().open();
            const parsed = parseColor(sRGBHex);
            if (parsed) pick(parsed);
        } catch {
            // The user pressed Escape. Nothing to do.
        }
    };

    const isFavorite = favoriteColors.some(c => sameColor(c, color));
    const showHeader = showTitle || enableShuffle || enableFavorite || supportsEyeDropper;

    return (
        <div
            className={cx('zcp', inline && 'zcp--inline', containerClasses)}
            data-zcp-theme={theme}
            style={{...(brandColor ? {'--zcp-accent': brandColor} : null), ...containerStyle} as React.CSSProperties}
        >
            {!inline && showDefaultButton && !externalTriggerRef && (
                <button
                    ref={internalTriggerRef}
                    type="button"
                    className="zcp-trigger zcp-checker"
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`Choose color, current ${colorString}`}
                    title={colorString}
                    disabled={disabled}
                    onClick={() => (isOpen ? handleClose() : handleOpen())}
                    style={{'--zcp-swatch': rgbaString(color)} as React.CSSProperties}
                />
            )}

            {open && (
                <div
                    ref={panelRef}
                    id={panelId}
                    role={inline ? 'group' : 'dialog'}
                    aria-labelledby={showTitle ? titleId : undefined}
                    aria-label={showTitle ? undefined : title}
                    tabIndex={-1}
                    className={cx('zcp-panel', !inline && 'zcp-panel--floating', popupClasses)}
                    data-disabled={disabled || undefined}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape' && !inline) {
                            e.stopPropagation();
                            handleClose(true);
                        }
                    }}
                >
                    {showHeader && (
                        <div className="zcp-header">
                            {showTitle && <div id={titleId} className="zcp-title">{title}</div>}
                            <div className="zcp-actions">
                                {supportsEyeDropper && (
                                    <button type="button" className="zcp-icon-btn" disabled={disabled}
                                            aria-label="Pick a color from the screen" title="Pick from screen"
                                            onClick={pickFromScreen}>
                                        <PipetteIcon/>
                                    </button>
                                )}
                                {enableFavorite && (
                                    <button type="button" className={cx('zcp-icon-btn', isFavorite && 'is-on')}
                                            disabled={disabled} aria-pressed={isFavorite}
                                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                            onClick={() => (isFavorite ? removeFromFavorites(color) : addToFavorites(color))}>
                                        <HeartIcon filled={isFavorite}/>
                                    </button>
                                )}
                                {enableShuffle && (
                                    <button type="button" className="zcp-icon-btn zcp-roll" disabled={disabled}
                                            aria-label="Random color" title="Random color"
                                            onClick={(e) => {
                                                e.currentTarget.classList.remove('is-rolling');
                                                void e.currentTarget.offsetWidth;
                                                e.currentTarget.classList.add('is-rolling');
                                                pick(generateRandomColor());
                                            }}>
                                        <DiceIcon/>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {variant === 'wheel' && (
                        <WheelPicker hsva={hsva} onChange={emit} onChangeEnd={commit} size={220} disabled={disabled}/>
                    )}

                    {variant === 'hue-box' && (
                        <HueBox hsva={hsva} onChange={emit} onChangeEnd={commit} disabled={disabled}/>
                    )}

                    {variant === 'spectrum' && (
                        <Spectrum hsva={hsva} onChange={emit} onChangeEnd={commit} disabled={disabled}/>
                    )}

                    {variant === 'sliders' && (
                        <ChannelSliders hsva={hsva} onChange={emit} onChangeEnd={commit} disabled={disabled}/>
                    )}

                    {variant === 'swatches' && (
                        <SwatchGrid color={color} onPick={pick} disabled={disabled}/>
                    )}

                    {(variant === 'hue-slider' || (enableHueSlider && variant !== 'sliders')) && (
                        <ColorSlider hue={hsva.h} onChange={handleHue} onChangeEnd={commit} disabled={disabled}/>
                    )}

                    {showAlpha && (
                        <BrightnessSlider
                            value={hsva.a}
                            color={color}
                            disabled={disabled}
                            onChange={(a) => emit({...hsva, a})}
                            onChangeEnd={commit}
                        />
                    )}

                    {showFormats && (
                        <FormatTabs value={currentFormat} onChange={handleFormatChange} disabled={disabled}/>
                    )}

                    {showColorInput && (
                        <div className="zcp-readout">
                            <span className="zcp-chip zcp-checker" aria-hidden="true"
                                  style={{'--zcp-swatch': rgbaString(color)} as React.CSSProperties}/>
                            <ColorInput
                                value={colorString}
                                format={currentFormat}
                                disabled={disabled}
                                theme={theme}
                                showCopyButton={showCopyButton}
                                onChange={(text) => {
                                    const parsed = parseColor(text);
                                    if (parsed) emit(valueToHsva(parsed, hsva));
                                }}
                                onCommit={commit}
                            />
                        </div>
                    )}

                    {showContrast && <Contrast color={color}/>}

                    {showHarmony && <Harmony color={color} onPick={pick} disabled={disabled}/>}

                    {showPresets && presetColors.length > 0 && (
                        <div className="zcp-section">
                            <div className="zcp-label">Presets</div>
                            <div className="zcp-swatches">
                                {presetColors.map((preset) => {
                                    const parsed = parseColor(preset);
                                    if (!parsed) return null;
                                    const active = sameColor(parsed, color);
                                    return (
                                        <button
                                            key={preset}
                                            type="button"
                                            className={cx('zcp-swatch zcp-checker', active && 'is-active')}
                                            style={{'--zcp-swatch': rgbaString(parsed)} as React.CSSProperties}
                                            aria-label={`Use ${preset}`}
                                            aria-pressed={active}
                                            title={preset}
                                            disabled={disabled}
                                            onClick={() => pick(parsed)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {showHistory && colorHistory.length > 0 && (
                        <SwatchRow label="Recent" colors={colorHistory} disabled={disabled} onPick={pick}
                                   hint={enableFavorite ? 'double-click to favorite' : undefined}
                                   onDoublePick={enableFavorite ? addToFavorites : undefined}/>
                    )}

                    {enableFavorite && favoriteColors.length > 0 && (
                        <SwatchRow label="Favorites" colors={favoriteColors} disabled={disabled} onPick={pick}
                                   hint="double-click to remove" onDoublePick={removeFromFavorites}/>
                    )}
                </div>
            )}
        </div>
    );
};
