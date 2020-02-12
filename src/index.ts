import { Traverse } from "./traverse";
import { Comms } from "./comms";

export class dom {

    /**
     * Communications.
     */
    public static comms = new Comms();

    /**
     * Traversal.
     */
    public static traverse = new Traverse();
}