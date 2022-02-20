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

export interface SwipeDoneState {
  state: SwipeStateEnum.DONE;
  duration: number;
  difference: {
    x: number;
    y: number;
  }
  x: 0;
  y: 0;
}

export interface SwipeMoveState {
  state: SwipeStateEnum.MOVE;
  x: number;
  y: number;
  duration: 0;
  difference: {
    x: 0;
    y: 0;
  }
}
export type SwipeState = SwipeMoveState | SwipeDoneState

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
