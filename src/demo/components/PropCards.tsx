import {CSSProperties} from "react";
import type {PropRow} from "../lib/features";
import {useCopy} from "../lib/useCopy";
import {CheckIcon, CopyIcon} from "../../package/components/icons";

/** Splits "'a' | 'b'" into ['a', 'b'], but leaves function types whole. */
const typeParts = (type: string) => (type.includes('=>') ? [type] : type.split('|').map((t) => t.trim()));

/** A snippet worth pasting: the prop with a sensible value for its type. */
function example(name: string, type: string, fallback: string): string {
    const literal = typeParts(type).find((t) => /^'.*'$/.test(t) && t !== fallback);
    if (type === 'boolean') return fallback === 'true' ? `${name}={false}` : name;
    if (literal) return `${name}="${literal.slice(1, -1)}"`;
    if (type === 'number') return `${name}={${fallback || 0}}`;
    if (type === 'string') return `${name}=""`;
    if (type.includes('=>')) return `${name}={() => {}}`;
    return `${name}={}`;
}

const Row = ({row, index}: { row: PropRow; index: number }) => {
    const [name, type, fallback, description] = row;
    const {copied, copy} = useCopy();
    const snippet = example(name, type, fallback);
    const cell = `px-4 py-4 align-top transition-colors duration-300 group-hover:bg-paper ${index % 2 ? 'bg-paper/45' : ''}`;

    return (
        <tr className="group" style={{'--tab': `hsl(calc(var(--ink-h) + ${index * 48}) 64% 54%)`} as CSSProperties}>
            <td className={`${cell} rounded-l-2xl`}>
                <code className="font-mono text-[14px] font-semibold">{name}</code>
                <p className="mt-1 max-w-[18rem] text-[13px] leading-relaxed text-muted">{description}</p>
            </td>
            <td className={cell}>
                <div className="flex max-w-[16rem] flex-wrap gap-1">
                    {typeParts(type).map((part) => (
                        <span key={part}
                              className={`rounded-md px-1.5 py-0.5 font-mono text-[11.5px] ${/^'/.test(part) ? 'bg-[color-mix(in_srgb,var(--tab)_18%,transparent)] text-text' : 'bg-soft text-muted'}`}>
                            {part}
                        </span>
                    ))}
                </div>
            </td>
            <td className={cell}>
                {fallback
                    ? <code className="whitespace-nowrap rounded-md bg-soft px-1.5 py-0.5 font-mono text-[12px]">{fallback}</code>
                    : <span className="text-[12px] text-muted">none</span>}
            </td>
            <td className={`${cell} rounded-r-2xl pr-3 text-right`}>
                <button type="button" onClick={() => copy(snippet)} title={snippet}
                        aria-label={`Copy ${snippet}`}
                        className="inline-grid size-8 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-text">
                    {copied ? <CheckIcon size={15}/> : <CopyIcon size={15}/>}
                </button>
            </td>
        </tr>
    );
};

/** Props as one table card. Rows alternate tone instead of using rules. */
export const PropCards = ({rows}: { rows: PropRow[] }) => (
    <div className="overflow-hidden rounded-[24px] bg-card p-2">
        <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 text-left">
                <thead>
                <tr className="font-mono text-[11px] text-muted">
                    <th className="rounded-l-xl bg-soft px-4 py-2.5 font-medium">prop</th>
                    <th className="bg-soft px-4 py-2.5 font-medium">type</th>
                    <th className="bg-soft px-4 py-2.5 font-medium">default</th>
                    <th className="w-12 rounded-r-xl bg-soft py-2.5"><span className="sr-only">copy</span></th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => <Row key={row[0]} row={row} index={i}/>)}
                </tbody>
            </table>
        </div>
    </div>
);
