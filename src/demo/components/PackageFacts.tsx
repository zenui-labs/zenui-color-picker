const FACTS: [value: string, label: string][] = [
    ["0", "runtime dependencies"],
    ["14 kB", "JavaScript, gzipped"],
    ["4 kB", "stylesheet, gzipped"],
    ["6", "picker variants"],
    ["5", "color formats"],
    ["16.14+", "React, up to 19"],
];

/** Measured from the production build. Tiles, so there are no rules to read across. */
export const PackageFacts = ({dark = false}: { dark?: boolean }) => (
    <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {FACTS.map(([value, label], i) => (
            <div key={label}
                 className={`group relative flex flex-col-reverse overflow-hidden rounded-2xl px-4 pb-3.5 pt-4 transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:-rotate-1 ${dark ? 'bg-white/[.06]' : 'bg-card'}`}>
                <span aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
                      style={{transitionDelay: `${i * 20}ms`}}/>
                <dt className={`mt-2 text-xs ${dark ? 'text-white/55' : 'text-muted'}`}>{label}</dt>
                <dd className="display text-[2.1rem] leading-none">{value}</dd>
            </div>
        ))}
    </dl>
);
