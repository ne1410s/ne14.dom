import { comms } from "./comms";

/**
 * Structural manipulation.
 */
export class forge {

  /**
   * Removes all children from the node specified.
   * @param node The node to empty.
   * @returns The number of children removed.
   */
  public static empty(node: Node): number {

    let retVal = 0;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
      retVal++;
    }

    return retVal;
  }

  /**
   * Creates a new element.
   * @param opts A simple tag name, or else a more detailed set of parameters.
   */
  public static make(opts: string | MakeParam): Element {

    const makeParam = this.ofType<MakeParam>(opts);
    const elem = document.createElement(makeParam.tag || opts as string);
    if (makeParam.text) {
      elem.textContent = makeParam.text;
    }

    const safeAttribs = makeParam.attr || {};
    for (let key in safeAttribs) {
      elem.setAttributeNS(null, key, safeAttribs[key]);
    }

    const safeEvents = makeParam.evts || {};
    for (let key in safeEvents) {
      comms.on(elem, key, safeEvents[key]);
    }

    return elem;
  }

  /**
   * Chains a sequence of nodes by progressively appending them as children.
   * @param nodes A sequence of nodes and/or definitions.
   * @returns The sequence of formed nodes in the chain.
   */
  public static chainDown(...nodes: Array<Node | string | MakeParam>): Node[] {
    return this.chain((r: Element, n: Element) => r.appendChild(n), nodes);
  }

  /**
   * Chains a sequence of nodes by progressively inserting them after.
   * @param nodes A sequence of nodes and/or definitions.
   * @returns The sequence of formed nodes in the chain.
   */
  public static chainRight(...nodes: Array<Node | string | MakeParam>): Node[] {
    return this.chain((r: Node, n: Node) => r.parentNode.insertBefore(n, r.nextSibling), nodes);
  }

  /**
   * Chains a sequence of nodes by progressively inserting them before.
   * @param nodes A sequence of nodes and/or definitions.
   * @returns The sequence of formed nodes in the chain.
   */
  public static chainLeft(...nodes: Array<Node | string | MakeParam>): Node[] {
    return this.chain((r: Node, n: Node) => r.parentNode.insertBefore(n, r), nodes);
  }

  private static chain(
      fn: (ref: Node, next: Node) => void,
      nodes: Array<Node | string | MakeParam>): Node[] {

    if (nodes.length < 2) {
      throw new RangeError('At least two nodes must be supplied');
    }

    const finalSet = nodes.map(node => typeof node === 'string' || this.ofType<MakeParam>(node).tag
      ? this.make(node as string | MakeParam) : node as Node);

    for (let i = 1; i < finalSet.length; i++) {
      fn(finalSet[i - 1], finalSet[i]);
    }

    return finalSet;
  }

  /**
   * Gets an object in the given type if possible, else an empty object.
   * @param obj The object whose type to check.
   */
  private static ofType<T>(obj: any): T {
    return obj as T || {} as T;
  }
}

/**
 * Parameter block for the structure/make() event.
 */
export interface MakeParam {
  /** Tag name. */
  tag: string;
  /** Node text. */
  text?: string;
  /** Attributes */
  attr?: { [name: string]: string };
  /** Event handling */
  evts?: { [name: string]: EventListenerOrEventListenerObject }
}
