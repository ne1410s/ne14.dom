import { Chainable, ChainSource } from './models';
import { SourceMapper } from './source-mapper';

export class ChainedQuery {

  private static readonly WHITESPACE_RGX = /\s+/;

  private _items: Chainable[] = [];
  
  private get targets(): EventTarget[] {
    return this._items
      .filter(it => it instanceof EventTarget)
      .map(it => it as EventTarget);
  }

  get elements(): Element[] {
    return this._items
      .filter(it => it instanceof Element)
      .map(it => it as Element);
  }

  private get nodes(): Node[] {
    return this._items
      .filter(it => it instanceof Node)
      .map(it => it as Node);
  }

  private get containers(): ParentNode[] {
    return this._items
      .map(it => it as ParentNode)
      .filter(p => typeof p.append === 'function');
  }

  get length() { return this._items.length; }

  constructor(...sources: ChainSource[]) {
    this.add(...sources);
  }

  get = (index: number) => this._items[index];

  add(...sources: ChainSource[]): ChainedQuery {    
    this._items.push(...SourceMapper.Map(sources));
    return this;
  }

  // TODO: This must not fall over if trying to perform an action
  // on an inappropriate type. eg setting an attribute on window, or
  // trying to query a non-parent node..
  each(func: (item: Chainable, i?: number) => void): ChainedQuery {
    this._items.forEach((item, i) => func(item, i));
    return this;
  }

  prop<T>(name: string, value: T) {
    return this.each((item: any) => {
      if (name in item) {
        item[name] = value;
      }
    });
  }

  //#region Targets
  fire<T>(eventName: string, detail?: T): ChainedQuery {
    const evt = new CustomEvent(eventName, { detail });
    this.targets.forEach(t => t.dispatchEvent(evt));
    return this;
  }

  on(eventNames: string, func: EventListenerOrEventListenerObject): ChainedQuery {
    const evts = eventNames.split(ChainedQuery.WHITESPACE_RGX);
    this.targets.forEach(t => {
      evts.forEach(name => t.addEventListener(name, func));
    });
    return this;
  }
  //#endregion

  //#region Elements
  attr(name: string, value: string, ns?: string): ChainedQuery {
    this.elements.forEach(elem => elem.setAttributeNS(ns, name, value));
    return this;
  }
  //#endregion

  //#region Nodes
  empty(): ChainedQuery {
    this.nodes.forEach(n => {
      while (n.firstChild) { n.removeChild(n.firstChild); }
    });
    return this;
  }
  //#endregion

  //#region Containers
  append(...sources: ChainSource[]): ChainedQuery {
    this.containers.forEach(parent => {
      const nodes = new ChainedQuery(...sources).nodes;
      parent.append(...nodes);
    });
    return this;
  }
  find(selector: string): ChainedQuery {
    return new ChainedQuery(...this.containers.reduce((acc, parent) => {
      acc.push(...Array.from(parent.querySelectorAll(selector)));
      return acc;
    }, [] as Chainable[]));
  }
  first(selector: string): ChainedQuery {
    return new ChainedQuery(...this.containers
      .map(parent => parent.querySelector(selector))
      .filter(found => !!found));
  }
  //#endregion
}
