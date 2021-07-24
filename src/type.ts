import {MutableRefObject} from 'react';

export type Target<T = HTMLElement> =
| MutableRefObject<T | null>
| HTMLElement;

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

export type UseSwipe = (target: Target, options?: UseSwipeOption) => SwipeState;

export enum MobileEventEnum {
  START = 'touchstart',
  MOVE = 'touchmove',
  END = 'touchend',
}

export enum DesktopEventEnum {
  START = 'mousedown',
  MOVE = 'mousemove',
  END = 'mouseup',
}

interface ElementEventExtentionMap extends ElementEventMap {
  [MobileEventEnum.START]: Event;
  [MobileEventEnum.MOVE]: Event;
  [MobileEventEnum.END]: Event;
  [DesktopEventEnum.START]: Event;
  [DesktopEventEnum.MOVE]: Event;
  [DesktopEventEnum.END]: Event;
}

export type DeviceEventType = {
  START: keyof ElementEventExtentionMap;
  MOVE: keyof ElementEventExtentionMap;
  END: keyof ElementEventExtentionMap;
};
