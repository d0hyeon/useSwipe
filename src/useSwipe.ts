import * as React from 'react';
import { throttle } from 'lodash-es';
import { SwipeState, UseSwipe, DeviceEventType } from './type';
import {
  getAbsolutePositionFunc,
  getEventNameByDevice,
  getIsMobile,
  preventDefault,
} from './utils';

const INITIAL_STATE: SwipeState = {
  x: 0,
  y: 0,
  state: 'done',
};

const useSwipe: UseSwipe = (target, options) => {
  const { scope = {}, fps = 60, ignoreElement } = options || {};
  const ms = 1000 / fps;

  const [swipeState, setSwipeState] = React.useState<SwipeState>(INITIAL_STATE);
  const startPositionRef = React.useRef([0, 0]);
  const targetRef: React.MutableRefObject<Element | null> = React.useRef(null);
  const variablesRef = React.useRef({ touchMoveBlocking: true });
  const isMobile = React.useMemo(() => getIsMobile(), []);
  const eventMapOfDevice = React.useMemo<DeviceEventType>(
    () => getEventNameByDevice(isMobile),
    [isMobile],
  );
    
  const commonEffectDependencies = React.useMemo(() => [
    variablesRef,
    ignoreElement,
    ...(scope?.x ?? []),
    ...(scope?.y ?? []),
  ], [variablesRef, ignoreElement, scope]);

  const addBlockingEvents = React.useCallback(
    (events: string[]) => {
      events.forEach((eventType) => {
        targetRef.current?.addEventListener(eventType, preventDefault);
      });
    },
    [targetRef],
  );
  const removeBlockingEvents = React.useCallback(
    (events: string[]) => {
      events.forEach((eventType) => {
        targetRef.current?.removeEventListener(eventType, preventDefault);
      });
    },
    [targetRef],
  );

  const swipeStartHandler = React.useCallback((event) => {
    let { clientX, clientY, target } = event as MouseEvent;
    const isTouched = !!(event as TouchEvent).targetTouches;

    if (isTouched) {
      const touch = (event as TouchEvent).targetTouches[0];
      clientX = touch.screenX;
      clientY = touch.screenY;
    }

    if (ignoreElement) {
      const ignoreEl: HTMLElement | null =
        typeof ignoreElement === 'string'
          ? targetRef.current?.querySelector(ignoreElement) ?? null
          : ignoreElement;

      if (
        ignoreEl &&
        (ignoreEl === target || ignoreEl.contains(target as Node))
      ) {
        return;
      }
    }
    if (scope?.x) {
      const [scopeStart, scopeEnd = 0] = scope.x;
      if (isTouched) {
        const getAbsolutePos = getAbsolutePositionFunc(
          targetRef.current as HTMLElement,
        );
        const touchedPositionInElement = clientX - getAbsolutePos('x');
        if (
          touchedPositionInElement < scopeStart ||
          touchedPositionInElement > scopeEnd
        ) {
          return;
        }
      } else if (clientX < scopeStart || clientX > scopeEnd) {
        return;
      }
    }

    if (scope?.y) {
      const [scopeYStart, scopeYEnd = 0] = scope.y;

      if (isTouched) {
        const getAbsolutePos = getAbsolutePositionFunc(
          targetRef.current as HTMLElement,
        );
        const touchedPositionInElement = clientY - getAbsolutePos('y');

        if (
          touchedPositionInElement < scopeYStart ||
          touchedPositionInElement > scopeYEnd
        ) {
          return;
        }
      } else if (clientY < scopeYStart || clientY > scopeYEnd) {
        return;
      }
    }

    startPositionRef.current = [clientY, clientX];
    variablesRef.current.touchMoveBlocking = false;
  }, [targetRef, ...commonEffectDependencies]);
  const throttledSwipeStartHandler = React.useMemo(
    () => throttle(swipeStartHandler, ms),
    [swipeStartHandler, ms],
  );

  const swipeMoveHandler = React.useCallback((event: Event) => {
    if (variablesRef.current.touchMoveBlocking) return;
    let { clientX, clientY } = event as MouseEvent;
    const isTouched = !!(event as TouchEvent).targetTouches;
    const [startY, startX] = startPositionRef.current;

    if (isTouched) {
      const touch = (event as TouchEvent).targetTouches[0];
      clientX = touch.screenX;
      clientY = touch.screenY;
    }

    addBlockingEvents(['click', 'dragstart']);
    setSwipeState({
      x: clientX - startX,
      y: clientY - startY,
      state: 'move',
    });
  }, commonEffectDependencies);
  const throttledSwipeMoveHandler = React.useMemo(
    () => throttle(swipeMoveHandler, ms),
    [swipeMoveHandler, ms],
  );

  const swipeEndHandler = React.useCallback(() => {
    variablesRef.current.touchMoveBlocking = true;
    startPositionRef.current = [0, 0];
    setSwipeState(INITIAL_STATE);
    setTimeout(() => {
      removeBlockingEvents(['click', 'dragstart']);
    }, 0);
  }, commonEffectDependencies);

  const mouseLeaveHandler = React.useCallback(() => {
    setSwipeState(INITIAL_STATE);
    swipeEndHandler();
  }, [targetRef, swipeEndHandler]);

  React.useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener(
        eventMapOfDevice.START,
        throttledSwipeStartHandler,
        { passive: true },
      );
      document.body.addEventListener(
        eventMapOfDevice.MOVE,
        throttledSwipeMoveHandler,
        { passive: true },
      );
      document.body.addEventListener(
        eventMapOfDevice.END,
        swipeEndHandler,
        { passive: true },
      );
      if (!isMobile) {
        document.body.addEventListener('mouseleave', mouseLeaveHandler);
      }
      return () => {
        targetRef.current!.removeEventListener(
          eventMapOfDevice.START,
          throttledSwipeStartHandler,
        );
        targetRef.current!.removeEventListener(
          eventMapOfDevice.MOVE,
          throttledSwipeMoveHandler,
        );
        targetRef.current!.removeEventListener(
          eventMapOfDevice.END,
          swipeEndHandler,
        );
        if (!isMobile) {
          document.body.removeEventListener('mouseleave', mouseLeaveHandler);
        }
      };
    }
  }, [
    targetRef,
    throttledSwipeStartHandler,
    throttledSwipeMoveHandler,
    swipeEndHandler,
    mouseLeaveHandler,
    eventMapOfDevice,
  ]);

  React.useLayoutEffect(() => {
    targetRef.current =
      target && ('current' in target ? target.current : target);
  }, [target]);

  return swipeState;
};

export default useSwipe;
