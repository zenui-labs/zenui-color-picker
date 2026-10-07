/** Feature i's paint chip: the live ink, then the hue wheel turned 36 degrees per chip. */
export const chipColor = (i: number) =>
    i === 0 ? 'var(--ink)' : `hsl(calc(var(--ink-h) + ${i * 36}) 62% ${48 + (i % 3) * 8}%)`;
