abstract class Comms {
  
    /**
     * Attaches listener handling to an event on a given element.
     * @param element The element.
     * @param eventName The event name.
     * @param callbackfn The handling code.
     */
    public static on(
        element: Element,
        eventName: string,
        callbackfn: EventListenerOrEventListenerObject) {
  
      element.addEventListener(eventName, callbackfn)
    }
  
    /**
     * Triggers a programmatic event, optionally with data.
     * @param element The element.
     * @param eventName The event name.
     * @param detail Any custom data.
     */
    public static fire<T>(element: Element, eventName: string, detail?: T) {
  
      // element.dispatchEvent(new CustomEvent(eventName, { detail }));
      const event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, false, false, detail);
      element.dispatchEvent(event);
    }
  }