import { ChainSource, Chainable, QuickParam } from './models';

export class SourceMapper {
  
  private static readonly NAIVE_HTML_RGX = /^<.*>$/m;

  static Map(sources: ChainSource[]): Chainable[] {
    return sources.reduce((acc, item) => {
      if (typeof item === 'string') {
        acc.push(...this.NAIVE_HTML_RGX.test(item) 
          ? this.MapHTML(item)
          : this.MapSelector(item));
      }
      else if ((item as QuickParam).tag) acc.push(this.MapParam(item as QuickParam));
      else if (item instanceof Node) acc.push(item);
      else if (item instanceof EventTarget) acc.push(item);
      else console.warn('Unrecognised item:', item);
      return acc;
    }, [] as Chainable[]);
  }

  private static MapHTML(html: string): Chainable[] {
    const template = document.createElement('template');
    template.innerHTML = html;
    return Array.from(template.content.childNodes);
  }

  private static MapSelector(selector: string): Element[] {
    return Array.from(document.querySelectorAll(selector));
  }

  private static MapParam(p: QuickParam): Element {
    const n = document.createElement(p.tag);
    if (p.text) n.textContent = p.text;
    for (let key in p.attr || {}) { 
      if (p.attr[key] != null) {
        n.setAttribute(key, p.attr[key]);
      }
    }
    for (let key in p.evts || {}) { 
      if (typeof p.evts[key] === 'function') {
        n.addEventListener(key, p.evts[key]);
      }
    }
    return n;
  }
}