/**
 * DOM traversal.
 */
export class seek {

  /**
   * Returns an array of elements that match a css-style query.
   * @param cssQuery The css-style query.
   * @param root The starting element for the query.
   */
  public static find(cssQuery: string, root?: ParentNode): Array<Element> {

    const parent = root || document,
          elems = parent.querySelectorAll(cssQuery);

    return Array.prototype.slice.call(elems);
  }

  /**
   * Returns the first element that matches a css-style query.
   * @param cssQuery The css-style query.
   * @param root The starting element for the query.
   */
  public static first(cssQuery: string, root?: ParentNode): Element {

    const parent = root || document,
          elem = parent.querySelector(cssQuery);

    return elem;
  }

  /**
   * Invokes a function on every element found by a css-style query.
   * @param cssQuery The css-style query.
   * @param callbackfn The function to invoke.
   * @param root The starting element for the query.
   */
  public static each(
      cssQuery: string,
      callbackfn: (value: Element, index: number, array: Element[]) => void,
      root?: ParentNode): void {

    this.find(cssQuery, root).forEach(callbackfn);
  }
}