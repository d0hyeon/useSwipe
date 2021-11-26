import {MutableRefObject} from 'react';

export type Target<T = HTMLElement> =
| MutableRefObject<T | null>
| HTMLElement;

export interface SwipeEvent {
  target: EventTarget;
  x: number;
  y: number;
}

export interface UseSwipeOption<EE> {
  fps?: number;
  useEvent?: boolean,
  excludeElement?: EE;
}

export enum SwipeStateEnum {
  DONE = 'done',
  MOVE = 'move'
}

export interface SwipeState {
  x: number;
  y: number;
  state: SwipeStateEnum;
  duration: number;
  difference: {
    x: number;
    y: number;
  }
}

export type UseSwipe<T = HTMLElement, EE = HTMLElement> = 
  (target: Target<T>, options?: UseSwipeOption<EE>) => SwipeState;

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
