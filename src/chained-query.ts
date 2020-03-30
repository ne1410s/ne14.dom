import { QuickParam, Chainable, ChainSource } from './models';

export class ChainedQuery {

  private static readonly NAIVE_HTML_RGX = /^<.*>$/m;
  private static readonly WHITESPACE_RGX = /\s+/;

  private _items: Chainable[] = [];
  
  get targets(): EventTarget[] {
    return this._items
      .filter(it => it instanceof EventTarget)
      .map(it => it as EventTarget);
  }

  get nodes(): Node[] {
    return this._items
      .filter(it => it instanceof Node)
      .map(it => it as Node);
  }

  get containers(): ParentNode[] {
    return this._items
      .map(it => it as ParentNode)
      .filter(p => typeof p.append === 'function');
  }

  get length() { return this._items.length; }


  /* TODO: Make the params also include:
    - window      -> event-target
    - document    -> parent-node and target?
    - shadow root -> parent-node
  */

  constructor(...sources: ChainSource[]) {
    this.add(...sources);
  }

  get = (index: number) => this._items[index];

  add(...sources: ChainSource[]): ChainedQuery {    
    this._items.push(...ChainedQuery.Map(sources));
    return this;
  }

  each(func: (item: Chainable, i?: number) => void): ChainedQuery {
    this._items.forEach((item, i) => func(item, i));
    return this;
  }

  append(...sources: ChainSource[]): ChainedQuery {
    this.containers.forEach(parent => {
      const nodes = new ChainedQuery(...sources).nodes;
      parent.append(...nodes);
    });
    return this;
  }

  empty(): ChainedQuery {
    this.nodes.forEach(n => {
      while (n.firstChild) { n.removeChild(n.firstChild); }
    });
    return this;
  }

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

  find(selector: string): ChainedQuery {
    return new ChainedQuery(...this.containers.reduce((acc, p) => {
      acc.push(...ChainedQuery.MapSelector(selector, p));
      return acc;
    }, [] as Chainable[]));
  }
 
  private static Map(sources: ChainSource[]): Chainable[] {
    return sources.reduce((acc, item) => {
      if (typeof item === 'string') {
        acc.push(...this.NAIVE_HTML_RGX.test(item) 
          ? this.MapHTML(item)
          : this.MapSelector(item));
      }
      else if ((item as any).tag) acc.push(this.MapParam(item as QuickParam));
      else if ((item as any).tagName) acc.push(item as Element);
      else console.warn('Unrecognised item:', item);
      return acc;
    }, [] as Chainable[]);
  }

  private static MapHTML(html: string): Chainable[] {
    const template = document.createElement('template');
    template.innerHTML = html;
    return Array.from(template.content.childNodes);
  }

  private static MapSelector(selector: string, root?: ParentNode): Element[] {
    return Array.from((root || document).querySelectorAll(selector));
  }

  private static MapParam(p: QuickParam): Element {
    const n = document.createElement(p.tag);
    if (p.text) n.textContent = p.text;
    for (let key in p.attr || {}) { n.setAttribute(key, p.attr[key]); }
    for (let key in p.evts || {}) { n.addEventListener(key, p.evts[key]); }
    return n;
  }
}
