import {useEffect, useRef, useState} from "react";
import {copyText} from "../../package/hooks/useColorPicker";

const INSTALL = "npm i @zenuilabs/color-picker-react";

/** The install command on label-maker tape. Click to copy. */
export const InstallTape = ({className = ''}: { className?: string }) => {
    const [stamp, setStamp] = useState<string | null>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!stamp) return;
        const timer = setTimeout(() => setStamp(null), 1800);
        return () => clearTimeout(timer);
    }, [stamp]);

    // If the browser blocks the clipboard, select the command so one keystroke copies it.
    const copy = async () => {
        if (await copyText(INSTALL)) return setStamp('copied');
        const range = document.createRange();
        if (textRef.current) range.selectNodeContents(textRef.current);
        getSelection()?.removeAllRanges();
        getSelection()?.addRange(range);
        setStamp(/Mac|iPhone|iPad/.test(navigator.userAgent) ? 'press ⌘C' : 'press Ctrl+C');
    };

    return (
        <div className={`relative w-fit max-w-full ${className}`}>
            <button type="button" onClick={copy}
                    className="tape relative max-w-full cursor-pointer px-5 py-3.5 hover:-rotate-1 active:scale-95"
                    aria-label={`Copy install command: ${INSTALL}`}>
                <span className="tape-text relative block break-all text-left font-mono text-[12px] font-semibold tracking-wide sm:text-sm">
                    <span className="opacity-60">$ </span><span ref={textRef}>{INSTALL}</span>
                </span>
            </button>
            {stamp && (
                <span key={stamp} role="status"
                      className="stamp pointer-events-none absolute -right-3 -top-5 z-10 rotate-[-8deg] rounded-md border-2 border-[#1a1814] bg-[#fbfaf6] px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#1a1814] shadow-[2px_2px_0_var(--ink)]">
                    {stamp}
                </span>
            )}
        </div>
    );
};
