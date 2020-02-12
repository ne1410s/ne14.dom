import { Comms } from "./comms";

export class Structure {

  /**
   * Removes all elements from the one specified.
   * @param element The element to empty.
   * @returns The number of elements removed.
   */
  public empty(element: Element): number {

    let retVal = 0;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
      retVal++;
    }

    return retVal;
  }

  /**
   * Creates a new element.
   * @param opts A simple tag name, or else a more detailed set of parameters.
   */
  public make(opts: string | MakeParam): Element {

    const makeParam = this.ofType<MakeParam>(opts);
    const elem = document.createElement(makeParam.tag || opts as string);
    elem.textContent = makeParam.text;
    
    const safeAttribs = makeParam.attribs || {};
    for (let key in safeAttribs) {
      elem.setAttributeNS(null, key, safeAttribs[key]);
    }

    const safeEvents = makeParam.events || {};
    for (let key in safeEvents) {
      new Comms().on(elem, key, safeEvents[key]);
    }

    return elem;
  }

  /**
   * Appends a linear chain of elements from the top down. Elements can be predefined, or indeed
   * created from scratch as part of this function.
   * @param elems 
   */
  public chain(...elems: Array<Element | string | MakeParam>): Element[] {

    if (elems.length < 2) {
      throw new RangeError('At least two elements must be supplied');
    }

    const finalSet = elems.map(elem => typeof elem === 'string' || this.ofType<MakeParam>(elem).tag
        ? this.make(elem as string | MakeParam) : elem as Element);
    
    for (let i = 1; i < finalSet.length; i++) {
      finalSet[i - 1].appendChild(finalSet[i]);
    }

    return finalSet;
  }

  /**
   * Gets an object in the given type if possible, else an empty object.
   * @param obj The object whose type to check.
   */
  private ofType<T>(obj: any): T {
    return obj as T || {} as T;
  }
}

/**
 * Parameter block for the structure/make() event.
 */
export interface MakeParam {
  tag: string;
  text?: string;
  attribs?: { [name: string]: string };
  events?: { [name: string]: EventListenerOrEventListenerObject }
}
