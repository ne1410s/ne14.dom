import { Traverse } from "./traverse";
import { Structure } from "./structure";
import { Comms } from "./comms";

export class dom {

  /**
   * DOM Traversal.
   */
  public static traverse = new Traverse();

  /**
   * Structural manipulation.
   */
  public static structure = new Structure();

  /**
   * Event management.
   */
  public static comms = new Comms();
}