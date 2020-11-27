const DEVICE_EVENT_NAMES = {
  mobile: {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend'
  },
  desktop: {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
  }
}

type GetIsMobile = () => boolean | string;
export const getIsMobile: GetIsMobile = () => {
  if(!(process as any).browser) {
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


type GetEventNameByDevice = (isMobile: boolean) => {
  start: 'string';
  move: 'string';
  end: 'string';
};
// @ts-ignore
export const getEventNameByDevice: GetEventNameByDevice = (isMobile) => {
  return DEVICE_EVENT_NAMES[isMobile ? 'mobile' : 'desktop'];
}

