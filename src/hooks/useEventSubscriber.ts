import { useEffect, useRef } from 'react';

import { emitter } from 'eventEmitter';

export const useEventSubscriber = <Payload>(
  event: string,
  callback: (payload: Payload) => void,
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const listener = emitter.addListener(event, (payload: Payload) =>
      callbackRef.current?.(payload),
    );

    return () => {
      listener.remove();
    };
  }, [event]);

  return [emitter.emit];
};
