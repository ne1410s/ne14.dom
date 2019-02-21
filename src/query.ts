export abstract class Query {
    
    public static array(query: string, elem?: Element): Array<Element> {

        const parent = elem || document,
              nodes = parent.querySelectorAll(query);

        return Array.from(nodes);
    }

    public static first(query: string, elem?: Element): Element {

        const parent = elem || document,
              node = parent.querySelector(query);

        return node;
    }
}