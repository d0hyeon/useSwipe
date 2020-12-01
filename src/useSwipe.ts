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
 
  const effectDependencies = [
    targetRef,
    ignoreElement,
    ...(scope?.x ?? []),
    ...(scope?.y ?? []),
  ];
  
  const deviceEventNames = React.useMemo(() => {
    return getEventNameByDevice(isMobile);
  }, [isMobile]);

  const onTouchMove = React.useCallback(event => {
    if(blocking) return;
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
    const { targetTouches, clientX, clientY, target } = event;
    const x = targetTouches?.[0]?.screenX ?? clientX;
    const y = targetTouches?.[0]?.screenY ?? clientY;

    if (ignoreElement) {
      const ignoreEl: HTMLElement | null =
        typeof ignoreElement === 'string'
          ? targetRef.current.querySelector(ignoreElement)
          : ignoreElement;

      if (ignoreEl && (ignoreEl === target || ignoreEl.contains(target))) {
        return;
      }
    }
    if (scope?.x) {
      const [scopeStart, scopeEnd = 0] = scope.x;
      if(!!targetTouches) {
        const getAbsolutePos = getAbsolutePositionFunc(targetRef.current);
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
      const [scopeYStart, scopeYEnd = 0] = scope.y;

      if(!!targetTouches) {
        const getAbsolutePos = getAbsolutePositionFunc(targetRef.current);
        const touchedPositionInElement = clientY - getAbsolutePos('y');

        if (
          touchedPositionInElement < scopeYStart || 
          touchedPositionInElement > scopeYEnd
        ) {
          return;
        }
      } else if(y < scopeYStart || y > scopeYEnd) {
        return;
      }
    }

    startPositionRef.current = [y, x];
    disablePageScroll(document.body);
    blocking = false;
    targetRef.current.addEventListener(deviceEventNames['move'], throttledOnTouchMove, {passive: true});
  }, [...effectDependencies, throttledOnTouchMove]);
  const throttledOnTouchStart = React.useMemo(() => throttle(onTouchStart, ms), [onTouchStart, ms]);
  
  const onTouchEnd = React.useCallback(() => {
    blocking = true;
    startPositionRef.current = [0, 0];
    setSwipeState(INITIAL_STATE);
    enablePageScroll(document.body);
     
    targetRef.current.removeEventListener(deviceEventNames['move'], throttledOnTouchMove);
  }, [...effectDependencies, throttledOnTouchStart, throttledOnTouchMove]);

  const removeEventListenerBundle = React.useCallback(() => {
    if (targetRef.current) {
      targetRef.current.removeEventListener(deviceEventNames['start'], throttledOnTouchStart);
      targetRef.current.removeEventListener(deviceEventNames['move'], throttledOnTouchMove);
      targetRef.current.removeEventListener(deviceEventNames['end'], onTouchEnd);
    }
    enablePageScroll(document.body);
  }, [...effectDependencies, throttledOnTouchStart, throttledOnTouchMove, onTouchEnd, isMobile]);

  React.useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener(deviceEventNames['start'], throttledOnTouchStart, {passive: true});
      targetRef.current.addEventListener(deviceEventNames['end'], onTouchEnd, {passive: true});

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
