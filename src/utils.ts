import { DeviceEventType, MobileEventEnum, DesktopEventEnum, SwipeEvent } from './type';

export const getIsMobile = (): boolean => {
  if(typeof window === 'undefined') {
    return false
  }
  return /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent ?? '');
}

type GetEventNameByDevice = (isMobile: boolean) => DeviceEventType;
export const getEventNameByDevice: GetEventNameByDevice = (isMobile) => {
  if (isMobile) {
    return {
      START: MobileEventEnum.START,
      MOVE: MobileEventEnum.MOVE,
      END: MobileEventEnum.END,
    };
  }
  return {
    START: DesktopEventEnum.START,
    MOVE: DesktopEventEnum.MOVE,
    END: DesktopEventEnum.END,
  };
};

type PreventDefault = (event: Event) => void;
export const preventDefault:PreventDefault = event => {
  event.preventDefault();
}

export const addBlockingEvents = <T extends HTMLElement>(element: T, eventNames: string[]) => {
  eventNames.forEach((eventName) => {
    element.addEventListener(eventName, preventDefault);
  })
}

export const removeBlockingEvents = <T extends HTMLElement>(element: T, eventNames: string[]) => {
  eventNames.forEach((eventName) => {
    element.removeEventListener(eventName, preventDefault);
  })
}

export const normalizeEvent = (event: MouseEvent | TouchEvent): SwipeEvent => {
  if('targetTouches' in event) {
    const { screenX, screenY, target } = event.targetTouches[0];

    return { target, x: screenX, y: screenY }
  }
  const { target, clientX, clientY } = event;
  return { target, x: clientX, y: clientY };
}
