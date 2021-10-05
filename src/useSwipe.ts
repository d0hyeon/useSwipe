import { useState, useRef, useMemo, useCallback, MutableRefObject, useEffect, useLayoutEffect, RefObject } from 'react';
import { throttle } from 'lodash-es';
import { SwipeState, DeviceEventType, UseSwipeOption } from './type';
import {
  getEventNameByDevice,
  getIsMobile,
  normalizeEvent,
  addBlockingEvents,
  removeBlockingEvents,
} from './utils';

const INITIAL_STATE: SwipeState = {
  x: 0,
  y: 0,
  state: 'done',
};

const useSwipe = <T extends HTMLElement>(target: T | RefObject<T>, options?: UseSwipeOption): SwipeState => {
  const { fps = 60 } = options || {};
  const ms = useMemo(() => 1000 / fps, [fps]);

  const [swipeState, setSwipeState] = useState<SwipeState>(INITIAL_STATE);
  const startPositionRef = useRef([0, 0]);
  const targetRef: MutableRefObject<T | null> = useRef(null);
  const variablesRef = useRef({ touchMoveBlocking: true });
  const isMobile = useMemo(() => getIsMobile(), []);
  const eventMapOfDevice = useMemo<DeviceEventType>(
    () => getEventNameByDevice(isMobile),
    [isMobile],
  );
    
  const commonEffectDependencies = useMemo(() => [
    targetRef,
    variablesRef,
  ], [targetRef, variablesRef]);
  
  const swipeStartHandler = useCallback((event) => {
    const swipe = normalizeEvent(event);

    startPositionRef.current = [swipe.y, swipe.x];
    variablesRef.current.touchMoveBlocking = false;
  }, [startPositionRef, variablesRef]);
  const throttledSwipeStartHandler = useMemo(
    () => throttle(swipeStartHandler, ms),
    [swipeStartHandler, ms],
  );

  const swipeMoveHandler = useCallback((event) => {
    if (variablesRef.current.touchMoveBlocking) return;
    const { x, y } = normalizeEvent(event);
    const [ startY, startX ] = startPositionRef.current;
    const [ diffY, diffX ] = [y - startY, x - startX];

    addBlockingEvents(targetRef!.current, ['click', 'dragstart']);
    setSwipeState({
      x: diffX,
      y: diffY,
      state: 'move',
    });
  }, [variablesRef, startPositionRef, setSwipeState]);
  const throttledSwipeMoveHandler = useMemo(
    () => throttle(swipeMoveHandler, ms),
    [swipeMoveHandler, ms],
  );

  const swipeEndHandler = useCallback(() => {
    variablesRef.current.touchMoveBlocking = true;
    startPositionRef.current = [0, 0];
    setSwipeState(INITIAL_STATE);
    setTimeout(() => {
      removeBlockingEvents(targetRef!.current, ['click', 'dragstart']);
    }, 0);
  }, commonEffectDependencies);

  const mouseLeaveHandler = useCallback(() => {
    setSwipeState(INITIAL_STATE);
    swipeEndHandler();
  }, [targetRef, swipeEndHandler]);

  useEffect(() => {
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

  useLayoutEffect(() => {
    targetRef.current = ('current' in target) ? target.current : target
  }, [target]);

  return swipeState;
};

export default useSwipe;
