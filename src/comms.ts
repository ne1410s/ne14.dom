/**
 * Events and timing.
 */
export class comms {

  /**
   * Attaches listener handling to an event on a given node.
   * @param node The node.
   * @param eventName The event name.
   * @param callbackfn The handling code.
   */
  public static on(
      node: Node,
      eventName: string,
      callbackfn: EventListenerOrEventListenerObject): void {

    node.addEventListener(eventName, callbackfn)
  }

  /**
   * Triggers a programmatic event, optionally with data.
   * @param node The node.
   * @param eventName The event name.
   * @param detail Any custom data.
   */
  public static fire<T>(node: Node, eventName: string, detail?: T): void {

    // element.dispatchEvent(new CustomEvent(eventName, { detail }));
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, false, false, detail);
    node.dispatchEvent(event);
  }
}