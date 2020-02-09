abstract class Traverse {

  /**
   * Returns an array of elements that match a css-style query.
   * @param cssQuery The css-style query.
   * @param root The starting element for the query.
   */
  public static find(cssQuery: string, root?: Element): Array<Element> {

    const parent = root || document,
      nodes = parent.querySelectorAll(cssQuery);

    return Array.prototype.slice.call(nodes);
  }

  /**
   * Returns the first element that matches a css-style query.
   * @param cssQuery The css-style query.
   * @param root The starting element for the query.
   */
  public static first(cssQuery: string, root?: Element): Element {

    const parent = root || document,
      node = parent.querySelector(cssQuery);

    return node;
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
      root?: Element): void {

    this.find(cssQuery, root).forEach(callbackfn);
  }
}