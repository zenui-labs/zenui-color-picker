import React, {useCallback, useEffect, useRef} from 'react';

export interface DragPoint {
    /** Pointer position relative to the element, in px. */
    x: number;
    y: number;
    rect: DOMRect;
    /** True on the pointerdown that starts the drag. */
    first: boolean;
}

/**
 * One drag model for mouse, touch and pen. Pointer capture keeps the drag
 * alive outside the element, so no document listeners are needed.
 */
export function usePointerDrag<T extends HTMLElement>(
    onMove: (point: DragPoint) => void,
    onEnd?: () => void,
    disabled?: boolean,
) {
    const ref = useRef<T>(null);
    const dragging = useRef(false);
    const handlers = useRef({onMove, onEnd});

    useEffect(() => {
        handlers.current = {onMove, onEnd};
    }, [onMove, onEnd]);

    const emit = useCallback((e: React.PointerEvent, first: boolean) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        handlers.current.onMove({x: e.clientX - rect.left, y: e.clientY - rect.top, rect, first});
    }, []);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        if (disabled || (e.pointerType === 'mouse' && e.button !== 0)) return;
        // Stop here so a nested drag surface (the wheel's square) owns its own drag.
        e.preventDefault();
        e.stopPropagation();
        dragging.current = true;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        (e.currentTarget as HTMLElement).dataset.dragging = 'true';
        emit(e, true);
    }, [disabled, emit]);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (dragging.current) emit(e, false);
    }, [emit]);

    const finish = useCallback((e: React.PointerEvent) => {
        if (!dragging.current) return;
        dragging.current = false;
        delete (e.currentTarget as HTMLElement).dataset.dragging;
        handlers.current.onEnd?.();
    }, []);

    return {
        ref,
        dragProps: {
            onPointerDown,
            onPointerMove,
            onPointerUp: finish,
            onPointerCancel: finish,
        },
    };
}

const STEP_KEYS: Record<string, [number, number]> = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, 1],
    ArrowDown: [0, -1],
};

/** Maps arrow keys to a [dx, dy] step. Shift moves ten times faster. */
export function arrowStep(e: React.KeyboardEvent): [number, number] | null {
    const step = STEP_KEYS[e.key];
    if (!step) return null;
    const size = e.shiftKey ? 10 : 1;
    return [step[0] * size, step[1] * size];
}
