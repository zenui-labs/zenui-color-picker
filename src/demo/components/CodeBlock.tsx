import {useCopy} from "../lib/useCopy";

type Kind = 'comment' | 'str' | 'kw' | 'tag' | 'attr' | 'var' | 'num' | 'punct' | 'plain';

const RULES: [Kind, RegExp][] = [
    ['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
    ['str', /'[^'\n]*'|"[^"\n]*"|`[^`]*`/y],
    ['kw', /\b(?:import|from|export|const|let|function|return|type|interface|default|new|true|false|null|npm|install)\b/y],
    ['tag', /<\/?[A-Za-z][\w.]*|\/?>/y],
    ['attr', /[A-Za-z][\w-]*(?==)/y],
    ['var', /--[\w-]+/y],
    ['num', /\b\d+(?:\.\d+)?(?:px|%|deg|ms|s)?\b/y],
    ['punct', /[{}()[\];,.=:!?]/y],
    ['plain', /\s+|[\w$#@-]+|./y],
];

const CLASS: Record<Kind, string> = {
    comment: 'text-white/35 italic',
    str: 'text-[#b8f2a0]',
    kw: 'text-[#ff9b7a]',
    tag: 'text-[#ffd479]',
    attr: 'text-[#9fd3ff]',
    var: 'text-[#f5a8ff]',
    num: 'text-[#ffc66d]',
    punct: 'text-white/45',
    plain: 'text-white/85',
};

function tokenize(line: string): [Kind, string][] {
    const out: [Kind, string][] = [];
    let i = 0;
    while (i < line.length) {
        for (const [kind, re] of RULES) {
            re.lastIndex = i;
            const m = re.exec(line);
            if (m && m[0].length) {
                out.push([kind, m[0]]);
                i += m[0].length;
                break;
            }
        }
    }
    return out;
}

/** Dark code card with a tiny hand-rolled highlighter. No syntax library needed. */
export const CodeBlock = ({code, file = 'App.tsx'}: { code: string; file?: string }) => {
    const {copied, copy} = useCopy();

    return (
        <div className="overflow-hidden rounded-[22px] bg-[#15130f] text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <span className="flex items-center gap-2 font-mono text-xs text-white/60">
                    <span className="size-2.5 rounded-full bg-ink transition-colors duration-500"/> {file}
                </span>
                <button type="button" onClick={() => copy(code)}
                        className="cursor-pointer rounded-lg px-2.5 py-1 font-mono text-xs text-white/70 transition hover:bg-white/10 hover:text-white">
                    {copied ? 'copied' : 'copy'}
                </button>
            </div>
            <pre className="no-scrollbar overflow-x-auto p-4 font-mono text-[13px] leading-6">
                <code>
                    {code.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                            <span className="w-8 flex-none select-none pr-4 text-right text-white/25">{i + 1}</span>
                            <span className="whitespace-pre">
                                {tokenize(line).map(([kind, t], j) => <span key={j} className={CLASS[kind]}>{t}</span>)}
                            </span>
                        </div>
                    ))}
                </code>
            </pre>
        </div>
    );
};
