abstract class Query {
    
    /**
     * Returns an array of elements that match the css-style query.
     * @param query The css-style query.
     * @param root The starting point of the search.
     */
    public static array(query: string, root?: Element): Array<Element> {

        const parent = root || document,
              nodes = parent.querySelectorAll(query);

        return Array.from(nodes);
    }

    /**
     * Returns the first element that matches the css-style query.
     * @param query The css-style query.
     * @param root The starting point of the search.
     */
    public static first(query: string, root?: Element): Element {

        const parent = root || document,
              node = parent.querySelector(query);

        return node;
    }
}