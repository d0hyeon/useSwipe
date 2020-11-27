import type { MutableRefObject } from 'react';
export declare type Target<T = HTMLElement> = MutableRefObject<T | null> | HTMLElement;
export interface UseSwipeOption {
    scope?: {
        y?: [number, number?];
        x?: [number, number?];
    };
    fps?: number;
    ignoreElement?: HTMLElement | string;
}
export interface SwipeState {
    x: number;
    y: number;
    state: 'done' | 'move';
}
export declare type UseSwipe = (target: Target, options?: UseSwipeOption) => SwipeState;
