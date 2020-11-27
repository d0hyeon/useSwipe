import * as React from 'react';
import throttle from 'lodash/throttle';
import scrollLock from 'scroll-lock';
import { SwipeState, UseSwipe } from './type';

const { enablePageScroll, disablePageScroll } = scrollLock;

const INITIAL_STATE: SwipeState = {
  x: 0,
  y: 0,
  state: 'done'
};

let win: Window | null = (process as any).browser ? window || null : null;

const getAbsolutePosFunc = (element: HTMLElement) => (position: 'x' | 'y') => {
  return (
    (win ?? window)[`scroll${position.toUpperCase()}`] +
    element.getBoundingClientRect()[position]
  );
};

const useSwipe: UseSwipe = (target, options) => {
  const { scope = {}, fps = 60, ignoreElement } = options || {};
  const ms = 1000 / fps;

  const [swipeState, setSwipeState] = React.useState<SwipeState>(INITIAL_STATE);
  const targetRef = React.useRef(null);
  const startPositionRef = React.useRef([0, 0]);
  let blocking = false;

  const { current: element } = targetRef;

  const effectDependencies = [
    element,
    ignoreElement,
    ...(scope?.x ?? []),
    ...(scope?.y ?? []),
  ];

  const onTouchMove = React.useCallback(({targetTouches}) => {
    if(blocking) return;
    const [{ screenY, screenX }] = targetTouches;
    const [startY, startX] = startPositionRef.current;
      
    setSwipeState({
      x: screenX - startX,
      y: screenY - startY,
      state: 'move'
    });
  }, effectDependencies);
  const throttledOnTouchMove = React.useMemo(() => throttle(onTouchMove, ms), [onTouchMove, ms]);

  const onTouchStart = React.useCallback(({ targetTouches, target }) => {
    const [{ screenY, screenX, clientY, clientX }] = targetTouches;

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
      const getAbsolutePos = getAbsolutePosFunc(element);
      const touchedPositionInElement = clientX - getAbsolutePos('x');

      if (touchedPositionInElement < scopeStart) {
        return;
      }
      if (touchedPositionInElement > scopeEnd) {
        return;
      }
    }
    if (scope?.y) {
      const { y: [scopeStart, scopeEnd] = [0, 0] } = scope;
      const getAbsolutePos = getAbsolutePosFunc(element);
      const touchedPositionInElement = clientY - getAbsolutePos('y');

      if (touchedPositionInElement < scopeStart) {
        return;
      }
      if (touchedPositionInElement > scopeEnd) {
        return;
      }
    }

    startPositionRef.current = [screenY, screenX];
    disablePageScroll(document.body);
    blocking = false;
    element.addEventListener('touchmove', throttledOnTouchMove, {passive: true});
  }, [...effectDependencies, throttledOnTouchMove]);
  const throttledOnTouchStart = React.useMemo(() => throttle(onTouchStart, ms), [onTouchStart, ms]);
  
  const onTouchEnd = React.useCallback(() => {
    blocking = true;
    startPositionRef.current = [0, 0];
    setSwipeState(INITIAL_STATE);
    enablePageScroll(document.body);
     
    element.removeEventListener('touchmove', throttledOnTouchMove);
  }, [...effectDependencies, throttledOnTouchStart, throttledOnTouchMove]);

  const removeEventListenerBundle = React.useCallback(() => {
    if (element) {
      element.removeEventListener('touchstart', throttledOnTouchStart);
      element.removeEventListener('touchmove', throttledOnTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
    }
    enablePageScroll(document.body);
  }, [...effectDependencies, throttledOnTouchStart, throttledOnTouchMove, onTouchEnd]);

  React.useEffect(() => {
    if (element) {
      element.addEventListener('touchstart', throttledOnTouchStart, {passive: true});
      element.addEventListener('touchend', onTouchEnd, {passive: true});

      return () => removeEventListenerBundle();
    }
  }, [...effectDependencies, throttledOnTouchStart, onTouchEnd, removeEventListenerBundle]);

  React.useLayoutEffect(() => {
    targetRef.current =
      target && ('current' in target ? target.current : target);
  }, [target]);

  return React.useMemo(() => swipeState, [swipeState.x, swipeState.y]);
};

export default useSwipe;
