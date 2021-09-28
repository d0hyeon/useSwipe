import { DeviceEventType, MobileEventEnum, DesktopEventEnum } from './type';

type GetIsMobile = () => boolean;
interface Process extends NodeJS.Process {
  browser: boolean;
}

declare const process: Process

export const getIsMobile: GetIsMobile = () => {
  if(!process.browser) {
    return false;
  }
  return /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent ?? '');
}

type getAbsolutePositionFunc = (element: HTMLElement) => (position: 'x' | 'y') => number;
export const getAbsolutePositionFunc: getAbsolutePositionFunc = (element) => (position) => {
  return (
    (window[`scroll${position.toUpperCase()}`] ?? 0) +
    (element.getBoundingClientRect()[position] ?? 0)
  );
};


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
