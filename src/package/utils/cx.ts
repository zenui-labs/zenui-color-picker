type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Small enough that the package needs no clsx. */
export function cx(...classes: ClassValue[]): string {
    return classes.filter(Boolean).join(' ');
}
