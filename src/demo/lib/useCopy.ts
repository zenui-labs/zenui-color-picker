import {useEffect, useState} from "react";
import {copyText} from "../../package/hooks/useColorPicker";

export function useCopy(resetAfter = 1600) {
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(null), resetAfter);
        return () => clearTimeout(timer);
    }, [copied, resetAfter]);

    const copy = async (text: string) => {
        setCopied(await copyText(text) ? text : null);
    };

    return {copied, copy};
}
