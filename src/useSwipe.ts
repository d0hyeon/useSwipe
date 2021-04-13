import * as React from 'react';
import throttle from 'lodash/throttle';
import { SwipeState, UseSwipe } from './type';
import { getAbsolutePositionFunc, getEventNameByDevice, getIsMobile, preventDefault } from './utils';

const INITIAL_STATE: SwipeState = {
  x: 0,
  y: 0,
  state: 'done'
};


type Events = TouchEvent | MouseEvent;

const useSwipe: UseSwipe = (target, options) => {
  const { scope = {}, fps = 60, ignoreElement } = options || {};
  const ms = 1000 / fps; 

  const [swipeState, setSwipeState] = React.useState<SwipeState>(INITIAL_STATE);
  const startPositionRef = React.useRef([0, 0]);
  const targetRef = React.useRef(null);
  const variablesRef = React.useRef({touchMoveBlocking: true});
  const isMobile = React.useMemo(() => getIsMobile(), []);
  const eventMapOfDevice = React.useMemo(() => getEventNameByDevice(isMobile), [isMobile]);
 
  const effectDependencies = [
    targetRef,
    variablesRef,
    ignoreElement,
    ...(scope?.x ?? []),
    ...(scope?.y ?? []),
  ];
  
  const addBlockingEvents = React.useCallback((events: string[]) => {
    events.forEach((eventType) => {
      targetRef.current.addEventListener(eventType, preventDefault);
    })
  }, [targetRef]);
  const removeBlockingEvents = React.useCallback((events: string[]) => {
    events.forEach((eventType) => {
      targetRef.current.removeEventListener(eventType, preventDefault);
    })
  }, [targetRef]);
  
  
  const swipeStartHandler = React.useCallback((event: Events) => {
    let { clientX, clientY, target } = event as MouseEvent;
    const isTouched = !!(event as TouchEvent).targetTouches;

    if(isTouched) {
      const touch = (event as TouchEvent).targetTouches[0];
      clientX = touch.screenX;
      clientY = touch.screenY;
    }

    if (ignoreElement) {
      const ignoreEl: HTMLElement | null =
        typeof ignoreElement === 'string'
          ? targetRef.current.querySelector(ignoreElement)
          : ignoreElement;

      if (ignoreEl && (ignoreEl === target || ignoreEl.contains(target as Node))) {
        return;
      }
    }
    if (scope?.x) {
      const [scopeStart, scopeEnd = 0] = scope.x;
      if(isTouched) {
        const getAbsolutePos = getAbsolutePositionFunc(targetRef.current);
        const touchedPositionInElement = clientX - getAbsolutePos('x');  
        if (
          touchedPositionInElement < scopeStart || 
          touchedPositionInElement > scopeEnd
        ) {
          return;
        }
      } else if(clientX < scopeStart || clientX > scopeEnd) {
        return;
      }
    }

    if (scope?.y) {
      const [scopeYStart, scopeYEnd = 0] = scope.y;

      if(isTouched) {
        const getAbsolutePos = getAbsolutePositionFunc(targetRef.current);
        const touchedPositionInElement = clientY - getAbsolutePos('y');

        if (
          touchedPositionInElement < scopeYStart || 
          touchedPositionInElement > scopeYEnd
        ) {
          return;
        }
      } else if(clientY < scopeYStart || clientY > scopeYEnd) {
        return;
      }
    }

    startPositionRef.current = [clientY, clientX];
    variablesRef.current.touchMoveBlocking = false;
  }, effectDependencies);
  const throttledSwipeStartHandler = React.useMemo(() => throttle(swipeStartHandler, ms), [swipeStartHandler, ms]);

  const swipeMoveHandler = React.useCallback((event: Events) => {
    if(variablesRef.current.touchMoveBlocking) return;
    let { clientX, clientY, } = event as MouseEvent;
    const isTouched = !!(event as TouchEvent).targetTouches;
    const [startY, startX] = startPositionRef.current;

    if(isTouched) {
      const touch = (event as TouchEvent).targetTouches[0];
      clientX = touch.screenX;
      clientY = touch.screenY;
    }
    
    addBlockingEvents(['click', 'dragstart']);
    setSwipeState({
      x: clientX - startX,
      y: clientY - startY,
      state: 'move'
    });
  }, effectDependencies);
  const throttledSwipeMoveHandler = React.useMemo(() => throttle(swipeMoveHandler, ms), [swipeMoveHandler, ms]);
  
  const swipeEndHandler = React.useCallback(() => {
    variablesRef.current.touchMoveBlocking = true;
    startPositionRef.current = [0, 0];
    setSwipeState(INITIAL_STATE);
    setTimeout(() => {
      removeBlockingEvents(['click', 'dragstart']);
    }, 0)
  }, effectDependencies);

  const mouseLeaveHandler = React.useCallback(() => {
    setSwipeState(INITIAL_STATE);
    swipeEndHandler();
  }, [targetRef, swipeEndHandler])

  React.useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener(eventMapOfDevice['start'], throttledSwipeStartHandler, {passive: true});
      targetRef.current.addEventListener(eventMapOfDevice['move'], throttledSwipeMoveHandler, {passive: true});
      targetRef.current.addEventListener(eventMapOfDevice['end'], swipeEndHandler, {passive: true});
      if(!isMobile) {
        document.body.addEventListener('mouseleave', mouseLeaveHandler)
      }
      return () => {
        targetRef.current.removeEventListener(eventMapOfDevice['start'], throttledSwipeStartHandler);
        targetRef.current.removeEventListener(eventMapOfDevice['move'], throttledSwipeMoveHandler);
        targetRef.current.removeEventListener(eventMapOfDevice['end'], swipeEndHandler);
        if(!isMobile) {
          document.body.removeEventListener('mouseleave', mouseLeaveHandler);
        }
      };
    }
  }, [targetRef, throttledSwipeStartHandler, throttledSwipeMoveHandler, swipeEndHandler, mouseLeaveHandler, eventMapOfDevice]);

  React.useLayoutEffect(() => {
    targetRef.current =
      target && ('current' in target ? target.current : target);
  }, [target]);

  return swipeState;
};

export default useSwipe;
