import { QuickParam } from './models';

export class ChainedQuery {

  private static readonly NAIVE_HTML_RGX = /^<.*>$/m;
  private static readonly WHITESPACE_RGX = /\s+/;

  private _elems: Element[] = [];

  get length() { return this._elems.length; }

  constructor(...input: (string | QuickParam | Element)[]) {
    this.add(...input);
  }

  get = (index: number) => this._elems[index];

  add(...input: (string | QuickParam | Element)[]): ChainedQuery {    
    this._elems.push(...ChainedQuery.Map(input));
    return this;
  }

  each(func: (elem: Element, i?: number) => void): ChainedQuery {
    this._elems.forEach((el, i) => func(el, i));
    return this;
  }

  append(...input: (string | QuickParam | Element)[]): ChainedQuery {
    return this.each(el => {
      el.append(...ChainedQuery.Map(input));
    });
  }

  empty(): ChainedQuery {
    return this.each(el => {
      while (el.firstChild) { el.removeChild(el.firstChild); }
    });
  }

  fire<T>(eventName: string, detail?: T): ChainedQuery {
    const evt = new CustomEvent(eventName, { detail });
    return this.each(el => el.dispatchEvent(evt));
  }

  on(eventNames: string, func: EventListenerOrEventListenerObject): ChainedQuery {
    const evts = eventNames.split(ChainedQuery.WHITESPACE_RGX);
    return this.each(el => {
      evts.forEach(name => el.addEventListener(name, func));
    });
  }

  find(selector: string): ChainedQuery {
    return new ChainedQuery(...this._elems.reduce((acc, elem) => {
      acc.push(...ChainedQuery.MapSelector(selector, elem));
      return acc;
    }, [] as Element[]));
  }

  private static Map(input: (string | QuickParam | Element)[]): Element[] {
    return input.reduce((acc, item) => {
      if (typeof item === 'string') {
        acc.push(...this.NAIVE_HTML_RGX.test(item) 
          ? this.MapHTML(item)
          : this.MapSelector(item));
      }
      else if ((item as any).tag) acc.push(this.MapParam(item as QuickParam));
      else if ((item as any).tagName) acc.push(item as Element);
      else console.warn('Unrecognised item:', item);
      return acc;
    }, [] as Element[]);
  }

  private static MapHTML(html: string): Element[] {
    const template = document.createElement('template');
    template.innerHTML = html;
    return Array.from(template.content.children);
  }

  private static MapSelector(selector: string, root?: Element): Element[] {
    return Array.from((root || document).querySelectorAll(selector));
  }

  private static MapParam(p: QuickParam): Element {
    const el = document.createElement(p.tag);
    if (p.text) el.textContent = p.text;
    for (let key in p.attr || {}) { el.setAttribute(key, p.attr[key]); }
    for (let key in p.evts || {}) { el.addEventListener(key, p.evts[key]); }
    return el;
  }
}
