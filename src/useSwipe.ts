import * as React from 'react';
import throttle from 'lodash/throttle';
import scrollLock from 'scroll-lock';
import { SwipeState, UseSwipe } from './type';
import { getAbsolutePositionFunc, getEventNameByDevice, getIsMobile } from './utils';

const { enablePageScroll, disablePageScroll } = scrollLock;

const INITIAL_STATE: SwipeState = {
  x: 0,
  y: 0,
  state: 'done'
};


const useSwipe: UseSwipe = (target, options) => {
  const { scope = {}, fps = 60, ignoreElement } = options || {};
  const ms = 1000 / fps;
  const isMobile = getIsMobile();
  let blocking = false;

  const [swipeState, setSwipeState] = React.useState<SwipeState>(INITIAL_STATE);
  const startPositionRef = React.useRef([0, 0]);
  const targetRef = React.useRef(null);
 
  const { current: element } = targetRef; 
  const effectDependencies = [
    element,
    ignoreElement,
    ...(scope?.x ?? []),
    ...(scope?.y ?? []),
  ];
  
  const deviceEventNames = React.useMemo(() => {
    return getEventNameByDevice(isMobile);
  }, [isMobile]);

  const onTouchMove = React.useCallback(event => {
    if(blocking) return;
    event.preventDefault();
    event.stopPropagation();
    const {targetTouches, clientX, clientY} = event;
    const x = targetTouches?.[0]?.screenX ?? clientX;
    const y = targetTouches?.[0]?.screenY ?? clientY;
    const [startY, startX] = startPositionRef.current;
      
    setSwipeState({
      x: x - startX,
      y: y - startY,
      state: 'move'
    });
  }, effectDependencies);
  const throttledOnTouchMove = React.useMemo(() => throttle(onTouchMove, ms), [onTouchMove, ms]);

  const onTouchStart = React.useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
    const { targetTouches, clientX, clientY, target } = event;
    const x = targetTouches?.[0]?.screenX ?? clientX;
    const y = targetTouches?.[0]?.screenY ?? clientY;

    if (ignoreElement) {
      const ignoreEl: HTMLElement | null =
        typeof ignoreElement === 'string'
          ? element.querySelector(ignoreElement)
          : ignoreElement;

      if (ignoreEl && (ignoreEl === target || ignoreEl.contains(target))) {
        return;
      }
    }
    if (scope?.x) {
      const { x: [scopeStart, scopeEnd] = [0, 0] } = scope;
      if(!!targetTouches) {
        const getAbsolutePos = getAbsolutePositionFunc(element);
        const touchedPositionInElement = clientX - getAbsolutePos('x');  
        if (
          touchedPositionInElement < scopeStart || 
          touchedPositionInElement > scopeEnd
        ) {
          return;
        }
      } else if(x < scopeStart || x > scopeEnd) {
        return;
      }
    }

    if (scope?.y) {
      const { y: [scopeStart, scopeEnd] = [0, 0] } = scope;

      if(!!targetTouches) {
        const getAbsolutePos = getAbsolutePositionFunc(element);
        const touchedPositionInElement = clientY - getAbsolutePos('y');

        if (
          touchedPositionInElement < scopeStart || 
          touchedPositionInElement > scopeEnd
        ) {
          return;
        } else if(y < scopeStart || y > scopeEnd) {
          return;
        }
      }
    }

    startPositionRef.current = [y, x];
    disablePageScroll(document.body);
    blocking = false;
    element.addEventListener(deviceEventNames['move'], throttledOnTouchMove, true);
  }, [...effectDependencies, throttledOnTouchMove]);
  const throttledOnTouchStart = React.useMemo(() => throttle(onTouchStart, ms), [onTouchStart, ms]);
  
  const onTouchEnd = React.useCallback(() => {
    blocking = true;
    startPositionRef.current = [0, 0];
    setSwipeState(INITIAL_STATE);
    enablePageScroll(document.body);
     
    element.removeEventListener(deviceEventNames['move'], throttledOnTouchMove);
  }, [...effectDependencies, throttledOnTouchStart, throttledOnTouchMove]);

  const removeEventListenerBundle = React.useCallback(() => {
    if (element) {
      element.removeEventListener(deviceEventNames['start'], throttledOnTouchStart);
      element.removeEventListener(deviceEventNames['move'], throttledOnTouchMove);
      element.removeEventListener(deviceEventNames['end'], onTouchEnd);
      if(!isMobile) {
        element.removeEventListener('mouseleave', onTouchEnd);
      }
    }
    enablePageScroll(document.body);
  }, [...effectDependencies, throttledOnTouchStart, throttledOnTouchMove, onTouchEnd, isMobile]);

  React.useEffect(() => {
    if (element) {
      element.addEventListener(deviceEventNames['start'], throttledOnTouchStart, true);
      element.addEventListener(deviceEventNames['end'], onTouchEnd);
      if(!isMobile) {
        element.addEventListener('mouseleave', onTouchEnd);
      }

      return () => removeEventListenerBundle();
    }
  }, [...effectDependencies, throttledOnTouchStart, onTouchEnd, removeEventListenerBundle, isMobile]);

  React.useLayoutEffect(() => {
    targetRef.current =
      target && ('current' in target ? target.current : target);
  }, [target]);

  return React.useMemo(() => swipeState, [swipeState.x, swipeState.y]);
};

export default useSwipe;
