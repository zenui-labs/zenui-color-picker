import {createContext, useContext} from "react";
import {ColorValue} from "../../package";

export interface Ink {
    /** The color the visitor picked last. The whole page is tinted with it. */
    color: ColorValue;
    setInk: (color: ColorValue) => void;
    /** Settled picks this visit, newest first. */
    palette: string[];
    remember: (hex: string) => void;
}

export const InkContext = createContext<Ink | null>(null);

export function useInk(): Ink {
    const ink = useContext(InkContext);
    if (!ink) throw new Error('useInk needs <InkProvider>');
    return ink;
}
