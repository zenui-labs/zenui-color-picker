import {useState} from 'react';

let counter = 0;

/** Stable per-instance id. React.useId needs React 18; this works on 16.14+. */
export function useUniqueId(prefix: string): string {
    const [id] = useState(() => `${prefix}-${++counter}`);
    return id;
}
