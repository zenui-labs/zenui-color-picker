import {ReactNode, useCallback, useMemo, useState} from "react";
import {ColorValue, getLuminance, parseColor} from "../../package";
import {InkContext} from "./ink-context";

export function InkProvider({children}: { children: ReactNode }) {
    const [color, setColor] = useState<ColorValue>(() => parseColor('#00AA45')!);
    const [palette, setPalette] = useState<string[]>([]);

    const remember = useCallback((hex: string) => {
        setPalette(prev => prev[0] === hex ? prev : [hex, ...prev.filter(c => c !== hex)].slice(0, 14));
    }, []);

    const value = useMemo(() => ({color, setInk: setColor, palette, remember}), [color, palette, remember]);

    const solid = color.hex.slice(0, 7);
    const on = getLuminance(color) > 0.45 ? '#15130f' : '#fbfaf6';

    return (
        <InkContext.Provider value={value}>
            <style>{`:root{--ink:${solid};--ink-on:${on};--ink-h:${color.hsl.h}}`}</style>
            {children}
        </InkContext.Provider>
    );
}
