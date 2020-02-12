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
}