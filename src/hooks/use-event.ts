import { useEffect } from "react";
import { Observer, Subject } from "rxjs";

const subjectRecords: Record<string, Subject<unknown>> = {};
type EventName = "scrollDownToContainerInChat";
export const useEventRegister = (
  eventName: EventName,
  subscriber: Partial<Observer<unknown>>
) => {
  useEffect(() => {
    subjectRecords[eventName] = new Subject<unknown>();
    const subscription = subjectRecords[eventName].subscribe(subscriber);
    return () => {
      subscription.unsubscribe();
    };
  }, [eventName, subscriber]);
};

export const useEventEmit = (eventName: EventName) => {
  return () => {
    subjectRecords[eventName].next(eventName);
  };
};
