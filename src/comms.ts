export class Comms {

  /**
   * Attaches listener handling to an event on a given element.
   * @param element The element.
   * @param eventName The event name.
   * @param callbackfn The handling code.
   */
  public on(
      element: Element,
      eventName: string,
      callbackfn: EventListenerOrEventListenerObject): void {

    element.addEventListener(eventName, callbackfn)
  }

  /**
   * Triggers a programmatic event, optionally with data.
   * @param element The element.
   * @param eventName The event name.
   * @param detail Any custom data.
   */
  public fire<T>(element: Element, eventName: string, detail?: T): void {

    // element.dispatchEvent(new CustomEvent(eventName, { detail }));
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, detail);
    element.dispatchEvent(event);
  }
}