import { Pi } from './constants';

export abstract class Dom {
    
    public static circumference(radius: number) {
        return 2 * Pi * radius;
    }

    public static q2a(query: string, elem?: Element): Array<Element> {

        const parent = elem || document,
              nodes = parent.querySelectorAll(query);

        return Array.from(nodes);
    }

    public static q2f(query: string, elem?: Element): Element {

        const parent = elem || document,
              node = parent.querySelector(query);

        return node;
    }
}