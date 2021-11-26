import { useState, useRef, useMemo, useCallback, MutableRefObject, useEffect, useLayoutEffect, RefObject } from 'react';
import { throttle } from 'lodash-es';
import { SwipeState, DeviceEventType, UseSwipeOption, SwipeEvent, SwipeStateEnum, UseSwipe } from './type';
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
  state: SwipeStateEnum.DONE,
  duration: 0,
  difference: {
    x: 0,
    y: 0
  }
};

interface StartRecord {
  position: [number, number];
  dateTime: number
}

const INITIAL_START_RECORD: StartRecord = {
  position: [0, 0],
  dateTime: 0
}

const useSwipe: UseSwipe = <T extends HTMLElement, EL extends HTMLElement>(
  target: T | RefObject<T>, 
  options?: UseSwipeOption<EL>
): SwipeState => {
  const { fps = 60, useEvent = false, excludeElement } = options || {};
  const ms = useMemo(() => 1000 / fps, [fps]);

  const [swipeState, setSwipeState] = useState<SwipeState>(INITIAL_STATE);
  const targetRef: MutableRefObject<T | null> = useRef(null);
  const variablesRef = useRef<{ isActiveInput: boolean, startRecord: StartRecord }>({ isActiveInput: true, startRecord: INITIAL_START_RECORD });
  const isMobile = useMemo(() => getIsMobile(), []);
  const eventMapOfDevice = useMemo<DeviceEventType>(
    () => getEventNameByDevice(isMobile),
    [isMobile],
  );
    
  const commonEffectDependencies = useMemo(() => ([
    targetRef,
    variablesRef,
  ]), [targetRef, variablesRef]);
  
  const swipeStartHandler = useCallback((event) => {
    if(excludeElement) {
      const { target } = event;
      if(excludeElement === target || excludeElement.contains(target)) {
        return 
      }
    }
    const swipe = normalizeEvent(event);
    const now = performance?.now?.() ?? Date.now()
    variablesRef.current.startRecord = {
      position: [swipe.y, swipe.x],
      dateTime: now
    };
    variablesRef.current.isActiveInput = false;
    console.log(useEvent)
    if(useEvent) {
      const swipeEvent = new CustomEvent<SwipeEvent>('swipestart', {
        detail: swipe
      })
      targetRef.current.dispatchEvent(swipeEvent)
    }
    setSwipeState(INITIAL_STATE);
  }, [...commonEffectDependencies, useEvent, excludeElement, setSwipeState]);

  const throttledSwipeStartHandler = useMemo(
    () => throttle(swipeStartHandler, ms),
    [swipeStartHandler, ms],
  );

  const swipeMoveHandler = useCallback((event) => {
    if (variablesRef.current.isActiveInput) return;
    const swipe = normalizeEvent(event);
    const { x, y } = swipe;
    const [ startY, startX ] = variablesRef.current.startRecord.position;
    const [ diffY, diffX ] = [y - startY, x - startX];

    if(useEvent) {
      const swipeEvent = new CustomEvent('swipemove', {
        detail: swipe
      })
      targetRef.current.dispatchEvent(swipeEvent)
    }

    addBlockingEvents(targetRef!.current, ['click', 'dragstart']);
    setSwipeState({
      duration: 0,
      difference: { x: 0, y: 0},
      x: diffX,
      y: diffY,
      state: SwipeStateEnum.MOVE,
    });
  }, [...commonEffectDependencies, setSwipeState, useEvent]);
  const throttledSwipeMoveHandler = useMemo(
    () => throttle(swipeMoveHandler, ms),
    [swipeMoveHandler, ms],
  );

  const swipeEndHandler = useCallback((event) => {
    if (variablesRef.current.isActiveInput) return;
    const swipe = normalizeEvent(event)
    const { x, y } = swipe;
    const { position: [startY, startX], dateTime } = variablesRef.current.startRecord
    const [ diffY, diffX ] = [y - startY, x - startX];
    const now = performance?.now?.() ?? Date.now()

    variablesRef.current.isActiveInput = true;
    variablesRef.current.startRecord = INITIAL_START_RECORD

    setTimeout(() => {
      removeBlockingEvents(targetRef!.current, ['click', 'dragstart']);
    }, 0);
    
    if(useEvent) {
      const swipeEvent = new CustomEvent<SwipeEvent>('swipeend', {
        detail: swipe
      })
      targetRef.current.dispatchEvent(swipeEvent)
    }
    setSwipeState((prevState) => (
      prevState.state === SwipeStateEnum.DONE
        ? prevState
        : {
          ...INITIAL_STATE,
          duration: now - dateTime,
          difference: {
            x: diffX,
            y: diffY
          }
        }
    ));
  }, [...commonEffectDependencies, setSwipeState, useEvent]);

  const mouseLeaveHandler = useCallback((event) => {
    setSwipeState(INITIAL_STATE);
    swipeEndHandler(event);
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
